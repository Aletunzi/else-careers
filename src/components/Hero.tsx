const Hero = () => {
  return (
    <section className="flex flex-col items-center px-6 pb-32 pt-20 text-center md:pt-28">
      <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
        1 out of 7 product role is on Linkedin. Where are the other 6?
      </h1>
      <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
        Else is here to help you find your next product job at the top tech companies worldwide.
      </p>
      <div className="mt-12 flex w-full max-w-2xl items-center rounded-2xl bg-card px-6 py-5 shadow-sm border border-border">
        <input
          type="text"
          placeholder="Product manager role in Paris"
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none md:text-base"
        />
        <button className="ml-4 rounded-lg border border-border px-7 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
          Search
        </button>
      </div>
    </section>
  );
};

export default Hero;
