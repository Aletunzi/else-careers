import { useEffect, useRef, useState } from "react";

type Plan = {
  name: string;
  tagline: string;
  price: string;
  period: string;
  cta: string;
  href: string;
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    tagline: "Dip in and see what's out there.",
    price: "Free",
    period: "forever",
    cta: "Start free",
    href: "https://app.tryelse.xyz/register",
  },
  {
    name: "Weekly pass",
    tagline: "For an intense, focused sprint.",
    price: "€4.99",
    period: "per week",
    cta: "Get the weekly pass",
    href: "https://app.tryelse.xyz/register",
    featured: true,
  },
  {
    name: "Monthly pass",
    tagline: "For a longer, steady search.",
    price: "€15.99",
    period: "per month",
    cta: "Get the monthly pass",
    href: "https://app.tryelse.xyz/register",
  },
];

const Pricing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "-20% 0px -10% 0px" }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: "#f3f1e9" }}
      className="px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24 lg:py-32 2xl:px-32"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className={`flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
          style={{ transitionDelay: inView ? "0ms" : "0ms" }}
        >
          <span className="h-px w-8 bg-muted-foreground/50" />
          <span>Pricing</span>
        </div>
        <h2
          className={`mt-6 max-w-4xl text-4xl font-medium leading-[1.05] text-foreground transition-all duration-700 ease-out sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[68px] ${inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
          style={{ transitionDelay: inView ? "120ms" : "0ms" }}
        >
          A plan for <span style={{ color: "#ff6b1a" }}>every</span> kind of search.
        </h2>
        <p
          className={`mt-6 text-base text-muted-foreground transition-all duration-700 ease-out sm:text-lg ${inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
          style={{ transitionDelay: inView ? "240ms" : "0ms" }}
        >
          We know that when looking for a job, some weeks are intense, others quiet. So we offer plans that adapt to all cases.
        </p>

        <div className="mt-20 grid grid-cols-1 gap-6 md:mt-24 md:grid-cols-3 md:items-center">
          {plans.map((p, i) => {
            const isFeatured = !!p.featured;
            return (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-3xl px-6 py-10 transition-all duration-700 ease-out sm:px-7 sm:py-12 ${
                  isFeatured
                    ? "shadow-[0_30px_60px_-20px_rgba(32,28,27,0.35)] md:scale-[1.04]"
                    : "shadow-[0_4px_24px_-12px_rgba(32,28,27,0.12)]"
                } ${inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
                style={{
                  backgroundColor: isFeatured ? "#000000" : "#ffffff",
                  color: isFeatured ? "#ffffff" : undefined,
                  transitionDelay: inView ? `${360 + i * 120}ms` : "0ms",
                }}
              >
                {isFeatured && (
                  <div
                    className="absolute -top-3 left-7 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white"
                    style={{ backgroundColor: "#ff6b1a" }}
                  >
                    Most popular
                  </div>
                )}

                <h3 className="text-lg font-semibold sm:text-xl">{p.name}</h3>
                <p
                  className={`mt-1.5 text-xs sm:text-sm ${isFeatured ? "text-white/70" : "text-muted-foreground"}`}
                >
                  {p.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight sm:text-5xl">{p.price}</span>
                  <span
                    className={`text-[10px] uppercase tracking-wider sm:text-xs ${isFeatured ? "text-white/60" : "text-muted-foreground"}`}
                  >
                    {p.period}
                  </span>
                </div>

                <div
                  className={`mt-6 h-px w-full ${isFeatured ? "bg-white/15" : "bg-border"}`}
                />

                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium transition-colors ${
                    isFeatured
                      ? "text-white hover:opacity-90"
                      : "bg-black text-white hover:bg-black/90"
                  }`}
                  style={isFeatured ? { backgroundColor: "#ff6b1a" } : undefined}
                >
                  {p.cta}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;