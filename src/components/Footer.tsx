import footerBg from "@/assets/footer-bg.jpg";

const Footer = () => {
  return (
    <footer className="relative bg-cover bg-center" style={{ backgroundImage: `url(${footerBg})` }}>
      {/* 5% dark overlay */}
      <div className="absolute inset-0 bg-black/5" />
      <div className="relative px-5 pb-8 pt-12 sm:px-8 sm:pb-10 sm:pt-16 md:px-16 lg:px-24">
        <div className="flex flex-col gap-10 sm:gap-12 md:flex-row md:justify-between">
          <div>
            <span className="text-2xl font-normal tracking-tight text-white sm:text-3xl">else</span>
            <p className="mt-2 text-sm text-white/80">Your next job is elsewhere</p>
          </div>
          <div className="flex gap-12 sm:gap-20">
            <div>
              <h4 className="mb-3 text-sm font-normal text-white sm:mb-4 sm:text-base">Company</h4>
              <ul className="space-y-2 text-sm text-white/80 sm:space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-normal text-white sm:mb-4 sm:text-base">Legal</h4>
              <ul className="space-y-2 text-sm text-white/80 sm:space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Terms and conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-16 text-center text-xs text-white/70 sm:mt-20 sm:text-sm">2026 else. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
