import React from 'react';
import './ShimmerLoader.css';

const ShimmerLoader = () => {
    return (
        <div className="shimmer-wrapper">
            {/* Avatar Circle */}
            <div className="shimmer-header shimmer-animate"></div>
            
            {/* Title */}
            <div className="shimmer-title shimmer-animate"></div>
            
            {/* Text Lines */}
            <div className="shimmer-text-line shimmer-animate" style={{width: '80%'}}></div>
            <div className="shimmer-text-line shimmer-animate" style={{width: '70%'}}></div>
            <div className="shimmer-text-line shimmer-animate" style={{width: '50%'}}></div>

            {/* Grid for Content Design feel */}
            <div className="shimmer-grid">
                <div className="shimmer-card shimmer-animate"></div>
                <div className="shimmer-card shimmer-animate"></div>
                <div className="shimmer-card shimmer-animate"></div>
            </div>
        </div>
    );
};

export default ShimmerLoader;
