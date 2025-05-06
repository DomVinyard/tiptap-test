import React from 'react';

// Floral corner pattern SVG for decoration - more similar to the reference image
export const OrnateCorner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    viewBox="0 0 100 100"
    className={`w-full h-full ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    {/* Main floral cluster */}
    <g>
      {/* Central flower */}
      <circle cx="35" cy="35" r="7" stroke="currentColor" strokeWidth="0.7" fill="none" />
      <circle cx="35" cy="35" r="3" stroke="currentColor" strokeWidth="0.6" fill="none" />
      
      {/* Small leaves around the central flower */}
      <path d="M28,28 Q30,25 33,27 T38,30" stroke="currentColor" strokeWidth="0.7" fill="none" />
      <path d="M42,28 Q45,25 48,27 T50,32" stroke="currentColor" strokeWidth="0.7" fill="none" />
      <path d="M40,40 Q43,43 45,41 T47,36" stroke="currentColor" strokeWidth="0.7" fill="none" />
      <path d="M30,42 Q27,45 24,43 T22,38" stroke="currentColor" strokeWidth="0.7" fill="none" />
    </g>
    
    {/* Smaller flower cluster 1 */}
    <g>
      <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="0.7" fill="none" />
      <circle cx="20" cy="20" r="2" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <path d="M15,15 Q17,13 19,15 T22,18" stroke="currentColor" strokeWidth="0.7" fill="none" />
      <path d="M25,15 Q27,13 29,15 T29,20" stroke="currentColor" strokeWidth="0.7" fill="none" />
    </g>
    
    {/* Smaller flower cluster 2 */}
    <g>
      <circle cx="55" cy="25" r="4" stroke="currentColor" strokeWidth="0.7" fill="none" />
      <circle cx="55" cy="25" r="1.5" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <path d="M50,20 Q52,18 55,19 T58,21" stroke="currentColor" strokeWidth="0.7" fill="none" />
      <path d="M60,20 Q62,18 65,19 T65,23" stroke="currentColor" strokeWidth="0.7" fill="none" />
    </g>
    
    {/* Smaller flower cluster 3 */}
    <g>
      <circle cx="25" cy="55" r="4" stroke="currentColor" strokeWidth="0.7" fill="none" />
      <circle cx="25" cy="55" r="1.5" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <path d="M20,50 Q22,48 25,49 T28,51" stroke="currentColor" strokeWidth="0.7" fill="none" />
      <path d="M30,50 Q32,48 35,49 T35,53" stroke="currentColor" strokeWidth="0.7" fill="none" />
    </g>
    
    {/* Scattered smaller decorative elements */}
    <circle cx="45" cy="15" r="2" stroke="currentColor" strokeWidth="0.6" fill="none" />
    <circle cx="15" cy="45" r="2" stroke="currentColor" strokeWidth="0.6" fill="none" />
    <circle cx="50" cy="48" r="1.5" stroke="currentColor" strokeWidth="0.6" fill="none" />
    
    {/* Tiny dots */}
    <circle cx="40" cy="25" r="0.7" fill="currentColor" />
    <circle cx="25" cy="40" r="0.7" fill="currentColor" />
    <circle cx="60" cy="40" r="0.7" fill="currentColor" />
    <circle cx="45" cy="60" r="0.7" fill="currentColor" />
  </svg>
);

// Simple side decoration - minimal
export const OrnateSide: React.FC<{ className?: string, horizontal?: boolean }> = ({ 
  className = '', 
  horizontal = false 
}) => (
  <svg 
    viewBox="0 0 100 10"
    className={`${horizontal ? 'w-full h-3' : 'w-3 h-full'} ${className}`}
    style={horizontal ? {} : { transform: 'rotate(90deg)' }}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    {/* Very minimal side decoration - just small dots */}
    <circle cx="25" cy="5" r="1" fill="currentColor" />
    <circle cx="50" cy="5" r="1" fill="currentColor" />
    <circle cx="75" cy="5" r="1" fill="currentColor" />
  </svg>
);

// Dotted oval frame for title
export const OvalFrame: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 300 100"
    className={`w-full h-full ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <ellipse
      cx="150"
      cy="50"
      rx="90"
      ry="25"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="3 2"
      fill="none"
    />
  </svg>
);

// Simple rectangular border with corner decorations and gold gradient
export const OrnateBorder: React.FC<{ 
  className?: string, 
  color?: string,
  children?: React.ReactNode
}> = ({ 
  className = '', 
  color = 'rgba(0, 0, 0, 0.7)',
  children
}) => {
  // Gold gradient colors - enhanced metallic effect
  const brightGold = "#F0D978";  // Very bright gold
  const richGold = "#D4AF37";    // Standard gold
  const darkGold = "#996515";    // Deep gold
  const bronzeGold = "#CD7F32";  // Bronze-gold for depth
  
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Main rectangular border with enhanced gold gradient */}
      <div className="absolute inset-0 rounded-none" style={{
        border: "1px solid",
        borderImage: `linear-gradient(45deg, ${richGold}, ${brightGold}, ${darkGold}, ${bronzeGold}, ${richGold}) 1`
      }}></div>
      
      <div className="absolute inset-[3px] border border-dashed rounded-none" style={{
        borderColor: richGold,
        borderImage: `linear-gradient(135deg, ${brightGold}, ${richGold}, ${darkGold}) 1`
      }}></div>
      
      {/* Corners with gold color */}
      <div className="absolute top-0 left-0 w-16 h-16" style={{ color: richGold }}>
        <OrnateCorner />
      </div>
      
      <div className="absolute top-0 right-0 w-16 h-16 transform rotate-90" style={{ color: richGold }}>
        <OrnateCorner />
      </div>
      
      <div className="absolute bottom-0 left-0 w-16 h-16 transform -rotate-90" style={{ color: richGold }}>
        <OrnateCorner />
      </div>
      
      <div className="absolute bottom-0 right-0 w-16 h-16 transform rotate-180" style={{ color: richGold }}>
        <OrnateCorner />
      </div>
      
      {/* Bottom floral decoration - with gold color */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-4" style={{ color: richGold }}>
        <svg 
          viewBox="0 0 100 20"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <path
            d="M40,5 Q50,0 60,5 T80,10 Q90,5 100,10"
            stroke="currentColor"
            strokeWidth="0.7"
            fill="none"
          />
          <path
            d="M0,10 Q10,5 20,10 T40,5"
            stroke="currentColor"
            strokeWidth="0.7"
            fill="none"
          />
          <circle cx="50" cy="10" r="3" stroke="currentColor" strokeWidth="0.7" fill="none" />
        </svg>
      </div>
      
      {/* Content with appropriate padding */}
      <div className="absolute inset-8">
        {children}
      </div>
    </div>
  );
};

export default OrnateBorder; 