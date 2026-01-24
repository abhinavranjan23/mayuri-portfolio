import { useState } from 'react';
import { motion } from 'framer-motion';

const FloatingIcon = ({ src, label, initialX, initialY, delay, emoji }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
        style={{ 
            position: 'absolute', 
            top: initialY, 
            left: initialX, 
            zIndex: 10,
            cursor: 'none'
        }}
        animate={{ y: isHovered ? 0 : [0, -15, 0] }}
        transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: delay 
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <div style={{position: 'relative', width: '6vw' , height: '6vw'}}>
             <motion.img 
                src={src} 
                alt={label} 
                style={{width: '100%', height: '100%', objectFit:'contain', filter: 'drop-shadow(0px 10px 8px rgba(0,0,0,0.3))'}} 
                animate={{ rotate: isHovered ? [0, -10, 10, -5, 5, 0] : 0 }}
                transition={{ duration: 0.5 }}
             />
             {isHovered && (
                 <motion.div 
                    initial={{opacity:0, y: 10, scale: 0.8}}
                    animate={{opacity:1, y: 0, scale: 1}}
                    style={{
                        position: 'absolute',
                        bottom: '80%', // Position above the icon
                        left: '-15%',
                        transform: 'translateX(-30%)',
                        background: 'white',
                        padding: '8px 12px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#333',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        marginBottom: '10px', // Add space between icon and tooltip
                        pointerEvents: 'none', // Prevent flickering if mouse touches tooltip
                        zIndex: 20
                    }}
                 >
                    <span style={{fontSize: '1.2em'}}>{emoji}</span> {label}
                 </motion.div>
             )}
        </div>
    </motion.div>
  );
};

export default FloatingIcon;
