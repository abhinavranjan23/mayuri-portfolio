import { motion } from 'framer-motion';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import './NavigationButton.css';

const NavigationButton = ({ direction, onClick, disabled }) => {
    const Icon = direction === 'prev' ? IoChevronBack : IoChevronForward;
    
    return (
        <motion.button
            className={`nav-button nav-button-${direction}`}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: disabled ? 1 : 1.1 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            initial={{ opacity: 0, x: direction === 'prev' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Icon className="nav-icon" />
        </motion.button>
    );
};

export default NavigationButton;
