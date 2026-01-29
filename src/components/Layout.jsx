import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import CustomCursor from './CustomCursor';
import Loading from './Loading';
import SmoothScroll from './SmoothScroll';
import ScrollToTop from './ScrollToTop';
import { Analytics } from "@vercel/analytics/react"
const Layout = () => {
  return (
    <>
      {/* Accessibility: Skip to Main Content */}
      <a 
        href="#main-content" 
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          const main = document.getElementById('main-content');
          if (main) {
            main.tabIndex = -1;
            main.focus({ preventScroll: true }); // Position first, then focus
            main.scrollIntoView({ behavior: 'smooth' }); // Let browser handle scroll or Lenis will catch native scroll if configured, but manual is safer here
            main.removeAttribute('tabindex'); // Optional cleanup but keeping it -1 is standard
          }
        }}
        style={{
          position: 'absolute',
          top: '-9999px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#646cff',
          color: 'white',
          padding: '1rem',
          zIndex: 9999,
          textDecoration: 'none',
          borderRadius: '0 0 8px 8px',
          fontWeight: 'bold',
          transition: 'top 0.3s'
        }}
        onFocus={(e) => e.target.style.top = '0'}
        onBlur={(e) => e.target.style.top = '-9999px'}
      >
        Skip to Main Content
      </a>
      <ScrollToTop />
      <CustomCursor />
      <Analytics />
      <SmoothScroll>
        <Suspense fallback={<Loading />}>
          <main id="main-content" tabIndex="-1" style={{ outline: 'none' }}>
            <Outlet />
          </main>
        </Suspense>
      </SmoothScroll>
    </>
  );
};

export default Layout;
