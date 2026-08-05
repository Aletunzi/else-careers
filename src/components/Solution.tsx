import { useInView } from "@/hooks/useInView";
import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import stealthIcon from "@/assets/stealth-icon.jpeg.asset.json";

type Source = { name: string; desc: string; domain?: string; icon?: "globe" | "stealth" };

const COLUMN_A: Source[] = [
  { name: "Teamtailor", desc: "Nordic & EU roles", domain: "teamtailor.com" },
  { name: "Greenhouse", desc: "Company career pages", domain: "greenhouse.io" },
  { name: "Workday", desc: "Enterprise listings", domain: "workday.com" },
  { name: "Welcome to the Jungle", desc: "European coverage", domain: "welcometothejungle.com" },
  { name: "EU-Startups", desc: "EU startup board", domain: "eu-startups.com" },
  { name: "Y Combinator", desc: "Work at a Startup board", domain: "ycombinator.com" },
  { name: "Built In", desc: "US tech hubs", domain: "builtin.com" },
  { name: "We Work Remotely", desc: "Remote-first roles", domain: "weworkremotely.com" },
  { name: "Remotive", desc: "Curated remote", domain: "remotive.com" },
  { name: "Indeed", desc: "High-volume listings", domain: "indeed.com" },
  { name: "Lenny's Job Board", desc: "PM-specific roles", domain: "lennysnewsletter.com" },
  { name: "X", desc: "#hiring & founder posts", domain: "x.com" },
  { name: "Slack communities", desc: "Operator-only channels", domain: "slack.com" },
  { name: "Telegram", desc: "Regional job channels", domain: "telegram.org" },
  { name: "Career pages", desc: "Direct from companies", icon: "globe" },
];

const COLUMN_B: Source[] = [
  { name: "Personio", desc: "Career pages (DACH)", domain: "personio.com" },
  { name: "Recruitee", desc: "European SMEs", domain: "recruitee.com" },
  { name: "Lever", desc: "Applicant tracking feeds", domain: "lever.co" },
  { name: "Ashby", desc: "Modern ATS roles", domain: "ashbyhq.com" },
  { name: "Sifted", desc: "European startup jobs", domain: "sifted.eu" },
  { name: "Landing.jobs", desc: "Southern Europe tech", domain: "landing.jobs" },
  { name: "Wellfound", desc: "Startup & seed-stage roles", domain: "wellfound.com" },
  { name: "Hacker News", desc: '"Who is hiring?" threads', domain: "news.ycombinator.com" },
  { name: "RemoteOK", desc: "Remote tech jobs", domain: "remoteok.com" },
  { name: "LinkedIn", desc: "Jobs & hiring posts", domain: "linkedin.com" },
  { name: "Mind the Product", desc: "Product community", domain: "mindtheproduct.com" },
  { name: "Product Hunt", desc: "Maker & launch signals", domain: "producthunt.com" },
  { name: "Reddit", desc: "r/forhire & niche subs", domain: "reddit.com" },
  { name: "Discord communities", desc: "Product & tech servers", domain: "discord.com" },
];

const Card = ({ s }: { s: Source }) => (
  <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_4px_20px_-8px_rgba(32,28,27,0.08)]">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f3f1e9]">
      {s.domain ? (
        <img
          src={`https://www.google.com/s2/favicons?domain=${s.domain}&sz=64`}
          alt={`${s.name} logo`}
          className="h-6 w-6 object-contain"
          loading="lazy"
        />
      ) : s.icon === "globe" ? (
        <Globe className="h-5 w-5 text-foreground/70" strokeWidth={2} />
      ) : s.icon === "stealth" ? (
        <img
          src={stealthIcon.url}
          alt="Stealth"
          className="h-6 w-6 object-contain"
          loading="lazy"
        />
      ) : (
        <span className="text-base font-semibold text-foreground/70">{s.name.charAt(0)}</span>
      )}
    </div>
    <div className="min-w-0">
      <div className="truncate text-base font-semibold text-foreground sm:text-lg">{s.name}</div>
      <div className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">{s.desc}</div>
    </div>
  </div>
);

const Column = ({ items, direction }: { items: Source[]; direction: "up" | "down" }) => {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden" style={{ height: "520px" }}>
      <div
        className="flex flex-col gap-4"
        style={{
          animation: `${direction === "up" ? "solution-scroll-up" : "solution-scroll-down"} 32s linear infinite`,
        }}
      >
        {loop.map((s, i) => (
          <Card key={`${s.name}-${i}`} s={s} />
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{ background: "linear-gradient(to bottom, #f3f1e9, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(to top, #f3f1e9, transparent)" }}
      />
    </div>
  );
};

const Solution = () => {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className="px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24 lg:py-32 2xl:px-32"
      style={{ backgroundColor: "#f3f1e9" }}
    >
      <div className="mx-auto max-w-7xl">
        <div
          className={`flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground ${inView ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationFillMode: "both" }}
        >
          <span className="h-px w-8 bg-muted-foreground/50" />
          <span>The Solution</span>
        </div>

        <h2
          className={`mx-auto mt-8 max-w-5xl text-center text-[clamp(2.25rem,7vw,5rem)] font-medium leading-[1.05] tracking-tight text-foreground md:text-6xl ${inView ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDelay: "150ms", animationFillMode: "both" }}
        >
          Our agents scan thousands
          <br className="hidden sm:block" /> of sources, non-stop.
        </h2>

        <div
          className={`mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-2 sm:gap-6 ${inView ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDelay: "300ms", animationFillMode: "both" }}
        >
          <Column items={COLUMN_A} direction="up" />
          <div className="hidden sm:block">
            <Column items={COLUMN_B} direction="down" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes solution-scroll-up {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes solution-scroll-down {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
        @keyframes solution-fade-down {
          from { opacity: 0; transform: translateY(-14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Solution;