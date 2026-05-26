import { useState } from "react";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    q: "Do you cover roles outside Europe?",
    a: "Right now Else is laser-focused on product & tech roles in Europe — it's the market we know best, and where most of our coverage advantage exists. Other regions are on the roadmap.",
  },
  {
    q: "How is this different from Otta, Wellfound or LinkedIn?",
    a: "Else aggregates roles from thousands of company career pages directly, surfacing positions you won't find on traditional job boards. We focus on quality and freshness over volume.",
  },
  {
    q: "How fresh are the listings?",
    a: "We re-scan our company sources continuously, so most listings are updated within 24-48 hours of being posted or removed.",
  },
  {
    q: "Do you only show product roles?",
    a: "Today our coverage is centered on product, design and adjacent tech roles. Expanding to more functions is on the roadmap.",
  },
  {
    q: "How does the search actually work?",
    a: "You describe what you're looking for in natural language and our search engine matches it against our indexed roles, considering title, seniority, location, industry and company stage.",
  },
  {
    q: "Is it free?",
    a: "Else is free to use with a limited number of searches. For unlimited access, create an account.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-background px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24 lg:py-32 2xl:px-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
        <div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-px w-8 bg-muted-foreground/50" />
            <span>FAQ</span>
          </div>
          <h2 className="mt-3 text-4xl font-normal leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
            Things you probably want to ask.
          </h2>
          <p className="mt-8 text-base text-muted-foreground">
            Still curious?{" "}
            <a
              href="mailto:hello@tryelse.xyz"
              className="text-foreground underline decoration-[#ff6b1a] decoration-2 underline-offset-4 transition-colors hover:text-[#ff6b1a]"
            >
              hello@tryelse.xyz
            </a>
          </p>
        </div>

        <div className="flex flex-col">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-t border-border last:border-b">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-base font-medium text-foreground sm:text-lg">{f.q}</span>
                  {isOpen ? (
                    <X className="h-5 w-5 shrink-0 text-foreground" strokeWidth={1.5} />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-foreground" strokeWidth={1.5} />
                  )}
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