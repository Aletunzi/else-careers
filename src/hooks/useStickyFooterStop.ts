import { useEffect, useRef, useState } from "react";

interface UseStickyFooterStopOptions {
  stickyTop?: number;
}

export const useStickyFooterStop = ({ stickyTop = 128 }: UseStickyFooterStopOptions = {}) => {
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
      const viewportHeight = window.innerHeight;

      // Only push the sticky element up once it is actually in its sticky position
      // and the footer has entered the viewport. This keeps the title visible on
      // short pages where the footer is already in view without scrolling.
      const isSticky = stickyRect.top <= stickyTop + 1;
      const visibleFooter = Math.max(0, viewportHeight - footerRect.top);
      setOffset(isSticky && visibleFooter > 0 ? -visibleFooter : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [stickyTop]);

  return { stickyRef, footerRef, offset };
};


