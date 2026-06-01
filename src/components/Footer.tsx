import { Link } from "react-router-dom";
import logoWhite from "@/assets/else-logo-white.svg";

const Footer = () => {
  return (
    <footer
      className="animate-fade-in relative bg-footer-background"
      style={{
        animationDelay: '450ms',
        animationFillMode: 'both',
        paddingBottom: 'max(env(safe-area-inset-bottom), 0px)',
      }}
    >
      <div className="relative px-5 pb-10 pt-12 sm:px-8 sm:pb-10 sm:pt-12 md:px-16 md:pb-12 md:pt-14 lg:px-24 lg:pb-14 lg:pt-16 2xl:px-32 2xl:pt-18 2xl:pb-16">
        {/* Mobile layout */}
        <div className="md:hidden">
          <img src={logoWhite} alt="else" className="h-6 w-6" />
          <p className="mt-4 text-base text-white/80">Your next job is elsewhere</p>
          <div className="mt-9 flex gap-16">
            <div>
              <h4 className="mb-4 text-base font-normal text-white/60">Company</h4>
              <ul className="space-y-3 text-base text-white">
                <li><a href="https://x.com/elsecareers" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">Careers</a></li>
                <li><a href="https://x.com/elsecareers" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-base font-normal text-white/60">Legal</h4>
              <ul className="space-y-3 text-base text-white">
                <li><Link to="/terms" className="hover:text-white/80 transition-colors">Terms</Link></li>
                <li><Link to="/privacy" className="hover:text-white/80 transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-9 flex items-center gap-3">
            <span className="text-base text-white/60">Follow</span>
            <a href="https://x.com/elsecareers" target="_blank" rel="noopener noreferrer" className="inline-block text-white hover:text-white/80 transition-colors" aria-label="X (Twitter)">
              <svg role="img" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
          <hr className="mt-9 border-white/15" />
          <p className="mt-5 text-left text-sm text-white/70">© 2026 else</p>
        </div>

        {/* Desktop / tablet layout */}
        <div className="hidden md:block">
          <div className="flex flex-row justify-between gap-12">
            <div>
              <img src={logoWhite} alt="else" className="h-[22px] w-[22px] 2xl:h-6 2xl:w-6" />
              <p className="mt-3 text-sm text-white/80 2xl:text-base">Your next job is elsewhere</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm text-white/60 2xl:text-base">Follow</span>
                <a href="https://x.com/elsecareers" target="_blank" rel="noopener noreferrer" className="inline-block text-white hover:text-white/80 transition-colors" aria-label="X (Twitter)">
                  <svg role="img" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
            <div className="flex gap-16 lg:gap-24">
              <div>
                <h4 className="mb-6 text-sm font-normal text-white/60 2xl:text-base">Company</h4>
                <ul className="space-y-3 text-sm text-white 2xl:text-base">
                  <li><a href="https://x.com/elsecareers" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">Careers</a></li>
                  <li><a href="https://x.com/elsecareers" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-6 text-sm font-normal text-white/60 2xl:text-base">Legal</h4>
                <ul className="space-y-3 text-sm text-white 2xl:text-base">
                  <li><Link to="/terms" className="hover:text-white/80 transition-colors">Terms and conditions</Link></li>
                  <li><Link to="/privacy" className="hover:text-white/80 transition-colors">Privacy policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="mt-10 border-white/15" />
          <p className="mt-4 text-left text-sm text-white/70 2xl:text-base">© 2026 else. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
