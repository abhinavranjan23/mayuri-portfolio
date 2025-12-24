import React from 'react';
import { FaPaperPlane, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer-container">
            {/* Background Watermark */}
            <h1 className="footer-watermark">
                MAYURI
            </h1>

            {/* Floating Pill */}
            <div className="footer-pill">
                {/* Email Section */}
                <div className="footer-email">
                    <FaPaperPlane className="footer-email-icon" style={{ fontSize: '1.2rem', transform: 'rotate(15deg)' }} />
                    <span>saitavmayuri@gmail.com</span>
                </div>

                {/* Icons Section */}
                <div className="footer-icons">
                    <SocialIcon color="#0077b5" icon={<FaLinkedinIn />} href="https://www.linkedin.com/in/mayuri-kumari1/" />
                    <SocialIcon color="#FF0000" icon={<FaYoutube />} href="https://www.youtube.com/@Mayurisaitav" />
                    <SocialIcon color="#C13584" icon={<FaInstagram />} href="https://www.instagram.com/saitavmayuri/" />
                </div>
            </div>
        </div>
    );
};

// Simple helper component for the styled icons
const SocialIcon = ({ color, icon, href }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            backgroundColor: color,
            color: 'white',
            borderRadius: '12px',
            fontSize: '1.2rem',
            transition: 'transform 0.2s',
            cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
        {icon}
    </a>
);

export default Footer;
