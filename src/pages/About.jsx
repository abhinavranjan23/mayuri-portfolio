import { useState, Suspense, lazy , useEffect } from 'react';
import { motion } from 'framer-motion'; 
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Stats from '../components/Stats';
import './About.css';
 
import { DotLottiePlayer } from '@dotlottie/react-player';
import avatarAnimation from '../assets/Avatar-woman-short-hair.lottie';
import pauseIcon from '../assets/pause.svg';
import playIcon from '../assets/play.svg';
import { Link } from 'react-router-dom';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import TypewriterText from '../components/TypewriterText';
// Lazy load WhatIBring
const WhatIBring = lazy(() => import('../components/WhatIBring'));
const BooksSection = lazy(() => import('../components/BooksSection'));
const WanderingMinds = lazy(() => import('../components/WanderingMinds'));
import { ABOUT_BG_IMG, ABOUT_TYPEWRITER_TEXT } from '../utils/Constant';
import ShimmerLoader from '../components/ShimmerLoader';

import useIsMobile from '../hooks/useIsMobile';
import useAudioController from '../hooks/useAudioController';
import useAboutAnimation from '../hooks/useAboutAnimation';

const About = () => {
    const isMobile = useIsMobile();
    const [isLoading, setIsLoading] = useState(true);
    
    // Use custom Hooks
    const { audioRef, isPlaying, toggleAudio } = useAudioController(isMobile, isLoading);
    const { containerVariants, topBarVariants, headingVariants, imageVariants } = useAboutAnimation();

    useEffect(() => {
        // Preload Background Image
        const img = new Image();
        img.src = ABOUT_BG_IMG;
        img.onload = () => {
             // Add a small delay for smoother transition
             setTimeout(() => setIsLoading(false), 100);
        };
        img.onerror = () => setIsLoading(false); // Fallback
    }, []);



    if (isLoading) return <ShimmerLoader />;

    return (
        <motion.div 
            className="about-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Helmet>
                <title>About Me | Mayuri Saitav - Digital Creator & Strategist</title>
                <meta name="description" content="Learn more about Mayuri Saitav, a passionate social media manager and content creator with over 3 years of experience in helping brands grow online." />
                <meta name="keywords" content="Mayuri Saitav, About Content Creator, Social Media Story, Influencer Journey, Creative Professional" />
                <link rel="canonical" href="https://mayuri-portfolio.com/about" />
            </Helmet>
            {!isMobile && <audio ref={audioRef} src="/music/aboutbg.mp3" loop />}

            {/* Top Bar Floating over everything (visually) or top of container */}
             <motion.div className="top-bar" variants={topBarVariants}>
                <Link to="/" aria-label="Home">
                    
             
                <div className="avatar-circle">
                    <div style={{ width: '60px', height: '60px' }}>
                        <DotLottiePlayer
                            src={avatarAnimation}
                            autoplay={!isMobile}
                            loop
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                       
                </div>
                </Link>
                
                <Navbar />

                {!isMobile && (
                    <div 
                        className="music-circle" 
                        onClick={toggleAudio}
                        style={{ cursor: 'none' }}
                        data-cursor-spin="true"
                    >
                        <img 
                            src={isPlaying ? pauseIcon : playIcon} 
                            alt={isPlaying ? "Pause" : "Play"} 
                            style={{ width: '30px', height: '30px' }} 
                        />
                    </div>
                )}
             </motion.div>

            <div className="about-content-wrapper">
                {/* Background Image Container */}
                <motion.div 
                    className="about-bg-image"
                    style={{ backgroundImage: `url(${ABOUT_BG_IMG})` }}
                    variants={imageVariants}
                >
                    {/* Text Overlay */}
                    <div className="about-text-overlay">
                        <motion.div className="about-heading" variants={headingVariants}>
                            Content<br /> Creator.
                        </motion.div>
                        <div className="about-description">
                            
                             <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }} // Wait for image and heading
                             >
                                <TypewriterText text={ABOUT_TYPEWRITER_TEXT} />
                             </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div className="stats-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Stats />
            </motion.div>

            {/* Code Splitted Section */}
            <motion.div className="what-i-bring-section-wrapper" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <Suspense fallback={<div>Loading...</div>}>
                    <WhatIBring />
        <BooksSection />
        <WanderingMinds />
        <Contact />
        <Footer />
      </Suspense>
            </motion.div>
            
        </motion.div>
    );
};

export default About;
