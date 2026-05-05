import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="animate-fade-in relative" style={{ backgroundColor: '#201c1b', animationDelay: '450ms', animationFillMode: 'both' }}>
      <div className="relative px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12 md:px-16 md:pb-12 md:pt-14 lg:px-24 lg:pb-14 lg:pt-16 2xl:px-32 2xl:pt-18 2xl:pb-16">
        <div className="flex flex-col gap-10 sm:gap-12 md:flex-row md:justify-between">
          <div>
            <span className="text-2xl font-normal tracking-tight text-white sm:text-3xl 2xl:text-4xl">else</span>
            <p className="mt-2 text-sm text-white/80 2xl:text-base">Your next job is elsewhere</p>
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
