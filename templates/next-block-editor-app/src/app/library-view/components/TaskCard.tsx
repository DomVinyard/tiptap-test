import React, { useState } from 'react';
import { DM_Sans } from 'next/font/google';
import { DM_Mono } from 'next/font/google';
import { Star, Clock, Repeat } from 'lucide-react';
import { TaskItemType } from '../data/index';
import { OrnateBorder } from './OrnatePatterns';

// Initialize DM Sans font
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

// Initialize DM Mono font
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],
});

// Props are the same as TaskItemType, but without id
export type TaskCardProps = Omit<TaskItemType, 'id'> & {
  id?: string; // Optional id for determining template/color
  runCount?: number; // Optional run count for metrics
};

// Vintage color palette
const COLORS = {
  terracotta: '#FAAE88',
  lightGreen: '#E1EBC9',
  lightYellow: '#FFF0C4',
  cream: '#EEDECA',
  lightGrey: '#FFFFFF', // Changed from #F5F5F5 to white
};

// Define a type for the color keys
type ColorKey = keyof typeof COLORS;

// Card dimensions - consistent across all templates
const CARD_HEIGHT = 220; // Fixed height in pixels
const CARD_PADDING = 16; // Padding in pixels

// Helper to get deterministic values from a string
const getHashValue = (str: string, modulus: number): number => {
  // Special handling for our template-color pattern
  if (str.startsWith('template-') && str.includes('-color-')) {
    const parts = str.split('-');
    if (parts.length >= 4) {
      // Extract template and color indices from the ID
      const templateIndex = parseInt(parts[1], 10);
      const colorIndex = parseInt(parts[3], 10);
      // Return either template or color index based on which one we're looking for
      return modulus === 4 ? templateIndex : colorIndex;
    }
  }
  
  // Standard hashing for normal IDs
  if (!str) return 0;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash % modulus);
};

export const TaskCard: React.FC<TaskCardProps> = ({
  id = 'default',
  title,
  description,
  lastEdited,
  version,
  date,
  starred = false,
  imageUrl,
  author,
  variant = 'default',
  onClick,
  runCount,
  eval_rating,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Template 1: Centered text with minimal decoration
  const renderCenteredTemplate = (bgColor: string) => (
    <div 
      className="cursor-pointer will-change-transform"
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        padding: '1.5rem',
        borderRadius: '2px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        height: `${CARD_HEIGHT}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'transform 2000ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transition = 'transform 75ms ease';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transition = 'transform 2000ms ease';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div className="flex flex-col h-full items-center justify-between py-4">
        {/* Metrics: run count only, top - hide for custom tasks */}
        {typeof runCount === 'number' && !lastEdited && (
          <div className="flex-shrink-0 w-full flex justify-center">
            <span
              className={`flex items-center justify-center gap-3 text-xs text-black select-none ${dmMono.className}`}
              style={{ letterSpacing: '0.01em' }}
            >
              <span className="flex items-center gap-1">
                <Repeat className="w-3 h-3" stroke="#000" color="#000" strokeWidth={2} />
                {runCount >= 1000 ? `${(runCount/1000).toFixed(runCount % 1000 === 0 ? 0 : 1)}k` : runCount.toLocaleString()}
              </span>
            </span>
          </div>
        )}
        
        {/* Title and description, centered */}
        <div className="flex-grow flex flex-col items-center justify-center gap-2 min-h-[4.5rem] px-4">
          <h3 className={`font-bold text-2xl text-slate-800 text-center ${dmSans.className}`} style={{ 
            textWrap: 'balance',
            lineHeight: '1.15'
          }}>{title}</h3>
          {description && (
            <p className={`text-xs text-black max-w-xs text-center ${dmSans.className}`} style={{ textWrap: 'balance' }}>{description}</p>
          )}
        </div>
        
        {/* Empty div for bottom spacing when no metrics */}
        <div className="flex-shrink-0 h-4"></div>
      </div>
    </div>
  );

  // For custom tasks (those with lastEdited property), always use template 0 (centered) and light grey
  if (lastEdited) {
    return renderCenteredTemplate(COLORS.lightGrey);
  }

  // Determine template and color based on id for non-custom tasks
  const templateIndex = getHashValue(id, 4);
  const colorIndex = getHashValue(id.split('').reverse().join(''), 4);
  
  // Get color based on the color index
  const colorKeys: ColorKey[] = ['terracotta', 'lightGreen', 'lightYellow', 'cream', 'lightGrey'];
  const color = COLORS[colorKeys[colorIndex]];
  
  // Render the appropriate template
  const renderTemplate = () => {
    switch (templateIndex) {
      case 0:
        return renderCenteredTemplate(color);
      case 1:
        return renderOrnateTemplate();
      case 2:
        return renderOvalTemplate();
      case 3:
        return renderRightAlignedTemplate();
      default:
        return renderCenteredTemplate(color);
    }
  };
  
  // Template 2: Design with ornate border pattern
  const renderOrnateTemplate = () => (
    <div 
      className="cursor-pointer p-4 will-change-transform"
      onClick={onClick}
      style={{
        backgroundColor: color,
        borderRadius: '0px',
        boxShadow: 'none',
        height: `${CARD_HEIGHT}px`,
        display: 'flex',
        transition: 'transform 1000ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transition = 'transform 75ms ease';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transition = 'transform 1000ms ease';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div className="w-full h-full">
        <OrnateBorder>
          <div className="h-full flex flex-col justify-center py-6">
            {/* Title */}
            <div className="flex-grow-0 w-full flex justify-center">
              <h3 className={`font-bold text-lg text-black text-center px-3 ${dmSans.className}`} style={{ 
                textWrap: 'balance',
                letterSpacing: '0.05em',
                lineHeight: '1.15'
              }}>{title}</h3>
            </div>
            
            {/* Description - centered vertically */}
            <div className="flex-grow flex items-center justify-center px-6 my-2">
              {description && (
                <p className={`text-xs text-black text-center ${dmSans.className}`} style={{ 
                  textWrap: 'balance',
                  lineHeight: '1.4',
                  opacity: 0.85,
                  maxWidth: "280px"
                }}>{description}</p>
              )}
            </div>
            
            {/* Metrics at bottom */}
            {(typeof runCount === 'number' || typeof eval_rating === 'number') && (
              <div className="flex-grow-0 w-full flex justify-center gap-3">
                {typeof runCount === 'number' && (
                  <span className={`flex items-center gap-1 text-xs text-black select-none ${dmMono.className}`}>
                    <Repeat className="w-3 h-3" stroke="#000" color="#000" strokeWidth={2} />
                    {runCount >= 1000 ? `${(runCount/1000).toFixed(runCount % 1000 === 0 ? 0 : 1)}k` : runCount.toLocaleString()}
                  </span>
                )}
                {typeof eval_rating === 'number' && (
                  <span className={`flex items-center gap-0.5 text-xs text-black select-none ${dmMono.className}`}>
                    <Star className="w-3 h-3" fill="none" stroke="#000" />
                    {eval_rating.toFixed(1)}
                  </span>
                )}
              </div>
            )}
          </div>
        </OrnateBorder>
      </div>
    </div>
  );
  
  // Template 3: Ornate double border with floral corners
  const renderOvalTemplate = () => {
    const tealGradient = 'linear-gradient(135deg, #004d4d 0%, #006666 50%, #003838 100%)';
    const Corner = ({ rotate = 0 }: { rotate?: number }) => (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        style={{ transform: `rotate(${rotate}deg)` }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#004d4d" strokeWidth="1.2">
          <circle cx="10" cy="10" r="6" fill="none" />
          <path d="M10 4 Q12 8 16 8" />
          <path d="M4 10 Q8 12 8 16" />
          <path d="M10 16 Q12 12 16 12" />
          <path d="M16 10 Q12 8 12 4" />
        </g>
      </svg>
    );
    const INSET = 36;
    return (
      <div
        className="relative cursor-pointer will-change-transform"
        onClick={onClick}
        style={{
          background: color,
          height: `${CARD_HEIGHT}px`,
          borderRadius: 0,
          overflow: 'visible',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 1000ms ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transition = 'transform 75ms ease';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transition = 'transform 1000ms ease';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {/* Borders and corners remain unchanged */}
        <div
          className="absolute"
          style={{
            top: INSET,
            left: INSET,
            right: INSET,
            bottom: INSET,
            border: '3px solid',
            borderImage: tealGradient + ' 1',
            borderRadius: 0,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        <div
          className="absolute"
          style={{
            top: INSET + 9,
            left: INSET + 9,
            right: INSET + 9,
            bottom: INSET + 9,
            border: '1.5px dashed #004d4d',
            borderRadius: 0,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div className="absolute" style={{ top: INSET - 2, left: INSET - 2, zIndex: 3 }}>
          <Corner rotate={0} />
        </div>
        <div className="absolute" style={{ top: INSET - 2, right: INSET - 2, zIndex: 3 }}>
          <Corner rotate={90} />
        </div>
        <div className="absolute" style={{ bottom: INSET - 2, left: INSET - 2, zIndex: 3 }}>
          <Corner rotate={270} />
        </div>
        <div className="absolute" style={{ bottom: INSET - 2, right: INSET - 2, zIndex: 3 }}>
          <Corner rotate={180} />
        </div>
        
        {/* Content with improved centering */}
        <div
          className="relative flex flex-col items-center justify-center w-full h-full px-8 gap-2"
          style={{ zIndex: 4, paddingLeft: INSET + 12, paddingRight: INSET + 12 }}
        >
          <h3
            className={`font-bold text-lg text-center ${dmSans.className}`}
            style={{
              color: '#000',
              letterSpacing: '0.04em',
              lineHeight: '1.2',
              textWrap: 'balance',
            }}
          >
            {title}
          </h3>
          
          {/* Metrics centered below content */}
          {(typeof runCount === 'number' || typeof eval_rating === 'number') && (
            <div className="flex items-center justify-center gap-3 mt-1">
              {typeof runCount === 'number' && (
                <span className={`flex items-center gap-1 text-xs text-black select-none ${dmMono.className}`}>
                  <Repeat className="w-3 h-3" stroke="#000" color="#000" strokeWidth={2} />
                  {runCount >= 1000 ? `${(runCount/1000).toFixed(runCount % 1000 === 0 ? 0 : 1)}k` : runCount.toLocaleString()}
                </span>
              )}
              {typeof eval_rating === 'number' && (
                <span className={`flex items-center gap-0.5 text-xs text-black select-none ${dmMono.className}`}>
                  <Star className="w-3 h-3" fill="none" stroke="#000" />
                  {eval_rating.toFixed(1)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Template 4: Description only, larger text
  const renderRightAlignedTemplate = () => (
    <div 
      className="cursor-pointer relative will-change-transform"
      onClick={onClick}
      style={{
        backgroundColor: color,
        padding: '1.5rem',
        borderRadius: '2px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        height: `${CARD_HEIGHT}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'transform 1000ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transition = 'transform 75ms ease';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transition = 'transform 1000ms ease';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div className="flex flex-col h-full justify-between">
        {/* Empty top space for balance */}
        <div className="flex-grow-0 h-4"></div>
        
        {/* Centered content */}
        <div className="flex-grow flex flex-col justify-center items-center px-4">
          {description && (
            <p className={`text-base text-black max-w-xs text-center ${dmSans.className}`} style={{ 
              textWrap: 'balance',
              lineHeight: '1.5',
              fontWeight: '500'
            }}>{description}</p>
          )}
        </div>
        
        {/* Metrics at bottom */}
        {(typeof runCount === 'number' || typeof eval_rating === 'number') && (
          <div className="flex-grow-0 flex items-center gap-3 mt-4">
            {typeof runCount === 'number' && (
              <span className={`flex items-center gap-1 text-xs text-black select-none ${dmMono.className}`}>
                <Repeat className="w-3 h-3" stroke="#000" color="#000" strokeWidth={2} />
                {runCount >= 1000 ? `${(runCount/1000).toFixed(runCount % 1000 === 0 ? 0 : 1)}k` : runCount.toLocaleString()}
              </span>
            )}
            {typeof eval_rating === 'number' && (
              <span className={`flex items-center gap-0.5 text-xs text-black select-none ${dmMono.className}`}>
                <Star className="w-3 h-3" fill="none" stroke="#000" />
                {eval_rating.toFixed(1)}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
  
  return renderTemplate();
}; 