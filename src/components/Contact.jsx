import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottiePlayer } from '@dotlottie/react-player';
import cyclingAnim from '../assets/girl-cycling-in-autumn.json';
import './Contact.css';

const Contact = () => {
    // State
    const [selection, setSelection] = useState(null); // 'project' | 'general'
    const [step, setStep] = useState(0); // 0: Select, 1: Name, 2: Email, 3: Details/Msg, 4: Submit
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    const ACCESS_KEY = "7e21c9ac-7712-43e3-9a61-edcf5f14159d"; 

    // Handle Selection
    const handleSelection = (type) => {
        setSelection(type);
        setStep(1); // Move to Name step
    };

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Next Step
    const nextStep = (e) => {
        e.preventDefault();
        setStep(prev => prev + 1);
    };

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const object = {
            ...formData,
            access_key: ACCESS_KEY,
            subject: selection === 'project' ? `New Project Request from ${formData.name}` : `General Inquiry from ${formData.name}`,
            from_name: "Mayuri Portfolio Contact"
        };

        const json = JSON.stringify(object);

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: json
            }).then((res) => res.json());

            if (res.success) {
                setIsSuccess(true);
                setStep(4); // Success Step
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Error sending message.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const goBack = () => {
        if (step === 1) {
            setSelection(null);
            setStep(0);
        } else {
            setStep(prev => prev - 1);
        }
    };

    // Variants
    const fadeVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -50, transition: { duration: 0.3 } }
    };

    return (
        <section className="contact-section" id="contact">
            <div className="contact-wrapper">
                       {/* Social Links */}
                <div className="social-links-container">
                    <a href="https://www.linkedin.com/in/mayuri-kumari1/" target="_blank" rel="noreferrer" className="social-card" data-cursor-button="true">
                        <div className="social-icon linkedin">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                        </div>
                        <span className="social-text">Connect</span>
                    </a>

                    <a href="https://www.youtube.com/@Mayurisaitav" target="_blank" rel="noreferrer" className="social-card" data-cursor-button="true">
                        <div className="social-icon youtube">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                        </div>
                        <span className="social-text">Subscribe</span>
                    </a>

                    <a href="https://www.instagram.com/saitavmayuri/" target="_blank" rel="noreferrer" className="social-card" data-cursor-button="true">
                        <div className="social-icon instagram">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </div>
                        <span className="social-text">Follow</span>
                    </a>
                </div>
                <div className="contact-header">
                    <h2 className="contact-heading">Let's Talk</h2>
                    <p className="contact-subheading">
    Have a project in mind or just want to say hi?<br />
    I’m always open to new ideas, collaborations, and conversations.
  </p>
                </div>

         

                <AnimatePresence mode='wait'>
                    {/* STEP 0: SELECTION */}
                    {step === 0 && (
                        <motion.div 
                            key="step0"
                            className="selection-container"
                            variants={fadeVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <button 
                                className={`option-btn ${selection === 'project' ? 'active' : ''}`} 
                                onClick={() => handleSelection('project')}
                                data-cursor-button="true"
                            >
                                <div className={`radio-circle ${selection === 'project' ? 'selected' : ''}`}></div>
                                <span className="option-text">New Project Request</span>
                            </button>

                            <button 
                                className={`option-btn ${selection === 'general' ? 'active' : ''}`} 
                                onClick={() => handleSelection('general')}
                                data-cursor-button="true"
                            >
                                <div className={`radio-circle ${selection === 'general' ? 'selected' : ''}`}></div>
                                <span className="option-text">Just Saying Hi</span>
                            </button>
                            
                             <button 
                                className={`option-btn ${selection === 'collab' ? 'active' : ''}`} 
                                onClick={() => handleSelection('collab')}
                                data-cursor-button="true"
                            >
                                <div className={`radio-circle ${selection === 'collab' ? 'selected' : ''}`}></div>
                                <span className="option-text">Collaboration / Other</span>
                            </button>
                        </motion.div>
                    )}

                    {/* FORM STEPS */}
                    {step > 0 && !isSuccess && (
                        <motion.div
                            key="form-steps"
                            className="form-container"
                            variants={fadeVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <button className="back-btn" onClick={goBack} data-cursor-button="true">
                                ← Back
                            </button>

                            <form onSubmit={(e) => {
                                // Logic to determine if we submit or go next
                                // Project Flow: Name(1) -> Email(2) -> Details(3) -> Message(4) -> Submit
                                // General Flow: Name(1) -> Email(2) -> Message(3) -> Submit
                                
                                // Actually, let's simplify flow for UX
                                // Step 1: Name
                                // Step 2: Email
                                // Step 3: Message (+ Project Details if project) & Submit
                                
                                if (step === 3) {
                                    handleSubmit(e);
                                } else {
                                    nextStep(e);
                                }
                            }}>
                                
                                {/* STEP 1: NAME */}
                                {step === 1 && (
                                    <motion.div className="input-group" key="name-input" variants={fadeVariants}>
                                        <label className="input-label">What's your name?</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            className="minimal-input" 
                                            placeholder="John Doe" 
                                            value={formData.name} 
                                            onChange={handleChange} 
                                            required 
                                            autoFocus
                                        />
                                        <button type="submit" className="submit-btn" data-cursor-button="true">Next</button>
                                    </motion.div>
                                )}

                                {/* STEP 2: EMAIL */}
                                {step === 2 && (
                                    <motion.div className="input-group" key="email-input" variants={fadeVariants}>
                                        <label className="input-label">What's your email?</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            className="minimal-input" 
                                            placeholder="john@example.com" 
                                            value={formData.email} 
                                            onChange={handleChange} 
                                            required 
                                            autoFocus
                                        />
                                        <button type="submit" className="submit-btn" data-cursor-button="true">Next</button>
                                    </motion.div>
                                )}

                                {/* STEP 3: MESSAGE & DETAILS */}
                                {step === 3 && (
                                    <motion.div className="input-group" key="msg-input" variants={fadeVariants}>
                                        
                                        {selection === 'project' && (
                                             <div style={{marginBottom: '2rem'}}>
                                                <label className="input-label">Project Type / Budget (Optional)</label>
                                                <input 
                                                    type="text" 
                                                    name="projectType" 
                                                    className="minimal-input" 
                                                    placeholder="e.g. Website, $500-$1k" 
                                                    value={formData.projectType} 
                                                    onChange={handleChange} 
                                                />
                                             </div>
                                        )}

                                        <label className="input-label">Your Message</label>
                                        <input 
                                            type="text" 
                                            name="message" 
                                            className="minimal-input" 
                                            placeholder="Tell me more..." 
                                            value={formData.message} 
                                            onChange={handleChange} 
                                            required 
                                            autoFocus
                                        />
                                        <button type="submit" className="submit-btn" disabled={isSubmitting} data-cursor-button="true">
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </motion.div>
                                )}

                            </form>
                        </motion.div>
                    )}

                    {/* SUCCESS */}
                    {isSuccess && (
                        <motion.div
                            key="success"
                            className="success-message"
                            variants={fadeVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h3 style={{fontSize: '2rem', marginBottom: '1rem'}}>Message Sent! ✨</h3>
                            <p>Thanks for reaching out, {formData.name}. I'll get back to you soon.</p>
                            <button 
                                className="submit-btn" 
                                onClick={() => {
                                    setIsSuccess(false);
                                    setStep(0);
                                    setSelection(null);
                                    setFormData({name: '', email: '', projectType: '', message: ''});
                                }}
                                data-cursor-button="true"
                            >
                                Send Another
                            </button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
            {/* Static Full Width Cycling Animation */}
            <div className="cyclist-container">
                 <div className="cyclist-wrapper">
                    <DotLottiePlayer
                        src={cyclingAnim}
                        autoplay
                        loop
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Contact;
