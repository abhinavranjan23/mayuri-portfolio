import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import './SocialStats.css';
import { SOCIAL_STATS_DATA } from '../utils/Constant';
import useSocialStatsAnimation from '../hooks/useSocialStatsAnimation';

const SocialStats = () => {
    const pageRef = useRef(null);

    useSocialStatsAnimation(pageRef);

    return (
        <div className="social-stats-page" ref={pageRef}>
            <Helmet>
                <title>Growth & Case Studies | Social Media Performance</title>
                <meta name="description" content="Real results and case studies. See how Mayuri Saitav has grown social media accounts, increased engagement, and driven viral success." />
            </Helmet>

            <BackButton  lightMode={true}/>

            <div className="stats-container">
                
                
                <section className="stats-section intro-grid">
                    <div className="intro-text">
                        <h1 className="section-title" style={{textAlign: 'left'}}>{SOCIAL_STATS_DATA.INTRO_TITLE}</h1>
                        <p style={{whiteSpace: 'pre-line'}}>
                            {SOCIAL_STATS_DATA.INTRO_DESC}
                        </p>
                      
                    </div>
                    <div className="intro-image-wrapper">
                        <img src={SOCIAL_STATS_DATA.INTRO_IMG} alt="Social Media Intro" className="intro-image" />
                    </div>
                </section>

                
                <section className="stats-section">
                    <h2 className="section-title" style={{whiteSpace: 'pre-line'}}>{SOCIAL_STATS_DATA.CAMPAIGN_1_TITLE}</h2>
                    <p className="section-subtitle">
                        {SOCIAL_STATS_DATA.CAMPAIGN_1_SUBTITLE}
                    </p>
                    
                    <div className="strategy-card">
                        <h3>Objective</h3>
                        <p>{SOCIAL_STATS_DATA.CAMPAIGN_1_OBJECTIVE}</p>
                        
                        <br/>
                        <h3>Approach</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {SOCIAL_STATS_DATA.CAMPAIGN_1_APPROACH.map((item, i) => (
                                <li key={i} style={{marginBottom: '0.5rem'}}>
                                    <strong>{i + 1}. {item.title}</strong> {item.desc}
                                </li>
                            ))}
                        </ul>

                        <div className="strategy-showcase">
                            <div className="strategy-img-box">
                                <span className="strategy-label">Panoramic Cityscape</span>
                                <img src={SOCIAL_STATS_DATA.CITY_IMG} alt="Cityscape" />
                            </div>
                            <div className="strategy-img-box">
                                <span className="strategy-label">The Post</span>
                                <img src={SOCIAL_STATS_DATA.POST_IMG} alt="The Post" />
                            </div>
                            <div className="strategy-img-box">
                                <span className="strategy-label">The Result</span>
                                <img src={SOCIAL_STATS_DATA.RESULT_IMG} alt="Result" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Campaign Strategy 2 */}
                <section className="stats-section">
                    <h2 className="section-title" style={{whiteSpace: 'pre-line'}}>{SOCIAL_STATS_DATA.CAMPAIGN_2_TITLE}</h2>
                    <p className="section-subtitle">
                        {SOCIAL_STATS_DATA.CAMPAIGN_2_SUBTITLE}
                    </p>
                     <div className="strategy-card">
                        <div className="intro-grid"> 
                             <div>
                                <h3>Objective</h3>
                                <p style={{marginBottom: '1.5rem'}}>{SOCIAL_STATS_DATA.CAMPAIGN_2_OBJECTIVE}</p>

                                <h3>Approach</h3>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {SOCIAL_STATS_DATA.CAMPAIGN_2_APPROACH.map((item, i) => (
                                        <li key={i} style={{marginBottom: '0.5rem'}}>
                                            <strong>{i + 1}. {item.title}</strong> {item.desc}
                                        </li>
                                    ))}
                                </ul>
                             </div>
                             <div className="intro-image-wrapper" style={{height: '350px', transform: 'rotate(-2deg)'}}>
                                <img src={SOCIAL_STATS_DATA.POST_IMG2} alt="Strategy 2" className="intro-image" />
                             </div>
                        </div>
                     </div>
                </section>

                {/* 4. YouTube Stats */}
                <section className="stats-section youtube-section">
                    <h2 className="section-title">My YouTube Channel</h2>
                    <div className="intro-image-wrapper" style={{width: '150px', height: '150px', borderRadius: '50%', margin: '0 auto'}}>
                        <img src={SOCIAL_STATS_DATA.YOUTUBE_PROFILE_IMG} alt="Mayuri Youtube" className="intro-image" />
                    </div>
                    
                    <div className="youtube-stats-wrapper">
                        {/* Views Graph Card */}
                        <div className="analytics-card">
                            <div className="analytics-title">{SOCIAL_STATS_DATA.ANALYTICS_VIEWS.title}</div>
                            <div className="analytics-value">
                                {SOCIAL_STATS_DATA.ANALYTICS_VIEWS.value} 
                                <span className="analytics-icon-up" style={{ display: 'flex' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8l4-4 4 4h-3v4h-2z"/>
                                    </svg>
                                </span>
                            </div>
                            <div className="analytics-subtext">{SOCIAL_STATS_DATA.ANALYTICS_VIEWS.subtext}</div>
                            
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
                            <img src={SOCIAL_STATS_DATA.YOUTUBE_IMG} alt="Mayuri Youtube" className="intro-image" />
                        </div>

                        {/* Engaged Views Graph Card */}
                        <div className="analytics-card">
                            <div className="analytics-title">{SOCIAL_STATS_DATA.ANALYTICS_ENGAGED.title}</div>
                            <div className="analytics-value">
                                {SOCIAL_STATS_DATA.ANALYTICS_ENGAGED.value} 
                                <span className="analytics-icon-up" style={{ display: 'flex' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8l4-4 4 4h-3v4h-2z"/>
                                    </svg>
                                </span>
                            </div>
                            <div className="analytics-subtext">{SOCIAL_STATS_DATA.ANALYTICS_ENGAGED.subtext}</div>
                            
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
                    <h2 className="section-title">{SOCIAL_STATS_DATA.TESTIMONIALS_TITLE}</h2>
                    <div className="testimonials-grid">
                        {SOCIAL_STATS_DATA.TESTIMONIALS.map((testimonial, i) => (
                            <div key={i} className="testimonial-card">
                                <p className="testimonial-text">{testimonial.text}</p>
                                <div className="client-info">
                                    <div className="client-avatar">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="client-name">{testimonial.name}</div>
                                        <div className="client-role">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
            
            <Footer />
        </div>
    );
};

export default SocialStats;
