import React from 'react';
import workingPageImg from '../assets/workingpage.png';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Work = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh', 
      width: '100%',
      backgroundColor: '#f9f9f9', // Light bg to make white pop
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '2rem',
        textAlign: 'center',
        zIndex: 10
      }}>
          <img 
            src={workingPageImg} 
            alt="Work in Progress" 
            style={{
              maxWidth: '100%',
              height: 'auto',
              marginBottom: '1rem',
              maxHeight: '400px', 
              objectFit: 'contain'
            }}
          />
          <h2 style={{
            fontFamily: 'var(--font-family, Pangolin, sans-serif)',
            fontSize: '1.5rem',
            color: 'var(--text-primary, #333)', 
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

      <Footer />
    </div>
  );
};



export default Work;
