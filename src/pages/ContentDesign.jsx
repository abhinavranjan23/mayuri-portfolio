import {  useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './ContentDesign.css';
import avatarAnimation from '../assets/Avatar-woman-short-hair.lottie';
import { CONTENT_DESIGN_CARDS, CONTENT_BG_ANIMATION } from '../utils/Constant';
import Footer from '../components/Footer';
import ShimmerLoader from '../components/ShimmerLoader';

import useIsMobile from '../hooks/useIsMobile';

const ContentDesign = () => {
    const isMobile = useIsMobile();
    const [isLoading, setIsLoading] = useState(() => {
        // PERF: Check if user has already seen the intro in this session
        return !sessionStorage.getItem('hasViewedContentDesignIntro');
    });

    // Safety timeout in case Lottie takes too long or fails
    useEffect(() => {
        if (!isLoading) return; // Skip if already loaded
        
        const timer = setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem('hasViewedContentDesignIntro', 'true');
        }, 3000); // 3s max wait
        return () => clearTimeout(timer);
    }, [isLoading]);

    const handleLottieLoad = () => {
        if (!isLoading) return;

        // Add a small delay for smoothness
        setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem('hasViewedContentDesignIntro', 'true');
        }, 400);
    };

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
                <title>Content Design Portfolio | Visuals & Creative Work</title>
                <meta name="description" content="Browse the creative content design portfolio of Mayuri Saitav. High-quality visuals, graphics, and layouts tailored for social media success." />
            </Helmet>
            <motion.div className="content-design-top-bar" variants={topBarVariants}>
                 <Link to="/" aria-label="Home">
                    <div className="avatar-circle" style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', background: '#f0f0f0' }}>
                        <DotLottiePlayer
                            key={isMobile ? 'mobile-avatar' : 'desktop-avatar'}
                            src={avatarAnimation}
                            autoplay={!isMobile}
                            loop={!isMobile}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                 </Link>
                 
                 <Navbar />
            </motion.div>

            {/* Main Content Area with Background Lottie */}
            <motion.div className="content-design-bg-container" variants={contentVariants}>
                <div className="content-design-lottie-wrapper">
                    <DotLottiePlayer
                        key={isMobile ? 'mobile-bg' : 'desktop-bg'}
                        src={CONTENT_BG_ANIMATION}
                        autoplay={!isMobile}
                        loop={!isMobile}
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
                </div>
            </motion.div>

            {/* Scrollable Overlay Content */}
            <div className="content-scroll-overlay">
                
                {/* Intro Section */}
                <motion.div className="content-intro-section" variants={gridVariants}>
                    <h2 className="content-quote">
                        &quot;Posting meaningful is important rather than posting daily&quot;
                    </h2>
                    <p className="content-description">
                        I consider content is a way to vocalize one&apos;s social account. 
                        I absolutely love when being part of strategizing content and bringing volume to those ideas through graphic. 
                        I&apos;ve strategized and shaped those ideas across D2C, B2C companies.
                    </p>
                </motion.div>

                {/* Grid Section */}
                <motion.div className="content-grid" variants={gridVariants}>
                    {cards.map((card, index) => (
                       
                        <motion.div className="grid-card" variants={cardVariants} key={index}>
                             <Link to={card.link}>
                            <img src={card.image} alt={card.title} />
                            <div className="image-overlay">
                                <span className="explore-text">Click to Explore</span>
                            </div>
                            <div className="card-badge">{card.title}</div>
                            </Link>
                        </motion.div>
                  
                    ))}
                </motion.div>

                {/* Bottom spacer for scrolling */}
                <div style={{ height: '100px' }}></div>
                <Footer/>
            </div>

        </motion.div>
    );
};

export default ContentDesign;
