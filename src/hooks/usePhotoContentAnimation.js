import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION_STICKERS_DATA } from '../utils/Constant';

gsap.registerPlugin(ScrollTrigger);

const usePhotoContentAnimation = (containerRef, heroRef, iphoneRef, showcaseContainerRef, showcaseRefs, companies) => {
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

                 // --- DESKTOP ALBUM PINNED SEQUENCE ---
                 const albumTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: showcaseContainerRef.current,
                        start: "top top",
                        end: "+=300%",
                        pin: true,
                        scrub: 1.5,
                        snap: 1 / (companies.length - 1),
                    }
                });

                // Add initial pause (hold first card)
                albumTl.to({}, { duration: 2 });

                // Initial State: First card visible at center, others start from right (scaled down)
                showcaseRefs.current.forEach((el, i) => {
                    if (el) {
                        gsap.set(el, { 
                            zIndex: companies.length - i, // Reverse z-index so incoming is on top
                            autoAlpha: i === 0 ? 1 : 0, // autoAlpha handles visibility + opacity
                            xPercent: i === 0 ? 0 : 120,
                            scale: i === 0 ? 1 : 0.8,
                            filter: i === 0 ? "blur(0px)" : "blur(5px)"
                        });
                    }
                });

                // Animation: Smooth overlapping transitions
                showcaseRefs.current.forEach((el, i) => {
                    if (i > 0) {
                        const prevEl = showcaseRefs.current[i - 1];
                        
                        // Exit Previous Card: Slide LEFT and SHRINK (starts first)
                        albumTl.to(prevEl, {
                            xPercent: -120,
                            scale: 0.8,
                            autoAlpha: 0, // Fades out AND sets visibility: hidden
                            filter: "blur(10px)",
                            duration: 1.5,
                            ease: "power2.in"
                        }, "+=0");

                        // Enter Current Card: Slide from RIGHT and GROW (starts 0.3s after exit begins)
                        albumTl.to(el, {
                            xPercent: 0,
                            autoAlpha: 1, // Fades in AND sets visibility: visible
                            scale: 1,
                            filter: "blur(0px)",
                            duration: 1.5,
                            ease: "power2.out"
                        }, "-=1.2"); // Overlap: starts 0.3s after exit begins

                        // HOLD the card before next transition
                        albumTl.to({}, { duration: 1.5 });
                    }
                });

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
    }, [containerRef, heroRef, iphoneRef, showcaseContainerRef, showcaseRefs, companies]);
};

export default usePhotoContentAnimation;
