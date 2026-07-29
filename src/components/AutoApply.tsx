import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, FileText, Send, Sparkles } from "lucide-react";

const steps = [
  { icon: Sparkles, label: "Prefilling your profile", description: "Name, CV, experience, preferences." },
  { icon: FileText, label: "Answering custom questions", description: "Screening questions, cover letter, availability." },
  { icon: Send, label: "Submitting application", description: "Directly on the company's careers page." },
  { icon: Check, label: "Application submitted!", description: "You're done. We'll keep you posted." },
];

const AutoApply = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState(0);

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
    // Simulated click on the Apply button, then the sequence starts.
    const press = setTimeout(() => setButtonPressed(true), 600);
    const release = setTimeout(() => setButtonPressed(false), 900);
    const start = setTimeout(() => setStarted(true), 900);
    return () => {
      clearTimeout(press);
      clearTimeout(release);
      clearTimeout(start);
    };
  }, [inView]);

  useEffect(() => {
    if (!started) return;
    const timers: number[] = [];
    for (let i = 0; i <= steps.length; i++) {
      timers.push(window.setTimeout(() => setPhase(i), i * 1000));
    }
    return () => timers.forEach(clearTimeout);
  }, [started]);

  return (
    <section
      ref={ref}
      className="bg-background px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24 lg:py-32 2xl:px-32"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          style={{
            animation: inView ? "fade-down 0.6s ease-out both" : undefined,
            animationDelay: "0ms",
            opacity: inView ? undefined : 0,
          }}
        >
          <span className="h-px w-8 bg-muted-foreground/50" />
          <span>Auto-apply</span>
          <span className="h-px w-8 bg-muted-foreground/50" />
        </div>

        <h2
          className="mx-auto mt-8 max-w-4xl text-center text-[clamp(2.25rem,7vw,5rem)] font-medium leading-[1.05] tracking-tight text-foreground md:text-6xl"
          style={{
            animation: inView ? "fade-down 0.6s ease-out both" : undefined,
            animationDelay: "120ms",
            opacity: inView ? undefined : 0,
          }}
        >
          You click Apply.<br className="hidden sm:block" /> We do the rest.
        </h2>
        <p
          className="mx-auto mt-5 max-w-2xl text-center text-base text-muted-foreground sm:text-lg"
          style={{
            animation: inView ? "fade-down 0.6s ease-out both" : undefined,
            animationDelay: "240ms",
            opacity: inView ? undefined : 0,
          }}
        >
          No more forms, uploads, or copy-paste. Else completes and submits every application on your behalf.
        </p>

        <div
          className="mx-auto mt-12 max-w-2xl sm:mt-16"
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
                    className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-sm text-white transition-all duration-200 active:scale-95"
                    style={{
                      backgroundColor: buttonPressed ? "#ff6b1a" : "#000000",
                      transform: buttonPressed ? "scale(0.95)" : "scale(1)",
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
                  {steps.map((step, i) => {
                    const completed = phase > i;
                    const active = phase === i && started;
                    const pending = phase < i || !started;

                    return (
                      <div
                        key={step.label}
                        className="flex items-center gap-4 rounded-2xl border border-border/50 bg-secondary/50 px-4 py-3.5 transition-all duration-500"
                        style={{
                          opacity: pending ? 0.5 : 1,
                          transform: pending ? "translateX(-12px)" : "translateX(0)",
                          transitionDelay: started ? `${i * 200}ms` : "0ms",
                        }}
                      >
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-500"
                          style={{
                            backgroundColor: completed ? "#ff6b1a" : "#000000",
                            transitionDelay: started ? `${i * 200 + 200}ms` : "0ms",
                          }}
                        >
                          {completed ? (
                            <Check className="h-4 w-4 text-white" />
                          ) : (
                            <step.icon className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {step.label}
                            {active && (
                              <span className="ml-1 inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff6b1a]" />
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
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
