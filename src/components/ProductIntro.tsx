import { useEffect, useState } from "react";
import { MapPin, Sparkles, Zap } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import userAvatar from "@/assets/user-avatar.jpg";

type Role = {
  kind: "role" | "match";
  title: string;
  company: string;
  domain: string;
  location: string;
  tags: string[];
  fit: string;
  why: string;
  salary: string;
  posted: string;
};

const DECK: Role[] = [
  {
    kind: "role",
    title: "Senior Product Manager",
    company: "Revolut",
    domain: "revolut.com",
    location: "London, UK",
    tags: ["Fintech", "Hybrid"],
    fit: "94% fit",
    why: "5 years in fintech PM roles, payments experience and B2C growth ownership match 9 of 11 requirements.",
    salary: "£95k – £120k",
    posted: "Posted 2 days ago",
  },
  {
    kind: "role",
    title: "Head of Product",
    company: "Personio",
    domain: "personio.com",
    location: "Munich, DE",
    tags: ["HR Tech", "On-site"],
    fit: "91% fit",
    why: "You've scaled a product team from 3 to 12 and led B2B SaaS roadmaps — exactly the seniority they ask for.",
    salary: "€110k – €135k",
    posted: "Posted 4 days ago",
  },
  {
    kind: "match",
    title: "Product Lead, Growth",
    company: "Spotify",
    domain: "spotify.com",
    location: "Remote",
    tags: ["Consumer", "Remote"],
    fit: "89% fit",
    why: "Growth experimentation and consumer subscription metrics are core to your last two roles.",
    salary: "€100k – €125k",
    posted: "Posted today",
  },
  {
    kind: "role",
    title: "Group Product Manager",
    company: "Doctolib",
    domain: "doctolib.fr",
    location: "Paris, FR",
    tags: ["Health", "Remote"],
    fit: "87% fit",
    why: "Marketplace background plus regulated-industry exposure covers their top three must-haves.",
    salary: "€90k – €110k",
    posted: "Posted 1 day ago",
  },
  {
    kind: "role",
    title: "Principal PM, Payments",
    company: "Adyen",
    domain: "adyen.com",
    location: "Amsterdam, NL",
    tags: ["Payments", "Hybrid"],
    fit: "85% fit",
    why: "Deep payments infrastructure knowledge and stakeholder work with enterprise merchants.",
    salary: "€105k – €130k",
    posted: "Posted 3 days ago",
  },
];

const Logo = ({ domain, company, className }: { domain: string; company: string; className?: string }) => (
  <img
    src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
    alt={`${company} logo`}
    className={className}
    loading="lazy"
  />
);

const ProductIntro = () => {
  const { ref, inView } = useInView<HTMLElement>();
  const [order, setOrder] = useState(DECK.map((_, i) => i));
  const [swiping, setSwiping] = useState(false);
  const [matchRevealed, setMatchRevealed] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;
    let cursor = 0;

    const schedule = (fn: () => void, ms: number) => {
      timers.push(setTimeout(() => !cancelled && fn(), ms));
    };

    const advance = () => {
      setSwiping(true);
      schedule(() => {
        setOrder((prev) => [...prev.slice(1), prev[0]]);
        setSwiping(false);
        setMatchRevealed(false);
        cursor = (cursor + 1) % DECK.length;
        schedule(runCycle, 60);
      }, 520);
    };

    const runCycle = () => {
      if (DECK[cursor].kind === "match") {
        // show the vacancy card first, then flip it into the match card
        schedule(() => setMatchRevealed(true), 2200);
        schedule(advance, 2200 + 2500);
      } else {
        schedule(advance, 3000);
      }
    };

    schedule(runCycle, 300);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      setSwiping(false);
      setMatchRevealed(false);
    };
  }, [inView]);

  return (
    <section
      ref={ref}
      className="bg-background px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24 lg:py-32 2xl:px-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
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
          className={`relative mx-auto h-[480px] w-full max-w-[340px] sm:h-[520px] sm:max-w-[390px] lg:max-w-[420px] ${inView ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDelay: "450ms", animationFillMode: "both" }}
        >
          {order.map((deckIndex, pos) => {
            const role = DECK[deckIndex];
            const isTop = pos === 0;
            const depth = Math.min(pos, 3);
            const isMatch = role.kind === "match" && isTop && matchRevealed;
            return (
              <div
                key={role.title}
                className={`absolute inset-x-0 top-0 h-[440px] overflow-hidden rounded-2xl p-5 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.22)] transition-colors duration-[900ms] ease-in-out sm:h-[480px] sm:p-6 ${isMatch ? "bg-[#201C1B]" : "bg-card"}`}
                style={{
                  zIndex: DECK.length - pos,
                  transform: isTop && swiping
                    ? "translateX(125%) rotate(14deg)"
                    : `translateY(${depth * 12}px) scale(${1 - depth * 0.04}) rotate(${depth === 0 ? 0 : depth % 2 === 0 ? 1.5 : -1.5}deg)`,
                  opacity: isTop && swiping ? 0 : depth >= 3 ? 0 : 1,
                  transition: "transform 500ms cubic-bezier(0.4,0,0.2,1), opacity 500ms ease-out",
                  pointerEvents: "none",
                }}
              >
                <div className="relative h-full">
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center"
                    style={{
                      opacity: isMatch ? 1 : 0,
                      transform: isMatch ? "scale(1)" : "scale(0.94)",
                      transition: "opacity 800ms ease-in-out, transform 800ms cubic-bezier(0.22,1,0.36,1)",
                      pointerEvents: "none",
                    }}
                    aria-hidden={!isMatch}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <img
                        src={userAvatar}
                        alt="Else user portrait"
                        width={816}
                        height={816}
                        loading="lazy"
                        className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20"
                      />
                      <Zap className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" style={{ color: "#ff6b1a" }} fill="#ff6b1a" strokeWidth={1.5} />
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card sm:h-20 sm:w-20">
                        <Logo domain={role.domain} company={role.company} className="h-9 w-9 object-contain sm:h-10 sm:w-10" />
                      </div>
                    </div>

                    <h3 className="mt-8 text-[1.65rem] font-medium leading-tight text-primary-foreground sm:text-3xl">
                      It's a Match!
                    </h3>
                    <p className="mt-2 text-sm text-primary-foreground/70 sm:text-base">
                      <span className="font-semibold text-primary-foreground">{role.company}</span> wants to meet you.
                    </p>
                    <div className="mt-6 rounded-full bg-white/10 px-4 py-2 text-xs text-primary-foreground sm:text-sm">
                      {role.title} · {role.location}
                    </div>
                    <p className="mt-6 max-w-[14rem] text-xs text-primary-foreground/60">
                      Interview prep is ready. Else briefs you live before the call.
                    </p>
                  </div>

                  <div
                    className="absolute inset-0 flex flex-col justify-between"
                    style={{
                      opacity: isMatch ? 0 : 1,
                      transform: isMatch ? "scale(1.04)" : "scale(1)",
                      transition: "opacity 700ms ease-in-out, transform 800ms cubic-bezier(0.22,1,0.36,1)",
                      pointerEvents: "none",
                    }}
                    aria-hidden={isMatch}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f3f1e9]">
                            <Logo domain={role.domain} company={role.company} className="h-7 w-7 object-contain" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-foreground sm:text-base">{role.company}</div>
                            <div className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
                              {role.location}
                            </div>
                          </div>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#f3f1e9] px-2.5 py-1 text-[0.65rem] font-medium text-foreground">
                          <Sparkles className="h-3 w-3" strokeWidth={2} />
                          {role.fit}
                        </span>
                      </div>

                      <h3 className="mt-4 text-[1.35rem] font-semibold leading-tight text-foreground sm:text-[1.5rem]">
                        {role.title}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {role.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-secondary px-2.5 py-1 text-[0.65rem] text-foreground/80 sm:text-xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="rounded-xl bg-secondary/60 px-3 py-2">
                          <div className="text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">Salary</div>
                          <div className="mt-0.5 text-xs font-semibold text-foreground sm:text-sm">{role.salary}</div>
                        </div>
                        <div className="rounded-xl bg-secondary/60 px-3 py-2">
                          <div className="text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">Freshness</div>
                          <div className="mt-0.5 text-xs font-semibold text-foreground sm:text-sm">{role.posted}</div>
                        </div>
                      </div>
                    </div>

                    <div className="my-3 flex flex-1 flex-col justify-center rounded-xl bg-[#f3f1e9] p-3">
                      <div className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-foreground/70">
                        <Sparkles className="h-3 w-3" style={{ color: "#ff6b1a" }} strokeWidth={2} />
                        Why it's a good fit
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {role.why}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="flex-1 rounded-full bg-primary py-2.5 text-center text-xs text-primary-foreground sm:text-sm">
                        Apply
                      </span>
                      <span className="rounded-full bg-secondary px-5 py-2.5 text-center text-xs text-foreground/70 sm:text-sm">
                        Skip
                      </span>
                    </div>
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

export default ProductIntro;
