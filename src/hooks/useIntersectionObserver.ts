import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  freezeOnceVisible?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLDivElement>;
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
}

export function useIntersectionObserver({
  threshold = 0,
  rootMargin = '0px',
  root = null,
  freezeOnceVisible = false,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const ref = useRef<HTMLDivElement>(null);
  const frozen = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If already frozen (visible once), don't observe again
    if (frozen.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        
        setIsIntersecting(isElementIntersecting);
        setEntry(entry);

        // Freeze the state once visible if option is enabled
        if (isElementIntersecting && freezeOnceVisible) {
          frozen.current = true;
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    observer.observe(element);

    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, root, freezeOnceVisible]);

  return { ref, isIntersecting, entry };
}
