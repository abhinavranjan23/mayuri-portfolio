import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
    const lenisRef = useRef();
    const location = useLocation();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.8,
            easing: (t) => 1 - Math.pow(1 - t, 4),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1.5,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        lenis.on('scroll', ScrollTrigger.update);

        const raf = (time) => {
             lenis.raf(time * 1000);
        };

        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(raf);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Reset scroll on route change
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    return <>{children}</>;
};

export default SmoothScroll;
