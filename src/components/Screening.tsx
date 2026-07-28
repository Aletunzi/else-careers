import { useEffect, useRef, useState } from "react";
import { Check, Minus, ChevronDown } from "lucide-react";

type Point = { text: string };

const STRENGTHS: Point[] = [
  { text: "8+ years leading product at Series B climate-tech scale-ups" },
  { text: "Based in Berlin, fluent in English and German" },
];

const GAPS: Point[] = [
  { text: "Limited exposure to hardware-integrated products" },
  { text: "No prior experience scaling B2C search products" },
];

type Vacancy = {
  id: string;
  role: string;
  company: string;
  location: string;
  favicon: string;
  score: number;
};

const VACANCIES: Vacancy[] = [
  {
    id: "ecosia",
    role: "Head of Product, Climate",
    company: "Ecosia",
    location: "Berlin · Remote-friendly",
    favicon: "https://www.google.com/s2/favicons?domain=ecosia.org&sz=64",
    score: 92,
  },
  {
    id: "qonto",
    role: "Senior Product Manager",
    company: "Qonto",
    location: "Paris · Hybrid",
    favicon: "https://www.google.com/s2/favicons?domain=qonto.com&sz=64",
    score: 74,
  },
  {
    id: "personio",
    role: "Group Product Manager",
    company: "Personio",
    location: "Munich · Onsite",
    favicon: "https://www.google.com/s2/favicons?domain=personio.com&sz=64",
    score: 61,
  },
];

const useCountUp = (end: number, duration = 1400, start = false) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) {
      setValue(0);
      return;
    }
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setExpandedId(VACANCIES[0].id), 900);
    return () => clearTimeout(t);
  }, [inView]);

  const reveal = (delay: number) =>
    `${inView ? "animate-fade-in" : "opacity-0"}`;
  const delayStyle = (delay: number) => ({
    animationDelay: `${delay}ms`,
    animationFillMode: "both" as const,
  });

  return (
    <section
      ref={ref}
      className="px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24 lg:py-32 2xl:px-32"
      style={{ backgroundColor: "#FAF9F5" }}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className={`flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground ${reveal(0)}`}
          style={delayStyle(0)}
        >
          <span className="h-px w-8 bg-muted-foreground/50" />
          <span>The Screening</span>
        </div>

        <h2
          className={`mx-auto mt-8 max-w-5xl text-center text-[clamp(2.25rem,7vw,5rem)] font-medium leading-[1.05] tracking-tight text-foreground md:text-6xl ${reveal(150)}`}
          style={delayStyle(150)}
        >
          Every role, screened{" "}
          <span style={{ color: "#ff6b1a" }}>and scored</span> against your profile.
        </h2>

        <div className="mx-auto mt-14 max-w-3xl space-y-4 sm:mt-16">
          {VACANCIES.map((v, i) => (
            <VacancyCard
              key={v.id}
              vacancy={v}
              expanded={expandedId === v.id}
              onToggle={() =>
                setExpandedId((cur) => (cur === v.id ? null : v.id))
              }
              inView={inView}
              delay={300 + i * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const VacancyCard = ({
  vacancy,
  expanded,
  onToggle,
  inView,
  delay,
}: {
  vacancy: Vacancy;
  expanded: boolean;
  onToggle: () => void;
  inView: boolean;
  delay: number;
}) => {
  const score = useCountUp(vacancy.score, 1200, expanded);
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const scoreColor =
    vacancy.score >= 80 ? "#ff6b1a" : vacancy.score >= 65 ? "#ff6b1a" : "#ff6b1a";

  return (
    <div
      className={`overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_-15px_rgba(32,28,27,0.12)] transition-shadow ${
        inView ? "animate-fade-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {/* Row (always visible) */}
      <div className="flex items-center gap-4 p-5 sm:p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f3f1e9]">
          <img
            src={vacancy.favicon}
            alt={vacancy.company}
            className="h-7 w-7 object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-base font-semibold text-foreground sm:text-lg">
            {vacancy.role}
          </div>
          <div className="mt-0.5 truncate text-sm text-muted-foreground">
            {vacancy.company} · {vacancy.location}
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-[#ff6b1a]/10 px-3 py-1 sm:flex">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: "#ff6b1a" }}
          />
          <span className="text-sm font-semibold" style={{ color: "#ff6b1a" }}>
            {vacancy.score}% fit
          </span>
        </div>
        <button
          onClick={onToggle}
          aria-expanded={expanded}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {expanded ? "Hide" : "View"}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Expanded detail */}
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-black/5 px-5 pb-6 pt-6 sm:px-6">
            {/* Score gauge */}
            <div className="flex items-center gap-5">
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
                    stroke={scoreColor}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transition: "stroke-dashoffset 120ms linear" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-semibold text-foreground">
                    {score}%
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    Fit
                  </span>
                </div>
              </div>
              <div
                className={`flex-1 rounded-2xl bg-[#faf5ec] p-4 text-sm leading-relaxed text-foreground sm:text-base ${
                  expanded ? "animate-fade-in" : ""
                }`}
                style={{ animationDelay: "200ms", animationFillMode: "both" }}
              >
                <span className="font-semibold">Why this fits: </span>
                Your climate-tech product leadership and Berlin base align
                tightly with the stage and remote setup.
              </div>
            </div>

            {/* Strengths & gaps */}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              <div
                className={expanded ? "animate-fade-in" : ""}
                style={{ animationDelay: "350ms", animationFillMode: "both" }}
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6b1a]/15">
                    <Check
                      className="h-3 w-3"
                      style={{ color: "#ff6b1a" }}
                      strokeWidth={3}
                    />
                  </span>
                  Strengths
                </div>
                <ul className="mt-3 space-y-2.5">
                  {STRENGTHS.map((p, i) => (
                    <li
                      key={p.text}
                      className={`flex items-start gap-2 text-sm text-foreground/80 ${
                        expanded ? "animate-fade-in" : ""
                      }`}
                      style={{
                        animationDelay: `${450 + i * 120}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                      <span>{p.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={expanded ? "animate-fade-in" : ""}
                style={{ animationDelay: "500ms", animationFillMode: "both" }}
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground/10">
                    <Minus className="h-3 w-3 text-foreground/70" strokeWidth={3} />
                  </span>
                  Gaps to consider
                </div>
                <ul className="mt-3 space-y-2.5">
                  {GAPS.map((p, i) => (
                    <li
                      key={p.text}
                      className={`flex items-start gap-2 text-sm text-foreground/80 ${
                        expanded ? "animate-fade-in" : ""
                      }`}
                      style={{
                        animationDelay: `${600 + i * 120}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                      <span>{p.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screening;