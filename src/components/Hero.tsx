import { useState, useEffect, useRef } from "react";

const placeholders = [
  "I'm looking for a senior product manager role in Paris",
  "Find me a position as Head of Product in e-commerce startups in Germany",
  "List all the scale up companies in Poland that have junior product roles",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % placeholders.length);
        setVisible(true);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-1 flex-col items-center justify-start px-5 pt-20 pb-16 text-center sm:px-8 md:pt-28">
      <h1 className="animate-fade-in text-2xl font-normal leading-tight text-foreground sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl 2xl:text-6xl lg:whitespace-nowrap" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
        Find your next product role, <span className="italic" style={{ fontFamily: "'Lora', serif" }}>today.</span>
      </h1>
      <p className="animate-fade-in mt-4 text-sm text-muted-foreground sm:mt-5 sm:text-base md:text-lg 2xl:text-xl lg:whitespace-nowrap" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>Else helps you find your next product role at the top tech companies worldwide.

      </p>
      <div className="animate-fade-in mt-8 flex w-full max-w-4xl flex-col gap-3 rounded-2xl bg-card px-8 py-7 shadow-sm sm:mt-12 sm:flex-row sm:items-center sm:px-10 sm:py-8 2xl:max-w-5xl 2xl:px-12 2xl:py-9" style={{ animationDelay: '450ms', animationFillMode: 'both' }}>
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground outline-none md:text-base 2xl:text-lg"
          />
          {!inputValue && (
            <span
              className="pointer-events-none absolute inset-0 flex items-center text-sm text-muted-foreground md:text-base 2xl:text-lg transition-opacity duration-500 ease-in-out"
              style={{ opacity: visible ? 1 : 0 }}
            >
              {placeholders[currentIndex]}
            </span>
          )}
        </div>
        
        <button className="rounded-lg bg-primary px-8 py-3 text-sm font-normal text-primary-foreground transition-colors hover:opacity-90 sm:ml-4 2xl:px-10 2xl:py-3.5 2xl:text-base">
          Search
        </button>
      </div>
    </section>);

};

export default Hero;