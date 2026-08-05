import { useInView } from "@/hooks/useInView";

const ClosingCTA = () => {
  const { ref: sectionRef, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24 lg:py-32 2xl:px-32"
      style={{ backgroundColor: "#f3f1e9" }}
    >
      <div className="mx-auto max-w-4xl">
        <div className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-3xl bg-white p-8 text-center shadow-[0_4px_24px_-12px_rgba(32,28,27,0.12)] sm:p-12 md:p-16 lg:gap-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.68]"
            aria-hidden
            style={{
              backgroundImage: "radial-gradient(circle, #f3f1e9 2.5px, transparent 2.5px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative z-10 w-full rounded-2xl bg-white px-6 py-4 sm:px-8 sm:py-6">
            <h2
              className={`mx-auto max-w-2xl text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-foreground ${
                inView ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: "0ms", animationFillMode: "backwards" }}
            >
              Start auto applying today.
            </h2>
            <p
              className={`mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg ${
                inView ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: "150ms", animationFillMode: "backwards" }}
            >
              Upload your resume, review your matches, and approve tailored applications in minutes.
            </p>
          </div>
          <a
            href="https://app.tryelse.xyz/register"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative z-10 mt-2 inline-flex items-center gap-2 overflow-hidden rounded-full bg-black px-6 py-3.5 text-sm text-white transition-colors sm:text-base ${
              inView ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
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
