import React from 'react';
import Lottie from 'lottie-react';
import notFoundAnimation from '../assets/Not-found404.json';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      maxHeight: '100vh',
      padding: '2rem',
      backgroundColor: 'var(--background-color, #fff)', // Use CSS variable if valid, else white
      color: 'var(--text-primary, #333)'
    }}>
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <Lottie 
          animationData={notFoundAnimation} 
          loop={true} 
          autoplay={true} 
        />
      </div>
      <p style={{ marginTop: '10px', fontSize: '1.2rem', textAlign: 'center' , fontFamily: 'var(--font-family, Slackey, cursive)'}}>
        You weren’t supposed to come here.
      </p>
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

export default NotFound;
