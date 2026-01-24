import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet-async';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import './SocialStats.css';
import { IPHONE_FRAME_IMG } from '../utils/Constant';

gsap.registerPlugin(ScrollTrigger);

const SocialStats = () => {
    const pageRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Sections on scroll
            const sections = gsap.utils.toArray('.stats-section');
            
            sections.forEach(section => {
                gsap.to(section, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "top 50%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // Number Counter Animation for YouTube
            const stats = gsap.utils.toArray('.stat-number');
            stats.forEach(stat => {
                const value = parseInt(stat.getAttribute('data-value'));
                gsap.from(stat, {
                    textContent: 0,
                    duration: 2,
                    ease: "power1.out",
                    snap: { textContent: 1 },
                    stagger: 1,
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 85%",
                    },
                    onUpdate: function() {
                        this.targets()[0].innerHTML = Math.ceil(this.targets()[0].textContent) + (stat.dataset.suffix || "");
                    }
                });
            });

        }, pageRef);

        return () => ctx.revert();
    }, []);

    // Placeholder data (Replace with constants or user uploads later)
    const INTRO_IMG = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1769193973/travelgram_vfqfau.png"; // Using existing
    const CITY_IMG = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1769194419/885a727276a1c613a7532e120c609974_yzhbc0.jpg";
    const POST_IMG = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1769194286/Screenshot_2026-01-24_002042_mfciak.png";
    const RESULT_IMG = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1769194726/ChatGPT_Image_Jan_24_2026_12_28_20_AM_fdlgrn.jpg";
    const YOUTUBE_IMG = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1766458313/social2_vzaorb.png"; // Placeholder for channel
    const POST_IMG2 = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1769195383/Screenshot_2026-01-24_003911_smsrgt.png";
    const YoutubeProfileImg = "https://res.cloudinary.com/dnt0xlngl/image/upload/v1769195661/channels4_profile_lle6zw.jpg";
    return (
        <div className="social-stats-page" ref={pageRef}>
            <Helmet>
                <title>Growth & Case Studies | Social Media Performance</title>
                <meta name="description" content="Real results and case studies. See how Mayuri Saitav has grown social media accounts, increased engagement, and driven viral success." />
            </Helmet>

            <BackButton  lightMode={true}/>

            <div className="stats-container">
                
                {/* 1. Intro Section */}
                <section className="stats-section intro-grid">
                    <div className="intro-text">
                        <h1 className="section-title" style={{textAlign: 'left'}}>Travelgram</h1>
                        <p>
                        Travelgram was a platform on Twitter to showcase the travel beauty
around the world. The platform aimed to focus on the tourism of Qatar
involving all the wonders of the globe. I was part of strategising the content, content creation 
and managing monthly calendar.
                        </p>
                        {/* <p>
                        From increasing engagement rates by <strong>200%</strong> to building loyal communities 
                        from scratch, these case studies highlight the power of purpose-driven content.
                        </p> */}
                    </div>
                    <div className="intro-image-wrapper">
                        <img src={INTRO_IMG} alt="Social Media Intro" className="intro-image" />
                    </div>
                </section>

                {/* 2. Campaign Strategy 1 */}
                <section className="stats-section">
                    <h2 className="section-title">Campaign Strategy 1: <br/>Spotlight Lusail</h2>
                    <p className="section-subtitle">
                        I was part of planning content strategy and the creative captions to be posted.
                    </p>
                    
                    <div className="strategy-card">
                        <h3>Objective</h3>
                        <p>To spotlight Lusail, Qatar as a thriving post-World Cup destination and modern urban marvel, reinforcing its appeal as a luxury travel and investment hotspot.</p>
                        
                        <br/>
                        <h3>Approach</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{marginBottom: '0.5rem'}}><strong>1. Modern Urban Development:</strong> Showcasing futuristic architecture and city planning.</li>
                            <li style={{marginBottom: '0.5rem'}}><strong>2. Event Legacy Tourism:</strong> Emphasizing Lusail’s vibrancy even after global events like the FIFA World Cup.</li>
                            <li><strong>3. Visual Aesthetics:</strong> Highlighting a stunning panoramic cityscape.</li>
                        </ul>

                        <div className="strategy-showcase">
                            <div className="strategy-img-box">
                                <span className="strategy-label">Panoramic Cityscape</span>
                                <img src={CITY_IMG} alt="Cityscape" />
                            </div>
                            <div className="strategy-img-box">
                                <span className="strategy-label">The Post</span>
                                <img src={POST_IMG} alt="The Post" />
                            </div>
                            <div className="strategy-img-box">
                                <span className="strategy-label">The Result</span>
                                <img src={RESULT_IMG} alt="Result" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Campaign Strategy 2 */}
                <section className="stats-section">
                    <h2 className="section-title">Campaign Strategy 2: <br/>Dive Into History</h2>
                    <p className="section-subtitle">
                        In this campaign, I worked on content strategy, creative content and copy.
                    </p>
                     <div className="strategy-card">
                        <div className="intro-grid"> 
                             <div>
                                <h3>Objective</h3>
                                <p style={{marginBottom: '1.5rem'}}>To captivate adventure and history enthusiasts by promoting scuba diving tourism in Egypt through the historical allure of the SS Thistlegorm shipwreck.</p>

                                <h3>Approach</h3>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    <li style={{marginBottom: '0.5rem'}}><strong>1. Adventure & Exploration:</strong> Highlighting a thrilling dive site in Dahab.</li>
                                    <li style={{marginBottom: '0.5rem'}}><strong>2. Historical Significance:</strong> Emphasizing the WWII history of the SS Thistlegorm.</li>
                                    <li><strong>3. Visual Appeal:</strong> Leveraging powerful underwater imagery to spark curiosity.</li>
                                </ul>
                             </div>
                             <div className="intro-image-wrapper" style={{height: '350px', transform: 'rotate(-2deg)'}}>
                                <img src={POST_IMG2} alt="Strategy 2" className="intro-image" />
                             </div>
                        </div>
                     </div>
                </section>

                {/* 4. YouTube Stats */}
                <section className="stats-section youtube-section">
                    <h2 className="section-title">My YouTube Channel</h2>
                    <div className="intro-image-wrapper" style={{width: '150px', height: '150px', borderRadius: '50%', margin: '0 auto'}}>
                        <img src={YoutubeProfileImg} alt="Mayuri Youtube" className="intro-image" />
                    </div>
                    
                    <div className="youtube-stats-wrapper">
                        {/* Views Graph Card */}
                        <div className="analytics-card">
                            <div className="analytics-title">Views</div>
                            <div className="analytics-value">
                                19.8K 
                                <span className="analytics-icon-up" style={{ display: 'flex' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8l4-4 4 4h-3v4h-2z"/>
                                    </svg>
                                </span>
                            </div>
                            <div className="analytics-subtext">8.3K more than usual</div>
                            
                            <div className="analytics-graph">
                                <svg className="graph-svg" viewBox="0 0 100 50" preserveAspectRatio="none">
                                    <path 
                                        className="graph-path" 
                                        d="M0,45 L5,25 L10,35 L15,10 L20,30 L25,43 L30,15 L35,45 L40,46 L45,46 L50,47 L55,46 L60,45 L65,46 L70,30 L75,36 L80,30 L85,45 L90,46 L95,46 L100,46" 
                                        vectorEffect="non-scaling-stroke"
                                    />
                                </svg>
                            </div>
                            <div className="graph-labels">
                                <span>4 Dec</span>
                                <span>31 Dec</span>
                            </div>
                        </div>

                        <div className="intro-image-wrapper" style={{width: '300px', height: '350px', margin: '0 auto'}}>
                            <img src={YOUTUBE_IMG} alt="Mayuri Youtube" className="intro-image" />
                        </div>

                        {/* Engaged Views Graph Card */}
                        <div className="analytics-card">
                            <div className="analytics-title">Engaged views</div>
                            <div className="analytics-value">
                                8.6K 
                                <span className="analytics-icon-up" style={{ display: 'flex' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8l4-4 4 4h-3v4h-2z"/>
                                    </svg>
                                </span>
                            </div>
                            <div className="analytics-subtext">169% more than previous 28 days</div>
                            
                            <div className="analytics-graph">
                                <svg className="graph-svg" viewBox="0 0 100 50" preserveAspectRatio="none">
                                    <path 
                                        className="graph-path" 
                                        d="M0,45 L5,30 L10,20 L15,35 L20,10 L25,18 L30,28 L35,40 L40,25 L45,38 L50,42 L55,41 L60,40 L65,42 L70,38 L75,32 L80,35 L85,42 L90,44 L95,44 L100,44" 
                                        vectorEffect="non-scaling-stroke"
                                    />
                                </svg>
                            </div>
                            <div className="graph-labels">
                                <span>4 Dec</span>
                                <span>31 Dec</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Testimonials */}
                <section className="stats-section">
                    <h2 className="section-title">What People Say</h2>
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <p className="testimonial-text">"Mayuri's content strategy completely transformed our social presence. The visual storytelling is unmatched!"</p>
                            <div className="client-info">
                                <div className="client-avatar"></div>
                                <div>
                                    <div className="client-name">Sarah Jenkins</div>
                                    <div className="client-role">Marketing Director</div>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <p className="testimonial-text">"The captions and visuals were spot on. She understood our brand voice immediately. Highly recommended."</p>
                            <div className="client-info">
                                <div className="client-avatar"></div>
                                <div>
                                    <div className="client-name">David Chen</div>
                                    <div className="client-role">Founder, TravelEasy</div>
                                </div>
                            </div>
                        </div>
                         <div className="testimonial-card">
                            <p className="testimonial-text">"Professional, creative, and data-driven. The growth we saw in just 3 months was incredible."</p>
                            <div className="client-info">
                                <div className="client-avatar"></div>
                                <div>
                                    <div className="client-name">Priya Sharma</div>
                                    <div className="client-role">Content Lead</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            
            <Footer />
        </div>
    );
};

export default SocialStats;
