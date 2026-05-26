const Reality = () => {
  return (
    <section className="bg-background px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24 lg:py-32 2xl:px-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-8 bg-muted-foreground/50" />
          <span>The Reality</span>
        </div>

        <div className="mt-16 flex flex-col items-center text-center sm:mt-20 md:mt-24">
          <div className="flex items-start justify-center leading-none">
            <span className="text-[clamp(6rem,22vw,18rem)] font-semibold tracking-tight text-foreground">78</span>
            <span className="mt-2 text-[clamp(3rem,11vw,9rem)] font-semibold leading-none" style={{ color: '#ff6b1a' }}>%</span>
          </div>

          <p className="mt-8 max-w-3xl text-xl text-foreground sm:text-2xl md:text-3xl lg:text-4xl">
            of product roles in Europe are <span style={{ color: '#ff6b1a' }}>not</span> on LinkedIn.
            <br className="hidden sm:block" /> We fixed that.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-border pt-10 sm:mt-24 sm:grid-cols-3 sm:gap-6">
          {[
            { value: '9', label: 'Avg sources per role' },
            { value: '15,000+', label: 'Companies tracked' },
            { value: '27', label: 'European states covered' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-3 sm:px-6">
              <span className="text-4xl font-semibold text-foreground sm:text-5xl">{stat.value}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reality;