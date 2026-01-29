import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ANIMATION_CONFIG } from '../utils/Constant';

const useHomeAnimation = (containerRef, isMobile) => {
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
          
            gsap.from(".hero-anim", {
                y: 50,
                opacity: 0,
                duration: ANIMATION_CONFIG.HERO_ANIM_DURATION,
                stagger: ANIMATION_CONFIG.HERO_ANIM_STAGGER,
                ease: ANIMATION_CONFIG.EASE_POWER3
            });
            
          
            if (!isMobile) {
                gsap.from(".orange-strip", {
                    scaleY: 0,
                    transformOrigin: "top",
                    duration: ANIMATION_CONFIG.STRIP_ANIM_DURATION,
                    ease: ANIMATION_CONFIG.EASE_CIRC,
                    delay: ANIMATION_CONFIG.STRIP_ANIM_DELAY
                });
            }
        }, containerRef);
        return () => ctx.revert();
      }, [isMobile, containerRef]);
};

export default useHomeAnimation;
