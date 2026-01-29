import { useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { VIDEO_CONTENT_DATA, ANIMATION_STICKERS_DATA } from '../utils/Constant';

const useVideoContent = (mainContainerRef) => {
    const [cardOrder, setCardOrder] = useState([...Array(VIDEO_CONTENT_DATA.length).keys()]);
    const [isMuted, setIsMuted] = useState(false);
    const [pressedKey, setPressedKey] = useState(null); // 'prev' | 'next' | null
    const [announcement, setAnnouncement] = useState(''); // For screen readers
    
    const toggleMute = useCallback(() => setIsMuted(prev => !prev), []);

    const handlePrev = useCallback(() => {
        setCardOrder(prev => {
            // Move last card to front
            const newOrder = [...prev];
            const lastCard = newOrder.pop();
            newOrder.unshift(lastCard);
            // Announce new active video for screen readers
            const activeItem = VIDEO_CONTENT_DATA[newOrder[0]];
            setAnnouncement(`Now playing: ${activeItem.title}`);
            return newOrder;
        });
    }, []);

    const handleNext = useCallback(() => {
        setCardOrder(prev => {
            // Move first card to back
            const newOrder = [...prev];
            const firstCard = newOrder.shift();
            newOrder.push(firstCard);
            // Announce new active video for screen readers
            const activeItem = VIDEO_CONTENT_DATA[newOrder[0]];
            setAnnouncement(`Now playing: ${activeItem.title}`);
            return newOrder;
        });
    }, []);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                setPressedKey('prev');
                handlePrev();
            }
            if (e.key === 'ArrowRight') {
                setPressedKey('next');
                handleNext();
            }
        };

        const handleKeyUp = (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                setPressedKey(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handlePrev, handleNext]);

    // Floating stickers animation (simplified, no scroll trigger)
    useEffect(() => {
        const stickers = ANIMATION_STICKERS_DATA.slice(0, 3);
        stickers.forEach((s, i) => {
            const wrapperSelector = `.sticker-wrapper-${i}`;
            const innerSelector = `.sticker-inner-${i}`;

            // Initial State
            gsap.set(wrapperSelector, {
                scale: 0,
                autoAlpha: 0,
                x: 0,
                y: 0
            });

            gsap.set(innerSelector, {
                rotation: -45,
                y: 0
            });

            // Entrance
            gsap.to(wrapperSelector, {
                scale: 1,
                autoAlpha: 1,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)",
                delay: 0.5 + (i * 0.2)
            });

            // Idle Float
            gsap.to(innerSelector, {
                y: -20,
                rotation: 10,
                duration: 2 + (i * 0.2),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.5
            });
        });
    }, []);

    return {
        cardOrder,
        isMuted,
        pressedKey,
        announcement,
        toggleMute,
        handlePrev,
        handleNext
    };
};

export default useVideoContent;
