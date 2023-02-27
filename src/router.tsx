
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './app/pages/error-page';
import Home from './app/pages/home/home-page';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        errorElement: <ErrorPage/>,
    }
]);

export default function Router() {
  return (
      <RouterProvider router={router} />
  );
}
