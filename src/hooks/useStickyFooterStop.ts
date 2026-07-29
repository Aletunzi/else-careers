import { useEffect, useRef, useState } from "react";

export const useStickyFooterStop = () => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const sticky = stickyRef.current;
    const footer = footerRef.current;
    if (!sticky || !footer) return;

    const handleScroll = () => {
      const stickyRect = sticky.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();

      // If the sticky element would overlap the footer, push it up by the overlap amount.
      if (stickyRect.bottom > footerRect.top) {
        const overlap = stickyRect.bottom - footerRect.top;
        setOffset(-overlap);
      } else {
        setOffset(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return { stickyRef, footerRef, offset };
};
