import { useEffect, useRef, useState } from "react";

/**
 * Triggers once the element has actually scrolled into the visible area.
 * `rootMargin` shrinks the viewport from the bottom so animations don't fire
 * while the section is still below the fold.
 */
export function useInView<T extends HTMLElement = HTMLElement>(options?: {
  rootMargin?: string;
  threshold?: number;
}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      {
        threshold: options?.threshold ?? 0,
        // element must reach the top ~70% of the viewport before animating
        rootMargin: options?.rootMargin ?? "0px 0px -30% 0px",
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options?.rootMargin, options?.threshold]);

  return { ref, inView };
}
