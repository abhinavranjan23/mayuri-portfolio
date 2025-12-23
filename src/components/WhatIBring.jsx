import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhatIBring.css';



gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    id: 1,
    title: "Strategy-backed creativity",
    description: "I don’t create content just to “post.” Every piece of content I create is backed by a clear goal. I understand what works on each platform and tailor ideas accordingly, instead of using a one-size-fits-all approach.",
    tags: [],
    iconData: "https://res.cloudinary.com/dnt0xlngl/image/upload/v1766458527/card1icon_zc53ue.png", 
    className: "card-1"
  },
  {
    id: 2,
    title: "Audience-first storytelling",
    description: "I focus on creating content that speaks to people, not at them. I take time to understand the audience’s pain points, interests, and behavior, and then turn that into relatable, scroll-stopping content.",
    tags: [],
    iconData: "https://res.cloudinary.com/dnt0xlngl/image/upload/v1766458528/card2icon_oikvsd.png", 
    className: "card-2"
  },
  {
    id: 3,
    title: "Consistency with quality",
    description: "I bring consistency in posting while maintaining quality. From visuals to captions to tone, I ensure the brand voice stays aligned across all content.",
    tags: [],
    iconData: "https://res.cloudinary.com/dnt0xlngl/image/upload/v1766458529/card3icon_njnmgv.png",
    className: "card-3"
  },
  {
    id: 4,
    title: "Adaptability to trends and platforms",
    description: "I stay updated with platform trends, content formats, and algorithm shifts.",
    tags: [],
    iconData: ["https://res.cloudinary.com/dnt0xlngl/image/upload/v1766458531/card4icon2_bg7m2b.png"],
    className: "card-4"
  }
];

const WhatIBring = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards from different directions
      // Card 1: From Left
      gsap.from(".card-1", {
        scrollTrigger: {
          trigger: ".card-1",
          start: "top 60%",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Card 2: From Right
      gsap.from(".card-2", {
        scrollTrigger: {
          trigger: ".card-2",
          start: "top 60%",
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Card 3: From Bottom Left (ish)
      gsap.from(".card-3", {
        scrollTrigger: {
          trigger: ".card-3",
          start: "top 70%",
        },
        x: -50,
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Card 4: From Bottom Right (ish)
      gsap.from(".card-4", {
        scrollTrigger: {
          trigger: ".card-4",
          start: "top 70%",
        },
        x: 50,
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="what-i-bring-section" ref={sectionRef}>
      {/* <div className="section-header-icon">
        <img src={goodDesignIcon} alt="Good Design Only" width={90} height={90} />
      </div> */}
      <h2 className="section-title">What I bring to the table</h2>
      
      <div className="cards-grid">
        {cardData.map((card) => (
          <div key={card.id} className={`bring-card ${card.className}`}>
            <div className="card-top">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-desc">{card.description}</p>
            </div>
            
            <div className="card-visuals">
                {card.tags.length > 0 && (
                    <div className="card-tags">
                        {card.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                )}
                {Array.isArray(card.iconData) ? (
                   <>
                      {card.iconData.map((icon, idx) => (
                        <div key={idx} className={`card-icon icon-${idx+1}`}> 
                          <img src={icon} alt={`icon-${idx}`} width={100} height={100} />
                        </div>
                      ))}
                   </>
                ) : (
                   <div className="card-icon"> <img src={card.iconData} alt="icon" width={100} height={100} /></div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatIBring;
