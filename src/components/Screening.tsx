import { useEffect, useRef, useState } from "react";
import { Check, Minus, ChevronDown, ChevronRight } from "lucide-react";

type Point = { text: string };

type Vacancy = {
  id: string;
  role: string;
  company: string;
  location: string;
  favicon: string;
  score: number;
};

type VacancyDetails = {
  commentary: string;
  strengths: Point[];
  gaps: Point[];
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
  {
    id: "revolut",
    role: "Product Lead, Payments",
    company: "Revolut",
    location: "London · Hybrid",
    favicon: "https://www.google.com/s2/favicons?domain=revolut.com&sz=64",
    score: 54,
  },
];

const DETAILS: Record<string, VacancyDetails> = {
  ecosia: {
    commentary:
      "Your climate-tech product leadership and Berlin base align tightly with the stage and remote setup.",
    strengths: [
      { text: "8+ years leading product at Series B climate-tech scale-ups" },
      { text: "Deep expertise in climate and sustainability product metrics" },
    ],
    gaps: [
      { text: "Limited exposure to hardware-integrated products" },
      { text: "Less experience with remote-first team leadership at scale" },
    ],
  },
  qonto: {
    commentary:
      "Strong fintech product experience matches the role, though hybrid setup in Paris is less ideal than remote.",
    strengths: [
      { text: "Proven track record in B2B SaaS fintech products" },
      { text: "Experience with regulated financial services and compliance" },
    ],
    gaps: [
      { text: "Limited French language fluency for Paris stakeholder management" },
      { text: "Less direct exposure to SMB banking go-to-market motions" },
    ],
  },
  personio: {
    commentary:
      "HR tech domain is adjacent to your background, but onsite requirement in Munich reduces overall fit.",
    strengths: [
      { text: "Deep expertise in workflow automation and platform products" },
      { text: "Strong background in enterprise SaaS and integrations" },
    ],
    gaps: [
      { text: "No direct HR/HCM product experience" },
      { text: "Onsite requirement in Munich conflicts with remote preference" },
    ],
  },
  revolut: {
    commentary:
      "Payments expertise is a strong match, but the London hybrid model and lower stage-stage fit pull the score down.",
    strengths: [
      { text: "Deep experience in payments and card product strategy" },
      { text: "Track record of launching financial products across Europe" },
    ],
    gaps: [
      { text: "Limited London-based stakeholder exposure" },
      { text: "Less experience with high-volume consumer payments growth" },
    ],
  },
};

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

const scoreBadgeClasses = (score: number) => {
  if (score > 85) {
    return {
      bg: "bg-green-500/10",
      dot: "bg-green-500",
      text: "text-green-600",
    };
  }
  if (score > 60) {
    return {
      bg: "bg-[#ff6b1a]/10",
      dot: "bg-[#ff6b1a]",
      text: "text-[#ff6b1a]",
    };
  }
  return {
    bg: "bg-red-500/10",
    dot: "bg-red-500",
    text: "text-red-600",
  };
};

const Screening = () => {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = useState<number | null>(null);
  const [firstCardHeight, setFirstCardHeight] = useState<number>(0);
  const [gap, setGap] = useState<number>(0);
  const [inView, setInView] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [cursorStage, setCursorStage] = useState<
    "hidden" | "moving" | "clicking" | "done"
  >("hidden");

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
    // Capture the natural height of the 4-card stack before we swap in the
    // detail view, so the section keeps the exact same overall height.
    if (listRef.current) {
      const list = listRef.current;
      setListHeight(list.getBoundingClientRect().height);
      const header = list.querySelector("[data-card-header]");
      if (header) {
        setFirstCardHeight(header.getBoundingClientRect().height);
      }
      const style = window.getComputedStyle(list);
      const rowGap = parseFloat(style.rowGap || style.gap || "0");
      setGap(Number.isNaN(rowGap) ? 0 : rowGap);
    }
    // 1) Cards fade in (0-1800ms). 2) Cursor appears and moves to first arrow.
    // 3) Cursor clicks. 4) First card expands with details.
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setCursorStage("moving"), 1900));
    timers.push(window.setTimeout(() => setCursorStage("clicking"), 2900));
    timers.push(
      window.setTimeout(() => {
        setSelectedId(VACANCIES[0].id);
        setCursorStage("done");
      }, 3150)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, [inView]);

  const reveal = (delay: number) =>
    `${inView ? "animate-fade-in" : "opacity-0"}`;
  const delayStyle = (delay: number) => ({
    animationDelay: `${delay}ms`,
    animationFillMode: "both" as const,
  });

  const selected = VACANCIES.find((v) => v.id === selectedId) || null;

  return (
    <section
      ref={ref}
      className="px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24 lg:py-32 2xl:px-32"
      style={{ backgroundColor: "#FAF9F5" }}
    >
      <div className="mx-auto max-w-7xl">
        <div
          className={`flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground ${reveal(0)}`}
          style={delayStyle(0)}
        >
          <span className="h-px w-8 bg-muted-foreground/50" />
          <span>Screening</span>
        </div>

        <h2
          className={`mx-auto mt-8 max-w-5xl text-center text-[clamp(2.25rem,7vw,5rem)] font-medium leading-[1.05] tracking-tight text-foreground md:text-6xl ${reveal(150)}`}
          style={delayStyle(150)}
        >
          Every role, scored against your profile.
        </h2>

        <div
          ref={listRef}
          className="relative mx-auto mt-14 flex max-w-3xl flex-col gap-4 sm:mt-16"
          style={
            listHeight
              ? { minHeight: `${listHeight}px` }
              : undefined
          }
        >
          {VACANCIES.map((v, i) => {
            const isSelected = selectedId === v.id;
            const hidden = selectedId !== null && !isSelected;
            return (
              <VacancyRow
                key={v.id}
                vacancy={v}
                selected={isSelected}
                hidden={hidden}
                onSelect={() => setSelectedId(v.id)}
                inView={inView}
                delay={350 + i * 300}
                details={isSelected ? DETAILS[v.id] : undefined}
                detailHeight={
                  isSelected && listHeight && firstCardHeight
                    ? listHeight - firstCardHeight - gap
                    : undefined
                }
              />
            );
          })}

          {/* Animated cursor pointer */}
          <AnimatedCursor stage={cursorStage} />
        </div>
      </div>
    </section>
  );
};

const VacancyRow = ({
  vacancy,
  selected,
  hidden,
  onSelect,
  inView,
  delay,
  details,
  detailHeight,
}: {
  vacancy: Vacancy;
  selected: boolean;
  hidden: boolean;
  onSelect: () => void;
  inView: boolean;
  delay: number;
  details?: VacancyDetails;
  detailHeight?: number;
}) => {
  const badge = scoreBadgeClasses(vacancy.score);
  if (hidden) return null;
  return (
    <div
      data-card="true"
      className={`flex flex-col overflow-hidden ${inView ? "animate-fade-in" : "opacity-0"}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: "800ms",
        animationFillMode: "both",
        animationTimingFunction: "cubic-bezier(0.33, 1, 0.68, 1)",
      }}
    >
      <button
        data-card-header="true"
        onClick={onSelect}
        className={`flex w-full items-center gap-4 rounded-t-3xl bg-white p-5 text-left shadow-[0_10px_40px_-15px_rgba(32,28,27,0.12)] transition-all sm:p-6 ${
          selected ? "rounded-b-none" : "rounded-b-3xl hover:shadow-[0_14px_48px_-12px_rgba(32,28,27,0.18)]"
        }`}
      >
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
        <div className={`hidden items-center gap-2 rounded-full px-3 py-1 sm:flex ${badge.bg}`}>
          <span className={`h-2 w-2 rounded-full ${badge.dot}`} />
          <span className={`text-sm font-semibold ${badge.text}`}>
            {vacancy.score}% fit
          </span>
        </div>
        <div
          data-arrow
          className={`flex shrink-0 items-center justify-center rounded-full p-2 transition-all ${
            selected ? "bg-[#ff6b1a] text-white rotate-90" : "bg-foreground text-background"
          }`}
        >
          <ChevronRight className="h-4 w-4" />
        </div>
      </button>

      {/* Inline expanded detail */}
      <div
        className={`overflow-hidden bg-white shadow-[0_10px_40px_-15px_rgba(32,28,27,0.12)] transition-all ${
          selected ? "opacity-100 rounded-b-3xl animate-fade-in" : "max-h-0 opacity-0"
        }`}
        style={{
          height: selected && detailHeight ? `${detailHeight}px` : undefined,
          transitionDuration: "500ms",
          transitionTimingFunction: "cubic-bezier(0.33, 1, 0.68, 1)",
          animationDuration: "500ms",
          animationFillMode: "both",
        }}
      >
        {selected && details && (
          <InlineDetail vacancy={vacancy} details={details} detailHeight={detailHeight} />
        )}
      </div>
    </div>
  );
};

const InlineDetail = ({
  vacancy,
  details,
  detailHeight,
}: {
  vacancy: Vacancy;
  details: VacancyDetails;
  detailHeight?: number;
}) => {
  const score = useCountUp(vacancy.score, 1200, true);
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const scoreColor =
    vacancy.score > 85 ? "#22c55e" : vacancy.score > 60 ? "#ff6b1a" : "#ef4444";

  return (
    <div className="border-t border-foreground/5 px-5 pb-5 pt-5 sm:px-8 sm:pb-6 sm:pt-6">
        {/* Score gauge */}
        <div className="flex items-center gap-4 sm:gap-6">
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
            className="flex-1 text-sm leading-snug text-foreground/80 sm:text-base sm:leading-relaxed animate-fade-in"
            style={{ animationDelay: "500ms", animationFillMode: "both", animationDuration: "600ms", animationTimingFunction: "cubic-bezier(0.33, 1, 0.68, 1)" }}
          >
            {details.commentary}
          </div>
        </div>

        {/* Strengths & gaps */}
        <div className="grid grid-cols-1 gap-4 pt-5 sm:grid-cols-2 sm:gap-6 sm:pt-6">
          <div
            className="animate-fade-in"
            style={{ animationDelay: "650ms", animationFillMode: "both", animationDuration: "600ms", animationTimingFunction: "cubic-bezier(0.33, 1, 0.68, 1)" }}
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
            <ul className="mt-2 space-y-1.5">
              {details.strengths.map((p, i) => (
                <li
                  key={p.text}
                  className="flex items-start gap-2 text-sm text-foreground/80 animate-fade-in"
                  style={{
                    animationDelay: `${750 + i * 120}ms`,
                    animationFillMode: "both",
                    animationDuration: "600ms",
                    animationTimingFunction: "cubic-bezier(0.33, 1, 0.68, 1)",
                  }}
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="animate-fade-in"
            style={{ animationDelay: "800ms", animationFillMode: "both", animationDuration: "600ms", animationTimingFunction: "cubic-bezier(0.33, 1, 0.68, 1)" }}
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground/10">
                <Minus className="h-3 w-3 text-foreground/70" strokeWidth={3} />
              </span>
              Gaps to consider
            </div>
            <ul className="mt-2 space-y-1.5">
              {details.gaps.map((p, i) => (
                <li
                  key={p.text}
                  className="flex items-start gap-2 text-sm text-foreground/80 animate-fade-in"
                  style={{
                    animationDelay: `${900 + i * 120}ms`,
                    animationFillMode: "both",
                    animationDuration: "600ms",
                    animationTimingFunction: "cubic-bezier(0.33, 1, 0.68, 1)",
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
  );
};

const AnimatedCursor = ({
  stage,
}: {
  stage: "hidden" | "moving" | "clicking" | "done";
}) => {
  // Approximate top-right arrow position of the first card (~28px from top,
  // ~28px from right on desktop / mobile).
  const targetRight = 28;
  const targetTop = 36;

  const visible = stage !== "hidden" && stage !== "done";
  // Start position: below and to the left of the target
  const startRight = 180;
  const startTop = 220;

  const isMoving = stage === "moving" || stage === "clicking";
  const right = isMoving ? targetRight : startRight;
  const top = isMoving ? targetTop : startTop;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-20 hidden sm:block"
      style={{
        right: `${right}px`,
        top: `${top}px`,
        opacity: visible ? 1 : 0,
        transition:
          "right 900ms cubic-bezier(0.33, 1, 0.68, 1), top 900ms cubic-bezier(0.33, 1, 0.68, 1), opacity 300ms ease",
      }}
    >
      <div className="relative">
        {stage === "clicking" && (
          <span
            className="absolute -left-2 -top-2 h-8 w-8 rounded-full border-2 border-foreground/50"
            style={{
              animation: "cursor-ping 400ms cubic-bezier(0, 0, 0.2, 1)",
            }}
          />
        )}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.25))",
            transform: stage === "clicking" ? "scale(0.9)" : "scale(1)",
            transition: "transform 120ms ease",
          }}
        >
          <path
            d="M4 3l7 17 2.5-7L20 10.5 4 3z"
            fill="#201C1B"
            stroke="#FAF9F5"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <style>{`
        @keyframes cursor-ping {
          0% { transform: scale(0.4); opacity: 0.9; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Screening;
