import React, { useEffect, useRef } from 'react';
import { Users, MessageSquare, Zap, Star, LayoutGrid, Award, ShieldCheck, Globe, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CommunitySection = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const visualRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        const headerElements = contentRef.current.querySelectorAll('.community-badge, h2, p, .community-features, .community-stats, .join-btn');

        gsap.fromTo(headerElements,
            { opacity: 0, x: -50, filter: "blur(10px)" },
            {
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            }
        );

        gsap.fromTo(".comm-card",
            { opacity: 0, scale: 0.5, y: 100, rotate: -15 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                rotate: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: "back.out(2)",
                scrollTrigger: {
                    trigger: visualRef.current,
                    start: "top 80%",
                }
            }
        );

        const cards = document.querySelectorAll(".comm-card");
        cards.forEach((card, i) => {
            gsap.to(card, {
                y: "random(-20, 20)",
                x: "random(-10, 10)",
                rotation: "random(-5, 5)",
                duration: 3 + i,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });

        const btn = btnRef.current;
        const handleMagneticMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const dx = mouseX - centerX;
            const dy = mouseY - centerY;
            
            gsap.to(btn, {
                x: dx * 0.3,
                y: dy * 0.3,
                duration: 0.4,
                ease: "power2.out"
            });
            
            gsap.to(btn.querySelector('.btn-glow'), {
                x: dx * 0.5,
                y: dy * 0.5,
                opacity: 1,
                duration: 0.4
            });
        };

        const handleMagneticLeave = () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
            gsap.to(btn.querySelector('.btn-glow'), {
                opacity: 0,
                duration: 0.5
            });
        };

        btn.addEventListener('mousemove', handleMagneticMove);
        btn.addEventListener('mouseleave', handleMagneticLeave);

    }, []);

    return (
        <section className="community-section" ref={sectionRef}>
            <div className="bg-grid-overlay"></div>
            <div className="community-container">
                <div className="community-info" ref={contentRef}>
                    <div className="community-badge">
                        <Globe size={14} />
                        <span>Connected Meta-Hub</span>
                    </div>
                    <h2>Engineered for the Modern Innovator</h2>
                    <p>
                        Our community isn't just about sharing links. It's about a decentralized 
                        exchange of specialized intelligence.
                    </p>
                    
                    <div className="community-features">
                        <div className="feat-item">
                            <div className="feat-icon"><ShieldCheck size={20} /></div>
                            <div>
                                <h4>Verified Tools</h4>
                                <span>Quality-checked by AI leads</span>
                            </div>
                        </div>
                        <div className="feat-item">
                            <div className="feat-icon"><Zap size={20} /></div>
                            <div>
                                <h4>Rapid Deploy</h4>
                                <span>1-click integration templates</span>
                            </div>
                        </div>
                    </div>

                    <div className="community-stats">
                        <div className="stat-item">
                            <span className="stat-num">50k+</span>
                            <span className="stat-label">Deployments</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-num">98.4%</span>
                            <span className="stat-label">Success Rate</span>
                        </div>
                    </div>
                    
                    <button className="join-btn" ref={btnRef}>
                        <div className="btn-glow"></div>
                        <span>Join the Vanguard</span>
                        <ArrowRight size={20} />
                    </button>
                </div>

                <div className="community-visuals" ref={visualRef}>
                    <div className="visual-bg-glow"></div>
                    
                    <div className="comm-card card-1">
                        <div className="glass-reflection"></div>
                        <div className="user-info">
                            <div className="avatar">JD</div>
                            <div>
                                <h4>Marcus Thorne</h4>
                                <span>System Architect</span>
                            </div>
                        </div>
                        <p>"The latency reduction we achieved using the tools suggested here was over 40%."</p>
                    </div>

                    <div className="comm-card card-2">
                        <div className="glass-reflection"></div>
                        <div className="user-info">
                            <div className="avatar s-2">SV</div>
                            <div>
                                <h4>Sarah Vance</h4>
                                <span>Generative Artist</span>
                            </div>
                        </div>
                        <p>"Finally, a directory that understands the nuance of aesthetic vs utility in AI arts."</p>
                    </div>

                    <div className="comm-card card-featured">
                        <div className="glass-reflection"></div>
                        <div className="post-header">
                            <Star size={18} fill="#8b5cf6" color="#8b5cf6" />
                            <span>Community Highlight</span>
                        </div>
                        <h4>How we scaled 100x using autonomous agents</h4>
                        <div className="post-meta">
                            <MessageSquare size={14} />
                            <span>412 Discussions</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                .community-section {
                    padding: 180px 20px;
                    background: #020617;
                    position: relative;
                    overflow: hidden;
                }

                .bg-grid-overlay {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
                    background-size: 60px 60px;
                    mask-image: radial-gradient(circle at center, black, transparent 80%);
                }

                .community-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 120px;
                    align-items: center;
                    position: relative;
                    z-index: 2;
                }

                .community-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 20px;
                    background: rgba(139, 92, 246, 0.1);
                    color: #a78bfa;
                    border-radius: 999px;
                    font-size: 14px;
                    font-weight: 800;
                    margin-bottom: 40px;
                    border: 1px solid rgba(139, 92, 246, 0.2);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }

                .community-info h2 {
                    color: white;
                    font-size: 64px;
                    font-weight: 950;
                    margin-bottom: 32px;
                    line-height: 1;
                    letter-spacing: -3.5px;
                }

                .community-info p {
                    color: rgba(255, 255, 255, 0.45);
                    font-size: 22px;
                    line-height: 1.5;
                    margin-bottom: 60px;
                }

                .community-features {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 32px;
                    margin-bottom: 60px;
                }

                .feat-item {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                }

                .feat-icon {
                    width: 52px;
                    height: 52px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #8b5cf6;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                }

                .feat-item h4 { color: white; margin: 0 0 4px; font-size: 17px; font-weight: 700; }
                .feat-item span { color: rgba(255, 255, 255, 0.3); font-size: 14px; }

                .community-stats {
                    display: flex;
                    gap: 60px;
                    margin-bottom: 70px;
                    padding-top: 40px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }

                .stat-num {
                    display: block;
                    color: white;
                    font-size: 40px;
                    font-weight: 900;
                    margin-bottom: 6px;
                    letter-spacing: -1px;
                }

                .stat-label {
                    color: rgba(255, 255, 255, 0.3);
                    font-size: 13px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }

                .join-btn {
                    position: relative;
                    background: white;
                    color: black;
                    border: none;
                    padding: 24px 48px;
                    border-radius: 20px;
                    font-size: 18px;
                    font-weight: 850;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    cursor: pointer;
                    transition: transform 0.1s ease;
                }

                .btn-glow {
                    position: absolute;
                    inset: -20px;
                    background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
                    opacity: 0;
                    pointer-events: none;
                    filter: blur(20px);
                }

                .community-visuals {
                    position: relative;
                    height: 650px;
                    perspective: 2000px;
                }

                .visual-bg-glow {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
                    filter: blur(100px);
                }

                .comm-card {
                    position: absolute;
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(30px) saturate(180%);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 40px;
                    border-radius: 32px;
                    width: 380px;
                    box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.8);
                    z-index: 5;
                    overflow: hidden;
                }

                .glass-reflection {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
                    pointer-events: none;
                }

                .user-info {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .avatar {
                    width: 56px;
                    height: 56px;
                    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
                    border-radius: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 900;
                    font-size: 18px;
                }

                .avatar.s-2 { background: linear-gradient(135deg, #ec4899, #f43f5e); }

                .user-info h4 { color: white; margin: 0; font-size: 19px; font-weight: 800; }
                .user-info span { color: rgba(255, 255, 255, 0.4); font-size: 14px; }

                .comm-card p {
                    margin: 0;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 17px;
                    line-height: 1.6;
                    font-weight: 500;
                }

                .card-1 { top: 0; right: -20px; z-index: 6; }
                .card-2 { top: 200px; left: -40px; z-index: 4; }
                
                .card-featured {
                    bottom: 0;
                    right: 40px;
                    width: 420px;
                    background: rgba(15, 23, 42, 0.6);
                    border-color: rgba(139, 92, 246, 0.3);
                    z-index: 7;
                }

                .post-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: #a78bfa;
                    font-size: 15px;
                    font-weight: 800;
                    margin-bottom: 20px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .card-featured h4 {
                    color: white;
                    font-size: 24px;
                    line-height: 1.3;
                    margin-bottom: 24px;
                    font-weight: 900;
                }

                .post-meta {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    color: rgba(255, 255, 255, 0.3);
                    font-size: 14px;
                    font-weight: 600;
                }

                @media (max-width: 1200px) {
                    .community-container { gap: 60px; }
                    .community-info h2 { font-size: 52px; }
                }

                @media (max-width: 1024px) {
                    .community-container { grid-template-columns: 1fr; text-align: center; }
                    .community-info { display: flex; flex-direction: column; align-items: center; }
                    .community-features { justify-content: center; width: 100%; }
                    .community-stats { justify-content: center; width: 100%; }
                    .community-visuals { display: none; }
                    .community-info h2 { font-size: 48px; }
                    .community-info p { font-size: 18px; }
                }
                `}
            </style>
        </section>
    );
};

export default CommunitySection;
