import React, { forwardRef } from 'react';
 
import './CompanyShowcase.css';

const iphoneFrame = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023689/iphone-mockup-newest_aencbp.png";

const CompanyShowcase = forwardRef(({ 
    companyName, 
    iphoneScreenImg, 
    gridImages = [], 
    style = {} // Allow passing styles (zIndex, opacity etc)
}, ref) => {
    
    return (
        <div 
            className="company-showcase-panel" 
            ref={ref}
            style={style}
        >
            <div className="showcase-container">
                
                {/* Left: iPhone */}
                <div className="showcase-iphone-wrapper">
                    <img src={iphoneFrame} alt="iPhone Frame" className="showcase-iphone-frame" />
                    <div className="showcase-iphone-screen">
                        <img src={iphoneScreenImg} alt={`${companyName} Profile`} className="showcase-screen-img" />
                    </div>
                </div>

                {/* Right: Content */}
                <div className="showcase-content-side">
                    <h2 className="showcase-title">{companyName}</h2>
                    
                    <div className="showcase-grid">
                        {gridImages.map((imgSrc, index) => (
                            <div className="showcase-grid-item" key={index}>
                                <img src={imgSrc} alt={`Post ${index + 1}`} className="showcase-grid-img" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
});

export default CompanyShowcase;
