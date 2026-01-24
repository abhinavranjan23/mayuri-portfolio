import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';

// Code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ContentDesign = lazy(() => import('./pages/ContentDesign'));
const PhotoContent = lazy(() => import('./pages/PhotoContent'));
const VideoContent = lazy(() => import('./pages/VideoContent'));
const SocialStats = lazy(() => import('./pages/SocialStats'));
const Services = lazy(() => import('./pages/Services'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />, // Handle errors at the root level
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "content-design",
        children: [
          {
            index: true,
            element: <ContentDesign />,
          },
          {
            path: "photo-content",
            element: <PhotoContent />,
          },
          {
            path: "video-content",
            element: <VideoContent />,
          },
          {
            path: "social-stats",
            element: <SocialStats />,
          },
          {
            path: "services",
            element: <Services />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
