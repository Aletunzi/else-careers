const W = "https://upload.wikimedia.org/wikipedia/commons/";

const COMPANIES: { name: string; src: string; scale?: number }[] = [
  { name: "Google", src: `${W}2/2f/Google_2015_logo.svg` },
  { name: "Microsoft", src: `${W}9/96/Microsoft_logo_%282012%29.svg` },
  { name: "Amazon", src: `${W}a/a9/Amazon_logo.svg`, scale: 0.85 },
  { name: "Apple", src: `${W}f/fa/Apple_logo_black.svg`, scale: 1.2 },
  { name: "Meta", src: `${W}7/7b/Meta_Platforms_Inc._logo.svg` },
  { name: "Netflix", src: `${W}0/08/Netflix_2015_logo.svg`, scale: 0.9 },
  { name: "Nvidia", src: `${W}2/21/Nvidia_logo.svg`, scale: 1.1 },
  { name: "Spotify", src: `${W}2/26/Spotify_logo_with_text.svg` },
  { name: "Uber", src: `${W}5/58/Uber_logo_2018.svg`, scale: 0.8 },
  { name: "Stripe", src: `${W}b/ba/Stripe_Logo%2C_revised_2016.svg`, scale: 0.9 },
  { name: "GitHub", src: `${W}2/29/GitHub_logo_2013.svg`, scale: 1.1 },
  { name: "Dropbox", src: `${W}c/cb/Dropbox_logo_2017.svg` },
  { name: "Shopify", src: `${W}0/0e/Shopify_logo_2018.svg`, scale: 1.1 },
  { name: "Slack", src: `${W}b/b9/Slack_Technologies_Logo.svg`, scale: 1.2 },
  { name: "Tesla", src: `${W}b/bd/Tesla_Motors.svg`, scale: 0.75 },
];

const Logo = ({ name, src, scale = 1 }: { name: string; src: string; scale?: number }) => (
  <div className="flex h-14 shrink-0 items-center justify-center">
    <img
      src={src}
      alt={`${name} logo`}
      className="w-auto object-contain"
      style={{
        height: `${1.75 * scale}rem`,
        maxWidth: "170px",
        filter: "brightness(0) saturate(0)",
        opacity: 0.85,
      }}
      loading="lazy"
    />
  </div>
);

const HiredAt = () => {
  const loop = [...COMPANIES, ...COMPANIES];

  return (
    <section className="bg-[#ece7da] px-5 py-14 sm:px-8 sm:py-16 md:px-16 lg:px-24 2xl:px-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Where Else users have been hired
        </h2>

        <div className="relative mt-10 overflow-hidden">
          <div
            className="flex w-max items-center gap-16 sm:gap-24 lg:gap-28"
            style={{ animation: "hired-scroll 55s linear infinite" }}
          >
            {loop.map((c, i) => (
              <Logo key={`${c.name}-${i}`} name={c.name} src={c.src} scale={c.scale} />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#ece7da] to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#ece7da] to-transparent sm:w-24" />
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