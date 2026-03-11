const Hero = () => {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-5 py-16 text-center sm:px-8 md:py-20">
      <h1 className="animate-fade-in text-2xl font-normal leading-tight text-foreground sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl 2xl:text-6xl lg:whitespace-nowrap">
        1 out of 7 product role is on Linkedin. Where are the other 6?
      </h1>
      <p className="animate-fade-in mt-4 text-sm text-muted-foreground sm:mt-5 sm:text-base md:text-lg 2xl:text-xl lg:whitespace-nowrap [animation-delay:150ms] opacity-0 [animation-fill-mode:forwards]">
        Else is here to help you find your next product job at the top tech companies worldwide.
      </p>
      <div className="animate-fade-in mt-8 flex w-full max-w-4xl flex-col gap-3 rounded-2xl bg-card px-8 py-7 shadow-sm sm:mt-12 sm:flex-row sm:items-center sm:px-10 sm:py-8 2xl:max-w-5xl 2xl:px-12 2xl:py-9 [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
        <input
          type="text"
          placeholder="Product manager role in Paris"
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none md:text-base 2xl:text-lg"
        />
        <button className="rounded-lg bg-primary px-8 py-3 text-sm font-normal text-primary-foreground transition-colors hover:opacity-90 sm:ml-4 2xl:px-10 2xl:py-3.5 2xl:text-base">
          Search
        </button>
      </div>
    </section>
  );
};

export default Hero;
