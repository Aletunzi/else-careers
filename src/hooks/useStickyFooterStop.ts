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
      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // When the footer enters the viewport, push the sticky element up by the
      // amount of footer that is visible so it scrolls with the page instead of
      // staying fixed above the footer.
      const visibleFooter = Math.max(0, viewportHeight - footerRect.top);
      setOffset(visibleFooter > 0 ? -visibleFooter : 0);
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

