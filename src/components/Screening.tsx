import { useEffect, useRef, useState } from "react";
import { Check, Minus } from "lucide-react";

type Point = { text: string };

const STRENGTHS: Point[] = [
  { text: "8+ years leading product at Series B climate-tech scale-ups" },
  { text: "Shipped 0-to-1 platforms with cross-functional teams of 20+" },
  { text: "Based in Berlin, fluent in English and German" },
];

const GAPS: Point[] = [
  { text: "Limited exposure to hardware-integrated products" },
  { text: "No direct experience with carbon accounting frameworks" },
];

const useCountUp = (end: number, duration = 1400, start = false) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start]);
  return value;
};

const Screening = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const score = useCountUp(92, 1500, inView);

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

  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <section
      ref={ref}
      className="px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24 lg:py-32 2xl:px-32"
      style={{ backgroundColor: "#FAF9F5" }}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className={`flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground ${inView ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationFillMode: "both" }}
        >
          <span className="h-px w-8 bg-muted-foreground/50" />
          <span>The Screening</span>
        </div>

        <h2
          className={`mx-auto mt-8 max-w-5xl text-center text-[clamp(2.25rem,7vw,5rem)] font-medium leading-[1.05] tracking-tight text-foreground md:text-6xl ${inView ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDelay: "150ms", animationFillMode: "both" }}
        >
          Every role, screened{" "}
          <span style={{ color: "#ff6b1a" }}>and scored</span> against your profile.
        </h2>

        <p
          className={`mx-auto mt-6 max-w-2xl text-center text-base text-muted-foreground sm:text-lg ${inView ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDelay: "250ms", animationFillMode: "both" }}
        >
          For each vacancy, our agents read your CV and profile, then explain in plain
          language where you shine and where you might fall short.
        </p>

        <div
          className={`mx-auto mt-14 max-w-3xl rounded-3xl bg-white p-6 shadow-[0_10px_40px_-15px_rgba(32,28,27,0.15)] sm:mt-16 sm:p-10 ${inView ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDelay: "400ms", animationFillMode: "both" }}
        >
          {/* Header */}
          <div className="flex flex-col gap-6 border-b border-black/5 pb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f3f1e9]">
                <img
                  src="https://www.google.com/s2/favicons?domain=ecosia.org&sz=64"
                  alt="Ecosia"
                  className="h-7 w-7 object-contain"
                />
              </div>
              <div className="min-w-0">
                <div className="text-lg font-semibold text-foreground sm:text-xl">
                  Head of Product, Climate
                </div>
                <div className="mt-0.5 text-sm text-muted-foreground">
                  Ecosia · Berlin · Remote-friendly
                </div>
              </div>
            </div>

            {/* Score */}
            <div className="flex items-center gap-4 sm:gap-3">
              <div className="relative h-24 w-24 shrink-0">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#f3f1e9"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#ff6b1a"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transition: "stroke-dashoffset 100ms linear" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-semibold text-foreground">{score}%</span>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Fit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comment */}
          <div className="mt-6 rounded-2xl bg-[#faf5ec] p-5 text-sm leading-relaxed text-foreground sm:text-base">
            <span className="font-semibold">Why this fits: </span>
            Your track record scaling product orgs at climate-tech startups strongly
            matches Ecosia's growth stage. The remote setup and Berlin base align with
            the team, and your bilingual background is a plus for pan-European hiring.
          </div>

          {/* Strengths & gaps */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6b1a]/15">
                  <Check className="h-3 w-3" style={{ color: "#ff6b1a" }} strokeWidth={3} />
                </span>
                Strengths
              </div>
              <ul className="mt-3 space-y-2.5">
                {STRENGTHS.map((p) => (
                  <li key={p.text} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                    <span>{p.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground/10">
                  <Minus className="h-3 w-3 text-foreground/70" strokeWidth={3} />
                </span>
                Gaps to consider
              </div>
              <ul className="mt-3 space-y-2.5">
                {GAPS.map((p) => (
                  <li key={p.text} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                    <span>{p.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Screening;