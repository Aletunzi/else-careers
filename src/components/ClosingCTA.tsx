import { useEffect, useRef, useState } from "react";

const ClosingCTA = () => {
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
      className="px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24 lg:py-32 2xl:px-32"
      style={{ backgroundColor: "#f3f1e9" }}
    >
      <div className="mx-auto max-w-4xl">
        <div
          className={`flex flex-col items-center justify-center gap-6 rounded-3xl bg-white p-8 text-center shadow-[0_12px_40px_-12px_rgba(32,28,27,0.1)] ring-1 ring-border/50 transition-all duration-700 ease-out sm:p-12 md:p-16 lg:gap-8 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          }`}
        >
          <h2 className="max-w-2xl text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-foreground">
            Start auto applying today.
          </h2>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            Upload your resume, review your matches, and approve tailored applications in minutes.
          </p>
          <a
            href="https://app.tryelse.xyz/register"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-2 inline-flex items-center gap-2 overflow-hidden rounded-full bg-black px-6 py-3.5 text-sm text-white transition-colors sm:text-base"
          >
            <span
              className="absolute inset-y-0 left-0 w-0 bg-[#ff6b1a] transition-[width] duration-500 ease-out group-hover:w-full"
              aria-hidden
            />
            <span className="relative z-10">Start Applying</span>
            <span className="relative z-10" aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClosingCTA;
