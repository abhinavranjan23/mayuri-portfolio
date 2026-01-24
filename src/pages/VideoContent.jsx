import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
    VIDEO_CONTENT_DATA, 
    PHOTO_CONTENT_STICKERS, 
    ANIMATION_STICKERS_DATA 
} from '../utils/Constant';
import BackButton from '../components/BackButton';
import './VideoContent.css';

import Footer from '../components/Footer';
gsap.registerPlugin(ScrollTrigger);

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
        // Safe play/pause logic
        const video = videoRef.current;
        if (!video) return;

        if (isActive) {
            video.currentTime = 0;
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    // console.log("Autoplay blocked", e); // Silencing common autoplay logs
                });
            }
        } else {
            video.pause();
        }
    }, [isActive]);



    return (
        // REMOVED style={{ zIndex }} to prevent React from overwriting GSAP styles on re-render
        <div className="video-card">
            <div className="video-container">
                {/* Placeholder for video - replacing with image for now if url is generic,
                    but code uses video tag. user likely has real videos. */}
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
                        src={item.videoUrl.replace('.mp4', '.jpg')} // Assuming cloud service can change extension or use a proper poster prop if available
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
        </div>
    );
};

const VideoContent = () => {
    const deckRef = useRef(null);
    const mainContainerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    
    const lastSnapped = useRef(0);
    
    const toggleMute = () => setIsMuted(!isMuted);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.video-card');
            const spacer = 30;
              

            // Initial setup (common)
            cards.forEach((card, i) => {
                gsap.set(card, {
                    zIndex: cards.length - i,
                    scale: 1 - (i * 0.05),
                    y: -(i * spacer),
                    transformOrigin: "center top",
                    filter: i === 0 ? "blur(0px)" : "blur(1px) brightness(0.9)",
                    opacity: i > 3 ? 0 : 1
                });
            });

            let mm = gsap.matchMedia();
            mm.add({
                isDesktop: "(min-width: 769px)",
                isMobile: "(max-width: 768px)",
            }, (context) => {
                let { isDesktop } = context.conditions;

                // Master Timeline
                const endValue = isDesktop ? `+=${cards.length * 1400}px` : `+=${cards.length * 900}px`;
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: deckRef.current,
                        start: "center center",
                        end: endValue,
                        pin: true,
                        scrub: 1, // Smooth scrubbing effect
                        onRefresh: (self) => { 
                            // Sync our tracker with actual progress on load/resiz/3e
                            lastSnapped.current = self.progress; 
                        },
                        snap: {
                            snapTo: (value) => {
                                const step = 1 / (cards.length - 1);
                                const prev = lastSnapped.current;
                                const threshold = step * 0.05; // Sensitive enough to catch intent, but ignore tiny jitters

                                let nextIndex = Math.round(prev / step);

                                if (value > prev + threshold) {
                                    nextIndex += 1; // Force exact next card
                                } else if (value < prev - threshold) {
                                    nextIndex -= 1; // Force exact prev card
                                } 
                                // Else stay (didn't scroll enough to justify swap)

                                // Clamp
                                nextIndex = Math.min(Math.max(nextIndex, 0), cards.length - 1);
                                
                                const nextProgress = nextIndex * step;
                                lastSnapped.current = nextProgress; 
                                return nextProgress;
                            },
                            duration: { min: 0.2, max: 0.5 },
                            delay: 0,
                            ease: "power1.inOut"
                        },
                        onUpdate: (self) => {
                            const idx = Math.round(self.progress * (cards.length - 1));
                            setActiveIndex(Math.min(Math.max(idx, 0), cards.length - 1));
                        }
                    }
                });

                for (let i = 0; i < cards.length - 1; i++) {
                    const stepLabel = `step-${i}`;
                    tl.addLabel(stepLabel);

                    if (isDesktop) {
                        tl.to(cards[i], {
                            y: window.innerHeight * 1.5, // Move down further
                            scale: 4, // Get much bigger
                            rotationX: 95, // Lie down backward
                            autoAlpha: 0, // VISIBILITY FIX: Hide it once it's down so it doesn't show below footer
                            display: "none", // LAYOUT FIX: Remove from DOM layout to prevent extra scroll space
                            duration: 1.5,
                            ease: "power2.inOut"
                        }, stepLabel);
                    } else {
                        // Mobile Animation
                        tl.to(cards[i], {
                            x: window.innerWidth * 1.5,
                            scale: 0.5, 
                            rotation: 10, 
                            autoAlpha: 0, 
                            display: "none",
                            duration: 1.5,
                            ease: "power2.inOut"
                        }, stepLabel);
                    }

                    if (cards[i+1]) {
                        tl.to(cards[i+1], {
                            y: 0,
                            scale: 1,
                            filter: "blur(0px) brightness(1)",
                            opacity: 1,
                            duration: 1,
                            ease: "power2.inOut"
                        }, stepLabel);
                    }

                    if (cards[i+2]) {
                        tl.to(cards[i+2], {
                            y: -spacer,
                            scale: 0.95,
                            filter: "blur(0px) brightness(1)",
                            opacity: 1,
                            duration: 1,
                            ease: "power2.inOut"
                        }, stepLabel);
                    }

                    if (cards[i+3]) {
                        tl.to(cards[i+3], {
                            y: -(2 * spacer),
                            scale: 0.90,
                            opacity: 1,
                            duration: 1,
                            ease: "power2.inOut"
                        }, stepLabel);
                    }
                }

                // --- Sticker Animation ---
                const stickers = ANIMATION_STICKERS_DATA.slice(0, 3);
                stickers.forEach((s, i) => {
                    const wrapperSelector = `.sticker-wrapper-${i}`;
                    const innerSelector = `.sticker-inner-${i}`;

                    // 1. Initial State
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

                    // 2. Entrance
                    gsap.to(wrapperSelector, {
                        scale: 1,
                        autoAlpha: 1,
                        duration: 1.5,
                        ease: "elastic.out(1, 0.5)",
                        delay: 0.5 + (i * 0.2)
                    });

                    // 3. Idle Float
                    gsap.to(innerSelector, {
                        y: -20,
                        rotation: 10,
                        duration: 2 + (i * 0.2),
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: i * 0.5
                    });

                    // 4. Scroll Wandering (Triggered by main container scroll)
                    gsap.to(wrapperSelector, {
                        scrollTrigger: {
                            trigger: mainContainerRef.current,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 1.5,
                        },
                        x: () => s.xMove, 
                        y: () => s.yMove,
                        ease: "none"
                    });
                });
            });

        }, mainContainerRef); // Scope to mainContainerRef to include deck and stickers

        return () => ctx.revert();
    }, []);

    return (
        <div className="reels-page-container" ref={mainContainerRef}>
            <Helmet>
                <title>Video Editing & Reels | Shorts, Vlogs & Viral Content</title>
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
                        zIndex: 4, // Behind deck but visible
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
                <h1 className="header-title">Scroll Down The Shorts</h1>
                <p className="header-desc">
                    This section features my video content creations designed to <span className="highlight-text highlight-yellow">capture attention</span>, <span className="highlight-text highlight-pink">tell stories</span>, and drive <span className="highlight-text highlight-blue">meaningful engagement</span>. Each video is strategically crafted to <span className="highlight-text highlight-green">simplify messages</span>, <span className="highlight-text highlight-orange">build credibility</span>, and <span className="highlight-text highlight-yellow">connect with the audience</span> in seconds.<br/><br/>

                    I combine <span className="highlight-text highlight-pink">visual storytelling</span> with <span className="highlight-text highlight-blue">platform-optimised captions</span> to ensure every piece of content performs beyond aesthetics. My videos are built to <span className="highlight-text highlight-green">inform, inspire, and convert</span>.<br/><br/> 

                    Every project here reflects a <span className="highlight-text highlight-yellow">balance of creativity and strategy</span>, where visuals hook the audience and captions guide them toward <span className="highlight-text highlight-orange">trust, action, and results</span>.
                </p>
            </div>

            {/* Deck Pinned Area - Normal Flow initially */}
            <div ref={deckRef} className="deck-wrapper">
                {VIDEO_CONTENT_DATA.map((item, index) => {
                    const isActive = index === activeIndex;
                    const distance = Math.abs(index - activeIndex);
                    // Load current, prev, and next (distance <= 1)
                    // You might blindly load card 0 on load too.
                    const shouldLoad = distance <= 1 || index === 0; 
                    
                    return (
                        <VideoCard 
                            key={item.id} 
                            item={item} 
                            isActive={isActive}
                            shouldLoad={shouldLoad}
                            isMuted={isMuted}
                            toggleMute={toggleMute}
                        />
                    );
                })}
            </div>
            
            <div className="marquee-section">
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
            </div>
          <Footer/>
        </div>
        
    );
};

export default VideoContent;
