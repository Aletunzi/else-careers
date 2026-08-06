import { useEffect, useState } from "react";
import { MapPin, Building2, Sparkles } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const ROLES = [
  { title: "Senior Product Manager", company: "Revolut", location: "London, UK", tags: ["Fintech", "Hybrid"], fit: "94% fit" },
  { title: "Head of Product", company: "Personio", location: "Munich, DE", tags: ["HR Tech", "On-site"], fit: "91% fit" },
  { title: "Product Lead, Growth", company: "Spotify", location: "Stockholm, SE", tags: ["Consumer", "Hybrid"], fit: "89% fit" },
  { title: "Group Product Manager", company: "Doctolib", location: "Paris, FR", tags: ["Health", "Remote"], fit: "87% fit" },
  { title: "Principal PM, Payments", company: "Adyen", location: "Amsterdam, NL", tags: ["Payments", "Hybrid"], fit: "85% fit" },
];

const ProductIntro = () => {
  const { ref, inView } = useInView<HTMLElement>();
  const [order, setOrder] = useState(ROLES.map((_, i) => i));
  const [swiping, setSwiping] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let timeout: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setSwiping(true);
      timeout = setTimeout(() => {
        setOrder((prev) => [...prev.slice(1), prev[0]]);
        setSwiping(false);
      }, 520);
    }, 2600);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [inView]);

  return (
    <section
      ref={ref}
      className="bg-background px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24 lg:py-32 2xl:px-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h2
            className={`max-w-2xl text-[clamp(2rem,6vw,3.75rem)] font-medium leading-[1.06] tracking-tight text-foreground ${inView ? "animate-fade-down" : "opacity-0"}`}
            style={{ animationFillMode: "both" }}
          >
            Stop applying for weeks. Start interviewing in days
          </h2>
          <p
            className={`mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg ${inView ? "animate-fade-down" : "opacity-0"}`}
            style={{ animationDelay: "150ms", animationFillMode: "both" }}
          >
            Else finds highly compatible roles, customizes your CV and cover letter, automatically
            applies, and prepares you live, so you go from submission to contract signing quickly.
          </p>
          <a
            href="https://app.tryelse.xyz/register"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3.5 text-sm text-primary-foreground sm:text-base ${inView ? "animate-fade-down" : "opacity-0"}`}
            style={{ animationDelay: "300ms", animationFillMode: "both" }}
          >
            <span
              className="absolute inset-y-0 left-0 w-0 bg-[#ff6b1a] transition-[width] duration-500 ease-out group-hover:w-full"
              aria-hidden
            />
            <span className="relative z-10">Start for free</span>
            <span className="relative z-10" aria-hidden>→</span>
          </a>
        </div>

        <div
          className={`relative mx-auto h-[380px] w-full max-w-sm sm:h-[420px] ${inView ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDelay: "450ms", animationFillMode: "both" }}
        >
          {order.map((roleIndex, pos) => {
            const role = ROLES[roleIndex];
            const isTop = pos === 0;
            const depth = Math.min(pos, 3);
            return (
              <div
                key={role.title}
                className="absolute inset-x-0 top-0 rounded-3xl bg-card p-6 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.18)] sm:p-8"
                style={{
                  zIndex: ROLES.length - pos,
                  transform: isTop && swiping
                    ? "translateX(120%) rotate(14deg)"
                    : `translateY(${depth * 16}px) scale(${1 - depth * 0.04}) rotate(${depth === 0 ? 0 : depth % 2 === 0 ? 1.5 : -1.5}deg)`,
                  opacity: isTop && swiping ? 0 : depth >= 3 ? 0 : 1,
                  transition: "transform 500ms cubic-bezier(0.4,0,0.2,1), opacity 500ms ease-out",
                  pointerEvents: "none",
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f3f1e9] px-3 py-1 text-xs font-medium text-foreground">
                    <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                    {role.fit}
                  </span>
                  <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">New</span>
                </div>

                <h3 className="mt-6 text-2xl font-semibold leading-tight text-foreground sm:text-[1.75rem]">
                  {role.title}
                </h3>

                <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Building2 className="h-4 w-4" strokeWidth={1.8} />
                    {role.company}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" strokeWidth={1.8} />
                    {role.location}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {role.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-secondary px-3 py-1.5 text-xs text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex items-center gap-3">
                  <span className="flex-1 rounded-full bg-primary py-3 text-center text-sm text-primary-foreground">
                    Apply
                  </span>
                  <span className="rounded-full bg-secondary px-5 py-3 text-center text-sm text-foreground/70">
                    Skip
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductIntro;
