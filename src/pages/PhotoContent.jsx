import  { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import BackButton from '../components/BackButton';
import CompanyShowcase from '../components/CompanyShowcase';
import { 
    IPHONE_FRAME_IMG, IPHONE_WALLPAPER_IMG, BUTTERFLY_IMG, 
    PHOTO_CONTENT_STICKERS, COMPANIES_DATA, 
    ANIMATION_STICKERS_DATA, PHOTO_CONTENT_POSTS
} from '../utils/Constant';
import { IoArrowDown, IoClose } from "react-icons/io5";
import './PhotoContent.css';
import Footer from '../components/Footer';
import usePhotoContentAnimation from '../hooks/usePhotoContentAnimation';

const PhotoContent = () => {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const iphoneRef = useRef(null);
    const showcaseContainerRef = useRef(null); 
    const showcaseRefs = useRef([]); 
    const companies = COMPANIES_DATA;
    const [selectedImage, setSelectedImage] = useState(null);

    
    usePhotoContentAnimation(containerRef, heroRef, iphoneRef, showcaseContainerRef, showcaseRefs, companies);

    // Helper to collect refs
    const addToRefs = (el) => {
        if (el && !showcaseRefs.current.includes(el)) {
            showcaseRefs.current.push(el);
        }
    };

    // Close Modal on Escape Key
    useLayoutEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && selectedImage) {
                setSelectedImage(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage]);

    return (
        <div className="photo-content-page" ref={containerRef} >
            <Helmet>
                <title>Photography & Visual Content | Mayuri Saitav Portfolio</title>
                <meta name="description" content="Showcasing stunning photography and visual content strategies. See how I use imagery to tell compelling branch stories." />
            </Helmet>
            
            {/* ... Top Bar & Hero Section remain same ... */}
            
            <BackButton lightMode={true} />

            {/* Cute Animated Stickers */}
            {PHOTO_CONTENT_STICKERS.map((s, i) => (
                <div
                    key={i}
                    className={`cute-sticker-wrapper sticker-wrapper-${i}`}
                    style={{ 
                        position: 'fixed', 
                        top: s.top, 
                        left: s.left, 
                        zIndex: 15, // Lower than overlay (50) but visible
                        pointerEvents: 'none',
                        width: '150px', // Define width on wrapper
                        height: 'auto'
                    }}
                >
                    <img 
                        src={s.src} 
                        alt={`Cute Sticker ${i+1}`} 
                        className={`cute-sticker-inner sticker-inner-${i}`}
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.3))' // Move shadow to image
                        }}
                    />
                </div>
            ))}

            {/* Hero Pinned Section */}
             <div className="photo-hero" ref={heroRef}>
                
                <h1 className="hero-text-side left" style={{ opacity: 1, visibility: 'visible' }}>
                    <span style={{ opacity: 0, visibility: 'hidden' }}>Visual</span>
                </h1>
                
                <div className="iphone-wrapper" ref={iphoneRef} style={{ opacity: 1, visibility: 'visible' }}>
                    {/* Frame */}
                    <img src={IPHONE_FRAME_IMG} alt="iPhone Frame" className="iphone-frame" style={{ opacity: 0, visibility: 'hidden' }} />
                    
                    {/* Screen content (absolute inside frame) */}
                    <div className="iphone-screen" style={{ opacity: 0, visibility: 'hidden' }}>
                        <img src={IPHONE_WALLPAPER_IMG} alt="Wallpaper" className="screen-bg" />
                       <div className="screen-inner-text">
                            <h3>Stories<br/></h3>
                             <p >That Every  Post Speaks.</p>
                        </div>
                    </div>
                </div>

                <h1 className="hero-text-side right" style={{ opacity: 1, visibility: 'visible' }}>
                    <span style={{ opacity: 0, visibility: 'hidden' }}>Stories</span>
                </h1>
                
                {/* Overlay Content that appears when zoomed in */}
                <div className="details-overlay">
                    <div className="overlay-content">
                        <div className="header-wrapper" style={{position: 'relative', display: 'inline-block'}}>
                             <img src={BUTTERFLY_IMG} alt="Butterfly" className="butterfly-decoration" />
                             <h2>Explore the Gallery</h2>
                        </div>
                        <p>
                          This showcases <span className="highlight-text highlight-yellow">my photo content creations</span>, my approach to <span className="highlight-text highlight-pink">visual</span> <span className="highlight-text highlight-pink">storytelling</span> through thoughtfully designed photo content paired with <span className="highlight-text highlight-blue">purpose-driven</span> captions. From <span className="highlight-text highlight-green">immigration </span> <span className="highlight-text highlight-green">consultancies</span>, <span className="highlight-text highlight-orange">cultural</span> or <span className="highlight-text highlight-yellow">travel brands</span>, each piece is created to not just look good but to <span className="highlight-text highlight-pink">communicate clearly</span>, <span className="highlight-text highlight-pink">build trust</span>, and <span className="highlight-text highlight-pink">drive</span><span className="highlight-text highlight-pink"> action</span>. <br/> I focus on designing content that aligns with a <span className="highlight-text highlight-blue">brand’s  </span><span className="highlight-text highlight-blue">voice</span>, <span className="highlight-text highlight-blue">audience mindset </span>, and <span className="highlight-text highlight-blue">business</span><span className="highlight-text highlight-blue">goals</span>. Whether it’s simplifying complex immigration information or capturing the aspirational feel of travel, my content is crafted to be <span className="highlight-text highlight-green">scroll-stopping,</span> <span className="highlight-text highlight-green">informative</span>, and <span className="highlight-text highlight-green">conversion-friendly</span>.<br /> Every visual here is backed by strategic captioning because good content doesn’t just attract attention, it guides the audience toward <span className="highlight-text highlight-orange">meaningful engagement</span></p>
                        {/* Placeholder for further components */}
                        <div className="grid-placeholder">
                             <div className="grid-box"><img src={PHOTO_CONTENT_POSTS.first} alt="Content Created 1" /></div>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' , fontFamily:'Pangolin', fontSize:'1rem' , color:'#393939ff'}}> <div className="grid-box"><img src={PHOTO_CONTENT_POSTS.second} alt="Content Created 2" /></div><span style={{animation: 'bounce 1s infinite'}}>Scroll Down</span></div> 
                             <div className="grid-box"><img src={PHOTO_CONTENT_POSTS.third} alt="Content Created 3" /></div>
                        </div>
                    </div>
                </div>

            <div className="scroll-indicator-wrapper">
                <motion.div 
                    initial={{ y: 0 }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <p>Scroll Down</p>
                    <span className="arrow"><IoArrowDown /></span>
                </motion.div>
            </div>
        </div>

            {/* ------------------------------------------------------------------
                PINNED COMPANY SHOWCASE CONTAINER (DESKTOP/TABLET)
                - Height: 100vh (pinned)
                - Panels stack inside absolute
               ------------------------------------------------------------------ */}
            <div 
                ref={showcaseContainerRef} 
                className="showcase-pinned-wrapper desktop-showcase"
                style={{ 
                    width: '100%', 
                    height: '100vh', 
                    position: 'relative', 
                    background: "#FAF8F1",
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* Pages */}
                {companies.map((company, index) => (
                    <CompanyShowcase 
                        key={index}
                        ref={addToRefs}
                        companyName={company.name}
                        iphoneScreenImg={company.iphoneImg}
                        gridImages={company.gridImages}
                        onImageClick={setSelectedImage}
                        style={{ 
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                        }}
                    />
                ))}
            
                {/* Focus Guard to prevent Tab jumping to footer */}
                <div 
                    tabIndex={0} 
                    style={{ position: 'absolute', bottom: 0, width: '1px', height: '1px', opacity: 0 }}
                    onFocus={() => {
                        // Gently scroll slightly to hint user to scroll
                         if(window.scrollY < window.innerHeight * 1.5) { // Only scroll if not already scrolled
                             window.scrollBy({ top: 100, behavior: 'smooth' });
                         }
                    }}
                    aria-label="End of showcase. Scroll down to see more visuals."
                ></div>
            </div>

            {/* ------------------------------------------------------------------
                MOBILE SHOWCASE - Vertical Scroll with Horizontal Image Rows
               ------------------------------------------------------------------ */}
            <div className="mobile-showcase">
                {companies.map((company, index) => (
                    <motion.div 
                        key={index} 
                        className="mobile-company-section"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h2 className="mobile-company-title">{company.name}</h2>
                        
                        <div className="mobile-iphone-wrapper">
                            <img src={IPHONE_FRAME_IMG} alt="iPhone Frame" className="mobile-iphone-frame" />
                            <div className="mobile-iphone-screen">
                                <img src={company.iphoneImg} alt={`${company.name} Profile`} className="mobile-screen-img" />
                            </div>
                        </div>

                        <div className="mobile-images-scroll">
                            <div className="mobile-scroll-track">
                                {/* First Set */ }
                                {company.gridImages.map((imgSrc, imgIndex) => (
                                    <div 
                                        key={`set1-${imgIndex}`}
                                        className="mobile-image-item"
                                        onClick={() => setSelectedImage(imgSrc)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault(); 
                                                setSelectedImage(imgSrc);
                                            }
                                        }}
                                        aria-label={`View full size image ${imgIndex + 1} of ${company.name}`}
                                        data-cursor-button
                                    >
                                        <img src={imgSrc} alt={`${company.name} Post ${imgIndex + 1}`} />
                                        <div className="mobile-image-overlay">
                                            <span>View</span>
                                        </div>
                                    </div>
                                ))}

                                {/* Second Set (Duplicate for Loop) */}
                                {company.gridImages.map((imgSrc, imgIndex) => (
                                    <div 
                                        key={`set2-${imgIndex}`}
                                        className="mobile-image-item"
                                        onClick={() => setSelectedImage(imgSrc)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault(); 
                                                setSelectedImage(imgSrc);
                                            }
                                        }}
                                        aria-label={`View full size image ${imgIndex + 1} of ${company.name} (duplicate)`}
                                        data-cursor-button
                                    >
                                        <img src={imgSrc} alt={`${company.name} Post ${imgIndex + 1} Duplicate`} />
                                        <div className="mobile-image-overlay">
                                            <span>View</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Overlay */}
            {selectedImage && (
                <div 
                    className="lightbox-overlay" 
                    onClick={() => setSelectedImage(null)}
                    data-cursor-text="Close" 
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image Fullscreen View"
                >
                    <button 
                        className="lightbox-close-btn"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close Image"
                    >
                        <IoClose />
                    </button>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="Full Screen" className="lightbox-img" />
                    </div>
                </div>
            )}

            <Footer />

        </div>
    );
};

export default PhotoContent;
