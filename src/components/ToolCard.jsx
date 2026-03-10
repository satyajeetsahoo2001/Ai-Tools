export default function ToolCard({
  name,
  description,
  category,
  logo,
  website,
}) {
  return (
    <>
      <style>
        {`
        .tool-card {
          position: relative;
          background: #16233b;
          border-radius: 20px;
          border: 1px solid rgba(87, 108, 153, 0.4);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          width: 400px;
          height: 300px;
          flex-shrink: 0;
          scroll-snap-align: start;
        }

        .tool-card:hover {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border-color: #5227FF;
        }

        .tool-card-inner {
  padding: 30px;
  position: relative; /* This is good */
  z-index: 20;        /* Increase this to be safe */
  height: 100%;
  display: flex;
  flex-direction: column;
}

        /* The Animated Circle */
        .card-circle {
          position: absolute;
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #5227FF, #FF9FFC);
          border-radius: 50%;
          top: -30px;
          right: -30px;
          z-index: 1;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0.6;
        }

        .tool-card:hover .card-circle {
          width: 250%;
          height: 250%;
          top: -25%;
          right: -25%;
          opacity: 1;
        }

        .tool-logo {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.1);
          margin-bottom: 20px;
          font-size: 28px;
          color: white;
          transition: all 0.4s ease;
          transform-origin: left center;
        }

        .tool-card:hover .tool-logo {
          transform: scale(1.1) rotate(5deg);
        }

        .tool-title {
          font-size: 24px;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
          transition: all 0.4s ease 0.1s;
          opacity: 1;
          transform: translateY(0);
        }

        .tool-card:hover .tool-title {
          transform: translateY(-2px);
          text-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        .tool-description {
          font-size: 15px;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 20px;
          transition: all 0.4s ease 0.2s;
        }

        .tool-card:hover .tool-description {
          color: rgba(255, 255, 255, 0.9);
        }

        .tool-tags {
          display: inline-block;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: bold;
          color: white;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          letter-spacing: 0.5px;
          transition: all 0.4s ease 0.3s;
          align-self: flex-start;
        }

        .tool-card:hover .tool-tags {
          background: rgba(255, 255, 255, 0.2);
          border-color: white;
        }

        .tool-link {
  position: relative; /* Add this */
  z-index: 30;        /* Ensure it's above the background */
  display: inline-flex;
  align-items: center;
  margin-top: auto;   /* This pushes it to the bottom */
  font-size: 14px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.4s ease 0.4s;
  opacity: 0.8;
}

        .tool-link:hover {
          opacity: 1;
          transform: translateX(5px);
        }

        .tool-link span {
            margin-left: 5px;
            transition: transform 0.3s ease;
        }
        
        .tool-link:hover span {
            transform: translateX(3px);
        }
        `}
      </style>

      <div className="tool-card">
        <div className="card-circle"></div>
        <div className="tool-card-inner">
          <div className="tool-logo">
            <img src={logo} alt="Tool Logo"  style={{height:"30px",width:"30px",borderRadius:"9px"}} />
          </div>

          <h3 className="tool-title">{name}</h3>

          <p className="tool-description">{description}</p>
          <div style={{
            display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px"
          }}>
            <div className="tool-tags">
              {category}
            </div>
            <div>
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="tool-link"
              >
                Visit Website <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}