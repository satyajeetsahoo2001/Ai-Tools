import React, { useEffect, useRef } from 'react';
import { Github, Twitter, Linkedin, Mail, Heart, Send } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);
    const contentRef = useRef(null);
    const brandRef = useRef(null);

    useEffect(() => {
        const columns = contentRef.current.querySelectorAll('.footer-brand, .link-group');
        
        gsap.fromTo(columns,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 85%",
                }
            }
        );

        const lists = contentRef.current.querySelectorAll('ul li');
        gsap.fromTo(lists,
            { opacity: 0, x: -10 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 80%",
                }
            }
        );

        const socialBtns = document.querySelectorAll(".social-btn");
        socialBtns.forEach(btn => {
            const handleSocialMove = (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - (rect.left + rect.width / 2);
                const y = e.clientY - (rect.top + rect.height / 2);
                
                gsap.to(btn, {
                    x: x * 0.4,
                    y: y * 0.4,
                    duration: 0.4,
                    ease: "power2.out"
                });
            };

            const handleSocialLeave = () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)"
                });
            };

            btn.addEventListener('mousemove', handleSocialMove);
            btn.addEventListener('mouseleave', handleSocialLeave);
        });

    }, []);

    return (
        <footer className="main-footer" ref={footerRef}>
            <div className="footer-glow"></div>
            <div className="footer-content" ref={contentRef}>
                <div className="footer-brand" ref={brandRef}>
                    <div className="brand-logo shimmer-text">
                        <img src="/spark2.png" alt="logo" />
                        <span>AIDirectory</span>
                    </div>
                    <p>
                        Discover the future of artificial intelligence. We curate the 
                        most innovative tools to amplify human potential. Join the movement.
                    </p>
                    <div className="newsletter-box">
                        <h4>Weekly AI Digest</h4>
                        <div className="input-row">
                            <input type="email" placeholder="email@example.com" />
                            <button className="send-btn"><Send size={14} /></button>
                        </div>
                    </div>
                    <div className="social-links">
                        <a href="#" className="social-btn"><Twitter size={18} /></a>
                        <a href="#" className="social-btn"><Github size={18} /></a>
                        <a href="#" className="social-btn"><Linkedin size={18} /></a>
                    </div>
                </div>

                <div className="footer-links-grid">
                    <div className="link-group">
                        <h4>Platform</h4>
                        <ul>
                            <li><a href="#">Featured Tools</a></li>
                            <li><a href="#">Trending Hub</a></li>
                            <li><a href="#">Categories</a></li>
                            <li><a href="#">AI Insights</a></li>
                        </ul>
                    </div>
                    <div className="link-group">
                        <h4>Community</h4>
                        <ul>
                            <li><a href="#">Submit Tool</a></li>
                            <li><a href="#">Documentation</a></li>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Guidelines</a></li>
                        </ul>
                    </div>
                    <div className="link-group">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Use</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                            <li><a href="#">Licenses</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="bottom-inner">
                    <p>&copy; 2024 AIDirectory. Decentralized Intelligence Hub.</p>
                    <div className="footer-meta">
                        <div className="made-with">
                            Crafted with <Heart size={14} className="heart-icon" /> for the AI era
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                .main-footer {
                    background: #020617;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 120px 20px 60px;
                    position: relative;
                    overflow: hidden;
                    margin-top: 100px;
                }

                .footer-glow {
                    position: absolute;
                    top: -200px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 800px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
                    filter: blur(80px);
                    pointer-events: none;
                }

                .footer-content {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 120px;
                    position: relative;
                    z-index: 2;
                }

                .footer-brand {
                    max-width: 380px;
                }

                .shimmer-text span {
                    background: linear-gradient(
                        90deg, 
                        #fff 0%, 
                        rgba(255,255,255,0.4) 25%, 
                        #fff 50%, 
                        rgba(255,255,255,0.4) 75%, 
                        #fff 100%
                    );
                    background-size: 200% auto;
                    color: transparent;
                    -webkit-background-clip: text;
                    animation: shimmer 5s linear infinite;
                }

                @keyframes shimmer {
                    to { background-position: 200% center; }
                }

                .brand-logo {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    color: white;
                    font-size: 32px;
                    font-weight: 950;
                    margin-bottom: 28px;
                    letter-spacing: -1.5px;
                }

                .brand-logo img {
                    width: 40px;
                    height: auto;
                    filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.3));
                }

                .footer-brand p {
                    color: rgba(255, 255, 255, 0.4);
                    line-height: 1.8;
                    font-size: 17px;
                    margin-bottom: 48px;
                    font-weight: 500;
                }

                .newsletter-box {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 28px;
                    border-radius: 22px;
                    margin-bottom: 48px;
                    backdrop-filter: blur(10px);
                }

                .newsletter-box h4 {
                    color: white;
                    font-size: 14px;
                    font-weight: 800;
                    margin-bottom: 18px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }

                .input-row {
                    display: flex;
                    gap: 10px;
                }

                .input-row input {
                    flex: 1;
                    background: rgba(0, 0, 0, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 12px 18px;
                    color: white;
                    font-size: 15px;
                    transition: border-color 0.3s ease;
                }

                .input-row input:focus {
                    outline: none;
                    border-color: #8b5cf6;
                }

                .send-btn {
                    background: #5227FF;
                    color: white;
                    border: none;
                    width: 48px;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .send-btn:hover { background: #8b5cf6; transform: scale(1.1) rotate(5deg); box-shadow: 0 0 20px rgba(82, 39, 255, 0.4); }

                .social-links {
                    display: flex;
                    gap: 20px;
                }

                .social-btn {
                    width: 52px;
                    height: 52px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(255, 255, 255, 0.5);
                    transition: all 0.3s ease;
                    position: relative;
                }

                .social-btn:hover {
                    color: white;
                    border-color: #8b5cf6;
                    background: rgba(139, 92, 246, 0.1);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
                }

                .footer-links-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 80px;
                }

                .link-group h4 {
                    color: white;
                    font-size: 15px;
                    font-weight: 900;
                    margin-bottom: 36px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    position: relative;
                }

                .link-group h4::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 0;
                    width: 20px;
                    height: 2px;
                    background: #8b5cf6;
                    border-radius: 2px;
                }

                .link-group ul { list-style: none; padding: 0; margin: 0; }
                .link-group li { margin-bottom: 20px; }

                .link-group a {
                    color: rgba(255, 255, 255, 0.45);
                    text-decoration: none;
                    font-size: 17px;
                    font-weight: 500;
                    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
                    display: inline-block;
                }

                .link-group a:hover {
                    color: #a78bfa;
                    transform: translateX(8px);
                }

                .footer-bottom {
                    margin-top: 120px;
                    padding-top: 50px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }

                .bottom-inner {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: rgba(255, 255, 255, 0.25);
                    font-size: 15px;
                    font-weight: 500;
                }

                .made-with {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255, 255, 255, 0.02);
                    padding: 8px 18px;
                    border-radius: 99px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    font-size: 14px;
                    letter-spacing: 0.5px;
                }

                .heart-icon { color: #f43f5e; animation: pulse 1.5s infinite; }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }

                @media (max-width: 1024px) {
                    .footer-content { grid-template-columns: 1fr; gap: 80px; }
                    .footer-brand { max-width: 100%; }
                    .footer-links-grid { gap: 60px; }
                }

                @media (max-width: 768px) {
                    .footer-links-grid { grid-template-columns: repeat(2, 1fr); gap: 40px; }
                    .bottom-inner { flex-direction: column; gap: 32px; text-align: center; }
                }

                @media (max-width: 480px) {
                    .footer-links-grid { grid-template-columns: 1fr; }
                }
                `}
            </style>
        </footer>
    );
};

export default Footer;
