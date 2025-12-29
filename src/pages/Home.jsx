import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import './Home.css';


import avatarAnimation from '../assets/Avatar-woman-short-hair.lottie';
import pandaIcon from '/cute-panda-happy.svg';

// Floating Icons

import pauseIcon from '../assets/pause.svg';
import playIcon from '../assets/play.svg';

const FloatingIcon = ({ src, label, initialX, initialY, delay, emoji }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
        style={{ 
            position: 'absolute', 
            top: initialY, 
            left: initialX, 
            zIndex: 10,
            cursor: 'none'
        }}
        animate={{ y: isHovered ? 0 : [0, -15, 0] }}
        transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: delay 
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <div style={{position: 'relative', width: '6vw' , height: '6vw'}}>
             <motion.img 
                src={src} 
                alt={label} 
                style={{width: '100%', height: '100%', objectFit:'contain', filter: 'drop-shadow(0px 10px 8px rgba(0,0,0,0.3))'}} 
                animate={{ rotate: isHovered ? [0, -10, 10, -5, 5, 0] : 0 }}
                transition={{ duration: 0.5 }}
             />
             {isHovered && (
                 <motion.div 
                    initial={{opacity:0, y: 10, scale: 0.8}}
                    animate={{opacity:1, y: 0, scale: 1}}
                    style={{
                        position: 'absolute',
                        bottom: '80%', // Position above the icon
                        left: '-15%',
                        transform: 'translateX(-30%)',
                        background: 'white',
                        padding: '8px 12px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#333',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        marginBottom: '10px', // Add space between icon and tooltip
                        pointerEvents: 'none', // Prevent flickering if mouse touches tooltip
                        zIndex: 20
                    }}
                 >
                    <span style={{fontSize: '1.2em'}}>{emoji}</span> {label}
                 </motion.div>
             )}
        </div>
    </motion.div>
  );
};


const navItems = [
    { label: "Content design", link: "/content-design", text: "Explore it!" },
    { label: "About me", link: "/about", text: "Who am I?" },
    { label: "Resume", link: "/resume", text: "Hire Me!" }
];

const floatingIcons = [
    { src: "https://res.cloudinary.com/dnt0xlngl/image/upload/w_150,f_auto,q_auto/v1766473438/foodie_vaqw7f.avif", label: "Foodie By Birth", emoji: "🥟", x: '45%', y: '10%', delay: 0 },
    { src: "https://res.cloudinary.com/dnt0xlngl/image/upload/w_150,f_auto,q_auto/v1766473439/palm-tree_ae5zuc.png", label: "Nature Pleaser", emoji: "🌵", x: '20%', y: '25%', delay: 0.5 },
    { src: "https://res.cloudinary.com/dnt0xlngl/image/upload/f_auto,q_auto/v1766473441/pookie_eqwmqc.svg", label: "Finds peace in solitude !", emoji: "✌️", x: '70%', y: '25%', delay: 1 },
    { src: "https://res.cloudinary.com/dnt0xlngl/image/upload/w_150,f_auto,q_auto/v1766473439/instagram-marketing_qxayx0.png", label: "Social Enthusiast", emoji: "📸", x: '18%', y: '50%', delay: 1.5 },
    { src: "https://res.cloudinary.com/dnt0xlngl/image/upload/w_150,f_auto,q_auto/v1766473438/BAG_vyvato.avif", label: "Exploring, One Step at a Time ", emoji: "🏕", x: '70%', y: '50%', delay: 2 },
];

const Home = () => {
  const containerRef = useRef(null);
  const lottieRef = useRef(null);
  const audioRef = useRef(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

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
                style={{ 
                    cursor: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.25)', // Glassy look
                    backdropFilter: 'blur(10px)',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                }}
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
                style={{ width: '80px', height: '80px', marginBottom: '1rem', cursor: 'none' }}
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
                {navItems.map((item, index) => (
                    <Link 
                        key={index}
                        to={item.link} 
                        className="nav-item"
                        data-cursor-text={item.text} 
                        onMouseEnter={() => setHoveredLink(index)}
                        onMouseLeave={() => setHoveredLink(null)}
                        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                    >
                        {/* Only show Panda hover effect on Desktop */}
                        {!isMobile && hoveredLink === index && (
                             <motion.img 
                                src={pandaIcon} 
                                alt="Panda"
                                initial={{ opacity: 0, x: -10, scale: 0 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    marginRight: '10px',
                                    pointerEvents: 'none' 
                                }}
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
                        style={{ backgroundImage: `url(https://res.cloudinary.com/dnt0xlngl/image/upload/f_auto,q_auto/v1766457948/background_m9bzpx.jpg)` }}
                    ></div>

                    {/* Floating Icons around Character */}
                    {floatingIcons.map((icon, idx) => (
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
                        src={"https://res.cloudinary.com/dnt0xlngl/image/upload/w_600,f_auto,q_auto/v1766457952/mayuriChar_jqehqn.png"} 
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
                    src={"https://res.cloudinary.com/dnt0xlngl/image/upload/w_400,f_auto,q_auto/v1766457952/mayuriChar_jqehqn.png"} 
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
            <img src={"https://res.cloudinary.com/dnt0xlngl/image/upload/w_550,f_auto,q_auto/v1766457948/mountain4_qfqwbh.png"} className="mountain-img mountain-4" alt="Mountain" />
            <img src={"https://res.cloudinary.com/dnt0xlngl/image/upload/w_500,f_auto,q_auto/v1766457948/mountain3_lzfbki.avif"} className="mountain-img mountain-3" alt="Mountain" />
            <img src={"https://res.cloudinary.com/dnt0xlngl/image/upload/w_600,f_auto,q_auto/v1766457949/mountain2_l6sk50.avif"} className="mountain-img mountain-2" alt="Mountain" />
            <img src={"https://res.cloudinary.com/dnt0xlngl/image/upload/f_auto,q_auto/v1766457948/mountain1_xse8h4.avif"} className="mountain-img mountain-1" alt="Mountain" />
        </div>

    </div>
  );
};

export default Home;
