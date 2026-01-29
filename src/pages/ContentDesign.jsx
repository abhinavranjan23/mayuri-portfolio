import React, {  useState, useEffect, useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// Lazy load DotLottiePlayer for background to save initial bundle
const DotLottiePlayer = React.lazy(() => import('@dotlottie/react-player').then(module => ({ default: module.DotLottiePlayer })));
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './ContentDesign.css';
import avatarAnimation from '../assets/Avatar-woman-short-hair.lottie';
import { CONTENT_DESIGN_CARDS, CONTENT_BG_ANIMATION, CONTENT_DESIGN_MOBILE_BG, CONTENT_DESIGN_STRINGS } from '../utils/Constant';
import ShimmerLoader from '../components/ShimmerLoader';
const Footer = React.lazy(() => import('../components/Footer'));

import useIsMobile from '../hooks/useIsMobile';

const ContentDesign = () => {
    const isMobile = useIsMobile();
    const [isLoading, setIsLoading] = useState(() => {
        // PERF: Check if user has already seen the intro in this session
        return !sessionStorage.getItem(CONTENT_DESIGN_STRINGS.SESSION_KEY);
    });

    // Safety timeout in case Lottie takes too long or fails
    useEffect(() => {
        if (!isLoading) return; // Skip if already loaded
        
        const timer = setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem(CONTENT_DESIGN_STRINGS.SESSION_KEY, 'true');
        }, 500); // Drastically reduced from 1500ms to 500ms to prevent white screen
        return () => clearTimeout(timer);
    }, [isLoading]);

    const handleLottieLoad = useCallback(() => {
        if (!isLoading) return;

        // Instant transition when Lottie is ready
        setIsLoading(false);
        sessionStorage.setItem(CONTENT_DESIGN_STRINGS.SESSION_KEY, 'true');
    }, [isLoading]);

    // Mobile Scroll Trigger for Hover Effect
    useEffect(() => {
        if (!isMobile || isLoading) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('mobile-active');
                } else {
                    entry.target.classList.remove('mobile-active');
                }
            });
        }, {
            threshold: 0.7 // Trigger when 50% of card is visible
        });

        const cards = document.querySelectorAll('.grid-card');
        cards.forEach(card => observer.observe(card));

        return () => observer.disconnect();
    }, [isMobile, isLoading]);

    
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
                when: "beforeChildren"
            }
        }
    };

    const topBarVariants = {
        hidden: { y: -20, opacity: 0, x: "-50%", visibility: "hidden" },
        visible: {
            y: 0,
            opacity: 1,
            x: "-50%",
            visibility: "visible",
            transition: { type: "spring", stiffness: 50, damping: 20, delay: 0.5 } 
        }
    };

    const contentVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const gridVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
    };

    const cards = CONTENT_DESIGN_CARDS;

    if (isLoading) return <ShimmerLoader />;

    return (
        <motion.div 
            className="content-design-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Helmet>
                <title>{CONTENT_DESIGN_STRINGS.HELMET_TITLE}</title>
                <meta name="description" content={CONTENT_DESIGN_STRINGS.HELMET_DESCRIPTION} />
            </Helmet>
            <motion.div className="content-design-top-bar" variants={topBarVariants}>
                 <Link to="/" aria-label="Home">
                    <div className="avatar-circle" style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', background: '#f0f0f0' }}>
                        <Suspense fallback={<div style={{width:'100%', height:'100%', background:'#eee'}}></div>}>
                            <DotLottiePlayer
                                key={isMobile ? CONTENT_DESIGN_STRINGS.MOBILE_AVATAR_KEY : CONTENT_DESIGN_STRINGS.DESKTOP_AVATAR_KEY}
                                src={avatarAnimation}
                                autoplay={!isMobile}
                                loop={!isMobile}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </Suspense>
                    </div>
                 </Link>
                 
                 <Navbar />
            </motion.div>

            {/* Main Content Area with Background Lottie */}
            <motion.div 
                className="content-design-bg-container" 
                variants={contentVariants}
                style={{ opacity: isLoading ? 0 : 1 }} // Manage opacity here if needed, but variants handle it
            >
                <div className="content-design-lottie-wrapper">
                    {!isMobile ? (
                        <Suspense fallback={null}>
                            <DotLottiePlayer
                                key={CONTENT_DESIGN_STRINGS.DESKTOP_BG_KEY}
                                src={CONTENT_BG_ANIMATION}
                                autoplay
                                loop
                                rendererSettings={{
                                    preserveAspectRatio: 'xMidYMid slice'
                                }}
                                style={{ width: '100%', height: '100%' }}
                                onEvent={(event) => {
                                    if (event === 'ready' || event === 'load') {
                                        handleLottieLoad();
                                    }
                                }}
                            />
                        </Suspense>
                    ) : (
                        <img 
                            src={CONTENT_DESIGN_MOBILE_BG} 
                            alt="Background" 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover',
                                opacity: 0.8 // Maintained readability
                            }}
                            onLoad={handleLottieLoad} // Trigger load complete
                        />
                    )}
                </div>
            </motion.div>

            {/* Scrollable Overlay Content */}
            <div className="content-scroll-overlay">
                
                {/* Intro Section */}
                <motion.div className="content-intro-section" variants={gridVariants}>
                    <h2 className="content-quote">
                        &quot;{CONTENT_DESIGN_STRINGS.QUOTE}&quot;
                    </h2>
                    <p className="content-description">
                        {CONTENT_DESIGN_STRINGS.DESCRIPTION}
                    </p>
                </motion.div>

                {/* Grid Section */}
                <motion.div className="content-grid" variants={gridVariants}>
                    {cards.map((card, index) => (
                       
                        <motion.div className="grid-card" variants={cardVariants} key={index}>
                             <Link to={card.link}>
                            <img 
                                src={card.image} 
                                alt={card.title} 
                                loading="lazy" 
                                width="438" 
                                height="438" 
                            />
                            <div className="image-overlay">
                                <span className="explore-text">{CONTENT_DESIGN_STRINGS.EXPLORE_TEXT}</span>
                            </div>
                            <div className="card-badge">{card.title}</div>
                            </Link>
                        </motion.div>
                  
                    ))}
                </motion.div>

                {/* Bottom spacer for scrolling */}
                <div style={{ height: '100px' }}></div>
                <Suspense fallback={null}>
                    <Footer/>
                </Suspense>
            </div>

        </motion.div>
    );
};

export default ContentDesign;
