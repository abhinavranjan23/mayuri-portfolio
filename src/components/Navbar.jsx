import { useState, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';


import './Navbar.css';

import { NAV_CONFIG_ABOUT, NAV_CONFIG_PHOTO, NAV_CONFIG_DEFAULT } from '../utils/Constant';

const Navbar = memo(() => {
    const location = useLocation();
    const [hoveredLink, setHoveredLink] = useState(null);

    // Dynamic Navigation Logic
    const isAboutPage = location.pathname === '/about';
    const isPhotoContentPage = location.pathname === '/content-design/photo-content';
    const navItems = isAboutPage 
        ? NAV_CONFIG_ABOUT
        : isPhotoContentPage 
        ? NAV_CONFIG_PHOTO
        : NAV_CONFIG_DEFAULT;

    return (
        <nav className="navbar-container" aria-label="Main Navigation">
            {navItems.map((item, index) => (
                <Link 
                    key={index}
                    to={item.link} 
                    className={`nav-link ${item.isButton ? 'resume-btn' : ''}`}
                    onMouseEnter={() => setHoveredLink(index)}
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    {item.label}
                    {item.isButton && (
                         <span className="resume-icon">↗</span> 
                    )}
                </Link>
            ))}
        </nav>
    );
});

export default Navbar;
