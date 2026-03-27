import { useState, useRef, useEffect } from "react";
import techImg from "@assets/image_1773379706302.png";
import mentalImg from "@assets/pexels-140938577-10347804_1773380322392.jpg";
import communityImg from "@assets/image_1773383986957.png";
import safeEnvImg from "@assets/image_1773384447268.png";
import eliteCoachImg from "@assets/image_1773384771398.png";
import playerDevImg from "@assets/image_1773385153904.png";
import strongCharImg from "@assets/image_1773385449227.png";
import mohamedImg from "@assets/image_1773385840365.png";
import majidImg from "@assets/image_1773386866474.png";
import deyaImg from "@assets/image_1773387786670.png";
import { Link } from "wouter";
import { FinalCTA, Footer } from "@/components/shared-sections";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  Menu,
  X,
  Target,
  Heart,
  MapPin,
  Users,
  Calendar,
  Clock,
  Gift,
  ChevronLeft,
  Shield,
  Trophy,
  Zap,
  Copy,
  CheckCircle2,
} from "lucide-react";

const navLinks = [
  { label: "Youth Clinics", href: "#clinic-overview" },
  { label: "About Us", href: "#why-boston-tigers" },
  { label: "Elite Development", href: "/elite-development" },
  { label: "Register", href: "/register" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="relative z-50 bg-black border-b border-white/10"
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20 gap-3">
          <a href="#" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img src="/logo.png" alt="Boston Tigers Football Club" className="h-11 sm:h-20 w-auto" />
            <div className="flex flex-col justify-center">
              <span className="text-white font-black text-sm sm:text-lg leading-tight tracking-tight">
                BOSTON TIGERS
              </span>
              <span className="text-white/50 font-semibold text-[9px] sm:text-xs tracking-widest uppercase leading-tight">
                Youth Soccer Clinics
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/70 text-sm font-semibold tracking-wide hover:text-white transition-colors"
                  data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/70 text-sm font-semibold tracking-wide hover:text-white transition-colors"
                  data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/register">
              <Button
                size="sm"
                className="hidden sm:flex font-bold tracking-wide bg-white text-black"
                data-testid="button-nav-register"
              >
                Register Free Trial
              </Button>
            </Link>
            <button
              className="lg:hidden text-white p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-black/98 backdrop-blur-lg border-t border-white/10">
          <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
            {navLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/70 font-semibold py-3 px-2 rounded-md hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/70 font-semibold py-3 px-2 rounded-md hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              )
            )}
            <div className="pt-2 pb-1">
              <Link href="/register" onClick={() => setMobileOpen(false)}>
                <Button className="w-full font-bold tracking-wide bg-white text-black" data-testid="button-mobile-register">
                  Register Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const tryPlay = () => {
      if (video.paused) video.play().catch(() => {});
    };

    // Attempt immediately
    tryPlay();

    // Retry once video has enough data (key for mobile)
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);

    // Resume after tab switch or phone sleep
    const onVisible = () => { if (!document.hidden) tryPlay(); };
    document.addEventListener("visibilitychange", onVisible);

    // Resume on any user touch (iOS unlock-autoplay)
    const onTouch = () => { tryPlay(); };
    document.addEventListener("touchstart", onTouch, { once: true });

    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
      document.removeEventListener("visibilitychange", onVisible);
      document.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return (
    <section
      className="relative h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-5rem)] flex items-start sm:items-center overflow-hidden"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 bg-black">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          data-testid="video-hero-bg"
          style={{ WebkitMediaControls: "none" } as React.CSSProperties}
        />
        {/* Desktop overlay */}
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        {/* Mobile overlay — darker so text pops */}
        <div className="absolute inset-0 sm:hidden bg-gradient-to-b from-black/55 via-black/40 to-black/75" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Main content — top-aligned on mobile, centered on desktop */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 flex justify-start pt-16 sm:pt-0">
        <div className="w-full max-w-2xl text-left">

          <h1
            className="text-[2rem] leading-[1.08] sm:text-5xl sm:leading-[1.05] lg:text-6xl font-black text-white tracking-tight mb-4 sm:mb-3 animate-fade-in-up text-shadow-hero"
            data-testid="text-hero-headline"
          >
            Boston Tigers<br />
            <span className="text-white/50">Youth Soccer</span><br />
            Clinics
          </h1>

          <p
            className="text-xs sm:text-base text-white/65 mb-5 leading-relaxed animate-fade-in-up delay-200 max-w-[280px] sm:max-w-none"
            data-testid="text-hero-subheadline"
          >
            Elite training, positive coaching, and a love for the beautiful game. Ages 4–12 welcome.
          </p>

          {/* Buttons — desktop only inline; mobile version pinned near bottom */}
          <div className="hidden sm:flex flex-row items-center gap-2 sm:gap-3 animate-fade-in-up delay-300">
            <Link href="/register">
              <Button
                size="sm"
                className="font-bold tracking-wide px-5 sm:px-6 text-sm bg-white text-black"
                data-testid="button-hero-register"
              >
                Register Free Trial
                <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
            <a href="#program-preview">
              <Button
                size="sm"
                variant="outline"
                className="font-bold tracking-wide px-4 sm:px-6 text-sm bg-transparent border-white/30 text-white"
                data-testid="button-hero-learn-more"
              >
                Learn More
              </Button>
            </a>
          </div>

          {/* Info row — desktop only (inline below CTAs) */}
          <div className="hidden sm:flex flex-wrap items-start gap-6 mt-6 animate-fade-in-up delay-400">
            {[
              { icon: Users,    primary: "Ages 5–8 & 9–12",   secondary: null },
              { icon: Calendar, primary: "Every Sunday",       secondary: "10am – 11:30am" },
              { icon: MapPin,   primary: "Revere Team Works",  secondary: null },
            ].map(({ icon: Icon, primary, secondary }) => (
              <div key={primary} className="flex items-start gap-2">
                <Icon className="w-4 h-4 text-white/50 mt-0.5 shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span className="text-white text-sm font-bold">{primary}</span>
                  {secondary && <span className="text-white/55 text-xs font-semibold mt-0.5">{secondary}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons — mobile only, pinned just above icons */}
      <div className="sm:hidden absolute bottom-48 left-0 right-0 z-10 px-5 flex flex-row items-center gap-2 animate-fade-in-up delay-300">
        <Link href="/register">
          <Button
            size="sm"
            className="font-bold tracking-wide px-5 text-sm bg-white text-black"
            data-testid="button-hero-register-mobile"
          >
            Register Free Trial
            <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </Link>
        <a href="#program-preview">
          <Button
            size="sm"
            variant="outline"
            className="font-bold tracking-wide px-4 text-sm bg-transparent border-white/30 text-white"
            data-testid="button-hero-learn-more-mobile"
          >
            Learn More
          </Button>
        </a>
      </div>

      {/* Info row — mobile only, pinned to bottom */}
      <div className="sm:hidden absolute bottom-24 left-0 right-0 z-10 px-5 animate-fade-in-up delay-400">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center text-center gap-1.5">
            <Users className="w-5 h-5 text-white/50" />
            <span className="text-white text-[13px] font-bold leading-tight">Ages 5–8<br />&amp; 9–12</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1.5">
            <Calendar className="w-5 h-5 text-white/50" />
            <span className="text-white text-[13px] font-bold leading-tight">Every Sunday<br /><span className="text-white/55 font-semibold">10am–11:30am</span></span>
          </div>
          <div className="flex flex-col items-center text-center gap-1.5">
            <MapPin className="w-5 h-5 text-white/50" />
            <span className="text-white text-[13px] font-bold leading-tight">Revere<br />Team Works</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden sm:flex">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-pulse-slow" />
        </div>
      </div>
    </section>
  );
}

function ProgramPreview() {
  const technicalSkills = ["Passing", "Shooting", "First touch", "Ball control", "Game play situations", "Dribbling"];
  const mentalSkills = ["Confidence", "Focus and Discipline", "Leadership", "Teamwork", "Resilience", "Learning from Mistakes", "Communication on the Field"];

  return (
    <section id="program-preview" className="snap-start h-dvh flex flex-col" data-testid="section-programs">

      <div className="relative z-10 px-5 sm:px-8 py-5 bg-black border-t border-white/15 flex items-center gap-6">
        <a href="#" className="flex items-center gap-3 shrink-0">
          <img src="/logo.png" alt="Boston Tigers" className="h-12 sm:h-14 w-auto" />
        </a>

        <Link href="/register" data-testid="link-register-trial">
          <Button size="sm" className="hidden sm:flex font-bold tracking-wide bg-white text-black hover:bg-white/90">
            Register Free Trial
          </Button>
        </Link>

        <div className="text-center flex-1">
          <p className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-1">Inside Our Weekly Training Sessions</p>
          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            Project Mbappe
          </h2>
        </div>

        <a
          href="#program-preview"
          className="hidden sm:flex items-center gap-2 text-white/70 text-sm font-semibold tracking-wide hover:text-white transition-colors shrink-0"
          data-testid="link-curriculum"
        >
          View Training Curriculum
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      <div className="flex-1 px-3 sm:px-10 py-3 sm:py-8 flex items-stretch min-h-0">
        <div className="max-w-[1280px] mx-auto w-full flex flex-col sm:flex-row gap-3 sm:gap-10">

          {/* Card 1 — Technical */}
          <div className="relative flex-1 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl min-h-[220px] sm:min-h-[300px]" data-testid="card-program-0">
            <img
              src={techImg}
              alt="Technical Development"
              className="absolute inset-0 w-full h-full object-cover object-[center_30%] scale-105"
            />
            {/* Mobile: narrow top gradient so image shows beneath */}
            <div className="absolute top-0 left-0 right-0 h-[42%] sm:h-1/2 bg-gradient-to-b from-black/85 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-start p-4 sm:p-12">
              <p className="text-white text-[10px] sm:text-sm font-bold tracking-widest uppercase mb-1.5 sm:mb-3 border-b border-white/20 pb-1.5 sm:pb-2 w-fit">Technical Development</p>
              <h3 className="text-lg sm:text-4xl font-black text-white tracking-tight leading-tight mb-2 sm:mb-4">
                Train Like<br />a Pro
              </h3>
              <p className="hidden sm:block text-white/70 text-sm leading-relaxed mb-5 max-w-xs">
                Players develop the core technical skills that every great player relies on.
              </p>
              <ul className="space-y-0.5 sm:space-y-2">
                {technicalSkills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/80">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/50 shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2 — Mental */}
          <div className="relative flex-1 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl min-h-[220px] sm:min-h-[300px]" data-testid="card-program-1">
            <img
              src={mentalImg}
              alt="Mental Development"
              className="absolute inset-0 w-full h-full object-cover object-[center_30%] scale-105"
            />
            {/* Gradients: top for label, bottom for text */}
            <div className="absolute top-0 left-0 right-0 h-[28%] bg-gradient-to-b from-black/75 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[48%] sm:h-1/2 bg-gradient-to-t from-black/85 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-12">
              {/* Label pinned to top-left */}
              <p className="text-white text-[10px] sm:text-sm font-bold tracking-widest uppercase border-b border-white/20 pb-1.5 sm:pb-2 w-fit">Mental Development</p>
              {/* Heading + bullets stay at the bottom */}
              <div>
                <h3 className="text-lg sm:text-4xl font-black text-white tracking-tight leading-tight mb-2 sm:mb-4">
                  Develop the<br />Mind of an Athlete
                </h3>
                <p className="hidden sm:block text-white/70 text-sm leading-relaxed mb-5 max-w-xs">
                  Great players develop confidence, resilience, and leadership — on and off the field.
                </p>
                <ul className="space-y-0.5 sm:space-y-2 mb-2 sm:mb-4">
                  {mentalSkills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/80">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/50 shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function WhyBostonTigers() {
  const pillars = [
    { icon: Shield, label: "Safe Environment", image: safeEnvImg },
    { icon: Trophy, label: "Elite Coaching", image: eliteCoachImg },
    { icon: Zap, label: "Player Development", image: playerDevImg },
    { icon: Heart, label: "Strong Character", image: strongCharImg },
  ];

  const pillarsGrid = (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 w-full">
      {pillars.map((pillar) => (
        <div
          key={pillar.label}
          className="group relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default min-h-[160px] sm:min-h-[300px]"
          data-testid={`card-pillar-${pillar.label.toLowerCase().replace(/\s/g, "-")}`}
        >
          {pillar.image && (
            <>
              <img
                src={pillar.image}
                alt={pillar.label}
                className="absolute inset-0 w-full h-full object-cover object-[center_40%] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 transition-colors duration-300" />
            </>
          )}
          <div className={`relative z-10 p-4 sm:p-7 flex flex-col items-center justify-center text-center gap-2 sm:gap-3 border rounded-xl h-full min-h-[160px] sm:min-h-[300px] transition-all duration-300 ${pillar.image ? "border-white/20 group-hover:border-white/35 bg-transparent" : "bg-white/5 border-white/10 group-hover:bg-white/10 group-hover:border-white/25"}`}>
            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white/15 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
              <pillar.icon className="w-5 h-5 sm:w-9 sm:h-9 text-white" />
            </div>
            <span className="text-white font-extrabold text-xs sm:text-sm tracking-wide">
              {pillar.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* ── Mobile slide 1: Our Mission text ── */}
      <section
        id="why-boston-tigers"
        className="snap-start h-dvh bg-black relative overflow-hidden flex items-center lg:hidden"
        data-testid="section-why"
      >
        <div className="absolute inset-0 tiger-stripe opacity-60" />
        <div className="relative z-10 px-6 py-12">
          <Badge className="mb-5 w-fit bg-white/10 text-white border-white/20 font-semibold tracking-widest text-xs uppercase">
            Our Mission
          </Badge>
          <h2 className="text-3xl font-black text-white tracking-tight leading-[1.1] mb-6">
            More Than Soccer.<br />
            <span className="text-white/50">A Community.</span>
          </h2>
          <div className="space-y-4 text-white/60 leading-[1.8] text-sm">
            <p>At Boston Tigers, youth soccer is more than a sport — it's a foundation for building confident, resilient young people.</p>
            <p>Our clinics combine structured technical training with a positive environment where players feel safe to learn, compete, and grow. Every player matters — from beginners discovering the game to athletes preparing for higher levels.</p>
            <p>Our coaches focus not only on developing great players, but great people.</p>
            <p>Through discipline, teamwork, and belief in themselves, players leave every session stronger — on and off the field.</p>
          </div>
        </div>
      </section>

      {/* ── Mobile slide 2: Pillar cards ── */}
      <section
        className="snap-start h-dvh bg-black relative overflow-hidden flex flex-col lg:hidden"
        data-testid="section-why-pillars"
      >
        <div className="absolute inset-0 tiger-stripe opacity-60" />
        <div className="relative z-10 flex-1 p-6 min-h-0">
          <div className="grid grid-cols-2 gap-3 h-full" style={{ gridTemplateRows: "1fr 1fr" }}>
            {pillars.map((pillar) => (
              <div
                key={pillar.label}
                className="group relative rounded-xl overflow-hidden shadow-lg"
                data-testid={`card-pillar-${pillar.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {pillar.image && (
                  <>
                    <img
                      src={pillar.image}
                      alt={pillar.label}
                      className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                  </>
                )}
                <div className={`relative z-10 h-full flex flex-col items-center justify-center text-center gap-2 border rounded-xl transition-all duration-300 ${pillar.image ? "border-white/20 bg-transparent" : "bg-white/5 border-white/10"}`}>
                  <div className="w-12 h-12 bg-white/15 rounded-lg flex items-center justify-center">
                    <pillar.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-extrabold text-xs tracking-wide px-2">
                    {pillar.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Desktop: one section, side-by-side ── */}
      <section
        id="why-boston-tigers-desktop"
        className="snap-start min-h-dvh py-20 bg-black relative overflow-hidden hidden lg:block"
        data-testid="section-why-desktop"
      >
        <div className="absolute inset-0 tiger-stripe opacity-60" />
        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-2 gap-14 items-start">
            <div className="max-w-[580px]">
              <Badge className="mb-6 bg-white/10 text-white border-white/20 font-semibold tracking-widest text-xs uppercase">
                Our Mission
              </Badge>
              <h2 className="text-5xl font-black text-white tracking-tight leading-[1.1] mb-8">
                More Than Soccer.<br />
                <span className="text-white/50">A Community.</span>
              </h2>
              <div className="space-y-5 text-white/60 leading-[1.8] text-base">
                <p>At Boston Tigers, youth soccer is more than a sport — it's a foundation for building confident, resilient young people.</p>
                <p>Our clinics combine structured technical training with a positive environment where players feel safe to learn, compete, and grow. Every player matters — from beginners discovering the game to athletes preparing for higher levels.</p>
                <p>Our coaches focus not only on developing great players, but great people.</p>
                <p>Through discipline, teamwork, and belief in themselves, players leave every session stronger — on and off the field.</p>
              </div>
            </div>
            {pillarsGrid}
          </div>
        </div>
      </section>
    </>
  );
}

function CoachingPreview() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const coaches = [
    {
      name: "Mohamed",
      role: "Head Coach",
      initials: "M",
      image: mohamedImg,
      color: "bg-foreground dark:bg-white",
      textColor: "text-background dark:text-black",
      bio: "A seasoned coach with over 12 years of youth development experience, Mohamed brings elite-level insight and an infectious energy that motivates players of all ages. His philosophy centers on building confidence first. Born and raised with a deep love for the beautiful game, he has trained players across all skill levels — from complete beginners taking their first touches to competitive athletes pushing for the next level. Mohamed believes that great coaching is about more than tactics; it's about shaping character, instilling discipline, and making every player feel seen and valued on and off the field.",
    },
    {
      name: "Deya",
      role: "Coach",
      initials: "D",
      image: deyaImg,
      imagePosition: "object-cover object-[center_25%]",
      color: "bg-foreground/80 dark:bg-white/80",
      textColor: "text-background dark:text-black",
      bio: "A seasoned coach with over 12 years of youth development experience, Deya brings elite-level insight and an infectious energy that motivates players of all ages. His philosophy centers on building confidence first. Born and raised with a deep love for the beautiful game, he has trained players across all skill levels — from complete beginners taking their first touches to competitive athletes pushing for the next level. Deya believes that great coaching is about more than tactics; it's about shaping character, instilling discipline, and making every player feel seen and valued on and off the field.",
    },
    {
      name: "Majid",
      role: "Coach",
      initials: "M",
      image: majidImg,
      color: "bg-foreground/60 dark:bg-white/60",
      textColor: "text-background dark:text-black",
      bio: "A seasoned coach with over 12 years of youth development experience, Majid brings elite-level insight and an infectious energy that motivates players of all ages. His philosophy centers on building confidence first. Born and raised with a deep love for the beautiful game, he has trained players across all skill levels — from complete beginners taking their first touches to competitive athletes pushing for the next level. Majid believes that great coaching is about more than tactics; it's about shaping character, instilling discipline, and making every player feel seen and valued on and off the field.",
    },
  ];

  const [active, setActive] = useState(0);
  const [bioExpanded, setBioExpanded] = useState(false);
  useEffect(() => { setBioExpanded(false); }, [active]);

  const prev = () => setActive((i) => (i - 1 + coaches.length) % coaches.length);
  const next = () => setActive((i) => (i + 1) % coaches.length);

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 45) {
      deltaX < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  const coach = coaches[active];

  return (
    <section id="coaching-preview" className="snap-start h-dvh flex flex-col overflow-hidden" data-testid="section-coaches">

      {/* Full navbar — same as homepage */}
      <nav className="relative z-50 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            <a href="#" className="flex items-center gap-3 shrink-0">
              <img src="/logo.png" alt="Boston Tigers Football Club" className="h-16 sm:h-20 w-auto" />
              <div className="flex flex-col justify-center">
                <span className="text-white font-black text-base sm:text-lg leading-tight tracking-tight">BOSTON TIGERS</span>
                <span className="text-white/50 font-semibold text-[10px] sm:text-xs tracking-widest uppercase leading-tight">Youth Soccer Clinics</span>
              </div>
            </a>
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link key={link.label} href={link.href} className="text-white/70 text-sm font-semibold tracking-wide hover:text-white transition-colors">
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.label} href={link.href} className="text-white/70 text-sm font-semibold tracking-wide hover:text-white transition-colors">
                    {link.label}
                  </a>
                )
              )}
            </div>
            <div className="flex items-center gap-3">
              <Link href="/register">
                <Button size="sm" className="hidden sm:flex font-bold tracking-wide bg-white text-black" data-testid="button-coaches-nav-register">
                  Register Free Trial
                </Button>
              </Link>
              <button className="lg:hidden text-white p-1" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {mobileOpen && (
          <div className="lg:hidden bg-black/98 backdrop-blur-lg border-t border-white/10">
            <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link key={link.label} href={link.href} className="text-white/70 font-semibold py-3 px-2 rounded-md hover:text-white hover:bg-white/5 transition-colors" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.label} href={link.href} className="text-white/70 font-semibold py-3 px-2 rounded-md hover:text-white hover:bg-white/5 transition-colors" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </a>
                )
              )}
              <div className="pt-2 pb-1">
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full font-bold tracking-wide bg-white text-black">Register Free Trial</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Section header */}
      <div className="shrink-0 flex justify-center px-5 pt-2 sm:pt-3 short:pt-1 pb-2 sm:pb-[18px] short:pb-1">
        <div className="w-full max-w-[900px] flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-[52px] sm:leading-[56px] short:text-xl font-black text-foreground tracking-tight mb-3 sm:mb-[14px] short:mb-1">
            Meet the <span className="text-foreground/40">Coaches</span>
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="h-px w-16 sm:w-[120px] bg-foreground/20" />
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
              <div className="h-2 w-2 sm:h-[8px] sm:w-[8px] rounded-full bg-foreground/60" />
              <div className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
            </div>
            <div className="h-px w-16 sm:w-[120px] bg-foreground/20" />
          </div>
        </div>
      </div>

      {/* Coach card area */}
      <div className="flex-1 flex items-start justify-center px-0 sm:px-4 pt-4 sm:pt-[26px] short:pt-2 min-h-0 overflow-hidden bg-background">
        <div className="flex items-start justify-center gap-4 sm:gap-8 w-full max-w-[900px] h-full">

          <button
            onClick={prev}
            className="hidden sm:flex w-14 h-14 short:w-9 short:h-9 rounded-full border border-border bg-card items-center justify-center hover:bg-muted transition-colors shrink-0 self-start mt-10 sm:mt-[159px] short:mt-6"
            data-testid="button-coaches-prev"
            aria-label="Previous coach"
          >
            <ChevronLeft className="w-5 h-5 short:w-4 short:h-4" />
          </button>

          <Card
            className="w-full sm:w-[680px] mx-4 sm:mx-0 h-[calc(100%+3rem)] short:h-[calc(100%+2rem)] sm:h-auto sm:min-h-[540px] border border-border/60 bg-card shadow-md touch-pan-y rounded-t-2xl rounded-b-none sm:rounded-3xl"
            data-testid={`card-coach-${active}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <CardContent className="p-5 sm:pt-6 sm:px-12 sm:pb-6 short:p-4 flex flex-col items-center h-full min-h-0">
              <div className="w-24 h-24 sm:w-[120px] sm:h-[120px] short:w-16 short:h-16 rounded-full overflow-hidden mb-4 sm:mb-3 short:mb-2 shadow-lg shrink-0">
                {coach.image ? (
                  <img src={coach.image} alt={coach.name} className={`w-full h-full ${coach.imagePosition ?? "object-cover object-[center_22%]"}`} />
                ) : (
                  <div className={`w-full h-full ${coach.color} flex items-center justify-center ${coach.textColor} text-4xl font-black`}>
                    {coach.initials}
                  </div>
                )}
              </div>
              <h3 className="font-black text-foreground text-xl sm:text-[22px] sm:leading-7 short:text-base tracking-tight mb-2 sm:mb-1.5 short:mb-0.5 shrink-0 text-center">
                {coach.name}
              </h3>
              <span className="text-muted-foreground text-xs sm:text-[15px] font-bold tracking-widest sm:tracking-[2px] uppercase mb-4 sm:mb-5 short:mb-1.5 shrink-0 block text-center">
                {coach.role}
              </span>
              <p className="text-muted-foreground text-sm sm:text-[17px] sm:leading-[29px] short:text-xs leading-relaxed text-center sm:text-left w-full sm:max-w-[500px] short:line-clamp-4">
                {coach.bio}
              </p>
              <div className="flex items-center gap-4 mt-3 sm:mt-5 short:mt-2 shrink-0">
                <button
                  onClick={prev}
                  className="sm:hidden w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center hover:bg-muted transition-colors"
                  data-testid="button-coaches-prev-mobile"
                  aria-label="Previous coach"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                  {coaches.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-foreground" : "w-2 bg-foreground/20"}`}
                      aria-label={`Go to coach ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="sm:hidden w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center hover:bg-muted transition-colors"
                  data-testid="button-coaches-next-mobile"
                  aria-label="Next coach"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>

          <button
            onClick={next}
            className="hidden sm:flex w-14 h-14 short:w-9 short:h-9 rounded-full border border-border bg-card items-center justify-center hover:bg-muted transition-colors shrink-0 self-start mt-10 sm:mt-[159px] short:mt-6"
            data-testid="button-coaches-next"
            aria-label="Next coach"
          >
            <ChevronRight className="w-5 h-5 short:w-4 short:h-4" />
          </button>

        </div>
      </div>
    </section>
  );
}

const ADDRESS = "321 Charger St, Revere MA 02151";

function ClinicOverview() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const details = [
    {
      icon: Users,
      label: "Age Group",
      value: "Ages 5–8 & 9–12",
      desc: "Grouped by age and skill level for optimal learning.",
    },
    {
      icon: Calendar,
      label: "Location & Time",
      value: "Sundays",
      desc: "April 5th – June 14th · 10am – 11:30am at Revere Team Works.",
    },
    {
      icon: Target,
      label: "Training Format",
      value: "Small Groups",
      desc: "Max 12 players per group for personalized attention.",
    },
    {
      icon: Clock,
      label: "Session Length",
      value: "90 Minutes",
      desc: "Structured warm-up, skill work, and game application.",
    },
    {
      icon: Gift,
      label: "Free Trial",
      value: "First Session Free",
      desc: "No commitment. Experience a full clinic session at no cost.",
    },
  ];

  return (
    <section id="clinic-overview" className="snap-start h-dvh py-4 sm:py-16 bg-muted/30 flex flex-col overflow-hidden" data-testid="section-clinic">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full flex flex-col flex-1 min-h-0">

        <div className="text-center mb-3 sm:mb-10 shrink-0">
          <Badge className="mb-1.5 sm:mb-4 font-semibold tracking-widest text-xs uppercase" variant="secondary">
            Clinic Details
          </Badge>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight mb-1 sm:mb-4">
            Everything You <span className="text-foreground/40">Need to Know</span>
          </h2>
          <p className="hidden sm:block text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Structured, focused, and fun — here's what a Boston Tigers clinic looks like.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-5 flex-1 min-h-0 mb-3 sm:mb-10" style={{ gridAutoRows: "1fr" }}>
          {/* Age Group & Training Format first */}
          {details.slice(0, 2).map((item, i) => (
            <Card key={i} className="card-sport border border-card-border bg-card" data-testid={`card-clinic-${i}`}>
              <CardContent className="p-4 sm:p-7 flex flex-col sm:flex-row gap-2.5 sm:gap-5 items-start h-full">
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-foreground/8 dark:bg-white/8 rounded-md flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground dark:text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{item.label}</div>
                  <div className="font-extrabold text-foreground text-sm sm:text-base mb-1 leading-tight">{item.value}</div>
                  <div className="hidden sm:block text-muted-foreground text-sm leading-relaxed">{item.desc}</div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Location card with copy-to-clipboard */}
          <Card className="card-sport border border-card-border bg-card" data-testid="card-clinic-location">
            <CardContent className="p-4 sm:p-7 flex flex-col sm:flex-row gap-2.5 sm:gap-5 items-start h-full">
              <div className="w-9 h-9 sm:w-12 sm:h-12 bg-foreground/8 dark:bg-white/8 rounded-md flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-foreground dark:text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Location</div>
                <div className="font-extrabold text-foreground text-sm sm:text-base mb-1 leading-tight">Revere Team Works</div>
                <div className="hidden sm:block text-muted-foreground text-sm leading-relaxed mb-3">{ADDRESS}</div>
                <button
                  onClick={copyAddress}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-foreground border border-border rounded-md px-3 py-1.5 hover:bg-muted transition-colors"
                  data-testid="button-copy-address"
                >
                  {copied ? (
                    <><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Copied!</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> Copy Address</>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Remaining cards */}
          {details.slice(2).map((item, i) => (
            <Card key={i + 3} className="card-sport border border-card-border bg-card" data-testid={`card-clinic-${i + 3}`}>
              <CardContent className="p-4 sm:p-7 flex flex-col sm:flex-row gap-2.5 sm:gap-5 items-start h-full">
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-foreground/8 dark:bg-white/8 rounded-md flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground dark:text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{item.label}</div>
                  <div className="font-extrabold text-foreground text-sm sm:text-base mb-1 leading-tight">{item.value}</div>
                  <div className="hidden sm:block text-muted-foreground text-sm leading-relaxed">{item.desc}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center shrink-0">
          <Link href="/register">
            <Button size="lg" className="font-bold tracking-wide px-6 sm:px-10 text-sm sm:text-base" data-testid="button-clinic-cta">
              Register / View Payment Options
              <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = { htmlOverflow: html.style.overflow, bodyOverflow: body.style.overflow };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
    };
  }, []);

  return (
    <div className="h-dvh overflow-y-scroll overflow-x-hidden snap-y snap-mandatory w-full">
      <div className="snap-start h-dvh flex flex-col w-full overflow-x-hidden">
        <Navbar />
        <HeroSection />
      </div>
      <ProgramPreview />
      <WhyBostonTigers />
      <CoachingPreview />
      <ClinicOverview />
      <div className="snap-start">
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
