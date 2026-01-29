import { motion } from 'framer-motion';

const TypewriterText = ({ text }) => {
    // Split text into words to handle wrapping better, or chars for pure typewriter
    const characters = text.split("");
    
    const sentenceVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03, // Speed of typing
            }
        }
    };

    const charVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    return (
        <motion.p 
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'inline' }}
        >
            {characters.map((char, index) => (
                <motion.span key={index} variants={charVariants}>
                    {char}
                </motion.span>
            ))}
        </motion.p>
    );
};

export default TypewriterText;
