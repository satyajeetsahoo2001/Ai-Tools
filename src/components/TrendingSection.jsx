import React, { useEffect, useRef } from "react";
import ToolCard from "./ToolCard";
import { TrendingUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useDragScroll from "../hooks/useDragScroll";

gsap.registerPlugin(ScrollTrigger);

export default function TrendingSection({ tools }) {
  const sectionRef = useRef(null);
  const trendingTools = tools.filter((tool) => tool.trending).slice(0, 8);
  const dragRef = useDragScroll();

  useEffect(() => {
    if (trendingTools.length > 0) {
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
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(".trending-header", 
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
  }, [trendingTools.length, dragRef]);

  if (trendingTools.length === 0) return null;

  return (
    <>
      <style>
        {`
        .trending-section {
          margin-bottom: 80px;
          position: relative;
        }

        .trending-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
        }

        .trending-icon {
          width: 28px;
          height: 28px;
          color: #22c55e;
          filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.4));
        }

        .trending-title {
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .trending-grid {
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

        .trending-grid:active {
          cursor: grabbing;
        }

        .trending-grid::-webkit-scrollbar {
          display: none;
        }

        .trending-grid {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        `}
      </style>

      <div className="trending-section" ref={sectionRef}>
        <div className="trending-header">
          <TrendingUp className="trending-icon" />
          <h2 className="trending-title">Trending This Week</h2>
        </div>

        <div className="trending-grid" ref={dragRef}>
          {trendingTools.map((tool) => (
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
