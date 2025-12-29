import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { Helmet } from 'react-helmet-async';

import Navbar from '../components/Navbar';
import avatarAnimation from '../assets/Avatar-woman-short-hair.lottie';
import CompanyShowcase from '../components/CompanyShowcase';

const iphoneMockup = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023689/iphone-mockup-newest_aencbp.png";
const wallpaperImg = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023660/iphonge-bg_dffgqh.png"; 
const butterflyImg = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023764/butterfly_dbzb2t.png";

const sticker1 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023503/sticker1-removebg-preview_jsmgiz.png";
const sticker2 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023504/sticker2-removebg-preview_aeola2.png";
const sticker3 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023504/sticker3-removebg-preview_orhtod.png";
const sticker4 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023505/sticker4-removebg-preview_mwgacr.png";
const sticker5 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023512/sticker5-removebg-preview_omjj2j.png";


const instaPage1 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023606/InstaPage1_isuiy7.jpg";
const instaPage2 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023544/InstaPage2_vb147e.jpg";
const instaPage3 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023545/InstaPage3_epv8mb.jpg";


const firstPost = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023661/second_s9oxup.jpg";
const secondPost = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023406/image4_q2fpn1.jpg";
const thirdPost = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023370/image4_gccchz.jpg";



const dfImg1 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023444/image1_iylx9m.jpg"
const dfImg2 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023444/image2_bgkpkm.jpg"
const dfImg3 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023445/image3_lfhexq.jpg"
const dfImg4 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023446/image4_q7nohe.jpg"

const chaloImg1 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023405/image1_pl1a52.jpg"
const chaloImg2 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023405/image2_hxnbef.jpg"
const chaloImg3 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023406/image3_shc2lv.jpg"
const chaloImg4 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023406/image4_q2fpn1.jpg"

const phdcciImg1 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023370/image1_akwitg.jpg"
const phdcciImg2 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023370/image2_u0jsta.jpg"
const phdcciImg3 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023370/image3_co3bny.jpg"
const phdcciImg4 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1767023370/image4_gccchz.jpg"



import './PhotoContent.css';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const PhotoContent = () => {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const iphoneRef = useRef(null);
    const showcaseContainerRef = useRef(null);
    const showcaseRefs = useRef([]); // Array to hold references to each showcase panel
    
    // Data for Company Showcases
    const companies = [
        {
            name: "@phdcci",
            iphoneImg: instaPage1,
            gridImages: [phdcciImg1, phdcciImg2, phdcciImg3, phdcciImg4], // Reusing for demo
            bgColor: "#fff0f5" // Lavender Blush
        },
        {
            name: "@chalotravellers",
            iphoneImg: instaPage2,
            gridImages: [chaloImg1, chaloImg2, chaloImg3, chaloImg4],
            bgColor: "#f0f8ff" // Alice Blue
        },
        {
            name: "@dfimmigrationto",
            iphoneImg: instaPage3,
            gridImages: [dfImg1, dfImg2, dfImg3, dfImg4],
            bgColor: "#f5f5dc" // Beige
        }
    ];
    
    useLayoutEffect(() => {
        let mm = gsap.matchMedia();
        const scope = containerRef; // Scope for selector text

        mm.add({
            isDesktop: "(min-width: 769px)",
            isMobile: "(max-width: 768px)",
        }, (context) => { // Context provides conditions
            let { isDesktop, isMobile } = context.conditions;

            // Initial Entrance Animation
            const introTl = gsap.timeline();
            
            // Navbar always animates same
            introTl.fromTo(".content-design-top-bar", 
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            );

            // Intro Text & iPhone - Responsive
            if (isDesktop) {
                 introTl
                    .fromTo(".hero-text-side.left", { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "0")
                    .fromTo(".hero-text-side.right", { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "0")
                    .fromTo(iphoneRef.current, { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "back.out(1.2)" }, "0");
            } else {
                // Mobile Intro: Fade in or slide vertically
                 introTl
                    .fromTo(".hero-text-side.left", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "0")
                    .fromTo(".hero-text-side.right", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "0")
                    .fromTo(iphoneRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.2)" }, "0");
            }

            // Scroll Animation (Hero Section)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top", 
                    end: "+=150%", 
                    pin: true,
                    scrub: 0.5, 
                }
            });

            // Scroll Text Animations
            if (isDesktop) {
                // Horizontal Exit
                tl.fromTo(".hero-text-side.left", 
                    { x: 0, opacity: 1 }, 
                    { x: -400, opacity: 0, duration: 1, immediateRender: false }, 0)
                  .fromTo(".hero-text-side.right", 
                    { x: 0, opacity: 1 }, 
                    { x: 400, opacity: 0, duration: 1, immediateRender: false }, 0);
            } else {
                // Vertical Exit (Top goes Up, Bottom goes Down)
                tl.fromTo(".hero-text-side.left", 
                    { y: 0, opacity: 1 }, 
                    { y: -150, opacity: 0, duration: 1, immediateRender: false }, 0)
                  .fromTo(".hero-text-side.right", 
                    { y: 0, opacity: 1 }, 
                    { y: -150, opacity: 0, duration: 1, immediateRender: false }, 0);
            }

            // Shared Scroll Animations
            tl.fromTo(".screen-inner-text h3", 
                { y: 0, opacity: 1 },
                { y: -200, opacity: 0, duration: 2, immediateRender: false }, 0
              )
              .fromTo(".screen-inner-text p", 
                { y: 0, opacity: 1 },
                { y: -200, opacity: 0, duration: 2, immediateRender: false }, 0
              )
              .fromTo(iphoneRef.current, 
                  { rotation: 0, scale: 1 },
                  { 
                      rotation: 90, 
                      scale: isMobile ? 8 : 14, // Smaller scale on mobile
                      duration: 2,
                      ease: "power2.inOut",
                      immediateRender: false
                  }, 0)
              
              .fromTo(".details-overlay", 
                  { rotation: -100, scale: 0, opacity: 0 },
                  { rotation: 0, scale: 1, opacity: 1, duration: 2, ease: "power2.out" }, 
              0.5) 
              
              .to({}, { duration: 0.5 });



            // ----------------------------------------------------
            // PINNED COMPANY SHOWCASE SECTION
            // ----------------------------------------------------
            const showcaseTl = gsap.timeline({
                scrollTrigger: {
                    trigger: showcaseContainerRef.current,
                    start: "top top",
                    end: "+=300%", // 300vh scroll distance for 3 slides
                    pin: true,
                    scrub: 1, // Smooth scrubbing
                    snap: 1 / 2, // Snap to each of the 3 slides (0, 0.5, 1)
                }
            });

            // Make sure first slide is visible initially
            // AND ensure its children are visible (since CSS hides them)
            if (showcaseRefs.current[0]) {
                gsap.set(showcaseRefs.current[0], { opacity: 1, zIndex: 1 });
                gsap.set(showcaseRefs.current[0].querySelector('.showcase-title'), { opacity: 1, y: 0 });
                gsap.set(showcaseRefs.current[0].querySelector('.showcase-iphone-wrapper'), { opacity: 1, y: 0 });
                gsap.set(showcaseRefs.current[0].querySelectorAll('.showcase-grid-item'), { opacity: 1, y: 0 });
            }
            
            if (showcaseRefs.current[1]) gsap.set(showcaseRefs.current[1], { opacity: 0, zIndex: 2 });
            if (showcaseRefs.current[2]) gsap.set(showcaseRefs.current[2], { opacity: 0, zIndex: 3 });

            // Slide 1 to Slide 2
            if (showcaseRefs.current[1]) {
                showcaseTl
                .to(showcaseContainerRef.current, { backgroundColor: companies[1].bgColor, duration: 1 })
                .fromTo(showcaseRefs.current[1], 
                    { opacity: 0, y: 100 }, 
                    { opacity: 1, y: 0, duration: 1 }, 
                "<")
                .to(showcaseRefs.current[0], { opacity: 0, scale: 0.95, duration: 1 }, "<") // Fade out prev
                
                // Animate elements inside Slide 2
                .fromTo(showcaseRefs.current[1].querySelector('.showcase-title'), { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.5")
                .fromTo(showcaseRefs.current[1].querySelector('.showcase-iphone-wrapper'), { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "<")
                .fromTo(showcaseRefs.current[1].querySelectorAll('.showcase-grid-item'), 
                    { y: 50, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 
                "<");
            }


            // Slide 2 to Slide 3
            if (showcaseRefs.current[2]) {
                showcaseTl
                .addLabel("slide3")
                .to(showcaseContainerRef.current, { backgroundColor: companies[2].bgColor, duration: 1 })
                .fromTo(showcaseRefs.current[2], 
                    { opacity: 0, y: 100 }, 
                    { opacity: 1, y: 0, duration: 1 }, 
                "<")
                .to(showcaseRefs.current[1], { opacity: 0, scale: 0.95, duration: 1 }, "<") // Fade out prev

                // Animate elements inside Slide 3
                .fromTo(showcaseRefs.current[2].querySelector('.showcase-title'), { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.5")
                .fromTo(showcaseRefs.current[2].querySelector('.showcase-iphone-wrapper'), { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "<")
                .fromTo(showcaseRefs.current[2].querySelectorAll('.showcase-grid-item'), 
                    { y: 50, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 
                "<");
            }
            
            // Clean up ScrollTrigger related to this is automatic via ctx.revert()
            
            // ----------------------------------------------------
            // CUTE STICKER ANIMATION
            // ----------------------------------------------------
            
            const stickers = [
                 // ALL STICKERS: Start IN -> Move OUT (Disperse)
                 { id: 0, xMove: 50, yMove: 900, rot: 360 },   // Top Left -> Out Left/Down//cat
                 { id: 1, xMove: 200, yMove: 1000, rot: -180 },   // Top Right -> Out Right/Down//flower
                 { id: 2, xMove: -400, yMove: 300, rot: 90 },    // Mid Right -> Out Right/Up cat goggles
                 { id: 3, xMove: 300, yMove: -800, rot: -45 },   // Mid Left -> Out Left/Down flower plant
                 { id: 4, xMove: -200, yMove: 300, rot: 200 }     // Center -> Out Up //pea
            ];

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
                <title>Photo Content Portfolio | Mayuri Saitav - Visual Storyteller</title>
                <meta name="description" content="Browse the visual portfolio of Mayuri Saitav. High-quality photo content creation for social media, product photography, and lifestyle brands." />
            </Helmet>
            
            {/* ... Top Bar & Hero Section remain same ... */}
            
            {/* Top Bar */}
             <div className="content-design-top-bar">
                 <Link to="/" aria-label="Home">
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
            </div>

            {/* Cute Animated Stickers */}
            {[
                // ALL Start Visible -> Move Out
                { src: sticker1, top: '15%', left: '5%' },   // Top Left
                { src: sticker2, top: '15%', left: '75%' },  // Top Right
                { src: sticker3, top: '58%', left: '10%' },  // Mid Left
                { src: sticker4, top: '60%', left: '80%' },  // Mid Right
                { src: sticker5, top: '75%', left: '60%' }   // Bottom Center
            ].map((s, i) => (
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
                
                <h1 className="hero-text-side left">Visual</h1>
                
                <div className="iphone-wrapper" ref={iphoneRef}>
                    {/* Frame */}
                    <img src={iphoneMockup} alt="iPhone Frame" className="iphone-frame" />
                    
                    {/* Screen content (absolute inside frame) */}
                    <div className="iphone-screen">
                        <img src={wallpaperImg} alt="Wallpaper" className="screen-bg" />
                       <div className="screen-inner-text">
                            <h3>Stories<br/></h3>
                             <p >That Every  Post Speaks.</p>
                        </div>
                    </div>
                </div>

                <h1 className="hero-text-side right">Stories</h1>
                
                {/* Overlay Content that appears when zoomed in */}
                <div className="details-overlay">
                    <div className="overlay-content">
                        <div className="header-wrapper" style={{position: 'relative', display: 'inline-block'}}>
                             <img src={butterflyImg} alt="Butterfly" className="butterfly-decoration" />
                             <h2>Explore the Gallery</h2>
                        </div>
                        <p>
                          A selection of high-impact visuals created for company social media channels, highlighting brand consistency, audience engagement, and platform-ready creativity.
                        </p>
                        {/* Placeholder for further components */}
                        <div className="grid-placeholder">
                             <div className="grid-box"><img src={firstPost} alt="Content Created 1" /></div>
                             <div className="grid-box"><img src={secondPost} alt="Content Created 2" /></div>
                             <div className="grid-box"><img src={thirdPost} alt="Content Created 3" /></div>
                        </div>
                    </div>
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
                    width: '100%', 
                    height: '100vh', 
                    position: 'relative', 
                    backgroundColor: companies[0].bgColor, // Start with first color
                    overflow: 'hidden',
                // marginTop: '50vh' // Removed to allow natural scroll-in
                }}
            >
                {companies.map((company, index) => (
                    <CompanyShowcase 
                        key={index}
                        ref={addToRefs}
                        companyName={company.name}
                        iphoneScreenImg={company.iphoneImg}
                        gridImages={company.gridImages}
                    />
                ))}
            </div>

            <Footer />

        </div>
    );
};

export default PhotoContent;
