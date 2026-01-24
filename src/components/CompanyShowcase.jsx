import { forwardRef } from 'react';
 
import './CompanyShowcase.css';

import { IPHONE_FRAME_IMG } from '../utils/Constant';

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
