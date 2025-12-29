import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './ContentDesign.css';
// Importing Assets
import avatarAnimation from '../assets/Avatar-woman-short-hair.lottie';
// Import the background Lottie simply to pass to the player
const  contentBgAnimation  = "https://res.cloudinary.com/dnt0xlngl/raw/upload/v1767024743/Background_fv3itj.json";
// Importing Grid Images
const photoImg = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767024749/photoContent_wqorhg.jpg";
const statsImg = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767024752/socialStats_eia0mm.jpg";
const videoImg = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767024743/5956752_uxat9t.jpg";
const servicesImg = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767024746/customerSupport_z379ny.jpg";
import Footer from '../components/Footer';

const ContentDesign = () => {

    
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

    const cards = [
        { title: "Photo Content", image: photoImg , link: "/content-design/photo-content" },
        { title: "Video Content", image: videoImg , link: "/content-design/video-content" },
        { title: "Social Stats", image: statsImg , link: "/content-design/social-stats" },
        { title: "Services", image: servicesImg , link: "/content-design/services" },
    ];
    return (
        <motion.div 
            className="content-design-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Helmet>
                <title>Content Design | Mayuri</title>
                <meta name="description" content="Explore Mayuri's Content Design portfolio." />
            </Helmet>

            {/* Top Bar (Avatar + Navbar) - No Music */}
            <motion.div className="content-design-top-bar" variants={topBarVariants}>
                 <Link to="/">
                    <div className="avatar-circle" style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', background: '#f0f0f0' }}>
                        <DotLottiePlayer
                            src={avatarAnimation}
                            autoplay={true}
                            loop
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
                        src={contentBgAnimation}
                        autoplay={true}
                        loop
                        rendererSettings={{
                            preserveAspectRatio: 'xMidYMid slice'
                        }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
            </motion.div>

            {/* Scrollable Overlay Content */}
            <div className="content-scroll-overlay">
                
                {/* Intro Section */}
                <motion.div className="content-intro-section" variants={gridVariants}>
                    <h2 className="content-quote">
                        "Posting meaningful is important rather than posting daily"
                    </h2>
                    <p className="content-description">
                        I consider content is a way to vocalize one's social account. 
                        I absolutely love when being part of strategizing content and bringing volume to those ideas through graphic. 
                        I've strategized and shaped those ideas across D2C, B2C companies.
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
