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
      className="bg-closing px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24 lg:py-32 2xl:px-32"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 md:flex-row md:items-center md:gap-16">
        <div
          className={`max-w-2xl transition-all duration-700 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          }`}
          style={{ transitionDelay: inView ? "0ms" : "0ms" }}
        >
          <h2 className="text-[clamp(2.25rem,7vw,5rem)] font-medium leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Start Auto Applying today.
          </h2>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Upload your resume, review your matches, and approve tailored applications in minutes.
          </p>
        </div>

        <div
          className={`transition-all duration-700 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          }`}
          style={{ transitionDelay: inView ? "160ms" : "0ms" }}
        >
          <a
            href="https://app.tryelse.xyz/register"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-black px-6 py-3.5 text-sm text-white transition-colors sm:text-base"
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
