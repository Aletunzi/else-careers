import { useEffect, useRef, useState } from "react";
import elseMark from "@/assets/else-mark-white.svg";
import userIcon from "@/assets/user-icon.png";

type Tag = string;
type Msg =
  | { from: "you"; text: string }
  | { from: "else"; text: string; tags?: Tag[] };

const SCRIPT: Msg[] = [
  { from: "you", text: "Find me a Head of Product role at climate-tech startups in Berlin" },
  {
    from: "else",
    text: "Found 47 matches across 9 sources. 3 are stealth-stage, 12 are Series B+.",
    tags: ["climate", "berlin", "47 results"],
  },
  { from: "you", text: "Only the ones that are remote-friendly, please." },
  {
    from: "else",
    text: "Narrowed to 19. Eight are fully remote, eleven are hybrid 1–2 days/week.",
    tags: ["remote", "19 results"],
  },
];

const TryIt = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState<null | "you" | "else">(null);

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
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1ece4]">
                        <img src={userIcon} alt="you" className="h-4 w-4" />
                      </div>
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
                      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-foreground/50">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#ff6b1a" }} />
                        <span>else</span>
                        <span>·</span>
                        <span>just now</span>
                      </div>
                      <p className="mt-2 text-sm text-foreground sm:text-base">{m.text}</p>
                      {m.tags && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {m.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-white px-3 py-1 font-mono text-[11px] text-foreground/80"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
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
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1ece4]">
                      <img src={userIcon} alt="you" className="h-4 w-4" />
                    </div>
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
      `}</style>
    </section>
  );
};

export default TryIt;