import React from 'react';
import workingPageImg from '../assets/workingpage.png';
import { Link } from 'react-router-dom';
const Work = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      maxHeight: '100vh', // Ensure it takes some space
      width: '100%'
    }}>
      <img 
        src={workingPageImg} 
        alt="Work in Progress" 
        style={{
          maxWidth: '100%',
          height: 'auto',
          marginBottom: '1rem',
          maxHeight: '400px', // Limit height on large screens
          objectFit: 'contain'
        }}
      />
      <h2 style={{
        fontFamily: 'var(--font-family, Pangolin, sans-serif)',
        fontSize: '1.5rem',
        color: 'var(--text-primary, #333)', // Fallback color
        maxWidth: '600px',
        lineHeight: '1.5'
      }}>
        Currently rebuilding. Because “almost perfect” wasn’t acceptable.
      </h2>
            <Link 
              to="/" 
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#333',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '5px',
                fontSize: '1rem',
                fontFamily: 'var(--font-family, Pangolin, sans-serif)',
              }}
            >
              Go Back Home
            </Link>
    </div>
  );
};

export default Work;
