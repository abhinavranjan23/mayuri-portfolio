import { useState, useRef, useEffect } from 'react';

const useAudioController = (isMobile, isLoading = false) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (isMobile || isLoading) return; 

        const playAudio = async () => {
            try {
                if (audioRef.current) {
                    await audioRef.current.play();
                    setIsPlaying(true);
                }
            } catch (err) {
                // Autoplay blocked fallback
                const enableAudio = () => {
                   if (audioRef.current) {
                       audioRef.current.play().then(() => {
                           setIsPlaying(true);
                           // Remove listeners once played
                           ['click', 'keydown', 'touchstart', 'mousemove'].forEach(event => 
                               window.removeEventListener(event, enableAudio)
                           );
                       }).catch(e => console.log("Audio still blocked", e));
                   }
                };
                
                ['click', 'keydown', 'touchstart', 'mousemove'].forEach(event => 
                    window.addEventListener(event, enableAudio)
                );
                
                // Cleanup listeners if component unmounts before interaction
                return () => {
                    ['click', 'keydown', 'touchstart', 'mousemove'].forEach(event => 
                        window.removeEventListener(event, enableAudio)
                    );
                };
            }
        };
        playAudio();
    }, [isMobile, isLoading]);

    const toggleAudio = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(() => {});
            setIsPlaying(true);
        }
    };

    return {
        audioRef,
        isPlaying,
        toggleAudio
    };
};

export default useAudioController;
