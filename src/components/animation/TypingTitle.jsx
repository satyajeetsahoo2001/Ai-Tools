import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function TypingTitle({ text, className }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !text) return;

    // 1. Convert text to spans and store them in an array
    const chars = text.split("");
    container.innerHTML = ""; // Clear existing content

    const spanElements = chars.map((char) => {
      const span = document.createElement("span");
      // Use non-breaking space for spaces to maintain width
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.opacity = "0";
      span.style.display = "inline-block";
      // Adding a small initial transform for a smoother "pop"
      span.style.transform = "translateY(5px)";
      container.appendChild(span);
      return span;
    });

    // 2. Animate the array of spans directly
    const animation = gsap.to(spanElements, {
      opacity: 1,
      y: 0,
      duration: 0.1, // Slightly slower makes it feel more like typing
      stagger: 0.05,
      ease: "power1.out",
      delay: 3
    });

    // 3. CLEANUP: This is crucial in React to prevent memory leaks
    return () => {
      animation.kill();
      if (container) container.innerHTML = "";
    };
  }, []); // Re-runs if the text prop changes

  return (
    <>
      <span
        ref={containerRef}
        className={`${className} typing-cursor`}
        aria-label={text} // Good for Accessibility (SEO/Screen readers)
      ></span>
    </>
  );
}