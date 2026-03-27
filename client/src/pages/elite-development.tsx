import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Trophy, Brain, Clapperboard, Dumbbell, ShieldCheck, Flame, CheckCircle2, ChevronLeft, ChevronRight, X, Menu, User, ExternalLink, Quote } from "lucide-react";
import { Footer } from "@/components/shared-sections";
import mohamedImg from "@assets/image_1773385840365.png";
import majidImg from "@assets/image_1773386866474.png";
import deyaImg from "@assets/image_1773387786670.png";
import techImg from "@assets/image_1774224999196.png";
import mentalImg from "@assets/image_1774229653996.png";
import safeEnvImg from "@assets/image_1774228704453.png";
import eliteCoachImg from "@assets/image_1773384771398.png";
import tacticalImg from "@assets/image_1774224733902.png";
import playerDevImg from "@assets/image_1774228173832.png";
import strengthImg from "@assets/image_1774202822512.png";

export default function EliteDevelopment() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const refs = [videoRef, mobileVideoRef];
    const cleanups: (() => void)[] = [];
    refs.forEach((ref) => {
      const v = ref.current;
      if (!v) return;
      v.defaultMuted = true;
      v.muted = true;
      const tryPlay = () => v.play().catch(() => {});
      v.addEventListener("canplay", tryPlay, { once: true });
      v.addEventListener("loadeddata", tryPlay, { once: true });
      tryPlay();
      const onVisible = () => { if (!document.hidden) tryPlay(); };
      document.addEventListener("visibilitychange", onVisible);
      const onTouch = () => tryPlay();
      document.addEventListener("touchstart", onTouch, { once: true });
      cleanups.push(() => {
        document.removeEventListener("visibilitychange", onVisible);
        document.removeEventListener("touchstart", onTouch);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

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

  const pillars = [
    { icon: Users,        label: "Ages 12–18",   sub: null },
    { icon: Trophy,       label: "High Level",   sub: "Training" },
    { icon: Brain,        label: "Tactical",     sub: "Intelligence" },
    { icon: Clapperboard, label: "Film",         sub: "Analysis" },
    { icon: Dumbbell,     label: "Strength &",   sub: "Conditioning" },
    { icon: ShieldCheck,  label: "Injury",       sub: "Prevention" },
    { icon: Flame,        label: "Mindset &",    sub: "Confidence" },
  ];

  return (
    <div
      data-testid="page-elite"
      className="h-dvh overflow-y-scroll overflow-x-hidden snap-y snap-mandatory w-full"
    >

      {/* ══════════════════════════════════
          SECTION 1 — Hero (full screen)
      ══════════════════════════════════ */}
      <section
        className="snap-start relative w-full h-dvh overflow-hidden flex flex-col"
        data-testid="section-elite-hero"
      >
        {/* Video background */}
        <div className="absolute inset-0">
          {/* Mobile video */}
          <video
            ref={mobileVideoRef}
            autoPlay muted loop playsInline
            preload="auto"
            poster="/elite-bg-mobile-poster.jpg"
            className="sm:hidden w-full h-full object-cover object-center"
            data-testid="video-elite-bg-mobile"
          >
            <source src="/elite-bg-mobile.mp4" type="video/mp4" />
          </video>
          {/* Desktop video */}
          <video
            ref={videoRef}
            autoPlay muted loop playsInline
            className="hidden sm:block w-full h-full object-cover object-center"
            data-testid="video-elite-bg"
          >
            <source src="/elite-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        {/* Top bar */}
        <div className="relative z-10 w-full flex items-center justify-between px-5 sm:px-8 pt-6 shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/">
              <img src="/logo.png" alt="Boston Tigers" className="h-10 sm:h-12 w-auto cursor-pointer" data-testid="img-elite-logo" />
            </Link>
            <div className="h-6 w-px bg-white/20 hidden sm:block" />
            <span className="hidden sm:block text-xs font-bold tracking-[0.18em] uppercase text-white/60" data-testid="text-elite-label">
              Elite Development Program
            </span>
          </div>
          <Link href="/apply">
            <Button size="sm" className="font-bold tracking-wide px-5 text-sm bg-white text-black hover:bg-white/90" data-testid="button-elite-apply-top">
              Apply for Evaluation
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center pb-20 sm:pb-0 px-5 sm:px-8 max-w-7xl mx-auto w-full animate-fade-in-up">
          <p className="sm:hidden text-xs font-bold tracking-[0.18em] uppercase text-white/50 mb-4">
            Elite Development Program
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6 max-w-2xl"
            data-testid="text-elite-headline"
          >
            Elevate<br className="sm:hidden" /> Your Game
          </h1>
          <p
            className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl mb-8"
            data-testid="text-elite-sub"
          >
            A high-performance training environment for committed players, focused on developing technical ability, deeper understanding of the game, and the habits and mindset needed to reach the next level.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <Link href="/apply">
              <Button size="lg" variant="outline" className="w-full sm:w-auto font-bold tracking-wide px-8 text-base bg-transparent border-2 border-white text-white hover:bg-white/10" data-testid="button-elite-apply">
                Apply for Evaluation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Icon strip */}
        <div className="relative z-10 shrink-0 px-5 sm:px-8 pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between gap-3 sm:gap-6 overflow-x-auto scrollbar-hide">
              {pillars.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-2 shrink-0 min-w-[60px] sm:min-w-0 sm:flex-1">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white/50" />
                  <span className="text-white text-[11px] sm:text-sm font-bold leading-tight">
                    {label}{sub && <><br /><span className="text-white/60 font-semibold">{sub}</span></>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SECTION 2 — Philosophy (full screen, dark bg)
      ══════════════════════════════════ */}
      <section
        className="snap-start relative w-full h-dvh bg-black overflow-hidden flex flex-col"
        data-testid="section-elite-philosophy"
      >
        <div className="absolute inset-0 tiger-stripe opacity-30" />

        {/* Content */}
        <div className="relative z-10 flex-1 flex items-center px-5 sm:px-8 py-10 min-h-0">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center h-full">

            {/* Left: text */}
            <div className="flex flex-col justify-center">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-4">
                Our Philosophy
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-[1.1] mb-5">
                More Than a Team.<br />
                <span className="text-white/40">A Development Environment.</span>
              </h2>
              <div className="space-y-3 text-white/60 text-sm sm:text-base leading-relaxed mb-6">
                <p>Many teams focus on games, results, and weekend competition. <span className="text-white/90 font-semibold">Our focus is different — we focus on player development.</span></p>
                <p>Players train with purpose, receive consistent feedback, and learn to think about the game more intelligently. The goal is to train better and grow faster.</p>
                <p>This program complements a player's club team by providing the structure and development-focused environment needed to reach the next stage.</p>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-7">
                {["Technical Refinement", "Game Intelligence", "Consistent Feedback", "Long-term Growth"].map(pt => (
                  <div key={pt} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-white/40 shrink-0" />
                    <span className="text-white/75 text-sm font-semibold">{pt}</span>
                  </div>
                ))}
              </div>
              <Link href="/apply">
                <Button size="lg" className="w-fit font-bold tracking-wide px-8 text-base bg-white text-black hover:bg-white/90" data-testid="button-elite-philosophy-cta">
                  Apply for Evaluation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Right: image card */}
            <div className="hidden lg:flex items-center justify-center h-full py-6">
              <div className="w-full max-w-md overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10" style={{ maxHeight: "calc(100dvh - 8rem)" }}>
                <img
                  src="/elite-philosophy.jpg"
                  alt="Elite player development training"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: back link */}
        <div className="relative z-10 shrink-0 px-5 sm:px-8 pb-6">
          <Link href="/">
            <span className="text-white/30 hover:text-white text-sm font-semibold transition-colors cursor-pointer">
              ← Back to Home
            </span>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════
          SECTION 3 — How We Develop Players
      ══════════════════════════════════ */}
      <DevelopmentSection />

      {/* ══════════════════════════════════
          SECTION 4 — Player Stories
      ══════════════════════════════════ */}
      <EliteTestimonialsSection />

      {/* ══════════════════════════════════
          SECTION 5 — Meet the Coaches
      ══════════════════════════════════ */}
      <EliteCoachSection />

      <div className="snap-start">
        <Footer />
      </div>
    </div>
  );
}

const developmentPillars = [
  {
    icon: Trophy,
    title: "High-Level Training",
    teaser: "2 sessions per week",
    image: techImg,
    description: "Structured field sessions focused on technical development, speed of play, decision making, and competitive game scenarios.",
    includes: ["Technical work", "Position-based coaching", "Open play and game scenarios"],
    frequency: "2 sessions per week",
  },
  {
    icon: Brain,
    title: "Tactical Intelligence",
    teaser: "Integrated into every training session",
    image: tacticalImg,
    description: "Players develop a stronger understanding of positioning, movement, spacing, and decision making so they can read the game more effectively.",
    includes: ["Game understanding", "Positional awareness", "Tactical decision making"],
    frequency: "Integrated into weekly training & film study",
  },
  {
    icon: Clapperboard,
    title: "Film Study",
    teaser: "1 film session per week",
    image: playerDevImg,
    description: "Remote sessions analyzing real game situations, positional habits, and tactical patterns to help players understand the game at a deeper level.",
    includes: ["Positional analysis", "Game clips", "Tactical learning"],
    frequency: "1 session per week",
  },
  {
    icon: Dumbbell,
    title: "Strength & Conditioning",
    teaser: "Structured individual program",
    image: strengthImg,
    description: "Players receive structured guidance for strength and conditioning to build the physical foundation required to perform at a high level consistently.",
    includes: ["Strength programming", "Athletic conditioning", "Performance training"],
    frequency: "Weekly independent program with ongoing guidance",
  },
  {
    icon: ShieldCheck,
    title: "Injury Prevention",
    teaser: "Structured independent program",
    image: safeEnvImg,
    description: "Dedicated mobility, recovery, and movement work designed to keep players healthy, durable, and able to train consistently over the long term.",
    includes: ["Mobility work", "Movement screening", "Recovery protocols"],
    frequency: "Integrated into weekly training program",
  },
  {
    icon: Flame,
    title: "Mindset & Confidence",
    teaser: "1 weekly remote session & monthly 1-on-1 check-in",
    image: mentalImg,
    description: "Small group sessions focused on discipline, confidence, leadership, and the mental habits required to perform and improve consistently.",
    includes: ["Mindset development", "Confidence building", "Leadership and discipline"],
    frequency: "1 weekly remote session + 1-on-1 monthly check-in",
  },
];

function DevelopmentSection() {
  const [active, setActive] = useState<number | null>(null);
  const activePillar = active !== null ? developmentPillars[active] : null;

  return (
    <section
      className="snap-start h-dvh flex flex-col bg-white px-3 sm:px-8 lg:px-14 pt-6 sm:pt-8 lg:pt-10 pb-4 sm:pb-6 lg:pb-8"
      data-testid="section-elite-develop"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col flex-1 min-h-0">

        {/* Header */}
        <div className="text-center mb-2 sm:mb-4 shrink-0">
          <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-black/30 mb-1 sm:mb-1.5">Program Structure</p>
          <h2 className="text-base sm:text-2xl lg:text-3xl font-black text-black tracking-tight leading-[1.1] mb-1 sm:mb-2">
            How We Develop Players
          </h2>
          <p className="hidden sm:block text-black/55 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Key areas of development that help players grow technically, tactically, physically, and mentally.
          </p>
        </div>

        {/* Card grid — flex-1 so it fills all remaining vertical space */}
        <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-2 sm:gap-3 lg:gap-4 min-h-0">
          {developmentPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer select-none h-full group"
                onClick={() => setActive(i)}
                data-testid={`card-develop-${i}`}
              >
                {/* Background image */}
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                {/* Top row: icon + plus button */}
                <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-3 sm:left-3 sm:right-3 flex items-start justify-between">
                  <div className="bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl p-1.5 sm:p-2">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
                    <span className="text-white text-sm sm:text-base font-light leading-none">+</span>
                  </div>
                </div>

                {/* Bottom: title + teaser */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 lg:p-4">
                  <p className="text-white font-bold text-xs sm:text-sm lg:text-base leading-tight">{pillar.title}</p>
                  <p className="text-white/60 text-[10px] sm:text-xs mt-0.5 leading-tight">{pillar.teaser}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-3 sm:mt-5 shrink-0">
          <Link href="/apply">
            <Button size="sm" className="sm:size-lg font-bold tracking-wide px-6 sm:px-10 text-sm sm:text-base bg-black text-white hover:bg-black/80" data-testid="button-develop-cta">
              Apply for Evaluation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Expanded modal overlay */}
      {activePillar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          data-testid="modal-develop"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setActive(null)}
          />

          {/* Panel */}
          <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[88vh] overflow-hidden flex flex-col sm:flex-row shadow-2xl">

            {/* Left: text content */}
            <div className="flex-1 p-7 sm:p-10 overflow-y-auto order-2 sm:order-1">

              {/* Icon + title */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shrink-0">
                  <activePillar.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-black text-xl sm:text-2xl text-black leading-tight">{activePillar.title}</h2>
                  <p className="text-black/40 text-sm mt-0.5">{activePillar.teaser}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-black/65 leading-relaxed mb-7 text-sm sm:text-base">{activePillar.description}</p>

              {/* Includes */}
              <div className="mb-7">
                <p className="text-black/30 text-[10px] font-bold uppercase tracking-widest mb-3">What's Included</p>
                <ul className="space-y-3">
                  {activePillar.includes.map(item => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-black/75 text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Frequency badge */}
              <div className="flex items-center gap-2.5 bg-black/5 rounded-xl px-4 py-3">
                <Users className="w-4 h-4 text-black/40 shrink-0" />
                <span className="text-black/60 text-sm font-semibold">{activePillar.frequency}</span>
              </div>
            </div>

            {/* Right: image */}
            <div className="w-full h-56 sm:h-auto sm:w-[42%] shrink-0 order-1 sm:order-2">
              <img
                src={activePillar.image}
                alt={activePillar.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Close button */}
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-black/10 hover:bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors z-10"
              data-testid="button-develop-close"
            >
              <X className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

const eliteNavLinks = [
  { label: "Youth Clinics", href: "/" },
  { label: "Elite Development", href: "/elite-development" },
  { label: "Register", href: "/register" },
];

type PlayerProfile = {
  name: string;
  school: string;
  position: string;
  team: string;
  gradYear: string;
  dominantFoot: string;
  achievements: string[];
  testimony: string;
  video: string | null;
  photos: string[];
};

const placeholderPlayers: PlayerProfile[] = [
  {
    name: "Player Name",
    school: "High School",
    position: "Position",
    team: "Club Team",
    gradYear: "Class of —",
    dominantFoot: "—",
    achievements: ["Achievement will go here", "Second achievement here"],
    testimony: "Player testimony will be added here once we have quotes from our athletes.",
    video: null,
    photos: [],
  },
  {
    name: "Player Name",
    school: "High School",
    position: "Position",
    team: "Club Team",
    gradYear: "Class of —",
    dominantFoot: "—",
    achievements: ["Achievement will go here", "Second achievement here"],
    testimony: "Player testimony will be added here once we have quotes from our athletes.",
    video: null,
    photos: [],
  },
  {
    name: "Player Name",
    school: "High School",
    position: "Position",
    team: "Club Team",
    gradYear: "Class of —",
    dominantFoot: "—",
    achievements: ["Achievement will go here", "Second achievement here"],
    testimony: "Player testimony will be added here once we have quotes from our athletes.",
    video: null,
    photos: [],
  },
  {
    name: "Player Name",
    school: "High School",
    position: "Position",
    team: "Club Team",
    gradYear: "Class of —",
    dominantFoot: "—",
    achievements: ["Achievement will go here", "Second achievement here"],
    testimony: "Player testimony will be added here once we have quotes from our athletes.",
    video: null,
    photos: [],
  },
];

function PlayerModal({ player, onClose }: { player: PlayerProfile; onClose: () => void }) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const hasPhotos = player.photos.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 touch-none"
      data-testid="modal-player-overlay"
      onTouchMove={(e) => e.preventDefault()}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel — mirrors DevelopmentSection expanded style */}
      <div
        className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[88vh] overflow-hidden flex flex-col sm:flex-row shadow-2xl"
        data-testid="modal-player-content"
      >
        {/* Left: text content */}
        <div className="flex-1 p-7 sm:p-10 overflow-hidden sm:overflow-y-auto order-2 sm:order-1">

          {/* Name + position */}
          <div className="flex items-start gap-3 mb-6">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-black text-xl sm:text-2xl text-black leading-tight">{player.name}</h2>
              <p className="text-black/40 text-sm mt-0.5">{player.position} · {player.gradYear}</p>
            </div>
          </div>

          {/* Detail rows */}
          <div className="space-y-2 mb-7">
            <div className="flex items-center gap-2.5 bg-black/5 rounded-xl px-4 py-3">
              <span className="text-black/40 text-[10px] font-bold uppercase tracking-wider w-20 shrink-0">School</span>
              <span className="text-black/75 text-sm font-semibold">{player.school}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-black/5 rounded-xl px-4 py-3">
              <span className="text-black/40 text-[10px] font-bold uppercase tracking-wider w-20 shrink-0">Club</span>
              <span className="text-black/75 text-sm font-semibold">{player.team}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-black/5 rounded-xl px-4 py-3">
              <span className="text-black/40 text-[10px] font-bold uppercase tracking-wider w-20 shrink-0">Foot</span>
              <span className="text-black/75 text-sm font-semibold">{player.dominantFoot}</span>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-7">
            <p className="text-black/30 text-[10px] font-bold uppercase tracking-widest mb-3">Achievements</p>
            <ul className="space-y-3">
              {player.achievements.map((a, j) => (
                <li key={j} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-black/75 text-sm font-medium">{a}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimony */}
          <div className="border-t border-black/10 pt-6 mb-6">
            <Quote className="w-4 h-4 text-black/20 mb-2" />
            <p className="text-black/55 text-sm sm:text-base italic leading-relaxed">{player.testimony}</p>
          </div>

          {/* Video link */}
          {player.video && (
            <a
              href={player.video}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-black/80 transition-colors"
              data-testid="button-modal-video"
            >
              <ExternalLink className="w-4 h-4" /> Watch Highlights
            </a>
          )}
        </div>

        {/* Right: photo carousel */}
        <div className="w-full h-56 sm:h-auto sm:w-[42%] shrink-0 order-1 sm:order-2 relative bg-black/10">
          {hasPhotos ? (
            <>
              <img
                src={player.photos[photoIdx]}
                alt={`${player.name} photo ${photoIdx + 1}`}
                className="w-full h-full object-cover object-top"
              />
              {player.photos.length > 1 && (
                <>
                  <button
                    onClick={() => setPhotoIdx((i) => (i - 1 + player.photos.length) % player.photos.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
                    data-testid="button-photo-prev"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPhotoIdx((i) => (i + 1) % player.photos.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
                    data-testid="button-photo-next"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {player.photos.map((_, di) => (
                      <button
                        key={di}
                        onClick={() => setPhotoIdx(di)}
                        className={`w-2 h-2 rounded-full transition-colors ${di === photoIdx ? "bg-white" : "bg-white/40"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-24 h-24 text-black/10" />
            </div>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 bg-black/10 hover:bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors z-10"
          data-testid="button-modal-close"
        >
          <X className="w-4 h-4 text-black" />
        </button>
      </div>
    </div>
  );
}

function EliteTestimonialsSection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const selectedPlayer = selectedIdx !== null ? placeholderPlayers[selectedIdx] : null;

  return (
    <section
      className="snap-start h-dvh flex flex-col bg-background overflow-hidden"
      data-testid="section-elite-testimonials"
    >
      {/* Section header */}
      <div className="shrink-0 flex justify-center px-5 pt-6 sm:pt-8 short:pt-3 pb-3 sm:pb-5 short:pb-2">
        <div className="w-full max-w-[960px] text-center">
          <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/30 mb-2 sm:mb-3">
            Alumni
          </p>
          <h2 className="text-2xl sm:text-[48px] sm:leading-[52px] short:text-xl font-black text-foreground tracking-tight mb-2 sm:mb-3">
            Player <span className="text-foreground/40">Stories</span>
          </h2>

          {/* Slogan + logo — mobile only */}
          <div className="flex sm:hidden items-center justify-center gap-2 mb-3">
            <img src="/logo.png" alt="Boston Tigers" className="h-6 w-auto opacity-80" />
            <p className="text-sm font-bold text-foreground/60 tracking-wide italic">
              Create your Story.{" "}
              <span className="text-foreground/90 not-italic">Elevate your game.</span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="h-px w-16 sm:w-[120px] bg-foreground/20" />
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
              <div className="h-2 w-2 rounded-full bg-foreground/60" />
              <div className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
            </div>
            <div className="h-px w-16 sm:w-[120px] bg-foreground/20" />
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="flex-1 sm:flex-none overflow-y-auto px-4 sm:px-8 pb-4 short:pb-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-[960px] mx-auto">
          {placeholderPlayers.map((player, i) => (
            <button
              key={i}
              className="bg-card border border-border rounded-2xl p-4 sm:p-5 flex flex-col gap-3 text-left cursor-pointer hover:border-foreground/30 hover:shadow-md transition-all duration-200 group"
              onClick={() => setSelectedIdx(i)}
              data-testid={`card-player-${i}`}
            >
              {/* Photo */}
              <div className="flex justify-center">
                {player.photos.length > 0 ? (
                  <img
                    src={player.photos[0]}
                    alt={player.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover object-top group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-border bg-muted flex items-center justify-center group-hover:border-foreground/30 transition-colors">
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground/30" />
                  </div>
                )}
              </div>

              {/* Name + school */}
              <div className="text-center">
                <p className="font-black text-sm sm:text-base text-foreground leading-tight">{player.name}</p>
                <p className="text-muted-foreground text-[11px] sm:text-xs mt-0.5">{player.school}</p>
              </div>

              {/* Position badge */}
              <div className="flex justify-center">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                  {player.position}
                </span>
              </div>

              {/* Top achievement */}
              <div className="space-y-1.5">
                {player.achievements.slice(0, 2).map((achievement, j) => (
                  <div key={j} className="flex items-start gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-foreground/25 mt-1.5 shrink-0" />
                    <span className="text-[10px] sm:text-xs text-muted-foreground leading-snug">{achievement}</span>
                  </div>
                ))}
              </div>

              {/* Testimony preview */}
              <div className="border-t border-border pt-3 flex-1">
                <Quote className="w-3 h-3 text-muted-foreground/30 mb-1" />
                <p className="text-[10px] sm:text-xs italic text-muted-foreground/60 leading-relaxed line-clamp-3">
                  {player.testimony}
                </p>
              </div>

              {/* Tap hint */}
              <p className="text-[9px] sm:text-[10px] font-semibold text-foreground/30 text-center uppercase tracking-wider group-hover:text-foreground/50 transition-colors">
                Tap to expand
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Slogan + logo — desktop only, below cards */}
      <div className="hidden sm:flex flex-1 items-center justify-center gap-4 px-8">
        <img src="/logo.png" alt="Boston Tigers" className="h-12 w-auto opacity-75" />
        <p className="text-2xl lg:text-3xl font-black text-foreground/50 tracking-tight italic">
          Create your Story.{" "}
          <span className="text-foreground not-italic">Elevate your game.</span>
        </p>
      </div>

      {/* Modal */}
      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} onClose={() => setSelectedIdx(null)} />
      )}
    </section>
  );
}

function EliteCoachSection() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const coaches = [
    {
      name: "Mohamed",
      role: "Head Coach",
      initials: "M",
      image: mohamedImg,
      imagePosition: "object-cover object-[center_22%]",
      bio: "A seasoned coach with over 12 years of youth development experience, Mohamed brings elite-level insight and an infectious energy that motivates players of all ages. His philosophy centers on building confidence first. Born and raised with a deep love for the beautiful game, he has trained players across all skill levels — from complete beginners taking their first touches to competitive athletes pushing for the next level. Mohamed believes that great coaching is about more than tactics; it's about shaping character, instilling discipline, and making every player feel seen and valued on and off the field.",
    },
    {
      name: "Deya",
      role: "Coach",
      initials: "D",
      image: deyaImg,
      imagePosition: "object-cover object-[center_25%]",
      bio: "A seasoned coach with over 12 years of youth development experience, Deya brings elite-level insight and an infectious energy that motivates players of all ages. His philosophy centers on building confidence first. Born and raised with a deep love for the beautiful game, he has trained players across all skill levels — from complete beginners taking their first touches to competitive athletes pushing for the next level. Deya believes that great coaching is about more than tactics; it's about shaping character, instilling discipline, and making every player feel seen and valued on and off the field.",
    },
    {
      name: "Majid",
      role: "Coach",
      initials: "M",
      image: majidImg,
      imagePosition: "object-cover object-[center_22%]",
      bio: "A seasoned coach with over 12 years of youth development experience, Majid brings elite-level insight and an infectious energy that motivates players of all ages. His philosophy centers on building confidence first. Born and raised with a deep love for the beautiful game, he has trained players across all skill levels — from complete beginners taking their first touches to competitive athletes pushing for the next level. Majid believes that great coaching is about more than tactics; it's about shaping character, instilling discipline, and making every player feel seen and valued on and off the field.",
    },
  ];

  const [active, setActive] = useState(0);
  const [bioExpanded, setBioExpanded] = useState(false);
  useEffect(() => { setBioExpanded(false); }, [active]);

  const prev = () => setActive((i) => (i - 1 + coaches.length) % coaches.length);
  const next = () => setActive((i) => (i + 1) % coaches.length);

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 45) { deltaX < 0 ? next() : prev(); }
    touchStartX.current = null;
  };

  const coach = coaches[active];

  return (
    <section className="snap-start h-dvh flex flex-col bg-background overflow-hidden" data-testid="section-elite-coaches">

      {/* Navbar */}
      <nav className="relative z-50 bg-black border-b border-white/10 shrink-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <img src="/logo.png" alt="Boston Tigers Football Club" className="h-16 sm:h-20 w-auto" />
              <div className="flex flex-col justify-center">
                <span className="text-white font-black text-base sm:text-lg leading-tight tracking-tight">BOSTON TIGERS</span>
                <span className="text-white/50 font-semibold text-[10px] sm:text-xs tracking-widest uppercase leading-tight">Youth Soccer Clinics</span>
              </div>
            </Link>
            <div className="hidden lg:flex items-center gap-8">
              {eliteNavLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-white/70 text-sm font-semibold tracking-wide hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Link href="/apply">
                <Button size="sm" className="hidden sm:flex font-bold tracking-wide bg-white text-black" data-testid="button-elite-coaches-nav-register">
                  Apply for Evaluation
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
              {eliteNavLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-white/70 font-semibold py-3 px-2 rounded-md hover:text-white hover:bg-white/5 transition-colors" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 pb-1">
                <Link href="/apply" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full font-bold tracking-wide bg-white text-black">Apply for Evaluation</Button>
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
      <div className="flex-1 flex items-start justify-center px-0 sm:px-4 pt-1 sm:pt-[26px] short:pt-2 min-h-0 overflow-hidden">
        <div className="flex items-start justify-center gap-4 sm:gap-8 w-full max-w-[900px] h-full">

          <button
            onClick={prev}
            className="hidden sm:flex w-14 h-14 short:w-9 short:h-9 rounded-full border border-border bg-card items-center justify-center hover:bg-muted transition-colors shrink-0 self-start mt-10 sm:mt-[159px] short:mt-6"
            data-testid="button-elite-coaches-prev"
            aria-label="Previous coach"
          >
            <ChevronLeft className="w-5 h-5 short:w-4 short:h-4" />
          </button>

          <Card
            className="w-full sm:w-[680px] mx-4 sm:mx-0 h-[calc(100%+3rem)] short:h-[calc(100%+2rem)] sm:h-auto sm:min-h-[540px] border border-border/60 bg-card shadow-md touch-pan-y rounded-t-2xl rounded-b-none sm:rounded-3xl"
            data-testid={`card-elite-coach-${active}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <CardContent className="p-5 sm:pt-6 sm:px-12 sm:pb-6 short:p-4 flex flex-col items-center h-full min-h-0">
              <div className="w-24 h-24 sm:w-[120px] sm:h-[120px] short:w-16 short:h-16 rounded-full overflow-hidden mb-4 sm:mb-3 short:mb-2 shadow-lg shrink-0">
                <img src={coach.image} alt={coach.name} className={`w-full h-full ${coach.imagePosition}`} />
              </div>
              <h3 className="font-black text-foreground text-xl sm:text-[22px] sm:leading-7 short:text-base tracking-tight mb-2 sm:mb-1.5 short:mb-0.5 shrink-0 text-center">{coach.name}</h3>
              <span className="text-muted-foreground text-xs sm:text-[15px] font-bold tracking-widest sm:tracking-[2px] uppercase mb-4 sm:mb-5 short:mb-1.5 shrink-0 block text-center">{coach.role}</span>
              <p className="text-muted-foreground text-sm sm:text-[17px] sm:leading-[29px] short:text-xs leading-relaxed text-center sm:text-left w-full sm:max-w-[500px] short:line-clamp-4">
                {coach.bio}
              </p>
              <div className="flex items-center gap-4 mt-3 sm:mt-5 short:mt-2 shrink-0">
                <button onClick={prev} className="sm:hidden w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center hover:bg-muted transition-colors" aria-label="Previous coach">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                  {coaches.map((_, i) => (
                    <button key={i} onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-foreground" : "w-2 bg-foreground/20"}`} aria-label={`Go to coach ${i + 1}`} />
                  ))}
                </div>
                <button onClick={next} className="sm:hidden w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center hover:bg-muted transition-colors" aria-label="Next coach">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>

          <button
            onClick={next}
            className="hidden sm:flex w-14 h-14 short:w-9 short:h-9 rounded-full border border-border bg-card items-center justify-center hover:bg-muted transition-colors shrink-0 self-start mt-10 sm:mt-[159px] short:mt-6"
            data-testid="button-elite-coaches-next"
            aria-label="Next coach"
          >
            <ChevronRight className="w-5 h-5 short:w-4 short:h-4" />
          </button>

        </div>
      </div>
    </section>
  );
}
