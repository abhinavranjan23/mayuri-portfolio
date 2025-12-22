import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import pandaIcon from '../assets/cute-panda-happy.svg'; // Ensure path is correct relative to this file
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const [hoveredLink, setHoveredLink] = useState(null);

    // Dynamic Navigation Logic
    // If Home (/): Show "About me", "Resume"
    // If About (/about): Show "Content Design", "Resume" (Assuming "Content Design" goes back to Home)
    const isAboutPage = location.pathname === '/about';

    const navItems = isAboutPage 
        ? [
            { label: "Content Design", link: "/" },
            { label: "Get Resume", link: "#", isButton: true }
          ]
        : [
            { label: "About me", link: "/about"},
            { label: "Get Resume", link: "#", isButton: true }
          ];

    return (
        <nav className="navbar-container">
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
};

export default Navbar;
