import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import './CompanyShowcase.css';
import { IPHONE_FRAME_IMG } from '../utils/Constant';
import { IoExpand } from 'react-icons/io5';

const CompanyShowcase = forwardRef(({ 
    companyName, 
    iphoneScreenImg, 
    gridImages = [], 
    style = {},
    onImageClick
}, ref) => {
    const [loadedImages, setLoadedImages] = useState({});
    
    // Split images for desktop layout (0,1 left | 2,3 right)
    const leftImages = gridImages.slice(0, 2);
    const rightImages = gridImages.slice(2, 4);

    const handleImageLoad = (index) => {
        setLoadedImages(prev => ({ ...prev, [index]: true }));
    };

    return (
        <div 
            className="company-showcase-panel" 
            ref={ref}
            style={style}
        >
            <div className="showcase-container">
                
                {/* Left Side Images */}
                <div className="showcase-side-group left-group">
                    {leftImages.map((imgSrc, index) => (
                        <motion.div 
                            className="showcase-grid-item" 
                            key={`left-${index}`}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div 
                                className="image-wrapper"
                                onClick={() => onImageClick && onImageClick(imgSrc)}
                                data-cursor-button 
                                style={{ cursor: 'none' }}
                                role="button"
                                tabIndex={0}
                                aria-label={`View full size image ${index + 1} of ${companyName}`}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        onImageClick && onImageClick(imgSrc);
                                    }
                                }}
                            >
                                {!loadedImages[`left-${index}`] && (
                                    <div className="image-skeleton"></div>
                                )}
                                <img 
                                    src={imgSrc} 
                                    alt={`${companyName} Post ${index + 1}`} 
                                    className="showcase-grid-img"
                                    onLoad={() => handleImageLoad(`left-${index}`)}
                                    style={{ opacity: loadedImages[`left-${index}`] ? 1 : 0 }}
                                />
                                <div className="image-hover-overlay">
                                    <IoExpand className="expand-icon" />
                                    <span className="view-text">View Full Size</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Center: Title + iPhone Wrapper */}
                <div className="showcase-center-column">
                    {/* Title above iPhone */}
                    <motion.h2 
                        className="showcase-title"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {companyName}
                    </motion.h2>

                    {/* iPhone with Enhanced Styling */}
                    <motion.div 
                        className="showcase-iphone-wrapper"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="iphone-glow"></div>
                        <img src={IPHONE_FRAME_IMG} alt="iPhone Frame" className="showcase-iphone-frame" />
                        <div className="showcase-iphone-screen">
                            <img src={iphoneScreenImg} alt={`${companyName} Profile`} className="showcase-screen-img" />
                        </div>
                    </motion.div>
                </div>

                {/* Right Side Images */}
                <div className="showcase-side-group right-group">
                    {rightImages.map((imgSrc, index) => (
                        <motion.div 
                            className="showcase-grid-item" 
                            key={`right-${index}`}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div 
                                className="image-wrapper"
                                onClick={() => onImageClick && onImageClick(imgSrc)}
                                data-cursor-button 
                                style={{ cursor: 'none' }}
                                role="button"
                                tabIndex={0}
                                aria-label={`View full size image ${index + 3} of ${companyName}`}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        onImageClick && onImageClick(imgSrc);
                                    }
                                }}
                            >
                                {!loadedImages[`right-${index}`] && (
                                    <div className="image-skeleton"></div>
                                )}
                                <img 
                                    src={imgSrc} 
                                    alt={`${companyName} Post ${index + 3}`} 
                                    className="showcase-grid-img"
                                    onLoad={() => handleImageLoad(`right-${index}`)}
                                    style={{ opacity: loadedImages[`right-${index}`] ? 1 : 0 }}
                                />
                                <div className="image-hover-overlay">
                                    <IoExpand className="expand-icon" />
                                    <span className="view-text">View Full Size</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
});

export default CompanyShowcase;
