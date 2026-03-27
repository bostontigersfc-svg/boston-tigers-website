import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight, Instagram, MessageCircle, Mail } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 flex items-center bg-foreground dark:bg-white relative overflow-hidden" data-testid="section-final-cta">
      <div className="absolute inset-0 tiger-stripe opacity-20" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)" }}
      />
      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <h2 className="text-3xl sm:text-5xl font-black text-background dark:text-foreground tracking-tight leading-[1.1] mb-5">
          Reserve Your<br />Free Trial
        </h2>
        <p className="text-background/70 dark:text-foreground/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          No commitment. No pressure.<br />Come experience a training session and see how we help young players build confidence, skill, and love for the game.
        </p>
        <Link href="/register">
          <Button
            size="lg"
            className="font-black tracking-wide px-12 text-base bg-background text-foreground dark:bg-foreground dark:text-background"
            data-testid="button-final-cta"
          >
            Register Now
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

export function Footer() {
  const quickLinks = [
    { label: "Youth Clinics", href: "/#clinic-overview" },
    { label: "About Us", href: "/#why-boston-tigers" },
    { label: "Coaching Staff", href: "/#coaching-preview" },
    { label: "Elite Development", href: "/elite-development" },
    { label: "Register", href: "/register" },
  ];

  return (
    <footer className="bg-black border-t border-white/10 py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-5">
              <img src="/logo.png" alt="Boston Tigers Football Club" className="h-24 w-auto" />
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Elite youth soccer development in Boston, Massachusetts. Building confident athletes and character from the ground up.
            </p>
            <div className="flex gap-4 mt-7">
              <a
                href="#"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-md flex items-center justify-center hover-elevate"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <Instagram className="w-5 h-5 text-white/50" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-md flex items-center justify-center hover-elevate"
                aria-label="WhatsApp"
                data-testid="link-whatsapp"
              >
                <MessageCircle className="w-5 h-5 text-white/50" />
              </a>
              <a
                href="mailto:info@bostontigers.com"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-md flex items-center justify-center hover-elevate"
                aria-label="Email"
                data-testid="link-email"
              >
                <Mail className="w-5 h-5 text-white/50" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/40 text-sm hover:text-white transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Instagram className="w-4 h-4 text-white/50 mt-0.5 shrink-0" />
                <div>
                  <div className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-0.5">Instagram</div>
                  <span className="text-white/50 text-sm">@BostonTigersSoccer</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-white/50 mt-0.5 shrink-0" />
                <div>
                  <div className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-0.5">WhatsApp</div>
                  <span className="text-white/50 text-sm">+1 (617) 000-0000</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-white/50 mt-0.5 shrink-0" />
                <div>
                  <div className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-0.5">Email</div>
                  <span className="text-white/50 text-sm">info@bostontigers.com</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Boston Tigers Youth Soccer Clinics. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <p className="text-white/30 text-xs">Boston, Massachusetts</p>
            <a
              href="/admin"
              className="text-white/20 hover:text-white/50 text-xs transition-colors"
              data-testid="link-admin"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
