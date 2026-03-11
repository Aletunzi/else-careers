import footerBg from "@/assets/footer-bg.jpg";

const Footer = () => {
  return (
    <footer className="animate-fade-in relative bg-cover bg-center brightness-[0.95] [animation-delay:450ms] opacity-0 [animation-fill-mode:forwards]" style={{ backgroundImage: `url(${footerBg})` }}>
      <div className="absolute inset-0 bg-black/[0.08]" />
      <div className="relative px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-20 md:px-16 md:pb-20 md:pt-24 lg:px-24 lg:pb-24 lg:pt-28 2xl:px-32 2xl:pt-32 2xl:pb-28">
        <div className="flex flex-col gap-10 sm:gap-12 md:flex-row md:justify-between">
          <div>
            <span className="text-2xl font-normal tracking-tight text-white sm:text-3xl 2xl:text-4xl">else</span>
            <p className="mt-2 text-sm text-white/80 2xl:text-base">Your next job is elsewhere</p>
          </div>
          <div className="flex gap-12 sm:gap-20">
            <div>
              <h4 className="mb-3 text-sm font-normal text-white sm:mb-4 sm:text-base 2xl:text-lg">Company</h4>
              <ul className="space-y-2 text-sm text-white/80 sm:space-y-3 2xl:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-normal text-white sm:mb-4 sm:text-base 2xl:text-lg">Legal</h4>
              <ul className="space-y-2 text-sm text-white/80 sm:space-y-3 2xl:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Terms and conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-20 text-center text-xs text-white/70 sm:mt-24 sm:text-sm md:mt-28 2xl:mt-32 2xl:text-base">2026 else. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
