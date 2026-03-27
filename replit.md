# Boston Tigers Youth Soccer Clinics

A responsive React/TypeScript website for Boston Tigers Youth Soccer Clinics — a sports academy-style landing page with full registration and Stripe payment flow.

## Architecture

- **Frontend**: React + TypeScript + Vite + Wouter routing
- **Styling**: Tailwind CSS + shadcn/ui components + Montserrat font
- **Backend**: Express.js with PostgreSQL (via Drizzle ORM)
- **Payments**: Stripe Checkout (via Replit Stripe connector + @replit/connectors-sdk)
- **Email**: Nodemailer (optional SMTP — configure via env vars)
- **State**: React hook form + Zod validation

## Pages

- `/` — Homepage (scroll-snap sections: Hero, Programs, Why BT, Coaches, Clinic Overview, CTA, Footer)
- `/register` — Two-step registration: form details → Stripe Checkout redirect
- `/register/success` — Post-payment confirmation page (verifies payment, saves registration, sends email)
- `/elite-development` — Standalone Elite Development page
- `/admin` — Admin dashboard (PIN-gated, shows all registrations, export CSV). PIN: `bostontigers2024`

## Registration & Payment Flow

1. User fills out the registration form (parent info, child info, waiver)
2. On "Continue", shown order summary ($89 clinic fee)
3. Clicking "Pay $89 · Secure Checkout" calls `POST /api/checkout`:
   - Saves a **pending** registration to `pending_registrations` table
   - Creates a Stripe Checkout Session (mode: payment, $89 USD)
   - Returns Stripe-hosted checkout URL
4. User completes payment on Stripe's hosted page
5. Stripe redirects to `/register/success?session_id=cs_xxx`
6. Success page calls `POST /api/confirm-payment`:
   - Verifies session with Stripe API (must be `paid`)
   - Moves pending → confirmed `registrations` table (paid=true, stripe_session_id stored)
   - Deletes pending record
   - Sends confirmation email (if SMTP configured)
7. If user cancels on Stripe, redirected to `/register?cancelled=1` — no data saved

## Database Tables

- `registrations` — Confirmed paid registrations (paid=true, stripe_session_id)
- `pending_registrations` — Temporary storage during Stripe checkout flow
- `users` — (unused scaffold)

## Key Files

- `client/src/pages/home.tsx` — Full homepage
- `client/src/pages/register.tsx` — Registration form + Stripe redirect
- `client/src/pages/register-success.tsx` — Post-payment success + confirmation
- `client/src/pages/admin.tsx` — Admin dashboard
- `server/routes.ts` — API routes including /api/checkout and /api/confirm-payment
- `server/stripeClient.ts` — Stripe API proxy via ReplitConnectors
- `server/emailService.ts` — Nodemailer confirmation email
- `shared/schema.ts` — Drizzle schema for registrations and pending_registrations

## Email Configuration (Optional)

Set these environment variables to enable confirmation emails:
- `SMTP_HOST` — e.g. smtp.gmail.com
- `SMTP_PORT` — e.g. 587
- `SMTP_USER` — your email address
- `SMTP_PASS` — app password
- `SMTP_SECURE` — "true" for port 465
- `EMAIL_FROM` — sender address (defaults to SMTP_USER)

Without these, emails are skipped (logged to console).

## Design System

- **Font**: Montserrat (all weights)
- **Dark sections**: Pure black (`bg-black`) with white text
- **Accent**: Foreground-based (black/white adaptive)
- **Animations**: tiger-stripe texture overlays, gradient hero
