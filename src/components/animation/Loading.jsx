import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loading = () => {
    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const textRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1 });

        gsap.set(logoRef.current, { scale: 0.8, opacity: 0 });
        gsap.set(textRef.current, { y: 20, opacity: 0 });
        gsap.set(ringRef.current, { rotation: 0, scale: 0.9, opacity: 0 });

        tl.to(logoRef.current, {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out"
        })
        .to(ringRef.current, {
            opacity: 0.6,
            scale: 1.1,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8")
        .to(textRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.5");

        tl.to(ringRef.current, {
            rotation: 360,
            duration: 3,
            ease: "none",
            repeat: -1
        }, 0);

        gsap.to(logoRef.current, {
            scale: 1.05,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(".loading-glow", {
            opacity: 0.4,
            scale: 1.2,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, []);

    return (
        <div ref={containerRef} style={styles.container}>
            <div className="loading-glow" style={styles.glow}></div>
            
            <div style={styles.content}>
                <div style={styles.logoWrapper}>
                    <div ref={ringRef} style={styles.ring}></div>
                    
                    <img 
                        ref={logoRef} 
                        src="/spark2.png" 
                        alt="AIDirectory Logo" 
                        style={styles.logo} 
                    />
                </div>

                <div ref={textRef} style={styles.brandTitle}>
                    AIDirectory
                </div>
                
                <div style={styles.loaderBarContainer}>
                    <div style={styles.loaderBar}></div>
                </div>
            </div>

            <style>
                {`
                @keyframes loading-progress {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                `}
            </style>
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0B1220',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        overflow: 'hidden',
    },
    glow: {
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(82, 39, 255, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        filter: 'blur(40px)',
    },
    content: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
    },
    logoWrapper: {
        position: 'relative',
        width: '120px',
        height: '120px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ring: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        border: '2px solid transparent',
        borderTop: '2px solid #5227FF',
        borderBottom: '2px solid #FF9FFC',
        borderRadius: '50%',
        boxShadow: '0 0 15px rgba(82, 39, 255, 0.3)',
    },
    logo: {
        width: '60px',
        height: '80px',
        objectFit: 'contain',
        filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))',
    },
    brandTitle: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: '2px',
        textShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
    },
    loaderBarContainer: {
        width: '200px',
        height: '3px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
        marginTop: '10px',
    },
    loaderBar: {
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, #5227FF, #FF9FFC, transparent)',
        animation: 'loading-progress 2s infinite linear',
    }
};

export default Loading;
