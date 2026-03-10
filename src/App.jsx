import { useState, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import ToolCard from "./components/ToolCard";
import FeaturedSection from "./components/FeaturedSection";
import TrendingSection from "./components/TrendingSection";
import HeroSection from "./components/HeroSection";
import Example from "./components/example"
import Loading from "./components/animation/Loading";
import { Heart } from "lucide-react";
import useDragScroll from "./hooks/useDragScroll";
import NewsSection from "./components/NewsSection";
import CommunitySection from "./components/CommunitySection";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [tools, setTools] = useState([]);
  const dragRef = useDragScroll();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    fetch("/data/aiTools.json")
      .then((res) => res.json())
      .then((data) => setTools(data))
      .catch((err) => console.error(err));
      
    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(tools.map((tool) => tool.category))
    );
    return uniqueCategories.sort();
  }, [tools]);

  const filteredTools = useMemo(() => {
    let filtered = tools;


    if (selectedCategory !== "All") {
      filtered = filtered.filter((tool) => tool.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((tool) =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [tools, selectedCategory, searchQuery]);

  return (
    <>
      {loading && <Loading />}
      <style>
        {`
        body{
         background-color:#0B1220;
         overflow-x: hidden;
        }
        .app-container{
          min-height:100vh;
        }

        .main-wrapper{
          max-width:1400px;
          margin:auto;
          padding:28px 16px;
        }

        .tools-grid{
          display:flex;
          flex-direction:row;
          gap:24px;
          overflow-x: auto;
          padding: 20px 0 40px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          will-change: transform, scroll-position;
          cursor: grab;
          user-select: none;
        }

        .tools-grid:active {
          cursor: grabbing;
        }

        .tools-grid::-webkit-scrollbar {
          display: none;
        }

        .tools-grid {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .results-info {
          margin-top: 40px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 14px;
          font-weight: 500;
          text-align: center;
        }

        `}
      </style>


      <div className="app-container">
        <div className="main-wrapper">
          <HeroSection 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />


          {!searchQuery && selectedCategory === "All" && (
            <>
              <FeaturedSection tools={tools} />
              <TrendingSection tools={tools} />
            </>
          )}

          <div className="results-info">
            {filteredTools.length}{" "}
            {filteredTools.length === 1 ? "tool" : "tools"} available for you
          </div>

          {filteredTools.length > 0 && (
            <div className="tools-grid" ref={dragRef}>
              {filteredTools.map((tool) => (
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
          )}
        </div>

        <NewsSection />
        <CommunitySection />
        <Footer />
      </div>
    </>
  );
}

export default App;
