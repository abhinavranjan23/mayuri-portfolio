import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { 
    VIDEO_CONTENT_DATA, 
    PHOTO_CONTENT_STICKERS, 
    ANIMATION_STICKERS_DATA 
} from '../utils/Constant';
import BackButton from '../components/BackButton';
import NavigationButton from '../components/NavigationButton';
import './VideoContent.css';
import Footer from '../components/Footer';

import {
    IoHeart,
    IoHeartOutline,
    IoShareSocial,
    IoVolumeHigh,
    IoVolumeMute
} from "react-icons/io5";

const VideoCard = ({ item, isActive, toggleMute, isMuted, shouldLoad }) => {
    const videoRef = useRef(null);
    const [isLiked, setIsLiked] = useState(false);
    const [shareText, setShareText] = useState("Share");

    const toggleLike = (e) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const handleShare = async (e) => {
        e.stopPropagation();
        const shareData = {
            title: 'Check out this video!',
            text: item.description,
            url: item.videoUrl
        };
        if (navigator.share) {
            try { await navigator.share(shareData); } catch (err) { console.log(err); }
        } else {
            navigator.clipboard.writeText(item.videoUrl);
        setShareText("Copied!");
        setTimeout(() => setShareText("Share"), 2000);
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isActive) {
            video.currentTime = 0;
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    // Autoplay blocked
                });
            }
        } else {
            video.pause();
        }
    }, [isActive]);

    return (
        <motion.div 
            className="video-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <div className="video-container">
                 {shouldLoad ? (
                    <video
                        className="video-player"
                        src={item.videoUrl}
                        ref={videoRef}
                        loop
                        muted={isMuted}
                        playsInline
                        autoPlay={isActive}
                        preload="auto"
                        onClick={toggleMute}
                    />
                ) : (
                    <img
                        src={item.videoUrl.replace('.mp4', '.jpg')}
                        className="video-player"
                        style={{objectFit: 'cover'}}
                        alt={item.title}
                    />
                )}

                {/* Actions Side Bar */}
                <div className="card-actions">
                    <div className="action-item" onClick={toggleLike}>
                        <motion.span
                            animate={{ scale: isLiked ? 1.2 : 1 }}
                            whileTap={{ scale: 0.8 }}
                            className="icon-container"
                        >
                            {isLiked ? <IoHeart color="#ff4081" /> : <IoHeartOutline color="white" />}
                        </motion.span>
                        <span>{isLiked ? "Liked" : "Like"}</span>
                    </div>

                    <div className="action-item" onClick={handleShare}>
                        <motion.span whileTap={{ scale: 0.9 }} className="icon-container">
                            <IoShareSocial color="white" />
                        </motion.span>
                        <span>{shareText}</span>
                    </div>

                    <div className="action-item" onClick={toggleMute}>
                         <motion.span whileTap={{ scale: 0.9 }} className="icon-container">
                            {isMuted ? <IoVolumeMute color="white" /> : <IoVolumeHigh color="white" />}
                        </motion.span>
                    </div>
                </div>

                {/* Bottom Overlay */}
                <div className="card-overlay">
                    <div className="card-header">
                        <h3>{item.title}</h3>

                    </div>
                    <button className="follow-btn" onClick={(e) => {
                            e.stopPropagation();
                            window.open(item.profileUrl, '_blank');
                        }}>Follow</button>
                    <p className="card-desc">{item.description}</p>
                </div>
            </div>
        </motion.div>
    );
};

const VideoContent = () => {
    const mainContainerRef = useRef(null);
    const [cardOrder, setCardOrder] = useState([...Array(VIDEO_CONTENT_DATA.length).keys()]);
    const [isMuted, setIsMuted] = useState(false);
    
    const toggleMute = () => setIsMuted(!isMuted);

    const handlePrev = () => {
        setCardOrder(prev => {
            // Move last card to front
            const newOrder = [...prev];
            const lastCard = newOrder.pop();
            newOrder.unshift(lastCard);
            return newOrder;
        });
    };

    const handleNext = () => {
        setCardOrder(prev => {
            // Move first card to back
            const newOrder = [...prev];
            const firstCard = newOrder.shift();
            newOrder.push(firstCard);
            return newOrder;
        });
    };

    // Floating stickers animation (simplified, no scroll trigger)
    useEffect(() => {
        const stickers = ANIMATION_STICKERS_DATA.slice(0, 3);
        stickers.forEach((s, i) => {
            const wrapperSelector = `.sticker-wrapper-${i}`;
            const innerSelector = `.sticker-inner-${i}`;

            // Initial State
            gsap.set(wrapperSelector, {
                scale: 0,
                autoAlpha: 0,
                x: 0,
                y: 0
            });

            gsap.set(innerSelector, {
                rotation: -45,
                y: 0
            });

            // Entrance
            gsap.to(wrapperSelector, {
                scale: 1,
                autoAlpha: 1,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)",
                delay: 0.5 + (i * 0.2)
            });

            // Idle Float
            gsap.to(innerSelector, {
                y: -20,
                rotation: 10,
                duration: 2 + (i * 0.2),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.5
            });
        });
    }, []);

    return (
        <div className="reels-page-container" ref={mainContainerRef}>
            <Helmet>
                <title>Video Editing &amp; Reels | Shorts, Vlogs &amp; Viral Content</title>
                <meta name="description" content="Expert video editing portfolio. Check out my engaging Reels, YouTube Shorts, and promotional videos designed to capture attention and drive views." />
            </Helmet>
            
            <BackButton  lightMode={true}/>

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
                    This section features my video content creations designed to <span className="highlight-text highlight-yellow">capture attention</span>, <span className="highlight-text highlight-pink">tell stories</span>, and drive <span className="highlight-text highlight-blue">meaningful engagement</span>. Each video is strategically crafted to <span className="highlight-text highlight-green">simplify messages</span>, <span className="highlight-text highlight-orange">build credibility</span>, and <span className="highlight-text highlight-yellow">connect with the audience</span> in seconds.<br/><br/>

                    I combine <span className="highlight-text highlight-pink">visual storytelling</span> with <span className="highlight-text highlight-blue">platform-optimised captions</span> to ensure every piece of content performs beyond aesthetics. My videos are built to <span className="highlight-text highlight-green">inform, inspire, and convert</span>.<br/><br/> 

                    Every project here reflects a <span className="highlight-text highlight-yellow">balance of creativity and strategy</span>, where visuals hook the audience and captions guide them toward <span className="highlight-text highlight-orange">trust, action, and results</span>.
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
                />
                <NavigationButton 
                    direction="next" 
                    onClick={handleNext}
                />
            </div>

            {/* Mobile Navigation Buttons - Below card */}
            <div className="mobile-nav-container">
                <NavigationButton 
                    direction="prev" 
                    onClick={handlePrev}
                />
                <NavigationButton 
                    direction="next" 
                    onClick={handleNext}
                />
            </div>
            
            {/* Show marquee only when on first card */}
            {cardOrder[0] === 0 && (
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
            )}
          <Footer/>
        </div>
        
    );
};

export default VideoContent;
