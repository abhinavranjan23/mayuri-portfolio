const useAboutAnimation = () => {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
                when: "beforeChildren"
            }
        }
    };

    const topBarVariants = {
        hidden: { y: -20, opacity: 0, x: "-50%" },
        visible: {
            y: 0,
            opacity: 1,
            x: "-50%",
            transition: { type: "spring", stiffness: 50, damping: 20, delay: 1.5 } 
        }
    };

    // Heading comes from below
    const headingVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 60, damping: 20, duration: 1 }
        }
    };

    // Image comes from above
    const imageVariants = {
        hidden: { y: "-100%", opacity: 0 }, 
        visible: {
            y: "0%",
            opacity: 1,
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
        }
    };

    return {
        containerVariants,
        topBarVariants,
        headingVariants,
        imageVariants
    };
};

export default useAboutAnimation;
