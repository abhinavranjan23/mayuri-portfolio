import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { VIDEO_CONTENT_DATA } from '../utils/Constant';
import BackButton from '../components/BackButton';
import './VideoContent.css';

const VideoReel = ({ item, isActive, toggleMute, isMuted }) => {
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
            url: item.videoUrl // Sharing the direct video link
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(item.videoUrl);
            setShareText("Copied!");
            setTimeout(() => setShareText("Share"), 2000);
        }
    };

    useEffect(() => {
        if (isActive) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(e => console.log("Autoplay error", e));
        } else {
            videoRef.current.pause();
        }
    }, [isActive]);

    return (
        <div className="reel-container">
            <div className="reel-video-wrapper">
                <video
                    ref={videoRef}
                    src={item.videoUrl}
                    loop
                    playsInline
                    muted={isMuted}
                    className="reel-video"
                    onClick={toggleMute}
                />
            </div>
            
            {/* Overlay Info */}
            <div className="reel-overlay">
                <div className="reel-content">
                    <div className="reel-header">
                        <h3>{item.title}</h3>
                        <button 
                            className="follow-btn" 
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(item.profileUrl, '_blank');
                            }}
                        >
                            Follow
                        </button>
                    </div>
                    <p>{item.description}</p>
                </div>
                
                {/* Side Actions (Visual Only for now) */}
                <div className="reel-actions">
                    <div className="action-btn" onClick={toggleLike}>
                        <motion.svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="32" 
                            height="32" 
                            viewBox="0 0 24 24" 
                            fill={isLiked ? "#ff0000" : "none"} 
                            stroke={isLiked ? "#ff0000" : "#ffffff"} 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            whileTap={{ scale: 0.8 }}
                            animate={{ scale: isLiked ? 1.1 : 1 }}
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </motion.svg>
                        <span>{isLiked ? "Liked" : "Like"}</span>
                    </div>
                    
                    <div className="action-btn" onClick={handleShare}>
                        <motion.svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="30" 
                            height="30" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="#ffffff" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            whileTap={{ scale: 0.8, rotate: -20 }}
                        >
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </motion.svg>
                        <span>{shareText}</span>
                    </div>

                     <div className="action-btn" onClick={toggleMute}>
                        <span style={{ fontSize: '1.8rem' }}>{isMuted ? "🔇" : "🔊"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const VideoContent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const containerRef = useRef(null);

    // Intersection Observer to detect active reel
    useEffect(() => {
        const options = {
            root: containerRef.current,
            threshold: 0.6 // 60% visibility required
        };

        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Number(entry.target.dataset.index);
                    setActiveIndex(index);
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);
        const sections = document.querySelectorAll('.reel-section');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const toggleMute = () => setIsMuted(!isMuted);

    return (
        <motion.div 
            className="reels-page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Helmet>
                <title>Reels | Video Content</title>
            </Helmet>

            <BackButton />

            <div className="reels-scroll-container" ref={containerRef} data-lenis-prevent>
                {VIDEO_CONTENT_DATA.map((item, index) => (
                    <section 
                        key={item.id} 
                        className="reel-section"
                        data-index={index}
                    >
                        <VideoReel 
                            item={item} 
                            isActive={index === activeIndex}
                            isMuted={isMuted}
                            toggleMute={toggleMute}
                        />
                    </section>
                ))}
            </div>
        </motion.div>
    );
};

export default VideoContent;
