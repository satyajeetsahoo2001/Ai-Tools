import React from "react";

export default function CategoryFilter({
    categories,
    selectedCategory,
    onCategoryChange,
}) {
    return (
        <>
            <style>
                {`
        .category-filter-container {
          padding: 20px 0;
          margin-bottom: 20px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          display: flex;
          gap: 12px;
        }

        .category-filter-container::-webkit-scrollbar {
          display: none;
        }

        .filter-btn {
          padding: 10px 24px;
          border-radius: 100px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          white-space: nowrap;
          backdrop-filter: blur(10px);
        }

        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #5227FF, #FF9FFC);
          color: white;
          border: none;
          box-shadow: 0 8px 20px rgba(82, 39, 255, 0.4);
          transform: translateY(-2px);
        }

        .filter-btn:active {
          transform: translateY(0) scale(0.95);
        }
        `}
            </style>

            <div className="category-filter-container">
                <button
                    onClick={() => onCategoryChange("All")}
                    className={`filter-btn ${selectedCategory === "All" ? "active" : ""}`}
                >
                    All Tools
                </button>

                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </>
    );
}
