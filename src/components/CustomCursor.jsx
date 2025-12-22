import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import flowerCursor from '../assets/cursor/flower.svg';
import ghostCursor from '../assets/cursor/cute-ghost.svg';

const CustomCursor = () => {
  const { pathname } = useLocation();
  const [collisions, setCollisions] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isColliding, setIsColliding] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Preload cursor images
    const img1 = new Image();
    img1.src = flowerCursor;
    const img2 = new Image();
    img2.src = ghostCursor;

    const checkMobile = () => {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button');
      setIsHovering(!!isClickable);

      // Check for spinner
      const spinTarget = target.getAttribute('data-cursor-spin') ? target : target.closest('[data-cursor-spin]');
      setIsSpinning(!!spinTarget);


      // Check for custom cursor text
      const textTarget = target.getAttribute('data-cursor-text') ? target : target.closest('[data-cursor-text]');
      if (textTarget) {
        setCursorText(textTarget.getAttribute('data-cursor-text'));
      } else {
        setCursorText("");
      }
    };

    const handleClick = (e) => {
      // ... same logic ...
      const target = e.target;
      const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' || target.getAttribute('data-cursor-button') || target.closest('a') || target.closest('button') || target.closest('[data-cursor-button]');

      if (!isClickable) {
          // ... collision logic ...
          const id = Date.now();
          setCollisions(prev => [...prev, { x: e.clientX, y: e.clientY, id }]);
          
          // Trigger generic recoil animation on cursor
          setIsColliding(true);
          setTimeout(() => setIsColliding(false), 200);

          setTimeout(() => {
              setCollisions(prev => prev.filter(c => c.id !== id));
          }, 1000);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  if (isMobile) return null;

  const variants = {
    default: {
      x: mousePosition.x - 19,
      y: mousePosition.y - 19,
      scale: 1,
      rotate: 0,
      width: '38px',
      height: '38px',
      backgroundColor: 'transparent'
    },
    hover: {
      x: mousePosition.x - 19,
      y: mousePosition.y - 19,
      scale: 1.5,
      rotate: 45,
      width: '38px',
      height: '38px',
      backgroundColor: 'transparent'
    },
    spinning: {
        x: mousePosition.x - 19,
        y: mousePosition.y - 19,
        scale: 1.5,
        rotate: 360,
        width: '38px',
        height: '38px',
        backgroundColor: 'transparent',
        transition: {
            rotate: {
                repeat: Infinity,
                duration: 2,
                ease: "linear"
            }
        }
    },
    text: {
        x: mousePosition.x - 60, // Center offset for 120px width
        y: mousePosition.y - 50, // Move higher up to avoid blocking text
        width: '120px',
        height: '35px',
        scale: 1,
        rotate: 0,
        backgroundColor: 'transparent',
    },
    collision: {
      x: mousePosition.x - 19,
      y: mousePosition.y - 19,
      scale: 0.9, // Compress on impact
      rotate: [0, -20, 20, -20, 20, 0], // Aggressive shake
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
        <motion.div
        className="custom-cursor"
        variants={variants}
        animate={isColliding ? "collision" : (cursorText ? "text" : (isSpinning ? "spinning" : (isHovering ? "hover" : "default")))}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{
            position: 'fixed',
            left: 0,
            top: 0,
            pointerEvents: 'none',
            zIndex: 9999,
           
            backgroundImage: cursorText ? 'none' : (pathname.replace(/\/$/, '') === '/about' ? `url(${ghostCursor})` : `url(${flowerCursor})`), // Ghost for About, Flower for others
            backgroundSize: 'contain',
         
            backgroundRepeat: 'no-repeat',
            // Flex for text centering
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#333',
            boxShadow: 'none', // Remove box shadow for transparent look
            textShadow: '0px 2px 4px rgba(255,255,255,0.8)', // Add glow/shadow for readability
            padding: '0 10px' // Add padding for auto-ish sizing feel
        }}
        >
            {cursorText && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {cursorText}
                </motion.span>
            )}
        </motion.div>
        
        {/* Render Collision Dots */}
        {collisions.map(collision => (
            <CollisionEffect key={collision.id} x={collision.x} y={collision.y} />
        ))}
    </>
  );
};

const CollisionEffect = ({ x, y }) => {
    return (
        <div style={{
            position: 'fixed',
            left: x,
            top: y,
            pointerEvents: 'none',
            zIndex: 9998,
        }}>
            {/* Shockwave Ripple */}
            <motion.div
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                    position: 'absolute',
                    top: -20,
                    left: -20,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.8)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }}
            />

            {/* Glass Crack SVG */}
            <motion.svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                initial={{ opacity: 1, scale: 0.5 }}
                animate={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: 'absolute',
                    top: -30,
                    left: -30,
                    filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.5))"
                }}
            >
                {/* Crack Pattern */}
                <path d="M30 30 L45 15" stroke="grey" strokeWidth="2" strokeLinecap="round" />
                <path d="M30 30 L15 15" stroke="grey" strokeWidth="2" strokeLinecap="round" />
                <path d="M30 30 L30 10" stroke="grey" strokeWidth="2" strokeLinecap="round" />
                <path d="M30 30 L50 35" stroke="grey" strokeWidth="2" strokeLinecap="round" />
                <path d="M30 30 L10 35" stroke="grey" strokeWidth="2" strokeLinecap="round" />
                <path d="M30 30 L30 50" stroke="grey" strokeWidth="1" strokeLinecap="round" strokeDasharray="4 2" />
            </motion.svg>

            {/* Debris Particles */}
            {[0, 1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ 
                        x: (i % 2 === 0 ? 1 : -1) * (Math.random() * 40 + 20),
                        y: (i < 2 ? -1 : 1) * (Math.random() * 40 + 20),
                        opacity: 0,
                        rotate: Math.random() * 360
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{
                        position: 'absolute',
                        width: '4px',
                        height: '4px',
                        backgroundColor: 'white',
                        borderRadius: '2px', // Shard shape
                    }}
                />
            ))}
        </div>
    );
};

export default CustomCursor;
