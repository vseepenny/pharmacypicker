// DHS (Department of Homeland Security) Logo Component
// Based on the official DHS seal design

interface DHSLogoProps {
  size?: number;
  className?: string;
}

export default function DHSLogo({ size = 40, className = '' }: DHSLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle - dark blue */}
      <circle cx="50" cy="50" r="48" fill="#003366" />

      {/* Inner white ring */}
      <circle cx="50" cy="50" r="44" fill="none" stroke="#FFFFFF" strokeWidth="2" />

      {/* Inner blue circle */}
      <circle cx="50" cy="50" r="38" fill="#003366" />

      {/* White inner ring */}
      <circle cx="50" cy="50" r="34" fill="none" stroke="#FFFFFF" strokeWidth="1" />

      {/* Center shield shape */}
      <path
        d="M50 18 L65 28 L65 50 C65 65 50 75 50 75 C50 75 35 65 35 50 L35 28 Z"
        fill="#FFFFFF"
      />

      {/* Eagle silhouette on shield */}
      <g fill="#003366">
        {/* Eagle head */}
        <ellipse cx="50" cy="35" rx="6" ry="5" />
        {/* Eagle body */}
        <ellipse cx="50" cy="48" rx="8" ry="10" />
        {/* Left wing */}
        <path d="M42 42 Q32 38 38 50 Q42 52 42 48 Z" />
        {/* Right wing */}
        <path d="M58 42 Q68 38 62 50 Q58 52 58 48 Z" />
      </g>

      {/* Stars around the seal - 22 stars representing the founding agencies */}
      {[...Array(22)].map((_, i) => {
        const angle = (i * 360) / 22 - 90;
        const rad = (angle * Math.PI) / 180;
        const x = 50 + 41 * Math.cos(rad);
        const y = 50 + 41 * Math.sin(rad);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="1.5"
            fill="#FFFFFF"
          />
        );
      })}

      {/* Text: DEPARTMENT OF HOMELAND SECURITY (top arc) */}
      <defs>
        <path
          id="topArc"
          d="M 15 50 A 35 35 0 0 1 85 50"
          fill="none"
        />
        <path
          id="bottomArc"
          d="M 85 50 A 35 35 0 0 1 15 50"
          fill="none"
        />
      </defs>

      {/* U.S. text at top */}
      <text
        fill="#FFFFFF"
        fontSize="6"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        textAnchor="middle"
      >
        <textPath href="#topArc" startOffset="50%">
          U.S. DEPARTMENT OF
        </textPath>
      </text>

      {/* HOMELAND SECURITY text at bottom */}
      <text
        fill="#FFFFFF"
        fontSize="6"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        textAnchor="middle"
      >
        <textPath href="#bottomArc" startOffset="50%">
          HOMELAND SECURITY
        </textPath>
      </text>
    </svg>
  );
}
