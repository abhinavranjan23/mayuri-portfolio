import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
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

        lenis.on('scroll', ScrollTrigger.update);

        const raf = (time) => {
                 lenis.raf(time * 1000);
                       };

        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        return () => {
                gsap.ticker.remove(raf);
                lenis.destroy();
           };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
