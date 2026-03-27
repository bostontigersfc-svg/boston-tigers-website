import nodemailer from "nodemailer";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
}

export async function sendConfirmationEmail(data: {
  email: string;
  parentName: string;
  childName: string;
  childAge: string;
  soccerExperience: string;
  emergencyContact: string;
}) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log(`[Email] SMTP not configured — skipping email to ${data.email}`);
    console.log(`[Email] Would have sent to: ${data.email}, child: ${data.childName}`);
    return;
  }

  const from = process.env.EMAIL_FROM ?? process.env.SMTP_USER;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #000; padding: 24px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: -0.5px;">
          BOSTON TIGERS
        </h1>
        <p style="color: rgba(255,255,255,0.5); margin: 4px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">
          Youth Soccer Clinics
        </p>
      </div>

      <div style="padding: 32px 24px; background: #f9f9f9;">
        <h2 style="margin: 0 0 8px; font-size: 22px; color: #111;">
          You're officially registered! 🎉
        </h2>
        <p style="color: #555; margin: 0 0 24px;">
          Hi ${data.parentName}, your payment was successful. Here's a summary of your registration:
        </p>

        <div style="background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px; width: 140px;">Player</td>
              <td style="padding: 8px 0; font-weight: 700; color: #111;">${data.childName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px;">Age</td>
              <td style="padding: 8px 0; font-weight: 700; color: #111;">${data.childAge} years old</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px;">Experience</td>
              <td style="padding: 8px 0; font-weight: 700; color: #111; text-transform: capitalize;">${data.soccerExperience}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px;">Emergency Contact</td>
              <td style="padding: 8px 0; font-weight: 700; color: #111;">${data.emergencyContact}</td>
            </tr>
          </table>
        </div>

        <p style="color: #555; margin: 0 0 16px;">
          Our coaching staff will reach out within 24 hours with session details — date, time, and location.
        </p>
        <p style="color: #555; margin: 0;">
          Questions? Reply to this email or reach us on WhatsApp.
        </p>
      </div>

      <div style="background: #000; padding: 16px 24px; text-align: center;">
        <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} Boston Tigers Youth Soccer Clinics
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from,
    to: data.email,
    subject: `Registration Confirmed — ${data.childName} | Boston Tigers`,
    html,
  });

  console.log(`[Email] Confirmation sent to ${data.email}`);
}
