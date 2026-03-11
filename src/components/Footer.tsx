import footerBg from "@/assets/footer-bg.jpg";

const Footer = () => {
  return (
    <footer
      className="relative bg-cover bg-center px-8 pb-10 pt-16 text-white md:px-16 lg:px-24"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      <div className="flex flex-col gap-12 md:flex-row md:justify-between">
        <div>
          <span className="text-3xl font-semibold tracking-tight">else</span>
          <p className="mt-2 text-sm opacity-80">Your next job is elsewhere</p>
        </div>
        <div className="flex gap-20">
          <div>
            <h4 className="mb-4 text-base font-semibold">Company</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Careers</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-base font-semibold">Legal</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Terms and conditions</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy policy</a></li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-20 text-center text-sm opacity-70">2026 else. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
