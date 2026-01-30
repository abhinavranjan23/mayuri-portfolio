import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { 
    VIDEO_CONTENT_DATA, 
    PHOTO_CONTENT_STICKERS
} from '../utils/Constant';
import useVideoContent from '../hooks/useVideoContent';
import VideoCard from '../components/VideoCard';
import BackButton from '../components/BackButton';
import NavigationButton from '../components/NavigationButton';
import './VideoContent.css';
import Footer from '../components/Footer';





const VideoContent = () => {
    const mainContainerRef = useRef(null);
    const {
        cardOrder,
        isMuted,
        pressedKey,
        announcement,
        toggleMute,
        handlePrev,
        handleNext
    } = useVideoContent(mainContainerRef);

    return (
        <div className="reels-page-container" ref={mainContainerRef}>
            <Helmet>
                <title>Video Editing &amp; Reels | Shorts, Vlogs &amp; Viral Content</title>
                <meta name="description" content="Expert video editing portfolio. Check out my engaging Reels, YouTube Shorts, and promotional videos designed to capture attention and drive views." />
            </Helmet>
            
            <BackButton  lightMode={true}/>

            {/* Screen Reader Announcement Region */}
            <div className="sr-only" role="status" aria-live="polite" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
                {announcement}
            </div>

            {/* Floating Stickers */}
            {PHOTO_CONTENT_STICKERS.slice(0, 3).map((s, i) => (
                <div
                    key={i}
                    className={`cute-sticker-wrapper sticker-wrapper-${i}`}
                    style={{ 
                        position: 'fixed', 
                        top: s.top, 
                        left: s.left, 
                        zIndex: 4,
                        pointerEvents: 'none',
                        width: '120px', 
                        height: 'auto'
                    }}
                >
                    <img 
                        src={s.src} 
                        alt={`Sticker ${i+1}`} 
                        className={`cute-sticker-inner sticker-inner-${i}`}
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            filter: 'drop-shadow(0px 8px 12px rgba(0,0,0,0.2))' 
                        }}
                    />
                </div>
            ))}

            <div className="header-section">
                <h1 className="header-title">Explore The Shorts</h1>
                <p className="header-desc">
                    This section features my video content creations designed to <span className="highlight-text highlight-yellow">capture</span> <span className="highlight-text highlight-yellow">attention</span>, <span className="highlight-text highlight-pink">tell</span> <span className="highlight-text highlight-pink">stories</span>, and drive <span className="highlight-text highlight-blue">meaningful</span> <span className="highlight-text highlight-blue">engagement</span>. Each video is strategically crafted to <span className="highlight-text highlight-green">simplify</span> <span className="highlight-text highlight-green">messages</span>, <span className="highlight-text highlight-orange">build</span> <span className="highlight-text highlight-orange">credibility</span>, and <span className="highlight-text highlight-yellow">connect</span> <span className="highlight-text highlight-yellow">with</span> <span className="highlight-text highlight-yellow">the</span> <span className="highlight-text highlight-yellow">audience</span> in seconds.<br/><br/>

                    I combine <span className="highlight-text highlight-pink">visual</span> <span className="highlight-text highlight-pink">storytelling</span> with <span className="highlight-text highlight-blue">platform-optimised</span> <span className="highlight-text highlight-blue">captions</span> to ensure every piece of content performs beyond aesthetics. My videos are built to <span className="highlight-text highlight-green">inform,</span> <span className="highlight-text highlight-green">inspire,</span> and <span className="highlight-text highlight-green">convert</span>.<br/><br/> 

                    Every project here reflects a <span className="highlight-text highlight-yellow">balance</span> <span className="highlight-text highlight-yellow">of</span> <span className="highlight-text highlight-yellow">creativity</span> <span className="highlight-text highlight-yellow">and</span> <span className="highlight-text highlight-yellow">strategy</span>, where visuals hook the audience and captions guide them toward <span className="highlight-text highlight-orange">trust,</span> <span className="highlight-text highlight-orange">action,</span> and <span className="highlight-text highlight-orange">results</span>.
                </p>
            </div>

            {/* Deck with Navigation */}
            <div className="deck-wrapper">
                {cardOrder.map((dataIndex, position) => {
                    const item = VIDEO_CONTENT_DATA[dataIndex];
                    const isActive = position === 0; // First card in order is always active
                    
                    // Load current (0), next (1), and last (for prev navigation)
                    const shouldLoad = position === 0 || position === 1 || position === cardOrder.length - 1;
                    
                    // Different behavior for cards based on position
                    let animateProps;
                    if (position === 0) {
                        // Active card: Front and center with entrance animation
                        animateProps = {
                            zIndex: VIDEO_CONTENT_DATA.length + 10,
                            scale: 1,
                            y: 0,
                            x: 0,
                            rotateZ: 0,
                            opacity: 1,
                            filter: "blur(0px) brightness(1)",
                        };
                    } else if (position === 1) {
                        // Next card: Ready behind with subtle offset
                        animateProps = {
                            zIndex: VIDEO_CONTENT_DATA.length - 1,
                            scale: 0.95,
                            y: -30,
                            x: 0,
                            rotateZ: 0,
                            opacity: 1,
                            filter: "blur(0.5px) brightness(0.95)",
                        };
                    } else if (position === 2) {
                        // Second in stack
                        animateProps = {
                            zIndex: VIDEO_CONTENT_DATA.length - 2,
                            scale: 0.90,
                            y: -60,
                            x: 0,
                            rotateZ: 0,
                            opacity: 0.8,
                            filter: "blur(1px) brightness(0.9)",
                        };
                    } else if (position >= cardOrder.length - 1) {
                        // Last card: Dramatic exit with HIGHEST z-index (stays on top)
                        animateProps = {
                            zIndex: VIDEO_CONTENT_DATA.length + 20,
                            scale: 0.9,
                            y: 1000,
                            x: -50,
                            rotateZ: -8,
                            opacity: 0,
                            filter: "blur(3px) brightness(0.8)",
                        };
                    } else {
                        // Cards further back: Hidden
                        animateProps = {
                            zIndex: VIDEO_CONTENT_DATA.length - position,
                            scale: 0.85,
                            y: -90,
                            x: 0,
                            rotateZ: 0,
                            opacity: 0,
                            filter: "blur(2px) brightness(0.85)",
                        };
                    }
                    
                    return (
                        <motion.div
                            key={dataIndex}
                            className="video-card-wrapper"
                            initial={false}
                            animate={animateProps}
                            transition={{
                                duration: 0.5,
                                ease: [0.25, 0.1, 0.25, 1],
                                scale: { duration: 0.4 },
                                opacity: { duration: 0.3 },
                                rotateZ: { duration: 0.6, ease: "easeOut" },
                                y: { type: "spring", stiffness: 100, damping: 20 },
                                x: { type: "spring", stiffness: 100, damping: 20 },
                            }}
                            style={{
                                position: 'absolute',
                                pointerEvents: isActive ? 'auto' : 'none'
                            }}
                        >
                            <VideoCard 
                                item={item} 
                                isActive={isActive}
                                shouldLoad={shouldLoad}
                                isMuted={isMuted}
                                toggleMute={toggleMute}
                            />
                        </motion.div>
                    );
                })}

                {/* Navigation Buttons - Desktop positioned on sides */}
                <NavigationButton 
                    direction="prev" 
                    onClick={handlePrev}
                    isPressed={pressedKey === 'prev'}
                    ariaLabel="Previous Video (Left Arrow)"
                />
                <NavigationButton 
                    direction="next" 
                    onClick={handleNext}
                    isPressed={pressedKey === 'next'}
                    ariaLabel="Next Video (Right Arrow)"
                />
            </div>

            {/* Mobile Navigation Buttons - Below card */}
            <div className="mobile-nav-container">
                <NavigationButton 
                    direction="prev" 
                    onClick={handlePrev}
                    isPressed={pressedKey === 'prev'}
                />
                <NavigationButton 
                    direction="next" 
                    onClick={handleNext}
                    isPressed={pressedKey === 'next'}
                />
            </div>
            
            {/* Show marquee always */}
            <motion.div 
                className="marquee-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="marquee-row left-to-right">
                    {[...Array(6)].map((_, i) => (
                        <React.Fragment key={i}>
                                <div className="marquee-item pill-yellow">Shorts ⚡</div>
                                <div className="marquee-item pill-pink">Reels 📸</div>
                                <div className="marquee-item pill-blue">Videos 🎥</div>
                                <div className="marquee-item pill-orange">Snap 👻</div>
                                <div className="marquee-item pill-green">Vlogs 🏕️</div>
                        </React.Fragment>
                    ))}
                </div>
                <div className="marquee-row right-to-left">
                        {[...Array(6)].map((_, i) => (
                        <React.Fragment key={i}>
                                <div className="marquee-item pill-blue">Strategies 🎯</div>
                                <div className="marquee-item pill-green">Trends 🚀</div>
                                <div className="marquee-item pill-yellow">Editing ✂️</div>
                                <div className="marquee-item pill-pink">Viral 🔥</div>
                                <div className="marquee-item pill-orange">Content 📝</div>
                        </React.Fragment>
                    ))}
                </div>
            </motion.div>
          <Footer/>
        </div>
        
    );
};

export default VideoContent;
