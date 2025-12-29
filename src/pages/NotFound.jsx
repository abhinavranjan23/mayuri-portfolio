import React from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const notFoundAnimation = "https://res.cloudinary.com/dnt0xlngl/raw/upload/v1767025475/Not-found404_i2k1c3.json";

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      maxHeight: '100vh',
      padding: '2rem',
      backgroundColor: 'var(--background-color, #FAF8F1)', // Use CSS variable if valid, else white
      color: 'var(--text-primary, #333)'
    }}>
      <Helmet>
        <title>404 - Page Not Found | Mayuri Saitav</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <DotLottiePlayer
          src={notFoundAnimation}
          autoplay
          loop
          style={{ width: '100%', height: '100%' }}
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
