const Hero = () => {
  return (
    <section className="flex flex-col items-center px-5 pb-20 pt-16 text-center sm:px-8 sm:pb-32 sm:pt-20 md:pt-28">
      <h1 className="max-w-3xl text-2xl font-normal leading-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
        1 out of 7 product role is on Linkedin. Where are the other 6?
      </h1>
      <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:mt-5 sm:text-base md:text-lg">
        Else is here to help you find your next product job at the top tech companies worldwide.
      </p>
      <div className="mt-8 flex w-full max-w-2xl flex-col gap-3 rounded-2xl bg-card px-5 py-4 shadow-sm border border-border sm:mt-12 sm:flex-row sm:items-center sm:px-6 sm:py-5">
        <input
          type="text"
          placeholder="Product manager role in Paris"
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none md:text-base"
        />
        <button className="rounded-lg bg-primary px-7 py-2.5 text-sm font-normal text-primary-foreground transition-colors hover:opacity-90 sm:ml-4">
          Search
        </button>
      </div>
    </section>
  );
};

export default Hero;
