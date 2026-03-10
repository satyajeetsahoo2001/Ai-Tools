import React, { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { gsap } from "gsap";
import TypingTitle from "./animation/TypingTitle";
import RevealSubtitle from "./animation/RevealSubtitle";

export default function Front() {
  const badgeRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(badgeRef.current,
      { opacity: 0, scale: 0.8, y: -20 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "elastic.out(1, 0.75)", delay: 0.2 }
    );
  }, []);

  return (
    <>
      <style>
        {`
        .hero {
          text-align: center;
          margin-bottom: 64px;
          padding: 35px 16px 0;
          position: relative;
          z-index: 10;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.03);
          color: #e0e7ff; 
          margin-bottom: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 14px;
          font-weight: 500;
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .hero-icon {
          width: 16px;
          height: 16px;
          color: #60a5fa;
        }

        .hero-title {
          font-size: 48px;
          font-weight: 800;
          color: white;
          margin-bottom: 24px;
          line-height: 1.1;
          letter-spacing: -1.5px;
          min-height: 2.2em;
        }

        .gradient-accent {
          background: linear-gradient(135deg, #60a5fa, #a855f7, #FF9FFC);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.3));
        }

        .hero-desc {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.65);
          max-width: 750px;
          margin: 0 auto;
          line-height: 1.8;
          font-weight: 400;
          letter-spacing: 0.2px;
        }

        @media (min-width: 768px) {
          .hero-title { font-size: 72px; }
          .hero-desc { font-size: 20px; }
        }

        .title-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: -1;
          filter: blur(40px);
          opacity: 0.5;
        }
           .typing{
                  font-size: clamp(24px, 5vw, 70px);
        }
           @media (max-width: 640px) {
             .typing{
                 font-size: 52px;
        }
             .hero-title{
                 display: flex;
                 flex-direction: column;
        } 
                  @media (max-width: 440px) {
                   .typing{
                       font-size: 52px;
                    }
                 

        }
       
        }
        `}
      </style>

      <div className="hero">
        <div className="title-glow"></div>
        <div className="hero-badge" ref={badgeRef}>
          <Sparkles className="hero-icon" />
          <span>The Ultimate Hub for Creators</span>
        </div>

        <h1 className="hero-title">
          <TypingTitle text="Empower Your Workflow with " className="typing" />
          <span className="gradient-accent">AI Directory</span>
        </h1>

        <RevealSubtitle
          className="hero-desc"
          text="Scale your productivity with a curated repository of 200+ industry-leading tools. From generative art to professional coding, unlock the full power of artificial intelligence."
        />
      </div>
    </>
  );
}
