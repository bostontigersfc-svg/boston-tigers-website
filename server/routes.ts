import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRegistrationSchema, insertEliteApplicationSchema } from "@shared/schema";
import { ZodError } from "zod";
import { getStripeClient } from "./stripeClient";
import { sendConfirmationEmail } from "./emailService";

const MONTHLY_FEE_CENTS = 9900; // $99.00/month
const PRODUCT_NAME = "Boston Tigers Youth Soccer Clinics";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/registrations", async (req, res) => {
    try {
      const data = insertRegistrationSchema.parse(req.body);
      const registration = await storage.createRegistration(data);
      res.status(201).json(registration);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: "Invalid registration data", details: err.errors });
      }
      console.error("Registration error:", err);
      res.status(500).json({ error: "Failed to save registration" });
    }
  });

  app.get("/api/registrations", async (_req, res) => {
    try {
      const all = await storage.getAllRegistrations();
      res.json(all);
    } catch (err) {
      console.error("Fetch registrations error:", err);
      res.status(500).json({ error: "Failed to fetch registrations" });
    }
  });

  app.delete("/api/registrations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
      await storage.deleteRegistration(id);
      res.json({ success: true });
    } catch (err) {
      console.error("Delete registration error:", err);
      res.status(500).json({ error: "Failed to delete registration" });
    }
  });

  // Create checkout: handles both free_trial and monthly plans
  app.post("/api/checkout", async (req, res) => {
    try {
      const {
        parentName, email, phone, childName, childAge,
        soccerExperience, emergencyContact, plan,
      } = req.body;

      if (!parentName || !email || !phone || !childName || !childAge || !soccerExperience || !emergencyContact) {
        return res.status(400).json({ error: "Missing required registration fields" });
      }

      const baseUrl = `${req.protocol}://${req.get("host")}`;

      console.log(`[Checkout] plan="${plan}" for ${childName}`);

      // ── Free Trial: save directly, no Stripe ──
      if (plan === "free_trial") {
        await storage.createRegistration({
          parentName, email, phone, childName, childAge,
          soccerExperience, emergencyContact,
          paymentMethod: "free_trial",
          planType: "free_trial",
          paid: false,
        });

        sendConfirmationEmail({
          email, parentName, childName, childAge,
          soccerExperience, emergencyContact,
        }).catch((err) => console.error("[Email] Failed to send:", err));

        return res.json({ url: `/register/success?plan=free&name=${encodeURIComponent(childName)}&email=${encodeURIComponent(email)}` });
      }

      // ── Monthly Subscription: Stripe Checkout ──
      const stripe = getStripeClient();

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: MONTHLY_FEE_CENTS,
              recurring: { interval: "month" },
              product_data: {
                name: PRODUCT_NAME,
                description: `Monthly plan — Player: ${childName} (Age ${childAge})`,
              },
            },
          },
        ],
        customer_email: email,
        success_url: `${baseUrl}/register/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/register?cancelled=1`,
        metadata: { parent_name: parentName, child_name: childName },
      });

      await storage.createPendingRegistration({
        parentName, email, phone, childName, childAge,
        soccerExperience, emergencyContact,
        planType: "monthly",
        stripeSessionId: session.id,
      });

      res.json({ url: session.url });
    } catch (err: any) {
      console.error("Checkout error:", err);
      res.status(500).json({ error: err.message ?? "Failed to create checkout session" });
    }
  });

  // Confirm a Stripe payment after redirect
  app.post("/api/confirm-payment", async (req, res) => {
    try {
      const { sessionId } = req.body;
      if (!sessionId) return res.status(400).json({ error: "Missing sessionId" });

      const existing = await storage.getRegistrationBySessionId(sessionId);
      if (existing) {
        return res.json({ success: true, registration: existing, alreadyConfirmed: true });
      }

      const stripe = getStripeClient();
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      const validStatuses = ["paid", "no_payment_required"];
      if (!validStatuses.includes(session.payment_status)) {
        return res.status(402).json({ error: "Payment not completed", status: session.payment_status });
      }

      const pending = await storage.getPendingBySessionId(sessionId);
      if (!pending) {
        return res.status(404).json({ error: "Pending registration not found" });
      }

      const registration = await storage.createRegistration({
        parentName: pending.parentName,
        email: pending.email,
        phone: pending.phone,
        childName: pending.childName,
        childAge: pending.childAge,
        soccerExperience: pending.soccerExperience,
        emergencyContact: pending.emergencyContact,
        paymentMethod: "card",
        planType: pending.planType ?? "monthly",
        paid: true,
        stripeSessionId: sessionId,
      });

      await storage.deletePendingRegistration(pending.id);

      sendConfirmationEmail({
        email: pending.email,
        parentName: pending.parentName,
        childName: pending.childName,
        childAge: pending.childAge,
        soccerExperience: pending.soccerExperience,
        emergencyContact: pending.emergencyContact,
      }).catch((err) => console.error("[Email] Failed to send:", err));

      res.json({ success: true, registration });
    } catch (err: any) {
      console.error("Confirm payment error:", err);
      res.status(500).json({ error: err.message ?? "Failed to confirm payment" });
    }
  });

  app.post("/api/elite-applications", async (req, res) => {
    try {
      const data = insertEliteApplicationSchema.parse(req.body);
      const application = await storage.createEliteApplication(data);
      res.status(201).json(application);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: "Invalid application data", details: err.errors });
      }
      console.error("Elite application error:", err);
      res.status(500).json({ error: "Failed to save application" });
    }
  });

  app.get("/api/elite-applications", async (_req, res) => {
    try {
      const all = await storage.getAllEliteApplications();
      res.json(all);
    } catch (err) {
      console.error("Fetch elite applications error:", err);
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  app.delete("/api/elite-applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
      await storage.deleteEliteApplication(id);
      res.json({ success: true });
    } catch (err) {
      console.error("Delete elite application error:", err);
      res.status(500).json({ error: "Failed to delete application" });
    }
  });

  return httpServer;
}
