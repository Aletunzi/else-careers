import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="animate-fade-in flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 md:px-16 lg:px-24">
      <Link to="/" className="hover:opacity-80 transition-opacity">
        <img src={logo} alt="else" className="h-8 w-8 sm:h-9 sm:w-9" />
      </Link>
      <div className="flex items-center gap-2 sm:gap-3">
        <a href="https://app.tryelse.xyz/login" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-foreground px-4 py-2 text-xs font-normal text-foreground transition-colors hover:bg-muted sm:px-6 sm:py-2.5 sm:text-sm">
          Login
        </a>
        <a href="https://app.tryelse.xyz/register" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-primary px-4 py-2 text-xs font-normal text-white transition-colors duration-300 ease-out hover:bg-[#ff6b1a] sm:px-6 sm:py-2.5 sm:text-sm">
          Try for free
        </a>
      </div>
    </header>
  );
};

export default Header;
