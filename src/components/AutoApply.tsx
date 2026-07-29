import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, FileText, Send, Sparkles } from "lucide-react";

const steps = [
  { icon: Sparkles, label: "Pre-fills your profile", description: "Name, CV, experience, preferences." },
  { icon: FileText, label: "Answers custom questions", description: "Screening questions, cover letter, availability." },
  { icon: Send, label: "Submits the application", description: "Directly on the company’s careers page." },
];

const AutoApply = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [started, setStarted] = useState(false);
  const [complete, setComplete] = useState(false);

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
    const start = setTimeout(() => setStarted(true), 900);
    const finish = setTimeout(() => setComplete(true), 3600);
    return () => {
      clearTimeout(start);
      clearTimeout(finish);
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
            animation: inView ? "fade-down 0.6s ease-out both" : undefined,
            animationDelay: "0ms",
            opacity: inView ? undefined : 0,
          }}
        >
          <span className="h-px w-8 bg-muted-foreground/50" />
          <span>Auto-apply</span>
        </div>

        <h2
          className="mt-8 max-w-5xl text-[clamp(2.25rem,7vw,5rem)] font-medium leading-[1.05] tracking-tight text-foreground md:text-6xl"
          style={{
            animation: inView ? "fade-down 0.6s ease-out both" : undefined,
            animationDelay: "120ms",
            opacity: inView ? undefined : 0,
          }}
        >
          You click Apply.<br className="hidden sm:block" /> We do the rest.
        </h2>
        <p
          className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg"
          style={{
            animation: inView ? "fade-down 0.6s ease-out both" : undefined,
            animationDelay: "240ms",
            opacity: inView ? undefined : 0,
          }}
        >
          No more forms, uploads, or copy-paste. Else completes and submits every application on your behalf.
        </p>

        <div className="mt-12 grid items-start gap-8 sm:mt-16 lg:grid-cols-12 lg:gap-12">
          {/* Demo card */}
          <div
            className="lg:col-span-7"
            style={{
              animation: inView ? "fade-down 0.6s ease-out both" : undefined,
              animationDelay: "360ms",
              opacity: inView ? undefined : 0,
            }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_10px_40px_-12px_rgba(32,28,27,0.15)] sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                  <span className="text-lg font-semibold">E</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="truncate text-lg font-medium text-foreground">Senior Product Manager</h3>
                      <p className="text-sm text-muted-foreground">Ecosia · Berlin · Hybrid</p>
                    </div>
                    <button
                      type="button"
                      className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-black px-4 py-2 text-sm text-white transition-transform active:scale-95"
                      onClick={() => {
                        setStarted(true);
                        setTimeout(() => setComplete(true), 2700);
                      }}
                    >
                      <span className="absolute inset-y-0 left-0 w-0 bg-[#ff6b1a] transition-[width] duration-500 ease-out group-hover:w-full" aria-hidden />
                      <span className="relative z-10">Apply</span>
                      <span className="relative z-10" aria-hidden>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    {steps.map((step, i) => (
                      <div
                        key={step.label}
                        className="flex items-center gap-4 rounded-2xl border border-border/50 bg-secondary/50 px-4 py-3.5 transition-all duration-500"
                        style={{
                          opacity: started ? 1 : 0.5,
                          transform: started ? "translateX(0)" : "translateX(-12px)",
                          transitionDelay: started ? `${i * 350}ms` : "0ms",
                        }}
                      >
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-500"
                          style={{
                            backgroundColor: complete || (started && i < 2) ? "#ff6b1a" : "#000000",
                            transitionDelay: started ? `${i * 350 + 200}ms` : "0ms",
                          }}
                        >
                          {complete || (started && i < 2) ? (
                            <Check className="h-4 w-4 text-white" />
                          ) : (
                            <step.icon className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{step.label}</p>
                          <p className="text-xs text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {complete && (
                    <div
                      className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground"
                      style={{ animation: "fade-in 0.5s ease-out both" }}
                    >
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6b1a] text-white">
                        <Check className="h-3 w-3" />
                      </span>
                      Application submitted on Ecosia’s careers page.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Value props */}
          <div
            className="flex flex-col gap-4 lg:col-span-5"
            style={{
              animation: inView ? "fade-down 0.6s ease-out both" : undefined,
              animationDelay: "480ms",
              opacity: inView ? undefined : 0,
            }}
          >
            {[
              { label: "One click", text: "Every application starts with a single tap. No re-typing your CV." },
              { label: "Works on any portal", text: "Greenhouse, Lever, Workday, Ashby — we handle the format." },
              { label: "Always on-brand", text: "We adapt your answers to each company’s tone and role requirements." },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border/50 bg-white p-5 shadow-sm"
              >
                <h4 className="text-base font-medium text-foreground">{item.label}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-12 flex justify-center sm:mt-16"
          style={{
            animation: inView ? "fade-down 0.6s ease-out both" : undefined,
            animationDelay: "600ms",
            opacity: inView ? undefined : 0,
          }}
        >
          <a
            href="https://app.tryelse.xyz/register"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-black px-6 py-3.5 text-sm text-white sm:text-base"
          >
            <span className="absolute inset-y-0 left-0 w-0 bg-[#ff6b1a] transition-[width] duration-500 ease-out group-hover:w-full" aria-hidden />
            <span className="relative z-10">Try for free</span>
            <span className="relative z-10" aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AutoApply;
