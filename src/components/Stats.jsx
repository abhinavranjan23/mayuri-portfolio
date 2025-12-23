import { motion } from 'framer-motion';

const statsData = [
  { value: "4+", label: "years of experience" },
  { value: "40+", label: "Content Created" },
  { value: "11+", label: "Happy Clients" }
];

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
      {statsData.map((stat, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2, duration: 1.6 }}
          style={{ textAlign: 'center' }}
        >
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, color: '#333',  fontFamily: 'var(--font-family, Caveat Brush, cursive)'}}>{stat.value}</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.2rem 0 0 0', fontFamily: 'var(--font-family, Caveat Brush, cursive)' }}>{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Stats;
