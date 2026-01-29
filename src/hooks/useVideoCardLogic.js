import { useState, useRef, useEffect } from 'react';

const useVideoCardLogic = (item, isActive) => {
    const videoRef = useRef(null);
    const [isLiked, setIsLiked] = useState(false);
    const [shareText, setShareText] = useState("Share");

    const toggleLike = (e) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const handleShare = async (e) => {
        e.stopPropagation();
        const shareData = {
            title: 'Check out this video!',
            text: item.description,
            url: item.videoUrl
        };
        if (navigator.share) {
            try { await navigator.share(shareData); } catch (err) { console.log(err); }
        } else {
            navigator.clipboard.writeText(item.videoUrl);
            setShareText("Copied!");
            setTimeout(() => setShareText("Share"), 2000);
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isActive) {
            video.currentTime = 0;
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    // Autoplay blocked
                });
            }
        } else {
            video.pause();
        }
    }, [isActive]);

    return {
        videoRef,
        isLiked,
        shareText,
        toggleLike,
        handleShare
    };
};

export default useVideoCardLogic;
