import React from 'react';
import { motion } from 'framer-motion';
import {
    IoHeart,
    IoHeartOutline,
    IoShareSocial,
    IoVolumeHigh,
    IoVolumeMute
} from "react-icons/io5";
import useVideoCardLogic from '../hooks/useVideoCardLogic';
import './VideoCard.css';

const VideoCard = React.memo(({ item, isActive, toggleMute, isMuted, shouldLoad }) => {
    const { videoRef, isLiked, shareText, toggleLike, handleShare } = useVideoCardLogic(item, isActive);

    return (
        <motion.div 
            className="video-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <div className="video-container">
                 {shouldLoad ? (
                    <video
                        className="video-player"
                        src={item.videoUrl}
                        ref={videoRef}
                        loop
                        muted={isMuted}
                        playsInline
                        autoPlay={isActive}
                        preload="auto"
                        onClick={toggleMute}
                    />
                ) : (
                    <img
                        src={item.videoUrl.replace('.mp4', '.jpg')}
                        className="video-player"
                        style={{objectFit: 'cover'}}
                        alt={item.title}
                    />
                )}

                {/* Actions Side Bar */}
                <div className="card-actions">
                    <div className="action-item" onClick={toggleLike}>
                        <motion.span
                            animate={{ scale: isLiked ? 1.2 : 1 }}
                            whileTap={{ scale: 0.8 }}
                            className="icon-container"
                        >
                            {isLiked ? <IoHeart color="#ff4081" /> : <IoHeartOutline color="white" />}
                        </motion.span>
                        <span>{isLiked ? "Liked" : "Like"}</span>
                    </div>

                    <div className="action-item" onClick={handleShare}>
                        <motion.span whileTap={{ scale: 0.9 }} className="icon-container">
                            <IoShareSocial color="white" />
                        </motion.span>
                        <span>{shareText}</span>
                    </div>

                    <div className="action-item" onClick={toggleMute}>
                         <motion.span whileTap={{ scale: 0.9 }} className="icon-container">
                            {isMuted ? <IoVolumeMute color="white" /> : <IoVolumeHigh color="white" />}
                        </motion.span>
                    </div>
                </div>

                {/* Bottom Overlay */}
                <div className="card-overlay">
                    <div className="card-header">
                        <h3>{item.title}</h3>

                    </div>
                    <button className="follow-btn" onClick={(e) => {
                            e.stopPropagation();
                            window.open(item.profileUrl, '_blank');
                        }}>Follow</button>
                    <p className="card-desc">{item.description}</p>
                </div>
            </div>
        </motion.div>
    );
});

export default VideoCard;
