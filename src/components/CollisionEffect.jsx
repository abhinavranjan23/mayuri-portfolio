import { motion } from 'framer-motion';

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

export default CollisionEffect;
