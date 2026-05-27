import { useEffect, useRef, useState } from "react";
import { MapPin, X } from "lucide-react";
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
  {
    company: "AUTO1 Group",
    title: "Senior Product Manager, Conversational AI for Customer Service (f/m/d)",
    location: "Remote",
    type: "Remote",
  },
  {
    company: "Klarna",
    title: "Head of Product, Climate Impact (f/m/d)",
    location: "Berlin, Germany",
    type: "Hybrid · 2 days/week",
  },
  {
    company: "Ecosia",
    title: "Senior Product Manager, Green Search Experience",
    location: "Berlin, Germany",
    type: "Remote",
  },
  {
    company: "1Komma5°",
    title: "Lead Product Manager, Energy Platform (f/m/d)",
    location: "Hamburg, Germany",
    type: "Hybrid · 1 day/week",
  },
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

  useEffect(() => {
    if (!showResults) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    return () => {
      const y = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(y || "0", 10) * -1);
    };
  }, [showResults]);

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
          <div className="mx-auto w-full max-w-3xl rounded-3xl bg-white p-5 shadow-[0_10px_40px_-12px_rgba(32,28,27,0.15)] sm:p-8 md:p-10">
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
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="https://app.tryelse.xyz/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#201c1b] px-6 py-3.5 text-sm text-white transition-opacity hover:opacity-90 sm:text-base"
            >
              Run this search
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
        @keyframes tryit-sheet-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes tryit-overlay-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {showResults && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
          style={{ animation: "tryit-overlay-in 300ms ease-out both" }}
          onClick={() => setShowResults(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-t-3xl bg-background p-5 shadow-[0_-10px_40px_-12px_rgba(32,28,27,0.25)] sm:p-8"
            style={{ animation: "tryit-sheet-up 450ms cubic-bezier(0.22, 1, 0.36, 1) both", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-foreground/15" />
            <button
              onClick={() => setShowResults(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="mb-5 text-lg font-medium text-foreground sm:text-xl">4 matches found</h3>
            <div className="flex flex-col gap-3 overflow-y-auto pr-1" style={{ maxHeight: "calc(90vh - 8rem)" }}>
              {RESULTS.map((r, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-foreground/10 bg-white p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm text-muted-foreground">{r.company}</span>
                    <a
                      href="https://app.tryelse.xyz/register"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 rounded-full border border-foreground/30 px-4 py-1.5 text-sm text-foreground transition-colors hover:bg-foreground hover:text-white"
                    >
                      Apply <span aria-hidden>↗</span>
                    </a>
                  </div>
                  <h4 className="mt-3 text-base font-semibold text-foreground sm:text-lg">
                    {r.title}
                  </h4>
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{r.location}</span>
                  </div>
                  <div className="my-4 h-px bg-foreground/10" />
                  <div className="text-sm text-muted-foreground">{r.type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TryIt;