import { useEffect, useRef, useState } from "react";

type Source = { name: string; desc: string };

const COLUMN_A: Source[] = [
  { name: "Y Combinator", desc: "Work at a Startup board" },
  { name: "Hacker News", desc: '"Who is hiring?" threads' },
  { name: "Lenny's newsletter", desc: "Operator-led postings" },
  { name: "X / Twitter", desc: "Founder posts & DMs" },
  { name: "Welcome to the Jungle", desc: "FR & EU coverage" },
  { name: "AngelList", desc: "Early-stage startups" },
  { name: "Product Hunt", desc: "Launches & makers" },
];

const COLUMN_B: Source[] = [
  { name: "Otta", desc: "Curated tech roles, EU focus" },
  { name: "Wellfound", desc: "Startup & seed-stage roles" },
  { name: "Career pages", desc: "Direct from 2,400+ companies" },
  { name: "LinkedIn", desc: "Public job listings" },
  { name: "Stealth networks", desc: "Pre-launch & confidential" },
  { name: "Reddit", desc: "r/forhire & niche subs" },
  { name: "Slack communities", desc: "Operator-only channels" },
];

const Card = ({ s }: { s: Source }) => (
  <div className="rounded-2xl bg-white px-6 py-5 shadow-[0_4px_20px_-8px_rgba(32,28,27,0.08)]">
    <div className="text-lg font-semibold text-foreground sm:text-xl">{s.name}</div>
    <div className="mt-1 text-sm text-muted-foreground sm:text-base">{s.desc}</div>
  </div>
);

const Column = ({ items, direction }: { items: Source[]; direction: "up" | "down" }) => {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden" style={{ height: "560px" }}>
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
        style={{ background: "linear-gradient(to bottom, hsl(var(--background)), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(to top, hsl(var(--background)), transparent)" }}
      />
    </div>
  );
};

const Solution = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-background px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24 lg:py-32 2xl:px-32"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          style={{
            animation: inView ? "solution-fade-down 700ms ease-out both" : undefined,
            opacity: inView ? undefined : 0,
          }}
        >
          <span className="h-px w-8 bg-muted-foreground/50" />
          <span>The Solution</span>
        </div>

        <h2
          className="mx-auto mt-8 max-w-5xl text-center text-[clamp(2.25rem,7vw,5rem)] font-medium leading-[1.05] tracking-tight text-foreground"
          style={{
            animation: inView ? "solution-fade-down 700ms ease-out both" : undefined,
            animationDelay: "120ms",
            opacity: inView ? undefined : 0,
          }}
        >
          Our agent scans <em className="font-serif italic font-normal">thousands</em>
          <br className="hidden sm:block" /> of sources,{" "}
          <span style={{ color: "#ff6b1a" }}>non-stop.</span>
        </h2>

        <div
          className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-2 sm:gap-6"
          style={{
            animation: inView ? "solution-fade-down 700ms ease-out both" : undefined,
            animationDelay: "240ms",
            opacity: inView ? undefined : 0,
          }}
        >
          <Column items={COLUMN_A} direction="up" />
          <Column items={COLUMN_B} direction="down" />
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