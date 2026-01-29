import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useSocialStatsAnimation = (containerRef) => {
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Sections on scroll
            const sections = gsap.utils.toArray('.stats-section');
            
            sections.forEach(section => {
                gsap.to(section, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "top 50%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // Number Counter Animation for YouTube
            const stats = gsap.utils.toArray('.stat-number');
            stats.forEach(stat => {
                // const value = parseInt(stat.getAttribute('data-value')); // Not used in original code effectively besides for logic implicit in gsap
                gsap.from(stat, {
                    textContent: 0,
                    duration: 2,
                    ease: "power1.out",
                    snap: { textContent: 1 },
                    stagger: 1,
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 85%",
                    },
                    onUpdate: function() {
                        this.targets()[0].innerHTML = Math.ceil(this.targets()[0].textContent) + (stat.dataset.suffix || "");
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, [containerRef]);
};

export default useSocialStatsAnimation;
