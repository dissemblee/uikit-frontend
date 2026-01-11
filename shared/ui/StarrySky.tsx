export const StarrySky = () => (
  <div className="stars-container">
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        
        <radialGradient id="starGlowBlue" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#aaccff" stopOpacity="1" />
          <stop offset="100%" stopColor="#aaccff" stopOpacity="0" />
        </radialGradient>
        
        <radialGradient id="starGlowGold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffdd88" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffdd88" stopOpacity="0" />
        </radialGradient>
        
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <g id="shootingStar">
          <line x1="0" y1="0" x2="100" y2="30" stroke="url(#starGlow)" strokeWidth="2">
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </line>
        </g>
      </defs>
      
      <rect width="100%" height="100%" fill="#0a0a2a" />
      <rect width="100%" height="100%" fill="url(#bgGradient)" />
      
      {Array.from({ length: 50 }).map((_, i) => {
        const x = (Math.random() * 1900 + 10);
        const y = (Math.random() * 1060 + 10);
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 4 + 2;
        const delay = Math.random() * 5;
        
        return (
          <circle
            key={`big-star-${i}`}
            cx={x}
            cy={y}
            r={size}
            fill="url(#starGlow)"
            filter="url(#glow)"
          >
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur={`${duration}s`}
              repeatCount="indefinite"
              begin={`${delay}s`}
            />
            <animate
              attributeName="r"
              values={`${size};${size * 1.5};${size}`}
              dur={`${duration * 2}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}
      
      {Array.from({ length: 150 }).map((_, i) => {
        const x = (Math.random() * 1920);
        const y = (Math.random() * 1080);
        const size = Math.random() * 1.5 + 0.5;
        const duration = Math.random() * 3 + 1;
        const delay = Math.random() * 3;
        
        return (
          <circle
            key={`medium-star-${i}`}
            cx={x}
            cy={y}
            r={size}
            fill="white"
            opacity="0.7"
          >
            <animate
              attributeName="opacity"
              values="0.2;0.8;0.2"
              dur={`${duration}s`}
              repeatCount="indefinite"
              begin={`${delay}s`}
            />
          </circle>
        );
      })}
      
      {Array.from({ length: 300 }).map((_, i) => {
        const x = (Math.random() * 1920);
        const y = (Math.random() * 1080);
        const size = Math.random() * 0.8 + 0.2;
        
        return (
          <circle
            key={`small-star-${i}`}
            cx={x}
            cy={y}
            r={size}
            fill="white"
            opacity="0.4"
          >
            <animate
              attributeName="opacity"
              values="0.1;0.5;0.1"
              dur={`${Math.random() * 5 + 2}s`}
              repeatCount="indefinite"
              begin={`${Math.random() * 10}s`}
            />
          </circle>
        );
      })}
      
      {Array.from({ length: 30 }).map((_, i) => {
        const x = (Math.random() * 1920);
        const y = (Math.random() * 1080);
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 5 + 3;
        
        return (
          <circle
            key={`blue-star-${i}`}
            cx={x}
            cy={y}
            r={size}
            fill="url(#starGlowBlue)"
            opacity="0.8"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.9;0.3"
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values={`${size};${size * 1.3};${size}`}
              dur={`${duration * 1.5}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}
      
      {Array.from({ length: 20 }).map((_, i) => {
        const x = (Math.random() * 1920);
        const y = (Math.random() * 1080);
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 6 + 2;
        
        return (
          <circle
            key={`gold-star-${i}`}
            cx={x}
            cy={y}
            r={size}
            fill="url(#starGlowGold)"
            opacity="0.7"
          >
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}
      
      {Array.from({ length: 8 }).map((_, i) => {
        const startX = -100;
        const startY = Math.random() * 800 + 100;
        const endX = 2000;
        const endY = startY + 300;
        const duration = Math.random() * 4 + 2;
        const delay = Math.random() * 15;
        const starSize = Math.random() * 2 + 1;
        
        return (
          <g key={`shooting-${i}`}>
            <circle
              cx={startX}
              cy={startY}
              r={starSize * 2}
              fill="white"
              opacity="0"
            >
              <animate
                attributeName="cx"
                from={startX}
                to={endX}
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                from={startY}
                to={endY}
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </circle>
            <line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="white"
              strokeWidth={starSize}
              opacity="0"
              strokeLinecap="round"
            >
              <animate
                attributeName="x1"
                from={startX}
                to={endX}
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y1"
                from={startY}
                to={endY}
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                from={startX + 100}
                to={endX + 100}
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                from={startY + 30}
                to={endY + 30}
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </line>
          </g>
        );
      })}
      
      <ellipse cx="400" cy="300" rx="300" ry="200" fill="rgba(100, 150, 255, 0.03)" opacity="0.5">
        <animate
          attributeName="opacity"
          values="0.3;0.5;0.3"
          dur="20s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="rx"
          values="300;320;300"
          dur="15s"
          repeatCount="indefinite"
        />
      </ellipse>
      
      <ellipse cx="1500" cy="700" rx="250" ry="180" fill="rgba(255, 200, 100, 0.02)" opacity="0.4">
        <animate
          attributeName="opacity"
          values="0.2;0.4;0.2"
          dur="25s"
          repeatCount="indefinite"
        />
      </ellipse>
    </svg>
  </div>
);
