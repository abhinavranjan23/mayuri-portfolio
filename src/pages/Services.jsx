import React, { useLayoutEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const SERVICE_ITEMS = [
    { title: "Social Media Management", icon: "📱", color: "pill-blue", cardColor: "card-blue", desc: "End-to-end management of your social presence, from scheduling to community engagement." },
    { title: "Content Creation", icon: "🎨", color: "pill-pink", cardColor: "card-pink", desc: "Eye-catching visuals, reels, and posts designed to stop the scroll and tell your story." },
    { title: "Facebook & Instagram Ads", icon: "📈", color: "pill-yellow", cardColor: "card-yellow", desc: "Targeted ad campaigns that drive traffic, leads, and measurable ROI." },
    { title: "Google My Business", icon: "📍", color: "pill-green", cardColor: "card-green", desc: "Optimizing your local presence to ensure customers find you first." },
    { title: "Account Setup", icon: "⚙️", color: "pill-purple", cardColor: "card-purple", desc: "Professional setup of profiles with SEO-optimized bios and highlights." },
    { title: "Content Writing", icon: "✍️", color: "pill-orange", cardColor: "card-orange", desc: "Compelling captions, blogs, and copy that speak your brand's voice." }
];


const WHY_CHOOSE_US_DATA = [
    { title: "Experienced Team", desc: "Over 3 years of experience in helping brands grow online." },
    { title: "Tailored Strategies", desc: "Every business is unique, so is our approach." },
    { title: "Data-Driven Decisions", desc: "We focus on results, not just vanity metrics." },
    { title: "Transparent Communication", desc: "Regular updates and clear reports." },
    { title: "Affordable Packages", desc: "Quality marketing that fits your budget." }
];

const HOW_WE_WORK_DATA = [
    { title: "Discovery & Consultation", desc: "We understand your business, goals, and target audience." },
    { title: "Strategy Planning", desc: "A personalized content and ad plan designed for your brand." },
    { title: "Execution", desc: "Content creation, posting, and ad campaign setup." },
    { title: "Monitoring", desc: "We track performance metrics and audience insights." },
    { title: "Optimization", desc: "Data-based adjustments to improve results continuously." },
    { title: "Reporting", desc: "Monthly performance reports with clear insights and next steps." }
];

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
                    // --- DESKTOP: CHAOS GRID ---
                    // 1. Set Initial "Chaotic" State
                    gsap.set(cards, {
                        autoAlpha: 0,
                        scale: 0.3, 
                        x: (i) => (i % 2 === 0 ? -100 : 100), 
                        y: (i) => Math.random() * 100 - 50,    
                        rotation: () => Math.random() * 20 - 10 
                    });

                    const gridTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: ".services-grid-container",
                            start: "top 15%", 
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
                        duration: 1,
                        stagger: 0.2, 
                        ease: "power3.out"
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
                        rotationX: 20, // Tilted back initially
                        transformOrigin: "center bottom", 
                        autoAlpha: 1,
                        zIndex: (i) => i + 1,
                        boxShadow: "0px 20px 40px rgba(0,0,0,0.2)" // Deeper shadow
                    });

                    const mobileTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: ".services-grid-container",
                            start: "top 15%",
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
                    start: "top top",
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

    // Create duplicated list for seamless marquee
    const MARQUEE_LIST = [...SERVICE_ITEMS, ...SERVICE_ITEMS, ...SERVICE_ITEMS]; 

    return (
        <div className="services-page" ref={pageRef}>
            <Helmet>
                <title>Services | Mayuri Saitav</title>
                <meta name="description" content="Social Media Management, Content Creation, Ads, and more." />
            </Helmet>

            <BackButton lightMode={true}/>

            {/* Background Shapes */}
            <div className="shape-1"></div>
            <div className="shape-2"></div>
            <div className="shape-3"></div>

            {/* Header */}
            <div className="services-header">
                <h1 className="services-title">What I Bring to the Table</h1>
                <p className="services-subtitle">
                    Transforming ideas into digital reality. I help brands grow with strategic content and management.
                </p>
            </div>

            {/* Marquee Section */}
            <div className="marquee-container">
                {/* Row 1: Left to Right */}
                <div className="marquee-track animate-left">
                    {MARQUEE_LIST.map((item, i) => (
                        <div key={`l-${i}`} className={`marquee-item ${item.color}`}>
                            {item.title} {item.icon}
                        </div>
                    ))}
                </div>
                
                {/* Row 2: Right to Left */}
                <div className="marquee-track animate-right">
                    {MARQUEE_LIST.map((item, i) => (
                        <div key={`r-${i}`} className={`marquee-item ${item.color}`}>
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

            {/* Why Choose Us - Pinned Horizontal Scroll */}
            <section className="why-choose-section" ref={whySectionRef}>
                <div className="why-header">
                    <h2 className="services-title">Why Choose Us?</h2>
                    <p className="services-subtitle">So Many Choices, and a little time? Here's why.</p>
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
                <h2 className="services-title" style={{textAlign:'center', marginBottom: '3rem'}}>How We Work</h2>
                
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

