import { motion } from 'framer-motion';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import './NavigationButton.css';

import { memo } from 'react';

const NavigationButton = memo(({ direction, onClick, disabled, isPressed, ariaLabel }) => {
    const Icon = direction === 'prev' ? IoChevronBack : IoChevronForward;
    
    return (
        <motion.button
            className={`nav-button nav-button-${direction} ${isPressed ? 'active' : ''}`}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel || (direction === 'prev' ? 'Previous Video' : 'Next Video')}
            whileHover={{ scale: disabled ? 1 : 1.1 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            animate={{ 
                opacity: 1, 
                x: 0,
                scale: isPressed ? 0.95 : 1,
                boxShadow: isPressed ? 'inset 0 2px 4px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            transition={{ duration: 0.3 }}
        >
            <Icon className="nav-icon" />
        </motion.button>
    );
});

export default NavigationButton;
