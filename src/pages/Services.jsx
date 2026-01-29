import  { useLayoutEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import './Services.css';
import {SERVICE_ITEMS, WHY_CHOOSE_US_DATA, HOW_WE_WORK_DATA, SERVICES_PAGE_DATA} from '../utils/Constant';
gsap.registerPlugin(ScrollTrigger);

// Create duplicated list for seamless marquee
const MARQUEE_LIST = [...SERVICE_ITEMS, ...SERVICE_ITEMS, ...SERVICE_ITEMS];


const Services = () => {
    const pageRef = useRef(null);
    const whySectionRef = useRef(null);
    const whyTrackRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // Animate Header
            gsap.from(".services-header", {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            const cards = gsap.utils.toArray(".service-card");
            
            let mm = gsap.matchMedia();

            mm.add({
                isDesktop: "(min-width: 769px)",
                isMobile: "(max-width: 768px)",
            }, (context) => {
                let { isDesktop, isMobile } = context.conditions;

                if (isDesktop) {
                  
                    gsap.set(cards, {
                        autoAlpha: 0,
                        scale: 0.1, 
                        x: (i) => Math.random() * 2000 - 1000, 
                        y: (i) => Math.random() * 2000 - 1000,    
                        rotation: () => Math.random() * 360 - 180 
                    });

                    const gridTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: ".services-grid-container",
                            start: "top 10%", 
                            end: "+=800", 
                            pin: true,
                            scrub: 1, 
                            anticipatePin: 1,
                        }
                    });

                    gridTl.to(cards, {
                        autoAlpha: 1,
                        scale: 1,
                        x: 0,
                        y: 0,
                        rotation: 0,
                        duration: 1.5,
                        stagger: 0.1, 
                        ease: "elastic.out(1, 0.75)"
                    });

                } else if (isMobile) {
                    // --- MOBILE: 3D DEPTH STACK ---
                    gsap.set(".services-grid", {
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gridTemplateRows: "1fr",
                        placeItems: "center",
                        height: "60vh",
                        perspective: 1000 // Enable 3D space
                    });
                    
                    gsap.set(cards, {
                        gridArea: "1 / 1",
                        position: "relative", 
                        width: "100%",
                        height: "auto",
                        maxWidth: "350px", 
                        y: window.innerHeight + 100, // Start further down
                        z: 0,
                        scale: 0.8,
                        rotationX: 5, // Reduced tilt for smoother feel
                        transformOrigin: "center bottom", 
                        autoAlpha: 1,
                        zIndex: (i) => i + 1,
                        boxShadow: "0px 20px 40px rgba(0,0,0,0.2)" // Deeper shadow
                    });

                    const mobileTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: ".services-pinned-wrapper",
                            start: "top top",
                            end: "+=2500", // Longer scroll for distinct steps
                            pin: true,
                            scrub: 1,
                            anticipatePin: 1
                        }
                    });

                    cards.forEach((card, i) => {
                        // Label for this step
                        const label = `card-${i}`;
                        mobileTl.addLabel(label);

                        // 1. Current card comes in
                        mobileTl.to(card, {
                            y: 0,
                            scale: 1,
                            rotationX: 0,
                            duration: 1,
                            ease: "power3.out"
                        }, label);

                        // 2. If there's a previous card, push it back AS this one enters
                        if (i > 0) {
                             const prevCard = cards[i - 1];
                             mobileTl.to(prevCard, {
                                scale: 0.9 - (i * 0.05), // Progressive scaling
                                y: -40 - (i * 5),
                                z: -100,
                                brightness: 0.6, // Simulate shadow
                                duration: 1,
                                ease: "power3.out"
                             }, label); // SYNC with current card entry
                        }
                    });
                     // Add a final pause to let user view last card
                    mobileTl.to({}, { duration: 0.5 });
                }
            });

            // 1. Horizontal Scroll for "Why Choose Us"
            // Use functional values for responsiveness
            const getScrollAmount = () => {
                const whyTrack = whyTrackRef.current;
                if (!whyTrack) return 0;
                const totalWidth = whyTrack.scrollWidth;
                const windowWidth = window.innerWidth;
                // Add extra buffer (300px) to ensure last card clears fully
                return -(totalWidth - windowWidth + 100);
            };

            const tween = gsap.to(whyTrackRef.current, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: whySectionRef.current,
                    start: "top -10%",
                    end: () => `+=${Math.abs(getScrollAmount())}`, // Match scroll distance exactly
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            // 2. Animate "How We Work" Steps
            const steps = gsap.utils.toArray('.process-step');
            steps.forEach((step, i) => {
                gsap.fromTo(step, 
                    { opacity: 0, x: -50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: step,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });



            // Background Parallax
            gsap.to(".shape-1", {
                y: 300,
                scrollTrigger: {
                    trigger: pageRef.current,
                    start: "top top",
                    end: "bottom center",
                    scrub: 1
                }
            });
            gsap.to(".shape-2", {
                y: -200,
                scrollTrigger: {
                    trigger: pageRef.current,
                    start: "top top",
                    end: "bottom center",
                    scrub: 1.5
                }
            });
            gsap.to(".shape-3", {
                y: 100,
                rotation: 360,
                scrollTrigger: {
                    trigger: pageRef.current,
                    start: "top top",
                    end: "bottom center",
                    scrub: 2
                }
            });

        }, pageRef);
        return () => ctx.revert();
    }, []);

 

    return (
        <div className="services-page" ref={pageRef}>
            <Helmet>
                <title>Social Media Services | Management, Content, & Ads</title>
                <meta name="description" content="Explore professional services by Mayuri Saitav: Social Media Management, Content Creation, Facebook Ads, Google My Business, and Account Setup." />
            </Helmet>

            <BackButton lightMode={true}/>

            {/* Background Shapes */}
            <div className="shape-1"></div>
            <div className="shape-2"></div>
            <div className="shape-3"></div>

            {/* Header */}
            <div className="services-header">
                <h1 className="services-title">{SERVICES_PAGE_DATA.serviceTitle}</h1>
                <p className="services-subtitle">
                    {SERVICES_PAGE_DATA.serviceSubTitle}
                </p>
            </div>

            {/* Combined Wrapper for Pinning */}
            <div className="services-pinned-wrapper">
                {/* Marquee Section */}
                <div className="marquee-container">
                {/* Row 1: Left to Right */}
                <div className="marquee-track animate-left">
                    {MARQUEE_LIST.map((item, i) => (
                        <div key={`l-${i}`} className={`service-marquee-item ${item.color}`}>
                            {item.title} {item.icon}
                        </div>
                    ))}
                </div>
                
                {/* Row 2: Right to Left */}
                <div className="marquee-track animate-right">
                    {MARQUEE_LIST.map((item, i) => (
                        <div key={`r-${i}`} className={`service-marquee-item ${item.color}`}>
                            {item.title} {item.icon}
                        </div>
                    ))}
                </div>
            </div>

            {/* Detailed Services Grid */}
            <div className="services-grid-container">
                <div className="services-grid">
                    {SERVICE_ITEMS.map((service, index) => (
                        <div key={index} className={`service-card ${service.cardColor}`}>
                            <div className="service-icon">{service.icon}</div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            </div>

            {/* Why Choose Us - Pinned Horizontal Scroll */}
            <section className="why-choose-section" ref={whySectionRef}>
                <div className="why-header">
                    <h2 className="services-title">{SERVICES_PAGE_DATA.whyChooseTitle}</h2>
                    <p className="services-subtitle">{SERVICES_PAGE_DATA.whyChooseSubTitle}</p>
                </div>
                
                <div className="why-track-wrapper">
                    <div className="why-track" ref={whyTrackRef}>
                        {WHY_CHOOSE_US_DATA.map((item, i) => (
                            <div key={i} className="why-card">
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* How We Work - Vertical Process */}
             <section className="process-section">
                <h2 className="services-title" style={{textAlign:'center', marginBottom: '3rem'}}>{SERVICES_PAGE_DATA.howWeWorkTitle}</h2>
                
                {HOW_WE_WORK_DATA.map((step, i) => (
                    <div key={i} className={`process-step step-${i+1}`}>
                        <div className="process-number">{i + 1}</div>
                        <div className="process-content">
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                    </div>
                ))}
             </section>

            <Footer />
        </div>
    );
};

export default Services;

