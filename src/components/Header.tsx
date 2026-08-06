import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="animate-fade-in relative isolate flex items-center justify-between bg-white px-5 py-5 sm:px-8 sm:py-6 md:px-16 lg:px-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.68]"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(circle, #f3f1e9 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }}
      />
      <Link to="/" className="hover:opacity-80 transition-opacity">
        <img src={logo} alt="else" className="h-10 w-10 sm:h-12 sm:w-12" />
      </Link>
      <div className="flex items-center gap-2 sm:gap-3">
        <a href="https://app.tryelse.xyz/login" target="_blank" rel="noopener noreferrer" className="rounded-lg px-5 py-2.5 text-sm font-normal text-foreground transition-opacity hover:opacity-70 sm:px-6 sm:py-2.5 sm:text-sm">
          Login
        </a>
        <a
          href="https://app.tryelse.xyz/register"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-2xl bg-primary px-5 py-2.5 text-sm font-normal text-white sm:px-6 sm:py-2.5 sm:text-sm"
        >
          <span className="absolute inset-y-0 left-0 w-0 bg-[#ff6b1a] transition-[width] duration-500 ease-out group-hover:w-full" aria-hidden />
          <span className="relative z-10">Try for free</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
