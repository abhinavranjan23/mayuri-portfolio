import React, { forwardRef } from 'react';
 
import './CompanyShowcase.css';

import { IPHONE_FRAME_IMG } from '../utils/Constant';

const HandDrawnHeart = () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="hand-drawn-decoration decoration-top-right" style={{ color: '#090808ff' }}>
        <path d="M50 85 C20 70 5 50 5 30 C5 15 15 5 30 5 C40 5 50 15 50 20 C50 15 60 5 70 5 C85 5 95 15 95 30 C95 50 80 70 50 85 Z" />
        {/* Sketchy highlight */}
        <path d="M35 15 Q 25 10, 15 25" strokeWidth="2" opacity="0.6" />
    </svg>
);

const HandDrawnSmiley = () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="hand-drawn-decoration decoration-bottom-left" style={{ color: '#070707ff' }}>
        <circle cx="50" cy="50" r="40" />
        <path d="M35 40 Q 35 35, 35 40" strokeWidth="6" /> {/* Left Eye */}
        <path d="M65 40 Q 65 35, 65 40" strokeWidth="6" /> {/* Right Eye */}
        <path d="M30 60 Q 50 75, 70 60" /> {/* Smile */}
    </svg>
);

const CompanyShowcase = forwardRef(({ 
    companyName, 
    iphoneScreenImg, 
    gridImages = [], 
    style = {}, // Allow passing styles (zIndex, opacity etc)
    onImageClick
}, ref) => {
    
    // Split images for desktop layout (0,1 left | 2,3 right)
    const leftImages = gridImages.slice(0, 2);
    const rightImages = gridImages.slice(2, 4);

    return (
        <div 
            className="company-showcase-panel" 
            ref={ref}
            style={style}
        >
            <div className="showcase-container">
                
                {/* Title (Full Width Top) */}
                <h2 className="showcase-title">{companyName}</h2>

                {/* Left Side Images (Desktop) */}
                <div className="showcase-side-group left-group">
                    {leftImages.map((imgSrc, index) => (
                        <div 
                            className="showcase-grid-item" 
                            key={`left-${index}`} 
                            onClick={() => onImageClick && onImageClick(imgSrc)}
                            data-cursor-button 
                            style={{ cursor: 'none' }}
                        >
                            <img src={imgSrc} alt={`${companyName} Post ${index + 1}`} className="showcase-grid-img" />
                        </div>
                    ))}
                </div>

                {/* Center: iPhone */}
                <div className="showcase-iphone-wrapper">
                    <img src={IPHONE_FRAME_IMG} alt="iPhone Frame" className="showcase-iphone-frame" />
                    <div className="showcase-iphone-screen">
                        <img src={iphoneScreenImg} alt={`${companyName} Profile`} className="showcase-screen-img" />
                    </div>
                </div>

                {/* Right Side Images (Desktop) */}
                <div className="showcase-side-group right-group">
                    {rightImages.map((imgSrc, index) => (
                        <div 
                            className="showcase-grid-item" 
                            key={`right-${index}`} 
                            onClick={() => onImageClick && onImageClick(imgSrc)}
                            data-cursor-button 
                            style={{ cursor: 'none' }}
                        >
                            <img src={imgSrc} alt={`${companyName} Post ${index + 3}`} className="showcase-grid-img" />
                        </div>
                    ))}
                </div>

                {/* Mobile: We might need to handle mobile differently via CSS or just stack these groups */}

            </div>
        </div>
    );
});

export default CompanyShowcase;
