import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
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
    schedule(() => setShowResults(true), t + 200);

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
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-8 bg-muted-foreground/50" />
          <span>Try it</span>
        </div>

        <h2 className="mt-8 max-w-5xl text-[clamp(2.25rem,7vw,5rem)] font-medium leading-[1.05] tracking-tight text-foreground md:text-6xl">
          Search the way you actually{" "}
          <span style={{ color: "#ff6b1a" }}>think</span>.
        </h2>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          No filter trees. Just talk to Else like you would to a friend.
        </p>

        <div className="mt-12 sm:mt-16 md:mt-20">
          <div className="relative mx-auto flex w-full max-w-3xl min-h-[640px] flex-col rounded-3xl bg-white p-5 shadow-[0_10px_40px_-12px_rgba(32,28,27,0.15)] sm:min-h-[720px] sm:p-8 md:min-h-[780px] md:p-10">
            <div className="flex flex-col gap-6">
              {SCRIPT.map((m, i) => {
                const shown = i < visibleCount;
                if (m.from === "you") {
                  return (
                    <div
                      key={i}
                      className={`flex items-end justify-end gap-3 transition-all duration-500 ease-out ${
                        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none h-0 overflow-hidden"
                      }`}
                    >
                      <div className="max-w-[80%] rounded-[22px] bg-[#201c1b] px-5 py-3 text-sm text-white sm:text-base">
                        {m.text}
                      </div>
                      <img src={userAvatar} alt="you" loading="lazy" width={32} height={32} className="h-8 w-8 shrink-0 rounded-full object-cover" />
                    </div>
                  );
                }
                return (
                  <div
                    key={i}
                    className={`flex items-end gap-3 transition-all duration-500 ease-out ${
                      shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none h-0 overflow-hidden"
                    }`}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#ff6b1a" }}>
                      <img src={elseMark} alt="else" className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 rounded-[22px] bg-[#f5efe6] px-5 py-3">
                      <p className="text-sm text-foreground sm:text-base">{m.text}</p>
                    </div>
                  </div>
                );
              })}

              {typing && visibleCount < SCRIPT.length && (
                <div
                  className={`flex items-end gap-3 ${
                    typing === "you" ? "justify-end" : "justify-start"
                  }`}
                >
                  {typing === "else" && (
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: "#ff6b1a" }}
                    >
                      <img src={elseMark} alt="else" className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <div
                    className={`flex items-center gap-1 rounded-full px-4 py-3 ${
                      typing === "you" ? "bg-[#201c1b]" : "bg-[#f5efe6]"
                    }`}
                  >
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        className={`h-1.5 w-1.5 rounded-full ${typing === "you" ? "bg-white/70" : "bg-foreground/40"}`}
                        style={{
                          animation: "tryit-bounce 1s ease-in-out infinite",
                          animationDelay: `${d}ms`,
                        }}
                      />
                    ))}
                  </div>
                  {typing === "you" && (
                    <img src={userAvatar} alt="you" loading="lazy" width={32} height={32} className="h-8 w-8 shrink-0 rounded-full object-cover" />
                  )}
                </div>
              )}
            </div>

              {showResults && (
                <div
                  className="flex gap-3"
                  style={{ animation: "tryit-overlay-in 400ms ease-out both" }}
                >
                  <div className="h-8 w-8 shrink-0" aria-hidden />
                  <div className="flex flex-1 flex-col gap-2.5">
                    {RESULTS.map((r, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-foreground/10 bg-[#faf7f1] p-4 sm:p-5"
                        style={{
                          animation: "tryit-card-in 500ms ease-out both",
                          animationDelay: `${i * 120}ms`,
                        }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-xs text-muted-foreground sm:text-sm">{r.company}</span>
                          <a
                            href="https://app.tryelse.xyz/register"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex shrink-0 items-center gap-1 rounded-full border border-foreground/30 px-3 py-1 text-xs text-foreground transition-colors hover:bg-foreground hover:text-white sm:px-4 sm:py-1.5 sm:text-sm"
                          >
                            Apply <span aria-hidden>↗</span>
                          </a>
                        </div>
                        <h4 className="mt-2 text-sm font-semibold text-foreground sm:text-base">{r.title}</h4>
                        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{r.location}</span>
                        </div>
                        <div className="my-3 h-px bg-foreground/10" />
                        <div className="text-xs text-muted-foreground sm:text-sm">{r.type}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="https://app.tryelse.xyz/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#201c1b] px-6 py-3.5 text-sm text-white transition-opacity hover:opacity-90 sm:text-base"
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