import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

import CollisionEffect from '../components/CollisionEffect';
import useIsMobile from '../hooks/useIsMobile';

// Use static paths from public/ directory to avoid inlining issues
const flowerCursor = '/cursors/flower.svg';
const ghostCursor = '/cursors/cute-ghost.svg';

const CustomCursor = () => {
  const { pathname } = useLocation();
  const [collisions, setCollisions] = useState([]);
  
  // OPTIMIZATION: Use MotionValues for high-performance updates without re-renders
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Smooth spring physics for the cursor movement
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isColliding, setIsColliding] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const isMobile = useIsMobile();

  useEffect(() => {
   

    // Preload cursor images
    const img1 = new Image();
    img1.src = flowerCursor;
    const img2 = new Image();
    img2.src = ghostCursor;

  }, [pathname]);

  useEffect(() => {
    const updateMousePosition = (e) => {
      // Update MotionValues directly - NO RE-RENDER
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Hit testing (still needs to run, but lightweight)
      const target = e.target;
      const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button');
      setIsHovering(!!isClickable);

      const spinTarget = target.getAttribute('data-cursor-spin') ? target : target.closest('[data-cursor-spin]');
      setIsSpinning(!!spinTarget);

      const textTarget = target.getAttribute('data-cursor-text') ? target : target.closest('[data-cursor-text]');
      if (textTarget) {
        setCursorText(textTarget.getAttribute('data-cursor-text'));
      } else {
        setCursorText("");
      }
    };

    const handleClick = (e) => {
      const target = e.target;
      const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' || target.getAttribute('data-cursor-button') || target.closest('a') || target.closest('button') || target.closest('[data-cursor-button]');

      if (!isClickable) {
          const id = Date.now();
          setCollisions(prev => [...prev, { x: e.clientX, y: e.clientY, id }]);
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
      scale: 1,
      rotate: 0,
      width: '38px',
      height: '38px',
      backgroundColor: 'transparent',
      x: "-50%",
      y: "-50%"
    },
    hover: {
      scale: 1.5,
      rotate: 45,
      width: '38px',
      height: '38px',
      backgroundColor: 'transparent',
      x: "-50%",
      y: "-50%"
    },
    spinning: {
        scale: 1.5,
        rotate: 360,
        width: '38px',
        height: '38px',
        backgroundColor: 'transparent',
        x: "-50%",
        y: "-50%",
        transition: {
            rotate: {
                repeat: Infinity,
                duration: 2,
                ease: "linear"
            }
        }
    },
    text: {
        width: '120px',
        height: '35px',
        scale: 1,
        rotate: 0,
        backgroundColor: 'transparent',
        x: "-50%",
        y: "-150%" // Move higher up above text
    },
    collision: {
      scale: 0.9, 
      rotate: [0, -20, 20, -20, 20, 0], 
      x: "-50%", 
      y: "-50%",
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
        <motion.div
        className="custom-cursor"
        variants={variants}
        initial="default"
        animate={isColliding ? "collision" : (cursorText ? "text" : (isSpinning ? "spinning" : (isHovering ? "hover" : "default")))}
        style={{
            position: 'fixed',
            left: smoothX, // Driven by MotionValue directly
            top: smoothY,
            pointerEvents: 'none',
            zIndex: 9999,
           
            // Ensure path is normalized for Vercel
            backgroundImage: cursorText ? 'none' : (pathname.replace(/\/$/, '') === '/about' || pathname.replace(/\/$/, '') === '/content-design' ? `url(${ghostCursor})` : `url(${flowerCursor})`), 
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
            boxShadow: 'none',
            textShadow: '0px 2px 4px rgba(255,255,255,0.8)',
            padding: '0 10px'
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



export default CustomCursor;
