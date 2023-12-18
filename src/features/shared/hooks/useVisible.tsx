import { useEffect, useRef, useState } from "react";

function useVisible<T extends Element>() {
  const [isVisible, setIsVisible] = useState(false);

  const ref = useRef<T>(null);

  useEffect(() => {
    const elementRef = ref.current;

    if (!elementRef) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setIsVisible(true);
      });
    });

    observer.observe(elementRef);

    return () => {
      observer.unobserve(elementRef);
      observer.disconnect();
    };
  }, []);

  return {
    isVisible,
    ref,
  };
}

export default useVisible;
