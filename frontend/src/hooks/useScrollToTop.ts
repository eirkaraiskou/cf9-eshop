// src/hooks/useScrollToTop.ts
import { useEffect } from "react";

const useScrollToTop = (delay: number = 100) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, delay);

    return () => clearTimeout(timer); // cleanup
  }, [delay]);
};

export default useScrollToTop;