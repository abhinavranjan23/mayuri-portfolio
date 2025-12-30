import { motion, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { STATS_DATA } from '../utils/Constant';

const Counter = ({ from, to, duration }) => {
    const nodeRef = useRef();
    const inView = useInView(nodeRef, { once: true, margin: "-50px" });

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;
        
        // Initial set
        node.textContent = from;

        if (inView) {
            const controls = animate(from, to, {
                duration: duration,
                onUpdate(value) {
                    node.textContent = value.toFixed(0);
                },
                ease: "easeOut"
            });
            return () => controls.stop();
        }
    }, [from, to, duration, inView]);

    return <span ref={nodeRef} />;
};

const Stats = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingTop: '0.5rem',
      maxWidth: '800px',
      margin: '0 auto',
      width: '100%'
    }}>
      {STATS_DATA.map((stat, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2, duration: 1.6 }}
          style={{ textAlign: 'center' }}
        >
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, color: '#333',  fontFamily: 'var(--font-family, Caveat Brush, cursive)'}}>
              <Counter from={0} to={stat.value} duration={2} />{stat.suffix}
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.2rem 0 0 0', fontFamily: 'var(--font-family, Caveat Brush, cursive)' }}>{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Stats;
