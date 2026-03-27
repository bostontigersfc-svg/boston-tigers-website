import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, XCircle, ChevronLeft, Phone, Mail, MessageCircle, Calendar, Droplets, Clock } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { apiRequest } from "@/lib/queryClient";
import communityImg from "@assets/image_1773383986957.png";

const WHATSAPP_LINK = "https://chat.whatsapp.com/PLACEHOLDER";
const CONTACT_EMAIL = "info@bostontigersfc.com";
const CONTACT_PHONE = "(000) 000-0000";

function NavbarSimple() {
  return (
    <nav className="bg-black border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <ChevronLeft className="w-5 h-5 text-white/50 group-hover:text-white transition-colors shrink-0" />
            <img src="/logo.png" alt="Boston Tigers" className="h-14 w-auto" />
            <div className="flex flex-col justify-center">
              <span className="text-white font-black text-sm leading-tight tracking-tight">BOSTON TIGERS</span>
              <span className="text-white/50 font-semibold text-[10px] tracking-widest uppercase leading-tight">Youth Soccer Clinics</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function FreeTrialSuccess({ name, email }: { name: string; email: string }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavbarSimple />

      {/* Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={communityImg}
          alt="Boston Tigers youth soccer"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-5 text-center">
          <div className="w-14 h-14 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-7 h-7 text-green-400" />
          </div>
          <p className="text-green-400 text-xs font-bold tracking-widest uppercase mb-2">Free Trial Confirmed</p>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight" data-testid="text-success-headline">
            Thank You for<br />Joining Us!
          </h1>
          <p className="text-white/60 text-sm sm:text-base mt-3 max-w-sm">
            {name ? <><span className="text-white font-semibold">{name}</span> is registered — </> : ""}
            We're excited to have your family as part of Boston Tigers.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-xl mx-auto px-5 sm:px-8 py-10 space-y-8">

        {/* WhatsApp CTA — primary focus */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-7 sm:p-8" data-testid="card-whatsapp-cta">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center shrink-0">
              <SiWhatsapp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white/50 text-xs font-semibold tracking-widest uppercase">Next Step</p>
              <h2 className="text-white font-black text-lg leading-tight">Join the Parent WhatsApp Group</h2>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            This group is where we share training schedules, field locations, weather updates, and important announcements. Please join as soon as possible so you stay updated.
          </p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" data-testid="button-join-whatsapp">
            <Button
              size="lg"
              className="w-full bg-green-500 hover:bg-green-400 text-black font-black tracking-wide text-base"
            >
              <SiWhatsapp className="mr-2 w-5 h-5" />
              Join the Parent Group
            </Button>
          </a>
        </div>

        {/* What Happens Next */}
        <div className="border-t border-white/10 pt-8">
          <h3 className="text-white font-black text-xl mb-5 tracking-tight">What Happens Next</h3>
          <ul className="space-y-4">
            {[
              { icon: MessageCircle, text: "Training schedule will be shared in the WhatsApp group" },
              { icon: Calendar,      text: "Session details and field information will be posted there" },
              { icon: Clock,         text: "Please have your player bring water, cleats, and arrive on time" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-white/50" />
                </div>
                <p className="text-white/70 text-sm leading-relaxed pt-1">{text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Questions */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-7 sm:p-8">
          <h3 className="text-white font-black text-lg mb-2 tracking-tight">Questions?</h3>
          <p className="text-white/55 text-sm leading-relaxed mb-5">
            If you have any questions or concerns, feel free to reach out.
          </p>
          <div className="space-y-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
              data-testid="link-contact-email"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
              </div>
              <span className="text-sm font-semibold">{CONTACT_EMAIL}</span>
            </a>
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
              data-testid="link-contact-phone"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
              </div>
              <span className="text-sm font-semibold">{CONTACT_PHONE}</span>
            </a>
          </div>
        </div>

        {/* Closing */}
        <p className="text-center text-white/40 text-sm leading-relaxed italic pb-4">
          "We look forward to helping your player grow in skill, confidence, and love for the game."
        </p>

        <div className="flex justify-center pb-6">
          <Link href="/">
            <Button variant="outline" className="font-semibold border-white/20 text-white hover:bg-white/10" data-testid="button-back-home">
              Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function PaidSuccess({ registration }: { registration: any }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavbarSimple />
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={communityImg}
          alt="Boston Tigers youth soccer"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-5 text-center">
          <div className="w-14 h-14 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-7 h-7 text-green-400" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight" data-testid="text-success-headline">
            You're In — Subscription Confirmed
          </h1>
          <p className="text-white/60 text-sm sm:text-base mt-2 max-w-md">
            <span className="text-white font-bold" data-testid="text-child-name">{registration.childName}</span> is officially registered for Boston Tigers Youth Soccer Clinics.
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-5 sm:px-8 py-10 space-y-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-7 sm:p-8" data-testid="card-whatsapp-cta">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center shrink-0">
              <SiWhatsapp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white/50 text-xs font-semibold tracking-widest uppercase">Next Step</p>
              <h2 className="text-white font-black text-lg leading-tight">Join the Parent WhatsApp Group</h2>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            This group is where we share training schedules, field locations, weather updates, and important announcements. Please join as soon as possible so you stay updated.
          </p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full bg-green-500 hover:bg-green-400 text-black font-black tracking-wide text-base">
              <SiWhatsapp className="mr-2 w-5 h-5" />
              Join the Parent Group
            </Button>
          </a>
        </div>

        <div className="border-t border-white/10 pt-8">
          <h3 className="text-white font-black text-xl mb-5 tracking-tight">What Happens Next</h3>
          <ul className="space-y-4">
            {[
              { icon: MessageCircle, text: "Training schedule will be shared in the WhatsApp group" },
              { icon: Calendar,      text: "Session details and field information will be posted there" },
              { icon: Clock,         text: "Please have your player bring water, cleats, and arrive on time" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-white/50" />
                </div>
                <p className="text-white/70 text-sm leading-relaxed pt-1">{text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-7 sm:p-8">
          <h3 className="text-white font-black text-lg mb-2 tracking-tight">Questions?</h3>
          <p className="text-white/55 text-sm leading-relaxed mb-5">
            If you have any questions or concerns, feel free to reach out.
          </p>
          <div className="space-y-3">
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
              </div>
              <span className="text-sm font-semibold">{CONTACT_EMAIL}</span>
            </a>
            <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
              </div>
              <span className="text-sm font-semibold">{CONTACT_PHONE}</span>
            </a>
          </div>
        </div>

        <p className="text-center text-white/40 text-sm leading-relaxed italic pb-4">
          "We look forward to helping your player grow in skill, confidence, and love for the game."
        </p>

        <div className="flex justify-center pb-6">
          <Link href="/">
            <Button variant="outline" className="font-semibold border-white/20 text-white hover:bg-white/10" data-testid="button-back-home">
              Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterSuccess() {
  const sessionId = new URLSearchParams(window.location.search).get("session_id");
  const freePlan  = new URLSearchParams(window.location.search).get("plan") === "free";
  const freeName  = new URLSearchParams(window.location.search).get("name") ?? "";
  const freeEmail = new URLSearchParams(window.location.search).get("email") ?? "";
  const [registration, setRegistration] = useState<any>(null);

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("POST", "/api/confirm-payment", { sessionId: id });
      return res.json();
    },
    onSuccess: (data) => setRegistration(data.registration),
  });

  useEffect(() => {
    if (sessionId && !mutation.isPending && !mutation.isSuccess && !mutation.isError) {
      mutation.mutate(sessionId);
    }
  }, [sessionId]);

  if (freePlan) return <FreeTrialSuccess name={freeName} email={freeEmail} />;

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <NavbarSimple />
        <div className="flex-1 flex items-center justify-center px-5">
          <div className="text-center max-w-sm">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="font-black text-2xl mb-3" data-testid="text-invalid-link">Invalid Link</h2>
            <p className="text-white/50 mb-6">No payment session found. Please try registering again.</p>
            <Link href="/register">
              <Button variant="outline" className="font-semibold border-white/20 text-white">Back to Registration</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (mutation.isPending) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <NavbarSimple />
        <div className="flex-1 flex items-center justify-center px-5" data-testid="card-verifying">
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-white/40 mx-auto mb-4 animate-spin" />
            <h2 className="font-black text-xl mb-2">Confirming your registration…</h2>
            <p className="text-white/50 text-sm">Verifying with Stripe. This only takes a moment.</p>
          </div>
        </div>
      </div>
    );
  }

  if (mutation.isError) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <NavbarSimple />
        <div className="flex-1 flex items-center justify-center px-5">
          <div className="text-center max-w-sm" data-testid="card-error">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="font-black text-2xl mb-3">Something went wrong</h2>
            <p className="text-white/50 mb-6 text-sm">We couldn't confirm your registration. If you were charged, please contact us immediately.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => mutation.mutate(sessionId)} className="font-semibold" data-testid="button-retry">Try Again</Button>
              <Link href="/"><Button variant="outline" className="font-semibold border-white/20 text-white">Back to Homepage</Button></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (registration) return <PaidSuccess registration={registration} />;

  return null;
}
