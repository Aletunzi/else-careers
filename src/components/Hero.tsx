import { useState, useEffect } from "react";

const placeholders = [
  "I'm looking for a senior product manager role in Paris",
  "Find me a position as Head of Product in e-commerce startups in Germany",
  "List all the scale up companies in Poland that have junior product roles",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const hasInput = inputValue.trim().length > 0;

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
    if (showRegister) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showRegister]);

  return (
    <>
      <section className="flex flex-1 flex-col items-center justify-start px-5 pt-20 pb-16 text-center sm:px-8 md:pt-28">
        <h1 className="animate-fade-in text-2xl font-normal leading-tight text-foreground sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl 2xl:text-6xl lg:whitespace-nowrap" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
          Find your next product role, <span className="italic" style={{ fontFamily: "'Lora', serif" }}>today.</span>
        </h1>
        <p className="animate-fade-in mt-4 text-sm text-muted-foreground sm:mt-5 sm:text-base md:text-lg 2xl:text-xl lg:whitespace-nowrap" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
          Else helps you find your next product role at the top tech companies worldwide.
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
                className="pointer-events-none absolute inset-0 flex items-center text-sm text-muted-foreground/60 md:text-base 2xl:text-lg transition-opacity duration-700 ease-in-out"
                style={{ opacity: visible ? 1 : 0 }}
              >
                {placeholders[currentIndex]}
              </span>
            )}
          </div>

          <button
            disabled={!hasInput}
            onClick={() => hasInput && setShowRegister(true)}
            className={`rounded-lg px-8 py-3 text-sm font-normal transition-all sm:ml-4 2xl:px-10 2xl:py-3.5 2xl:text-base text-center ${
              hasInput
                ? "bg-primary text-primary-foreground hover:opacity-90 cursor-pointer"
                : "bg-muted-foreground/20 text-muted-foreground cursor-not-allowed"
            }`}
          >
            Search
          </button>
        </div>
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
    </>
  );
};

export default Hero;
