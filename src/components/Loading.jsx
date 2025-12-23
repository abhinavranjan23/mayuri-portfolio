import React from 'react';
const flowerCursor = '/cursors/flower.svg';

const Loading = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: '#ffffff',
      zIndex: 9999,
      flexDirection: 'column',
      gap: '20px'
    }}>
      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse-opacity {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `}
      </style>
      <img 
        src={flowerCursor} 
        alt="Loading..." 
        style={{
          width: '60px',
          height: '60px',
          animation: 'spin-slow 3s linear infinite'
        }} 
      />
      <div style={{
        fontFamily: "'Pangolin', sans-serif",
        color: '#666',
        fontSize: '1.2rem',
        animation: 'pulse-opacity 1.5s ease-in-out infinite'
      }}>
        Loading...
      </div>
    </div>
  );
};

export default Loading;
