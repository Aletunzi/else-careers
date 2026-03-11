const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-6 md:px-16 lg:px-24">
      <span className="text-2xl font-semibold tracking-tight text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        else
      </span>
      <div className="flex items-center gap-3">
        <button className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
          Login
        </button>
        <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90">
          Try now
        </button>
      </div>
    </header>
  );
};

export default Header;
