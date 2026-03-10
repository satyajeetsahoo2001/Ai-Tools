import React from 'react';
import Front from './front';
import SearchBar from './SearchBar';
import HeroAnimation from './animation/HeroAnimation';

const HeroSection = ({ searchQuery, setSearchQuery }) => {
    return (
        <section className="hero-container" style={styles.heroContainer}>
            <div className="hero-bg-wrapper">
                <div className="hero-bg-image"></div>
                <HeroAnimation />
                <div className="hero-overlay"></div>
            </div>
            
            <div className="hero-content" style={styles.heroContent}>
                <div style={styles.logoRow}>
                    <img src="/spark2.png" alt="icon" style={styles.logoIcon} />
                    <p style={styles.brandName}>AIDirectory</p>
                </div>

                <Front />

                <div className="search-wrapper" style={styles.searchWrapper}>
                    <SearchBar
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />
                </div>
            </div>
            
            <style>
                {`
                .hero-container {
                    position: relative;
                    width: 100%;               
                    min-height: clamp(500px, 80vh, 800px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }

                .hero-bg-wrapper {
                    position: absolute;
                    inset: 0;
                    margin: 10px;
                    border-radius: 24px;
                    overflow: hidden;
                    z-index: 1;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5),
                                0 0 20px rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .hero-bg-image {
                    position: absolute;
                    inset: 0;
                    background-image: url("/bg-star.png");
                    background-size: cover;
                    background-position: center;
                    transform: scale(1.1);
                    animation: subtleZoom 20s infinite alternate;
                    z-index: -1;
                }

                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(11, 18, 32, 0.3) 0%, rgba(11, 18, 32, 0.8) 100%);
                    z-index: 2;
                }

                @keyframes subtleZoom {
                    from { transform: scale(1.1); }
                    to { transform: scale(1.2); }
                }

                .hero-content {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    max-width: 1000px;
                    text-align: center;
                }
                `}
            </style>
        </section>
    );
};

const styles = {
    heroContainer: {
    },
    heroContent: {
    },
    logoRow: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "40px",
        marginBottom: "20px"
    },
    logoIcon: {
        width: "40px",
        height: "54px",
        filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))"
    },
    brandName: {
        color: "white",
        fontWeight: "900",
        fontSize: "28px",
        marginLeft: "12px",
        letterSpacing: "1px"
    },
    searchWrapper: {
        marginBottom: "60px",
        maxWidth: "700px",
        margin: "0 auto",
        position: "relative",
        zIndex: 20
    }
};

export default HeroSection;
