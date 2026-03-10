import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function RevealSubtitle({ text, className }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(container,
      { 
        opacity: 0, 
        y: 30,
        clipPath: "inset(0% 0% 100% 0%)" 
      },
      { 
        opacity: 1, 
        y: 0, 
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2, 
        ease: "power4.out",
        delay: 4
      }
    );
  }, []);

  return (
    <p ref={containerRef} className={className}>
      {text}
    </p>
  );
}
