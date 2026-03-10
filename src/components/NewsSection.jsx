import React, { useEffect, useRef } from 'react';
import { Newspaper, ArrowRight, Calendar, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NewsSection = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    
    const news = [
        {
            title: "OpenAI Unveils Sora: Text-to-Video Revolution",
            desc: "Discover how the latest model from OpenAI is changing the landscape of cinematography and AI-generated content. Sora can create videos up to a minute long while maintaining visual quality and adherence to user prompts.",
            tag: "General AI",
            date: "Mar 15, 2024",
            gradient: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
            className: "card-large"
        },
        {
            title: "Claude 3.5 Sonnet Sets New Benchmarks",
            desc: "Anthropic's newest release is outperforming competitors in coding and reasoning tasks. It represents a significant leap in efficiency.",
            tag: "Language Models",
            date: "Mar 12, 2024",
            gradient: "linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)",
            className: "card-medium"
        },
        {
            title: "The Rise of Specialized AI for Developers",
            desc: "New tools are focusing on specific niches like backend optimization and automated testing.",
            tag: "Development",
            date: "Mar 10, 2024",
            gradient: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)",
            className: "card-small"
        },
        {
            title: "NVIDIA's New AI Chips Crush Performance Records",
            desc: "The next generation of Blackwell GPUs is set to scale AI training by 30x.",
            date: "Mar 08, 2024",
            tag: "Hardware",
            gradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
            className: "card-small"
        }
    ];

    useEffect(() => {
        const cards = gridRef.current.querySelectorAll('.news-card');
        const headerElements = sectionRef.current.querySelectorAll('.icon-badge, .section-header h2, .section-header .subtitle, .view-all-btn');

        gsap.fromTo(headerElements, 
            { opacity: 0, y: 30, filter: "blur(10px)" },
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                }
            }
        );

        gsap.fromTo(cards, 
            { 
                clipPath: "inset(100% 0% 0% 0%)",
                y: 100,
                opacity: 0 
            },
            {
                clipPath: "inset(0% 0% 0% 0%)",
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.inOut",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 80%",
                }
            }
        );

        cards.forEach(card => {
            const glow = card.querySelector('.card-border-beam');
            
            const handleMouseMove = (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top; 
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 3;
                
                const rotateX = (y - centerY) / 25;
                const rotateY = (centerX - x) / 25;

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 0.5,
                    ease: "power2.out"
                });

                gsap.to(glow, {
                    x: x - rect.width / 2,
                    y: y - rect.height / 2,
                    opacity: 1,
                    duration: 0.3
                });
            };

            const handleMouseLeave = () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.3)"
                });
                gsap.to(glow, {
                    opacity: 0,
                    duration: 0.5
                });
            };

            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

    }, []);

    return (
        <section className="news-section" ref={sectionRef}>
            <div className="section-header">
                <div className="title-wrapper">
                    <div className="icon-badge">
                        <Newspaper className="section-icon" />
                    </div>
                    <div>
                        <h2>Latest AI Insights</h2>
                        <p className="subtitle">Curated updates from the frontier of technology</p>
                    </div>
                </div>
                <button className="view-all-btn">
                    Explore Journal <ArrowRight size={16} />
                </button>
            </div>

            <div className="news-grid" ref={gridRef}>
                {news.map((item, index) => (
                    <div className={`news-card ${item.className}`} key={index}>
                        <div className="card-border-beam"></div>
                        <div className="card-top">
                            <span className="card-date">
                                <Calendar size={12} /> {item.date}
                            </span>
                            <div className="card-tag" style={{ background: item.gradient }}>
                                {item.tag}
                            </div>
                        </div>
                        
                        <div className="card-content">
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>

                        <div className="card-footer">
                            <a href="#" className="read-more">
                                <span>Read Full Story</span>
                                <div className="link-arrow">
                                    <ArrowUpRight size={16} />
                                </div>
                            </a>
                        </div>

                        <div className="card-glow" style={{ background: item.gradient }}></div>
                    </div>
                ))}
            </div>

            <style>
                {`
                .news-section {
                    padding: 140px 20px;
                    max-width: 1400px;
                    margin: 0 auto;
                    position: relative;
                    perspective: 1500px;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 80px;
                }

                .icon-badge {
                    width: 56px;
                    height: 56px;
                    background: rgba(82, 39, 255, 0.1);
                    border: 1px solid rgba(82, 39, 255, 0.2);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                }

                .section-icon {
                    color: #8b5cf6;
                }

                .news-section h2 {
                    color: white;
                    font-size: 48px;
                    font-weight: 900;
                    margin: 0;
                    letter-spacing: -2px;
                    background: linear-gradient(to right, #fff, #94a3b8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .subtitle {
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 20px;
                    margin-top: 12px;
                }

                .view-all-btn {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: white;
                    padding: 14px 28px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                    backdrop-filter: blur(10px);
                }

                .view-all-btn:hover {
                    background: rgba(82, 39, 255, 0.1);
                    border-color: #5227FF;
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 0 15px 30px -10px rgba(82, 39, 255, 0.3);
                }

                .news-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    grid-auto-rows: 240px;
                    gap: 24px;
                }

                .card-large { grid-column: span 2; grid-row: span 2; }
                .card-medium { grid-column: span 2; grid-row: span 1; }
                .card-small { grid-column: span 1; grid-row: span 1; }

                .news-card {
                    background: rgba(15, 23, 42, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 32px;
                    border-radius: 28px;
                    position: relative;
                    overflow: hidden;
                    backdrop-filter: blur(25px);
                    display: flex;
                    flex-direction: column;
                    transform-style: preserve-3d;
                    transition: border-color 0.3s ease;
                }

                .news-card:hover { border-color: rgba(82, 39, 255, 0.4); }

                .card-border-beam {
                    position: absolute;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(82, 39, 255, 0.15) 0%, transparent 70%);
                    pointer-events: none;
                    opacity: 0;
                    z-index: 0;
                    mix-blend-mode: screen;
                }

                .card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                    position: relative;
                    z-index: 2;
                }

                .card-date {
                    color: rgba(255, 255, 255, 0.3);
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                }

                .card-tag {
                    padding: 6px 14px;
                    border-radius: 10px;
                    font-size: 11px;
                    font-weight: 800;
                    color: white;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }

                .card-content { position: relative; z-index: 2; }

                .card-content h3 {
                    color: white;
                    font-size: 28px;
                    font-weight: 800;
                    margin-bottom: 16px;
                    line-height: 1.25;
                    letter-spacing: -0.5px;
                }

                .card-small h3 { font-size: 22px; }

                .card-content p {
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 16px;
                    line-height: 1.6;
                    margin-bottom: 30px;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .card-large p { -webkit-line-clamp: 5; }

                .card-footer {
                    margin-top: auto;
                    position: relative;
                    z-index: 2;
                }

                .read-more {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    color: white;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 15px;
                    transition: all 0.3s ease;
                }

                .link-arrow {
                    width: 36px;
                    height: 36px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .read-more:hover { color: #8b5cf6; }
                .read-more:hover .link-arrow {
                    background: #5227FF;
                    border-color: #5227FF;
                    color: white;
                    transform: rotate(45deg) scale(1.1);
                    box-shadow: 0 0 20px rgba(82, 39, 255, 0.5);
                }

                .card-glow {
                    position: absolute;
                    bottom: -60px;
                    right: -60px;
                    width: 200px;
                    height: 200px;
                    filter: blur(80px);
                    opacity: 0;
                    transition: opacity 0.6s ease;
                    pointer-events: none;
                }

                .news-card:hover .card-glow { opacity: 0.12; }

                @media (max-width: 1200px) {
                    .news-grid { grid-template-columns: repeat(2, 1fr); }
                }

                @media (max-width: 768px) {
                    .section-header { flex-direction: column; align-items: flex-start; gap: 24px; }
                    .news-grid { grid-template-columns: 1fr; grid-auto-rows: auto; }
                    .card-large, .card-medium, .card-small { grid-column: span 1; grid-row: span 1; }
                    .news-card { padding: 32px; }
                    .news-section h2 { font-size: 36px; }
                }
                `}
            </style>
        </section>
    );
};

export default NewsSection;
