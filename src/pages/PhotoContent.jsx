import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet-async';
import BackButton from '../components/BackButton';
import CompanyShowcase from '../components/CompanyShowcase';
import { 
    IPHONE_FRAME_IMG, IPHONE_WALLPAPER_IMG, BUTTERFLY_IMG, 
    PHOTO_CONTENT_STICKERS, COMPANIES_DATA, 
    ANIMATION_STICKERS_DATA, PHOTO_CONTENT_POSTS
} from '../utils/Constant';
import { IoArrowDown } from "react-icons/io5";
import './PhotoContent.css';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const PhotoContent = () => {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const iphoneRef = useRef(null);
    const showcaseContainerRef = useRef(null); 
    const showcaseRefs = useRef([]); 
    const companies = COMPANIES_DATA;
    const [selectedImage, setSelectedImage] = useState(null);

    
    useLayoutEffect(() => {
        let mm = gsap.matchMedia();
        const scope = containerRef; 
        
            gsap.set([".content-design-top-bar", ".hero-text-side span", ".iphone-frame", ".iphone-screen"], { autoAlpha: 0 }); // Target INNERS

        mm.add({
            isDesktop: "(min-width: 769px)",
            isMobile: "(max-width: 768px)",
        }, (context) => { 
            let { isDesktop, isMobile } = context.conditions;

            const introTl = gsap.timeline();

            introTl.fromTo(".content-design-top-bar", 
                { y: -100, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" }
            );


            
            if (isDesktop) {
                 // --- DESKTOP INTRO ---
                 introTl
                    .fromTo(".hero-text-side.left", { x: -200 }, { x: 0, duration: 1, ease: "power3.out" }, "0")
                    .fromTo(".hero-text-side.right", { x: 200 }, { x: 0, duration: 1, ease: "power3.out" }, "0")
                    .fromTo(iphoneRef.current, { y: 200 }, { y: 0, duration: 1.2, ease: "back.out(1.2)" }, "0")
                    .to([".hero-text-side span", ".iphone-frame", ".iphone-screen", ".scroll-indicator-wrapper"], { autoAlpha: 1, duration: 1 }, "0");

                 // --- DESKTOP SCROLL SEQUENCE ---
                 const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top", 
                        end: "+=150%", 
                        pin: true,
                        scrub: 0.5, 
                    }
                });

                tl.fromTo(".hero-text-side.left", 
                    { x: 0, opacity: 1 },
                    { x: -400, opacity: 0, duration: 1, immediateRender: false }, 0)
                  .fromTo(".hero-text-side.right", 
                    { x: 0, opacity: 1 },
                    { x: 400, opacity: 0, duration: 1, immediateRender: false }, 0)
                  .fromTo(".screen-inner-text h3", 
                    { y: 0, opacity: 1 },
                    { y: -200, opacity: 0, duration: 2, immediateRender: false }, 0)
                  .fromTo(".screen-inner-text p", 
                    { y: 0, opacity: 1 },
                    { y: -200, opacity: 0, duration: 2, immediateRender: false }, 0)
                  .fromTo(iphoneRef.current, 
                      { rotation: 0, scale: 1 },
                      { rotation: 90, scale: 14, duration: 2, ease: "power2.inOut", immediateRender: false }, 0)
                  .fromTo(".details-overlay", 
                      { rotation: -100, scale: 0, opacity: 0 },
                      { rotation: 0, scale: 1, opacity: 1, duration: 2, ease: "power2.out" }, 0.5) 
                  .to({}, { duration: 0.5 })
                  .to(".scroll-indicator-wrapper", { y: 200, duration: 1 }, 0);

            } else {
                 // --- MOBILE: SKIP ANIMATION ---
                 // Hide iPhone and Hero Text
                 gsap.set([".hero-text-side", ".iphone-wrapper", ".scroll-indicator-wrapper"], { display: "none" });
                 
                 // Show Overlay Immediately (with a nice fade in)
                 gsap.set(".details-overlay", { rotation: 0, scale: 1, opacity: 0 }); // Start invisible for fade
                 
                 introTl.to(".details-overlay", { 
                     opacity: 1, 
                     duration: 1, 
                     ease: "power2.out" 
                 });
            }



            
            const albumTl = gsap.timeline({
                scrollTrigger: {
                    trigger: showcaseContainerRef.current,
                    start: "top top",
                    end: "+=800%", // Adjust scroll length
                    pin: true,
                    scrub: 1,
                    snap: 1 / (companies.length - 1), // Snap to each card
                }
            });

            // Add initial pause (hold first card)
            albumTl.to({}, { duration: 0.5 });

            // Initial State: All panels hidden/positioned down except the first one?
            // Actually, let's stack them. 
            // First one is visible by default (CSS opacity: 0 needs override).
            
            showcaseRefs.current.forEach((el, i) => {
                if (el) {
                    gsap.set(el, { 
                        zIndex: i + 1,
                        opacity: i === 0 ? 1 : 0, // First visible, others start hidden
                        yPercent: i === 0 ? 0 : 100, // Others start offscreen down
                        scale: i === 0 ? 1 : 0.9,
                        visibility: 'visible'
                    });
                }
            });

            // Animation: Slide up next card
            showcaseRefs.current.forEach((el, i) => {
                if (i > 0) {
                    const prevEl = showcaseRefs.current[i - 1];
                    
                    // Animate Current Card In
                    albumTl.to(el, {
                        yPercent: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: "power2.out"
                    });

                    // Update Previous Card (Scale down slightly for depth)
                    albumTl.to(prevEl, {
                        scale: 0.9,
                        filter: "blur(5px)", // Add blur for focus effect
                        duration: 1
                    }, "<"); // Run at same time
                }
            });

            
            // ----------------------------------------------------
            // CUTE STICKER ANIMATION
            // ----------------------------------------------------
            
            const stickers = ANIMATION_STICKERS_DATA;

            stickers.forEach((s, i) => {
                const wrapperSelector = `.sticker-wrapper-${i}`;
                const innerSelector = `.sticker-inner-${i}`;
                
                // 1. Initial State
                // Wrapper handles Position (Scroll) & Entrance Scale
                gsap.set(wrapperSelector, { 
                    scale: 0, 
                    autoAlpha: 0,
                    x: 0,
                    y: 0
                });
                
                // Inner handles Rotation (Idle)
                gsap.set(innerSelector, {
                    rotation: -45,
                    y: 0 
                });

                // 2. Entrance (Pop in Wrapper)
                introTl.to(wrapperSelector, { 
                    scale: 1, 
                    autoAlpha: 1, 
                    duration: 1.5, 
                    ease: "elastic.out(1, 0.5)",
                }, 0.5 + (i * 0.2)); // Stagger delay

                // 3. Idle Float (Inner Element) - Jitter Fix: Separate Transform Context
                gsap.to(innerSelector, {
                    y: -20, // Float up relative to wrapper
                    rotation: 10, // Slight wobble relative to wrapper
                    duration: 2 + (i * 0.2), 
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.5
                });

                // 4. Scroll Wandering (Wrapper Element)
                // Moves the entire container across the screen, avoiding conflict with Idle y-float
                gsap.to(wrapperSelector, {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1.5,
                    },
                    x: () => isDesktop ? s.xMove : s.xMove * 0.3, 
                    y: () => isDesktop ? s.yMove : s.yMove * 0.5,
                    ease: "none"
                });
            });

        }, scope); 

        return () => mm.revert(); // Revert matchMedia
    }, []);

    // Helper to collect refs
    const addToRefs = (el) => {
        if (el && !showcaseRefs.current.includes(el)) {
            showcaseRefs.current.push(el);
        }
    };

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
                          This showcases <span className="highlight-text highlight-yellow">my photo content creations</span>, my approach to <span className="highlight-text highlight-pink">visual storytelling</span> through thoughtfully designed photo content paired with <span className="highlight-text highlight-blue">purpose-driven</span> captions. From <span className="highlight-text highlight-green">immigration consultancies</span>, <span className="highlight-text highlight-orange">cultural</span> or <span className="highlight-text highlight-yellow">travel brands</span>, each piece is created to not just look good but to <span className="highlight-text highlight-pink">communicate clearly, build trust, and drive action</span>. <br/> I focus on designing content that aligns with a <span className="highlight-text highlight-blue">brand’s voice, audience mindset, and business goals</span>. Whether it’s simplifying complex immigration information or capturing the aspirational feel of travel, my content is crafted to be <span className="highlight-text highlight-green">scroll-stopping, informative, and conversion-friendly</span>.<br /> Every visual here is backed by strategic captioning because good content doesn’t just attract attention, it guides the audience toward <span className="highlight-text highlight-orange">meaningful engagement</span>                     </p>
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
                PINNED COMPANY SHOWCASE CONTAINER
                - Height: 100vh (pinned)
                - Background Color animates here
                - Panels stack inside absolute
               ------------------------------------------------------------------ */}
            <div 
                ref={showcaseContainerRef} 
                className="showcase-pinned-wrapper"
                style={{ 
                    // Main Scene Styling
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
            </div>

            {/* Lightbox Overlay */}
            {selectedImage && (
                <div 
                    className="lightbox-overlay" 
                    onClick={() => setSelectedImage(null)}
                    data-cursor-text="Close" // Tells custom cursor to show "Close" text
                >
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
