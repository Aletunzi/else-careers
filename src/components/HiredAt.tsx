import { useInView } from "@/hooks/useInView";

const W = "https://upload.wikimedia.org/wikipedia/commons/";

const COMPANIES: { name: string; src: string }[] = [
  { name: "Google", src: `${W}2/2f/Google_2015_logo.svg` },
  { name: "Microsoft", src: `${W}9/96/Microsoft_logo_%282012%29.svg` },
  { name: "Amazon", src: `${W}a/a9/Amazon_logo.svg` },
  { name: "Apple", src: `${W}f/fa/Apple_logo_black.svg` },
  { name: "Meta", src: `${W}7/7b/Meta_Platforms_Inc._logo.svg` },
  { name: "Netflix", src: `${W}0/08/Netflix_2015_logo.svg` },
  { name: "Nvidia", src: `${W}2/21/Nvidia_logo.svg` },
  { name: "Spotify", src: `${W}2/26/Spotify_logo_with_text.svg` },
  { name: "GitHub", src: `${W}2/29/GitHub_logo_2013.svg` },
  { name: "Dropbox", src: `${W}c/cb/Dropbox_logo_2017.svg` },
  { name: "Shopify", src: `${W}0/0e/Shopify_logo_2018.svg` },
  { name: "Slack", src: `${W}b/b9/Slack_Technologies_Logo.svg` },
];

const Logo = ({ name, src }: { name: string; src: string }) => (
  <div className="flex h-8 w-20 items-center justify-center sm:h-9 sm:w-24 md:h-10 md:w-28">
    <img
      src={src}
      alt={`${name} logo`}
      className="h-full w-full object-contain"
      style={{
        filter: "grayscale(100%) brightness(0.55)",
        opacity: 0.75,
      }}
      loading="lazy"
    />
  </div>
);

const HiredAt = () => {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section ref={ref} className="bg-[#ece7da] px-5 py-16 sm:py-20 md:py-28 lg:px-24 2xl:px-32">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div className="flex flex-col gap-8 lg:max-w-md">
          <h2
            className={`max-w-md text-[2rem] font-medium leading-tight tracking-tight text-foreground sm:text-[2.5rem] md:text-[3.25rem] lg:max-w-lg ${inView ? "animate-fade-in" : "opacity-0"}`}
            style={{ animationFillMode: "both" }}
          >
            Where our users have been hired:
          </h2>

        </div>

        <div
          className="grid w-full grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-10 lg:w-auto lg:gap-x-12 lg:gap-y-14"
        >
          {COMPANIES.map((c, i) => (
            <div
              key={c.name}
              className={inView ? "animate-fade-in" : "opacity-0"}
              style={{ animationDelay: `${150 + i * 60}ms`, animationFillMode: "both" }}
            >
              <Logo name={c.name} src={c.src} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HiredAt;