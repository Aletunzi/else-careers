import { useEffect, useRef, useState } from "react";

type Source = { name: string; desc: string };

const COLUMN_A: Source[] = [
  { name: "Y Combinator", desc: "Work at a Startup board" },
  { name: "Hacker News", desc: '"Who is hiring?" threads' },
  { name: "Lenny's newsletter", desc: "Operator-led postings" },
  { name: "X", desc: "Founder posts & DMs" },
  { name: "Welcome to the Jungle", desc: "European coverage" },
  { name: "AngelList", desc: "Early-stage startups" },
  { name: "Product Hunt", desc: "Launches & makers" },
];

const COLUMN_B: Source[] = [
  { name: "Otta", desc: "Curated tech roles, EU focus" },
  { name: "Wellfound", desc: "Startup & seed-stage roles" },
  { name: "Career pages", desc: "Direct from +20000 career pages" },
  { name: "Stealth networks", desc: "Pre-launch & confidential" },
  { name: "Reddit", desc: "r/forhire & niche subs" },
  { name: "Slack communities", desc: "Operator-only channels" },
];

const Card = ({ s }: { s: Source }) => (
  <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_20px_-8px_rgba(32,28,27,0.08)]">
    <div className="text-base font-semibold text-foreground sm:text-lg">{s.name}</div>
    <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.desc}</div>
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
          <br className="hidden sm:block" /> of sources,{" "}
          <span style={{ color: "#ff6b1a" }}>non-stop.</span>
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