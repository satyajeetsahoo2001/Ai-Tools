import { Search } from "lucide-react";

export default function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <>
      <style>
        {`
        .ai-search-container{
          width:100%;
          max-width:720px;
          margin:0 auto;
          padding:0 16px;
        }

        .ai-search-box{
          position:relative;
          display:flex;
          align-items:center;
          backdrop-filter:blur(12px);
          background:rgba(255,255,255,0.08);
          border:1px solid rgba(255,255,255,0.15);
          border-radius:18px;
          padding:4px;
          transition:all .25s ease;
          box-shadow:0 10px 30px rgba(0,0,0,0.25);
        }

        .ai-search-box:focus-within{
          border:1px solid rgba(255,255,255,0.35);
          box-shadow:
          0 0 0 2px rgba(59,130,246,0.4),
          0 10px 35px rgba(0,0,0,0.35);
        }

        .ai-search-icon{
          position:absolute;
          left:18px;
          width:20px;
          height:20px;
          color:#cbd5e1;
        }

        .ai-search-input{
          width:100%;
          padding:16px 18px 16px 48px;
          background:transparent;
          border:none;
          outline:none;
          color:white;
          font-size:16px;
          font-weight:500;
          letter-spacing:.3px;
        }

        .ai-search-input::placeholder{
          color:#94a3b8;
        }

        @media (max-width:640px){

          .ai-search-input{
            font-size:15px;
            padding:14px 16px 14px 46px;
          }

          .ai-search-box{
            border-radius:16px;
            margin-right: 30px;
          }

        }
        `}
      </style>

      <div className="ai-search-container">
        <div className="ai-search-box">

          <Search className="ai-search-icon" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e)=>onSearchChange(e.target.value)}
            placeholder="Search AI tools like ChatGPT, Midjourney..."
            className="ai-search-input"
          />

        </div>
      </div>
    </>
  );
}