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
  { name: "GitHub", src: `${W}2/29/GitHub_logo_2013.svg`, scale: 1.1 },
  { name: "Dropbox", src: `${W}c/cb/Dropbox_logo_2017.svg` },
  { name: "Shopify", src: `${W}0/0e/Shopify_logo_2018.svg`, scale: 1.1 },
  { name: "Slack", src: `${W}b/b9/Slack_Technologies_Logo.svg`, scale: 1.2 },
];

const Logo = ({ name, src, scale = 1 }: { name: string; src: string; scale?: number }) => (
  <div className="flex h-8 items-center justify-center sm:h-10 md:h-12">
    <img
      src={src}
      alt={`${name} logo`}
      className="w-auto max-w-full object-contain"
        style={{
          height: `${1.35 * scale}rem`,
          maxHeight: "2rem",
          filter: "grayscale(100%) brightness(0.55)",
          opacity: 0.75,
        }}
      loading="lazy"
    />
  </div>
);

const HiredAt = () => {
  return (
    <section className="bg-[#ece7da] px-5 py-14 sm:px-8 sm:py-16 md:px-16 lg:px-24 2xl:px-32">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="flex flex-col gap-8 lg:max-w-md">
          <h2 className="max-w-sm text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl lg:max-w-md">
            Where our users have been hired
          </h2>

          <div className="flex flex-col gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-medium tracking-tight text-foreground/60 sm:text-xl">2.000+</span>
              <span className="text-sm text-foreground/50">jobs added daily</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-medium tracking-tight text-foreground/60 sm:text-xl">40.000+</span>
              <span className="text-sm text-foreground/50">verified job listings</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-medium tracking-tight text-foreground/60 sm:text-xl">50.000+</span>
              <span className="text-sm text-foreground/50">tailored applications submitted</span>
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-10 lg:w-auto lg:gap-x-12 lg:gap-y-14">
          {COMPANIES.map((c) => (
            <Logo key={c.name} name={c.name} src={c.src} scale={c.scale} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HiredAt;