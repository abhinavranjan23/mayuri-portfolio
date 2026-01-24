import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { Helmet } from 'react-helmet-async';
import '@dotlottie/react-player/dist/index.css';
import './Home.css';


import avatarAnimation from '../assets/Avatar-woman-short-hair.lottie';


// Floating Icons

import pauseIcon from '../assets/pause.svg';
import playIcon from '../assets/play.svg';

import FloatingIcon from '../components/FloatingIcon';
import useIsMobile from '../hooks/useIsMobile';


import { HOME_NAV_ITEMS, HOME_FLOATING_ICONS, MAYURI_CHAR_IMG, MAYURI_CHAR_MOBILE_IMG, PANDA_ICON_IMG, BACKGROUND_STRIP_IMG, MOUNTAINS_IMGS } from '../utils/Constant';

const Home = () => {
  const containerRef = useRef(null);
  const lottieRef = useRef(null);
  const audioRef = useRef(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isMobile = useIsMobile();


  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
        // Text Entrance
        gsap.from(".hero-anim", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        });
        
        // Strip Entrance (only if not mobile)
        if (!isMobile) {
            gsap.from(".orange-strip", {
                scaleY: 0,
                transformOrigin: "top",
                duration: 1,
                ease: "circ.out",
                delay: 0.5
            });
        }
    }, containerRef);
    return () => ctx.revert();
  }, [isMobile]); // Re-run if mode changes

  useEffect(() => {
      if (isMobile) return; // Don't autoplay on mobile

      // Try to autoplay
      const playAudio = async () => {
          try {
              if (audioRef.current) {
                await audioRef.current.play();
                setIsPlaying(true);
              }
          } catch (err) {
              console.log("Autoplay blocked, waiting for interaction");
              // Fallback: Play on first interaction
              const enableAudio = () => {
                  if (audioRef.current) {
                      audioRef.current.play().then(() => {
                          setIsPlaying(true);
                      }).catch((e) => console.log("Audio still blocked", e));
                  }
                  window.removeEventListener('click', enableAudio);
                  window.removeEventListener('keydown', enableAudio);
                  window.removeEventListener('mousemove', enableAudio);
                  window.removeEventListener('touchstart', enableAudio);
              };
              window.addEventListener('click', enableAudio);
              window.addEventListener('keydown', enableAudio);
              window.removeEventListener('mousemove', enableAudio); // Ensure no dupes? No, just add.
              window.addEventListener('mousemove', enableAudio);
              window.addEventListener('touchstart', enableAudio);
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

  return (
    <div className="home-container" ref={containerRef}>
        <Helmet>
            <title>Mayuri Saitav | Social Media Manager & Content Creator Portfolio</title>
            <meta name="description" content="Welcome to the official portfolio of Mayuri Saitav. I specialize in social media management, content strategy, video editing, and digital growth. Let's elevate your brand." />
        </Helmet>
        
        {/* Audio Element (Only render if not mobile to save resources?) 
            Actually keep it rendered but controlled, OR remove it. 
            User said "music should not be played". remove it to be safe 
        */}
        {!isMobile && <audio ref={audioRef} src="/music/time-travel.mp3" loop />}

        {/* Music Control Button */}
        {!isMobile && (
            <motion.div 
                className="menu-btn music-btn" 
                onClick={toggleMusic}
                initial={{ opacity: 0, scale: 0.8 }}
                data-cursor-spin="true"
                data-cursor-button="true"
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}

            >
                <img 
                    src={isPlaying ? pauseIcon : playIcon} 
                    alt={isPlaying ? "Pause" : "Play"} 
                    style={{ width: '24px', height: '24px' }} 
                />
            </motion.div>
        )}

        {/* --- LEFT SECTION --- */}
        <div className="left-section">
            <div 
                className="avatar-container hero-anim avatar"
                onMouseEnter={() => lottieRef.current?.play()}
                onMouseLeave={() => lottieRef.current?.pause()}

            >
                <DotLottiePlayer
                    ref={lottieRef}
                    src={avatarAnimation}
                    autoplay={false}
                    loop
                    style={{ width: '100%', height: '100%' }}
                />
            </div>

            <h2 className="hero-title-small hero-anim">Content Creator</h2>
            <h1 className="hero-title-main hero-anim">
                CREATIVE<br/>
                <span>THAT</span> PERFORMS
            </h1>

            <nav className="nav-links hero-anim">
                {HOME_NAV_ITEMS.map((item, index) => (
                    <Link 
                        key={index}
                        to={item.link} 
                        className="nav-item"
                        data-cursor-text={item.text} 
                        onMouseEnter={() => setHoveredLink(index)}
                        onMouseLeave={() => setHoveredLink(null)}
        
                    >
                        {/* Only show Panda hover effect on Desktop */}
                        {!isMobile && hoveredLink === index && (
                             <motion.img 
                                src={PANDA_ICON_IMG} 
                                alt="Panda"
                                initial={{ opacity: 0, x: -10, scale: 0 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="panda-icon"
                             />
                        )}
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>

        {/* --- RIGHT SECTION --- */}
        <div className="right-section">
            {/* Render visuals only if NOT mobile */}
            {!isMobile && (
                <>
                    <div 
                        className="orange-strip" 
                        style={{ backgroundImage: `url(${BACKGROUND_STRIP_IMG})` }}
                    ></div>

                    {/* Floating Icons around Character */}
                    {HOME_FLOATING_ICONS.map((icon, idx) => (
                        <FloatingIcon 
                            key={idx}
                            src={icon.src}
                            label={icon.label}
                            emoji={icon.emoji}
                            initialX={icon.x}
                            initialY={icon.y}
                            delay={icon.delay}
                        />
                    ))}
                    
                    <motion.img 
                        src={MAYURI_CHAR_IMG} 
                        alt="Mayuri Character" 
                        className="character-image"
                        fetchpriority="high"
                        initial={{ y: 0 }}
                        animate={{ y: [0, -20, 0] }} // Gentle float
                        transition={{ 
                            duration: 4, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                    />
                </>
            )}

            {/* Render Character on Mobile (outside the !isMobile block above if we want just character) 
                Actually, simpler to allow right-section content but hide specific items in CSS or JS.
                Let's move character OUT of the !isMobile block.
            */}
            {isMobile && (
                 <motion.img 
                    src={MAYURI_CHAR_MOBILE_IMG} 
                    alt="Mayuri Character" 
                    className="character-image"
                    initial={{ y: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    fetchpriority="high"
                    transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                />
            )}
        </div>

        {/* --- MOUNTAINS --- */}
        <div className="mountains-container">
            {MOUNTAINS_IMGS.map((img, idx) => (
                <img 
                    key={idx}
                    src={img.src}
                    alt={`Mountain ${idx + 1}`}
                    className={`mountain-img ${img.className}`}
                    loading="lazy"
                />
            ))}
        </div>

    </div>
  );
};

export default Home;
