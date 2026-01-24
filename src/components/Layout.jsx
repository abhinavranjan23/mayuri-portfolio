import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import CustomCursor from './CustomCursor';
import Loading from './Loading';
import SmoothScroll from './SmoothScroll';
import ScrollToTop from './ScrollToTop';

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <SmoothScroll>
        <Suspense fallback={<Loading />}>
          <main>
            <Outlet />
          </main>
        </Suspense>
      </SmoothScroll>
    </>
  );
};

export default Layout;
