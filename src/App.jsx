import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';

import Loading from './components/Loading';
import SmoothScroll from './components/SmoothScroll';
import ScrollToTop from './components/ScrollToTop';
// Code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ContentDesign = lazy(() => import('./pages/ContentDesign'));
const PhotoContent = lazy(() => import('./pages/PhotoContent'));
const VideoContent = lazy(() => import('./pages/VideoContent'));
const SocialStats = lazy(() => import('./pages/SocialStats'));
const Services = lazy(() => import('./pages/Services'));



function App() {
  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      <SmoothScroll>
        <Suspense fallback={<Loading />}>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/content-design" element={<ContentDesign />} />
              <Route path="/content-design/photo-content" element={<PhotoContent />} />
              <Route path="/content-design/video-content" element={<VideoContent />} />
              <Route path="/content-design/social-stats" element={<SocialStats />} />
              <Route path="/content-design/services" element={<Services />} />
              {/* <Route path="/work" element={<Work />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Suspense>
      </SmoothScroll>
    </Router>
  );
}

export default App;
