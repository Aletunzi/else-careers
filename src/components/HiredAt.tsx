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
  <div className="flex h-8 w-20 items-center justify-center sm:h-9 sm:w-24 md:h-9 md:w-[6.3rem]">
    <img
      src={src}
      alt={`${name} logo`}
      className="h-full w-full object-contain"
      loading="lazy"
    />
  </div>
);

const HiredAt = () => {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section ref={ref} className="bg-[#ece7da] px-5 py-16 sm:py-20 md:py-28 lg:px-24 2xl:px-32">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 sm:gap-16 md:gap-20 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div className="mx-auto flex flex-col items-center gap-8 lg:mx-0 lg:max-w-md lg:items-start">
          <h2
            className={`max-w-md text-center text-[2rem] font-medium leading-tight tracking-tight text-foreground sm:text-[2.5rem] md:text-[3.25rem] lg:text-left lg:max-w-lg ${inView ? "animate-fade-in" : "opacity-0"}`}
            style={{ animationFillMode: "both" }}
          >
            Where our users have been hired:
          </h2>

        </div>

        <div
          className="mx-auto grid w-auto grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-4 sm:gap-x-10 sm:gap-y-16 lg:mx-0 lg:w-auto lg:gap-x-28 lg:gap-y-14"
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