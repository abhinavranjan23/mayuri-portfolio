import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import './Services.css';
import {SERVICE_ITEMS, WHY_CHOOSE_US_DATA, HOW_WE_WORK_DATA, SERVICES_PAGE_DATA} from '../utils/Constant';
import useServicesAnimation from '../hooks/useServicesAnimation';

// Create duplicated list for seamless marquee
const MARQUEE_LIST = [...SERVICE_ITEMS, ...SERVICE_ITEMS, ...SERVICE_ITEMS];


const Services = () => {
    const pageRef = useRef(null);
    const whySectionRef = useRef(null);
    const whyTrackRef = useRef(null);

    useServicesAnimation(pageRef, whySectionRef, whyTrackRef);

 

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
                    {[...Array(6)].map((_, i) => (
                        <div key={`l-${i}`} style={{ display: 'flex', gap: '20px' }}>
                             <div className="service-marquee-item pill-yellow">Shorts ⚡</div>
                             <div className="service-marquee-item pill-pink">Reels 📸</div>
                             <div className="service-marquee-item pill-blue">Videos 🎥</div>
                             <div className="service-marquee-item pill-orange">Snap 👻</div>
                             <div className="service-marquee-item pill-green">Vlogs 🏕️</div>
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
