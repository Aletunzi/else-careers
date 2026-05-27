import { useEffect, useRef, useState } from "react";
import elseMark from "@/assets/else-mark-white.svg";
import userAvatar from "@/assets/user-avatar.jpg";

type Tag = string;
type Msg =
  | { from: "you"; text: string }
  | { from: "else"; text: string; tags?: Tag[] };

const SCRIPT: Msg[] = [
  { from: "you", text: "Find me a Head of Product role at climate-tech startups in Berlin" },
  {
    from: "else",
    text: "I've found 8 matches, with 3 stealth-stage startups and 5 from Series B on. Do you want to narrow the search?",
  },
  { from: "you", text: "Only the ones that are remote-friendly, please." },
  {
    from: "else",
    text: "Narrowed to 4, 2 of them remote friendly and 2 hybrid 1-2 days/week. Here you are:",
  },
];

const RESULTS = [
  { company: "Ecosia", title: "Head of Product, Climate", type: "Remote" },
  { company: "1Komma5°", title: "Senior PM, Energy Platform", type: "Hybrid" },
  { company: "Klarna", title: "Lead PM, Green Payments", type: "Remote" },
  { company: "Auto1", title: "Senior PM, Conversational AI", type: "Hybrid" },
];

const TryIt = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState<null | "you" | "else">(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, delay: number) => {
      timeouts.push(setTimeout(() => !cancelled && fn(), delay));
    };

    let t = 400;
    SCRIPT.forEach((m, i) => {
      schedule(() => setTyping(m.from), t);
      t += 900;
      schedule(() => {
        setTyping(null);
        setVisibleCount(i + 1);
      }, t);
      t += m.from === "you" ? 700 : 1400;
    });
    schedule(() => setShowResults(true), t + 600);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [inView]);

  return (
    <section
      ref={ref}
      className="bg-background px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24 lg:py-32 2xl:px-32"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          style={{
            animation: inView ? "tryit-fade-down 700ms ease-out both" : undefined,
            animationDelay: "0ms",
            opacity: inView ? undefined : 0,
          }}
        >
          <span className="h-px w-8 bg-muted-foreground/50" />
          <span>How it works</span>
        </div>

        <h2
          className="mt-8 max-w-5xl text-[clamp(2.25rem,7vw,5rem)] font-medium leading-[1.05] tracking-tight text-foreground md:text-6xl"
          style={{
            animation: inView ? "tryit-fade-down 700ms ease-out both" : undefined,
            animationDelay: "120ms",
            opacity: inView ? undefined : 0,
          }}
        >
          Search the way you actually{" "}
          <span style={{ color: "#ff6b1a" }}>think</span>.
        </h2>
        <p
          className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg"
          style={{
            animation: inView ? "tryit-fade-down 700ms ease-out both" : undefined,
            animationDelay: "240ms",
            opacity: inView ? undefined : 0,
          }}
        >
          No filter trees. Just talk to Else like you would to a friend.
        </p>

        <div className="mt-12 sm:mt-16 md:mt-20">
          <div
            className="relative mx-auto flex w-full max-w-3xl flex-col rounded-3xl bg-white p-5 shadow-[0_10px_40px_-12px_rgba(32,28,27,0.15)] sm:p-8 md:p-10"
            style={{
              animation: inView ? "tryit-fade-down 700ms ease-out both" : undefined,
              animationDelay: "360ms",
              opacity: inView ? undefined : 0,
            }}
          >
            <div className="flex flex-col gap-6">
              {SCRIPT.map((m, i) => {
                const shown = i < visibleCount;
                const isTyping = typing === m.from && i === visibleCount;
                if (!shown && !isTyping) return null;

                const dots = (
                  <div className="flex items-center gap-1 py-1">
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        className={`h-1.5 w-1.5 rounded-full ${
                          m.from === "you" ? "bg-white/70" : "bg-foreground/40"
                        }`}
                        style={{
                          animation: "tryit-bounce 1s ease-in-out infinite",
                          animationDelay: `${d}ms`,
                        }}
                      />
                    ))}
                  </div>
                );

                if (m.from === "you") {
                  return (
                    <div key={i} className="flex items-end justify-end gap-3">
                      <div className="max-w-[80%] rounded-[22px] bg-[#201c1b] px-5 py-3 text-sm text-white sm:text-base">
                        {isTyping ? dots : m.text}
                      </div>
                      <img
                        src={userAvatar}
                        alt="you"
                        loading="lazy"
                        width={32}
                        height={32}
                        className="h-8 w-8 shrink-0 rounded-full object-cover"
                      />
                    </div>
                  );
                }
                return (
                  <div key={i} className="flex items-end gap-3">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: "#ff6b1a" }}
                    >
                      <img src={elseMark} alt="else" className="h-3.5 w-3.5" />
                    </div>
                    <div className={`rounded-[22px] bg-[#f5efe6] px-5 py-3 ${isTyping ? "" : "flex-1"}`}>
                      {isTyping ? dots : (
                        <p className="text-sm text-foreground sm:text-base">{m.text}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

              {showResults && visibleCount >= SCRIPT.length && (
                <div
                  className="mt-3 flex gap-3"
                  style={{ animation: "tryit-overlay-in 400ms ease-out both" }}
                >
                  <div className="h-8 w-8 shrink-0" aria-hidden />
                  <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
                    {RESULTS.map((r, i) => (
                      <div
                        key={i}
                        className="group flex items-center justify-between gap-3 rounded-[22px] bg-[#f5efe6] px-4 py-3"
                        style={{
                          animation: "tryit-card-in 400ms ease-out both",
                          animationDelay: `${i * 100}ms`,
                        }}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <span className="truncate">{r.company}</span>
                            <span className="text-foreground/30">·</span>
                            <span className="shrink-0">{r.type}</span>
                          </div>
                          <div className="mt-0.5 truncate text-sm font-medium text-foreground">{r.title}</div>
                        </div>
                        <a
                          href="https://app.tryelse.xyz/register"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Apply to ${r.title}`}
                          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-foreground/25 px-2.5 py-1 text-[11px] text-foreground transition-colors hover:bg-foreground hover:text-white"
                        >
                          Apply <span aria-hidden>↗</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          <div
            className="mt-10 flex justify-center"
            style={{
              animation: inView ? "tryit-fade-down 700ms ease-out both" : undefined,
              animationDelay: "480ms",
              opacity: inView ? undefined : 0,
            }}
          >
            <a
              href="https://app.tryelse.xyz/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#201c1b] px-6 py-3.5 text-sm text-white transition-colors duration-300 ease-out hover:bg-[#ff6b1a] sm:text-base"
            >
              Try for free
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tryit-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes tryit-fade-down {
          from { opacity: 0; transform: translateY(-14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tryit-overlay-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes tryit-card-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </section>
  );
};

export default TryIt;