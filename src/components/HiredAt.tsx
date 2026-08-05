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
];

const Logo = ({ name, src, scale = 1 }: { name: string; src: string; scale?: number }) => (
  <div className="flex h-10 items-center justify-center sm:h-12">
    <img
      src={src}
      alt={`${name} logo`}
      className="w-auto max-w-full object-contain"
      style={{
        height: `${1.5 * scale}rem`,
        maxHeight: "2.25rem",
        filter: "grayscale(100%) brightness(0.45)",
        opacity: 0.9,
      }}
      loading="lazy"
    />
  </div>
);

const HiredAt = () => {
  return (
    <section className="bg-[#ece7da] px-5 py-14 sm:px-8 sm:py-16 md:px-16 lg:px-24 2xl:px-32">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
        <h2 className="max-w-sm text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl lg:max-w-md">
          Where Else users have been hired
        </h2>

        <div className="grid w-full grid-cols-2 gap-x-8 gap-y-8 sm:gap-x-12 sm:gap-y-10 md:grid-cols-4 md:gap-x-14 lg:w-auto lg:gap-x-16 lg:gap-y-10">
          {COMPANIES.map((c) => (
            <Logo key={c.name} name={c.name} src={c.src} scale={c.scale} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HiredAt;