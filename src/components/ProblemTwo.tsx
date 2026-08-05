import { useInView } from "@/hooks/useInView";
import { useEffect, useRef, useState } from "react";
import { EyeOff, Filter, Ghost } from "lucide-react";

const STAT_ITEMS = [
  {
    icon: EyeOff,
    stat: "0.4%",
    headline: "of applications have a chance of being seen.",
    body: "Applying harder and manually is not going to work. Only 0.4% of applications get noticed.",
    delay: "300ms",
  },
  {
    icon: Filter,
    stat: "85%",
    headline: "of applications are filtered out by ATS.",
    body: "ATS kills 85% of applications. You have to know how to pass the check.",
    delay: "450ms",
  },
  {
    icon: Ghost,
    stat: "1 in 5",
    headline: "job posts aren't even real.",
    body: "1 in 5 job posts aren't even real. You have to focus on real opportunities.",
    delay: "600ms",
  },
];

const ProblemTwo = () => {
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
      className="bg-background px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24 lg:py-32 2xl:px-32"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className={`flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground ${inView ? "animate-fade-down" : "opacity-0"}`}
          style={{ animationFillMode: "both" }}
        >
          <span className="h-px w-8 bg-muted-foreground/50" />
          <span>The problem</span>
        </div>

        <h2
          className={`mt-8 max-w-5xl text-left text-[clamp(2.25rem,7vw,5rem)] font-medium leading-[1.05] tracking-tight text-foreground md:text-6xl ${inView ? "animate-fade-down" : "opacity-0"}`}
          style={{ animationDelay: "150ms", animationFillMode: "both" }}
        >
          Have you noticed that the job market is broken?
        </h2>



        <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 md:grid-cols-3 lg:gap-8">
          {STAT_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.headline}
                className={`group flex flex-col items-start rounded-2xl bg-white p-7 shadow-[0_4px_24px_-8px_rgba(32,28,27,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(32,28,27,0.12)] sm:p-8 lg:p-10 ${inView ? "animate-fade-down" : "opacity-0"}`}
                style={{ animationDelay: item.delay, animationFillMode: "both" }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf5ec] transition-colors duration-300 group-hover:bg-[#ff6b1a]/10"
                >
                  <Icon className="h-6 w-6" style={{ color: "#ff6b1a" }} strokeWidth={1.8} />
                </div>
                <div className="mt-6 flex flex-col text-left">
                  <div className="text-4xl font-semibold tracking-tight text-foreground tabular-nums sm:text-5xl">
                    {item.stat}
                  </div>
                  <div className="mt-2 min-h-[4.25rem] text-xl font-semibold leading-snug text-foreground sm:text-2xl lg:min-h-[4rem]">
                    {item.headline}
                  </div>
                </div>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemTwo;
