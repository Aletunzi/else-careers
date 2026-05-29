import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Do you cover roles outside Europe?",
    a: "Right now Else is laser-focused on product & tech roles in Europe, so we can provide the widest and most in-depth coverage possible across the region.",
  },
  {
    q: "How is this different from tools like Linkedin?",
    a: "We do a selective, hand-curated job on the list of companies we track, so we can offer the broadest coverage that other platforms simply don't have.",
  },
  {
    q: "How fresh are the listings?",
    a: "Our agents continuously monitor the companies and their career pages, reaching a near real-time level of freshness on every listing.",
  },
  {
    q: "Do you only show product roles?",
    a: "Today our coverage is centered on product, design and adjacent tech roles. Expanding to more functions is on the roadmap.",
  },
  {
    q: "How does the search actually work?",
    a: "You describe what you're looking for in natural language and our search engine matches it against our indexed roles, considering criteria such as title, seniority, location, industry and company stage.",
  },
  {
    q: "Is it free?",
    a: "Else is free to use with a limited number of searches. We also offer paid plans to get the most out of Else.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
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
      { threshold: 0, rootMargin: '-25% 0px -15% 0px' }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: "#f3f1e9" }} className="px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24 lg:py-32 2xl:px-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
        <div
          className={`relative md:pt-0 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
        >
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground md:absolute md:-top-10 md:left-0">
            <span className="h-px w-8 bg-muted-foreground/50" />
            <span>FAQ</span>
          </div>
          <h2 className="mt-6 text-4xl font-medium leading-[1.05] text-foreground sm:text-5xl md:mt-0 md:text-6xl md:font-medium">
            Things you probably want to ask.
          </h2>
          <p className="mt-8 text-base text-muted-foreground">
            Still curious?{" "}
            <a
              href="https://x.com/elsecareers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-[#ff6b1a] decoration-2 underline-offset-4 transition-colors hover:text-[#ff6b1a]"
            >
              Reach out
            </a>
          </p>
        </div>

        <div className="flex flex-col">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`${i === 0 ? '' : 'border-t'} border-border last:border-b transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
                style={{ transitionDelay: inView ? `${150 + i * 90}ms` : '0ms' }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`flex w-full items-center justify-between gap-6 ${i === 0 ? 'pb-6 md:pt-0' : 'py-6'} text-left`}
                >
                  <span className="text-base font-medium text-foreground sm:text-lg">{f.q}</span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-foreground transition-transform duration-300 ease-out ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                    strokeWidth={1.5}
                  />
                </button>
                <div
                  className="grid overflow-hidden transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <p className="pb-6 pr-10 text-sm text-muted-foreground sm:text-base">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;