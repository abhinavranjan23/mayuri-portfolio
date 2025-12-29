import { useRef, useState, Suspense, lazy , useEffect } from 'react';
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
// Lazy load WhatIBring
const WhatIBring = lazy(() => import('../components/WhatIBring'));
const BooksSection = lazy(() => import('../components/BooksSection'));
const WanderingMinds = lazy(() => import('../components/WanderingMinds'));
const aboutBg = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767025022/bgNew_wehssm.jpg";  
const About = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const playAudio = async () => {
            try {
                if (audioRef.current) {
                    await audioRef.current.play();
                    setIsPlaying(true);
                }
            } catch (err) {
                console.log("Autoplay blocked");
                const enableAudio = () => {
                   if (audioRef.current) {
                       audioRef.current.play();
                       setIsPlaying(true);
                   }
                   window.removeEventListener('click', enableAudio);
                };
                window.addEventListener('click', enableAudio);
            }
        };
        playAudio();
    }, [isMobile]);

    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(() => {});
            setIsPlaying(true);
        }
    };

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
        hidden: { y: -20, opacity: 0, x: "-50%" },
        visible: {
            y: 0,
            opacity: 1,
            x: "-50%",
            transition: { type: "spring", stiffness: 50, damping: 20, delay: 1.5 } // Delay until after main entrance
        }
    };

    // Heading comes from below
    const headingVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 60, damping: 20, duration: 1 }
        }
    };

    // Image comes from above
    const imageVariants = {
        hidden: { y: "-100%", opacity: 0 }, // Start fully above off-screen
        visible: {
            y: "0%",
            opacity: 1,
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } // Custom easing for "heavy drop" feel
        }
    };

    const TypewriterText = ({ text }) => {
        // Split text into words to handle wrapping better, or chars for pure typewriter
        const characters = text.split("");
        
        const sentenceVariants = {
            hidden: { opacity: 1 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.03, // Speed of typing
                }
            }
        };

        const charVariants = {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        };

        return (
            <motion.p 
                variants={sentenceVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'inline' }}
            >
                {characters.map((char, index) => (
                    <motion.span key={index} variants={charVariants}>
                        {char}
                    </motion.span>
                ))}
            </motion.p>
        );
    };

    return (
        <motion.div 
            className="about-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Helmet>
                <title>About Mayuri | Content Creator Journey</title>
                <meta name="description" content="Learn about Mayuri's journey from social media enthusiast to professional content creator. Discover the passion behind the work." />
                <link rel="canonical" href="https://mayuri-portfolio.com/about" />
            </Helmet>
            {!isMobile && <audio ref={audioRef} src="/music/lilies-on-lapse.mp3" loop />}

            {/* Top Bar Floating over everything (visually) or top of container */}
             <motion.div className="top-bar" variants={topBarVariants}>
                <Link to="/">
                    
             
                <div className="avatar-circle">
                    <div style={{ width: '60px', height: '60px' }}>
                        <DotLottiePlayer
                            src={avatarAnimation}
                            autoplay={true}
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
                        onClick={toggleMusic}
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
                    style={{ backgroundImage: `url(${aboutBg})` }}
                    variants={imageVariants}
                >
                    {/* Text Overlay */}
                    <div className="about-text-overlay">
                        <motion.div className="about-heading" variants={headingVariants}>
                            Content<br /> Creator.
                        </motion.div>
                        <div className="about-description">
                             {/* Only start typing after image is largely in place. 
                                 We can use a simple delay or separate animation control. 
                                 For simplicity with variants, we can wrap this in a motion div with delay.
                              */}
                             <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }} // Wait for image and heading
                             >
                                <TypewriterText text="I started social media as work but now it's an adventure where the rides are fun and exciting. I am exploring at every step of creation because I believe creativity comes out in it's own way and is never ending......" />
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
