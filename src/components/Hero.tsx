import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const placeholders = [
  "I'm looking for a senior product manager role in Paris",
  "Find me a position as Head of Product in e-commerce startups in Germany",
  "List all the scale up companies in Poland that have junior product roles",
];

const suggestionPills = [
  "Remote PM Jobs",
  "Senior PM Jobs in Europe",
  "Junior PM Jobs in Europe",
  "Startup PM Jobs",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showLimitWarning, setShowLimitWarning] = useState(false);

  const SEARCH_LIMIT = 3;
  const STORAGE_KEY = "else_search_count";

  const hasInput = inputValue.trim().length > 0;

  const handleSearch = () => {
    const query = inputValue.trim();
    if (!query) return;
    const current = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10) || 0;
    const nextCount = current + 1;
    if (nextCount >= SEARCH_LIMIT) {
      localStorage.setItem(STORAGE_KEY, String(SEARCH_LIMIT));
      setShowLimitWarning(true);
      return;
    }
    localStorage.setItem(STORAGE_KEY, String(SEARCH_LIMIT - 1));
    window.location.href = `https://app.tryelse.xyz/?q=${encodeURIComponent(query)}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % placeholders.length);
        setVisible(true);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showRegister || showLimitWarning) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showRegister, showLimitWarning]);

  return (
    <>
      <section className="flex flex-1 flex-col items-center justify-center px-5 pb-10 text-center sm:justify-start sm:px-8 sm:pt-20 sm:pb-16 md:pt-28">
        <h1 className="animate-fade-in whitespace-nowrap text-[clamp(1.3rem,6.1vw,1.88rem)] font-normal leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] 2xl:text-7xl" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
          Find your next product role, <span className="italic" style={{ fontFamily: "'Lora', serif" }}>today.</span>
        </h1>
        <p className="animate-fade-in mt-4 text-base text-muted-foreground sm:mt-5 lg:whitespace-nowrap" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
          Else helps you find your next product role at the top tech companies in Europe.
        </p>
        <div className="animate-fade-in mt-6 flex w-full max-w-4xl flex-row items-center gap-2 rounded-2xl bg-card px-4 py-2.5 shadow-sm sm:mt-12 sm:gap-3 sm:px-10 sm:py-8 2xl:max-w-5xl 2xl:px-12 2xl:py-9" style={{ animationDelay: '450ms', animationFillMode: 'both' }}>
          <div className="relative min-w-0 flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="w-full bg-transparent text-base text-foreground outline-none md:text-base 2xl:text-lg"
            />
            {!inputValue && (
              <>
                <span className="pointer-events-none absolute inset-0 flex items-center truncate text-base text-muted-foreground/60 sm:hidden">
                  Search for roles
                </span>
                <span
                  className="pointer-events-none absolute inset-0 hidden items-center text-sm text-muted-foreground/60 transition-opacity duration-700 ease-in-out sm:flex md:text-base 2xl:text-lg"
                  style={{ opacity: visible ? 1 : 0 }}
                >
                  {placeholders[currentIndex]}
                </span>
              </>
            )}
          </div>

          <button
            disabled={!hasInput}
            onClick={handleSearch}
            className={`rounded-lg aspect-square w-9 h-9 sm:w-10 sm:h-10 2xl:w-11 2xl:h-11 flex shrink-0 items-center justify-center transition-all sm:ml-4 ${
              hasInput
                ? "bg-primary text-primary-foreground hover:opacity-90 cursor-pointer"
                : "bg-muted-foreground/20 text-muted-foreground cursor-not-allowed"
            }`}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
        <div className="animate-fade-in mt-5 flex flex-wrap justify-center gap-2 sm:mt-6 sm:gap-3" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
          {suggestionPills.map((pill) => (
            <button
              key={pill}
              type="button"
              onClick={() => setInputValue(pill)}
              className="rounded-full bg-card shadow-sm px-4 py-2 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground sm:px-5 sm:py-2.5"
            >
              {pill}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="Scroll down"
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          className="animate-fade-in mt-12 hidden md:inline-flex text-muted-foreground/70 hover:text-foreground transition-colors"
          style={{ animationDelay: '750ms', animationFillMode: 'both' }}
        >
          <svg width="22" height="56" viewBox="0 0 22 56" fill="none" className="animate-bounce-down">
            <path d="M11 2 L11 50 M2 41 L11 50 L20 41" stroke="currentColor" strokeWidth="1.084" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </section>

      {/* Registration Modal */}
      {showRegister && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowRegister(false)}
        >
          <div
            className="relative w-full max-w-md mx-4 rounded-2xl bg-card p-8 shadow-lg animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors text-xl leading-none"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-foreground mb-2">Create your account</h2>
            <p className="text-sm text-muted-foreground mb-6">Sign up to start your search</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.open("https://app.tryelse.xyz/register", "_blank");
                setShowRegister(false);
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                placeholder="Full name"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-primary py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
              >
                Sign up
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Already have an account?{" "}
              <a href="https://app.tryelse.xyz/login" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Search Limit Warning Modal */}
      {showLimitWarning && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in px-4"
          onClick={() => setShowLimitWarning(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-card p-10 text-center shadow-lg animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLimitWarning(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold text-foreground leading-tight">
              Your next role might be<br />one search away
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Get full access to unlimited searches across thousands of product opportunities in Europe.
            </p>
            <a
              href="https://app.tryelse.xyz/register"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 block w-full rounded-lg bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
            >
              Get Started
            </a>
            <a
              href="https://app.tryelse.xyz/login"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              I already have an account
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
