import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { Helmet } from 'react-helmet-async';
import '@dotlottie/react-player/dist/index.css';
import './Home.css';
import avatarAnimation from '../assets/Avatar-woman-short-hair.lottie';
import pauseIcon from '../assets/pause.svg';
import playIcon from '../assets/play.svg';
import FloatingIcon from '../components/FloatingIcon';
import useIsMobile from '../hooks/useIsMobile';
import useAudioController from '../hooks/useAudioController';
import useHomeAnimation from '../hooks/useHomeAnimation';
import { HOME_NAV_ITEMS, HOME_FLOATING_ICONS, MAYURI_CHAR_IMG, MAYURI_CHAR_MOBILE_IMG, PANDA_ICON_IMG, BACKGROUND_STRIP_IMG, MOUNTAINS_IMGS, HOME_STRINGS, ANIMATION_CONFIG } from '../utils/Constant';

const Home = () => {
  const containerRef = useRef(null);
  const lottieRef = useRef(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const isMobile = useIsMobile();

  const { audioRef, isPlaying, toggleAudio } = useAudioController(isMobile);
  useHomeAnimation(containerRef, isMobile);

  return (
    <div className="home-container" ref={containerRef}>
        <Helmet>
            <title>Mayuri Saitav | Social Media Manager & Content Creator Portfolio</title>
            <meta name="description" content="Welcome to the official portfolio of Mayuri Saitav. I specialize in social media management, content strategy, video editing, and digital growth. Let's elevate your brand." />
        </Helmet>
        
        {!isMobile && <audio ref={audioRef} src={HOME_STRINGS.AUDIO_SRC} loop autoPlay />}

        {!isMobile && (
            <motion.div 
                className="menu-btn music-btn" 
                onClick={toggleAudio}
                initial={{ opacity: 0, scale: 0.8 }}
                data-cursor-spin="true"
                data-cursor-button="true"
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}

            >
                <img 
                    src={isPlaying ? pauseIcon : playIcon} 
                    alt={isPlaying ? HOME_STRINGS.PAUSE_ICON_ALT : HOME_STRINGS.PLAY_ICON_ALT} 
                    style={{ width: '24px', height: '24px' }} 
                />
            </motion.div>
        )}

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

            <h2 className="hero-title-small hero-anim">{HOME_STRINGS.HERO_TITLE_SMALL}</h2>
            <h1 className="hero-title-main hero-anim">
                {HOME_STRINGS.HERO_TITLE_MAIN_1}<br/>
                <span>{HOME_STRINGS.HERO_TITLE_MAIN_2}</span> {HOME_STRINGS.HERO_TITLE_MAIN_3}
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

      
        <div className="right-section">
           
            {!isMobile && (
                <>
                    <div 
                        className="orange-strip" 
                        style={{ backgroundImage: `url(${BACKGROUND_STRIP_IMG})` }}
                    ></div>

                 
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
                        alt={HOME_STRINGS.AVATAR_ALT} 
                        className="character-image"
                        fetchpriority="high"
                        initial={{ y: 0 }}
                        animate={{ y: ANIMATION_CONFIG.FLOAT_ANIM_Y }} 
                        transition={{ 
                            duration: ANIMATION_CONFIG.FLOAT_ANIM_DURATION, 
                            repeat: Infinity, 
                            ease: ANIMATION_CONFIG.EASE_IN_OUT 
                        }}
                    />
                </>
            )}

            
            {isMobile && (
                 <motion.img 
                    src={MAYURI_CHAR_MOBILE_IMG} 
                    alt={HOME_STRINGS.AVATAR_ALT} 
                    className="character-image"
                    initial={{ y: 0 }}
                    animate={{ y: ANIMATION_CONFIG.FLOAT_MOBILE_ANIM_Y }}
                    fetchpriority="high"
                    transition={{ 
                        duration: ANIMATION_CONFIG.FLOAT_ANIM_DURATION, 
                        repeat: Infinity, 
                        ease: ANIMATION_CONFIG.EASE_IN_OUT 
                    }}
                />
            )}
        </div>

        
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
