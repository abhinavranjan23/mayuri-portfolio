import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WanderingMinds.css';


gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    id: 1,
    title: "Social Media Creator",
    subtitle: "I Create, Post, Repeat.",
    oneLiner: "Turning everyday moments into reels, vlogs, and stories that feel real not rehearsed.",
    color: "#FFD1DC", // Pastel Pink
    emoji: "📱",
    image: "https://res.cloudinary.com/dnt0xlngl/image/upload/v1766458313/social2_vzaorb.png"
  },
  {
    id: 2,
    title: "Poems & Quotes",
    subtitle: "Words When My Mind Gets Loud.",
    oneLiner: "I write poems and quotes when thoughts need a place to breathe.",
    color: "#E0F7FA", // Pastel Cyan
    emoji: "✍️",
    image: "https://res.cloudinary.com/dnt0xlngl/image/upload/v1766458314/writing_ovcuqj.jpg"
  },
  {
    id: 3,
    title: "Travel & Explore",
    subtitle: "Always Somewhere Else.",
    oneLiner: "Exploring new places, new streets, and new versions of myself.",
    color: "#FFF9C4", // Pastel Yellow
    emoji: "✈️",
    image: "https://res.cloudinary.com/dnt0xlngl/image/upload/v1766458313/travel_mgnfgi.jpg"
  },
  {
    id: 4,
    title: "Skincare & Self-Care",
    subtitle: "Skincare Is My Therapy.",
    oneLiner: "Testing products, routines, and rituals because glowing skin is a lifestyle.",
    color: "#E1BEE7", // Pastel Purple
    emoji: "💅",
    image: "https://res.cloudinary.com/dnt0xlngl/image/upload/v1766458313/skincare_fxeczg.jpg"
  },
  {
    id: 5,
    title: "Friends & Family",
    subtitle: "My Favorite People, Always.",
    oneLiner: "Collecting laughs, late nights, and memories with the people who feel like home.",
    color: "#FFCCBC", // Pastel Orange
    emoji: "🫶",
    image: "https://res.cloudinary.com/dnt0xlngl/image/upload/v1766458314/friends_yy29hs.jpg"
  },
  {
    id: 6,
    title: "Foodie",
    subtitle: "Powered by Good Food.",
    oneLiner: "From street snacks to café hopping food is always the plan.",
    color: "#C8E6C9", // Pastel Green
    emoji: "🍔",
    image: "https://res.cloudinary.com/dnt0xlngl/image/upload/v1766458313/foodie_rxvwtg.jpg"
  }
];

const WanderingMinds = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray(".wander-card");
            const stackHeight = window.innerHeight ; // Height of the stacking area roughly
            
            // Initial setup: All cards positioned down off-screen except maybe the first one?
            // User wants stacking effect. Let's have them all start essentially "stacked" visually but off screeen 
            // OR have them come in one by one.
            // Let's go with: Cards start off-screen (bottom), except the first one might be visible or comes in first.
            
            // Better stacking pattern: 
            // Stack container is pinned.
            // Cards are absolute. 
            // We want them to slide UP into view and stack.
            
            // Initial state: First card starts slightly below (not empty, but rising), others fully down/hidden
            cards.forEach((card, index) => {
                if (index === 0) {
                    gsap.set(card, { y: window.innerHeight * 0.3, scale: 1, opacity: 1, zIndex: 1 });
                } else {
                    gsap.set(card, { y: window.innerHeight, scale: 0.9, opacity: 0.8, zIndex: index + 1 });
                }
            });

            // Create a timeline that handles the sequence
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=700%",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    // markers: true
                }
            });

            // Animate Title: Only on desktop
            if (window.matchMedia("(min-width: 768px)").matches) {
                // Starts from top and moves to position
                tl.from(".wandering-title", {
                    y: -window.innerHeight * 0.3, // Start above
                    duration: 2, 
                    ease: "power2.out"
                }, 0);
            }

            cards.forEach((card, index) => {
                const isMobile = window.innerWidth < 768;
                const offset = isMobile ? 3 : 10;

                tl.to(card, {
                    y: index * offset, // Final piled position
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                }, index * 0.8); // Overlap timing
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="wandering-minds-section" ref={sectionRef}>
            <div className="wandering-content" ref={containerRef}>
                {/* Left Side: Sticky Title */}
                <div className="wandering-left">
                    <h2 className="wandering-title">
                        Where My<br/>Mind<br/><span className="highlight-text">Wanders</span> After Work
                    </h2>
                </div>

                {/* Right Side: Card Deck */}
                <div className="wandering-right">
                    <div className="cards-stack">
                        {cardData.map((card) => (
                            <div key={card.id} className="wander-card" style={{'--card-color': card.color}}>
                                <div className="card-header">
                                   <span className="card-emoji">{card.emoji}</span>
                                   <span className="card-heading">{card.title}</span>
                                </div>
                                
                                {/* Image */}
                                <div className="card-image-container">
                                   <img src={card.image} alt={card.title} className="card-image" />
                                </div>
                                
                                <div className="card-actions">
                                   {/* Heart, Comment, Share Icons (SVGs) */}
                                   <HeartIcon />
                                   <CommentIcon />
                                   <ShareIcon />
                                </div>

                                <div className="card-body">
                                    <h4 className="card-subtitle">{card.subtitle}</h4>
                                    <p className="card-oneliner">{card.oneLiner}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Simple Inline Icons
const HeartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="action-icon heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);
const CommentIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="action-icon comment"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);
const ShareIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="action-icon share"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
);


export default WanderingMinds;
