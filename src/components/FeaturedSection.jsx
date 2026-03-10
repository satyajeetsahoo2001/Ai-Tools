import React, { useEffect, useRef } from "react";
import ToolCard from "./ToolCard";
import { Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useDragScroll from "../hooks/useDragScroll";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedSection({ tools }) {
  const sectionRef = useRef(null);
  const featuredTools = tools.filter((tool) => tool.featured).slice(0, 8);
  const dragRef = useDragScroll();

  useEffect(() => {
    if (featuredTools.length > 0) {
      const cards = dragRef.current.children;
      
      gsap.fromTo(cards, 
        { 
          opacity: 0, 
          y: 40,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(".featured-header", 
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%"
          }
        }
      );
    }
  }, [featuredTools.length, dragRef]);

  if (featuredTools.length === 0) return null;

  return (
    <>
      <style>
        {`
        .featured-section {
          margin-bottom: 80px;
          position: relative;
        }

        .featured-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
          margin-top: 70px;
        }

        .featured-icon {
          width: 28px;
          height: 28px;
          color: #eab308;
          filter: drop-shadow(0 0 8px rgba(234, 179, 8, 0.4));
        }

        .featured-title {
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .featured-grid {
          display: flex;
          flex-direction: row;
          gap: 24px;
          overflow-x: auto;
          padding: 20px 0 40px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          will-change: transform, scroll-position;
          cursor: grab;
          user-select: none;
        }

        .featured-grid:active {
          cursor: grabbing;
        }

        .featured-grid::-webkit-scrollbar {
          display: none;
        }

        .featured-grid {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        `}
      </style>

      <div className="featured-section" ref={sectionRef}>
        <div className="featured-header">
          <Star className="featured-icon" fill="#eab308" />
          <h2 className="featured-title">Editor's Choice</h2>
        </div>

        <div className="featured-grid" ref={dragRef}>
          {featuredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              id={tool.id}
              name={tool.name}
              description={tool.description}
              category={tool.category}
              logo={tool.logo}
              website={tool.website}
            />
          ))}
        </div>
      </div>
    </>
  );
}
