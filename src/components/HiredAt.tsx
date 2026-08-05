const COMPANIES: { name: string; slug: string }[] = [
  { name: "Google", slug: "google" },
  { name: "Apple", slug: "apple" },
  { name: "Nvidia", slug: "nvidia" },
  { name: "Netflix", slug: "netflix" },
  { name: "Spotify", slug: "spotify" },
  { name: "Airbnb", slug: "airbnb" },
  { name: "Uber", slug: "uber" },
  { name: "Stripe", slug: "stripe" },
  { name: "Notion", slug: "notion" },
  { name: "Figma", slug: "figma" },
  { name: "GitHub", slug: "github" },
  { name: "Dropbox", slug: "dropbox" },
  { name: "Revolut", slug: "revolut" },
  { name: "Shopify", slug: "shopify" },
  { name: "Meta", slug: "meta" },
];

const Logo = ({ name, slug }: { name: string; slug: string }) => (
  <div className="flex h-10 w-[120px] shrink-0 items-center justify-center sm:w-[150px]">
    <img
      src={`https://cdn.simpleicons.org/${slug}/000000`}
      alt={`${name} logo`}
      className="h-7 w-auto max-w-[110px] object-contain opacity-80 sm:h-8"
      loading="lazy"
    />
  </div>
);

const HiredAt = () => {
  const loop = [...COMPANIES, ...COMPANIES];

  return (
    <section className="bg-white px-5 py-14 sm:px-8 sm:py-16 md:px-16 lg:px-24 2xl:px-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-xl font-medium tracking-tight text-foreground sm:text-2xl md:text-3xl">
          Where Else users have been hired
        </h2>

        <div className="relative mt-10 overflow-hidden">
          <div
            className="flex w-max items-center gap-10 sm:gap-14"
            style={{ animation: "hired-scroll 40s linear infinite" }}
          >
            {loop.map((c, i) => (
              <Logo key={`${c.slug}-${i}`} name={c.name} slug={c.slug} />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />
        </div>
      </div>

      <style>{`
        @keyframes hired-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default HiredAt;