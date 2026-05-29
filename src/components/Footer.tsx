import { Link } from "react-router-dom";
import logoWhite from "@/assets/else-logo-white.svg";

const Footer = () => {
  return (
    <footer
      className="animate-fade-in relative"
      style={{
        backgroundColor: '#000000',
        animationDelay: '450ms',
        animationFillMode: 'both',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="relative px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12 md:px-16 md:pb-12 md:pt-14 lg:px-24 lg:pb-14 lg:pt-16 2xl:px-32 2xl:pt-18 2xl:pb-16">
        <div className="flex flex-col gap-10 sm:gap-12 md:flex-row md:justify-between">
          <div>
            <img src={logoWhite} alt="else" className="h-[19px] w-[19px] sm:h-[22px] sm:w-[22px] 2xl:h-6 2xl:w-6" />
            <p className="mt-3 text-sm text-white/80 2xl:text-base">Your next job is elsewhere</p>
            <a href="https://x.com/elsecareers" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-white hover:text-white/80 transition-colors" aria-label="X (Twitter)">
              <svg role="img" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
          <div className="flex gap-12 sm:gap-20">
            <div>
              <h4 className="mb-3 text-sm font-normal text-white sm:mb-4 sm:text-base 2xl:text-lg">Company</h4>
              <ul className="space-y-2 text-sm text-white/80 sm:space-y-3 2xl:text-base">
                <li><a href="https://x.com/elsecareers" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="https://x.com/elsecareers" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-normal text-white sm:mb-4 sm:text-base 2xl:text-lg">Legal</h4>
              <ul className="space-y-2 text-sm text-white/80 sm:space-y-3 2xl:text-base">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms and conditions</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-10 text-left text-xs text-white/70 sm:mt-12 sm:text-sm md:mt-14 2xl:mt-16 2xl:text-base">2026 else. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
