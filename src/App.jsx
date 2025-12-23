import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';

import Loading from './components/Loading';
import SmoothScroll from './components/SmoothScroll';

// Code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Work = lazy(() => import('./components/Work'));

function App() {
  return (
    <Router>
      <CustomCursor />
      <SmoothScroll>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </SmoothScroll>
    </Router>
  );
}

export default App;
