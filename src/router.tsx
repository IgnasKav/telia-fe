import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from 'react-router-dom';
import ErrorPage from './app/pages/error-page';
import Home from './app/pages/home/home-page';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        loader: () => redirect('/1'),
        errorElement: <ErrorPage />,
    },
    {
        path: '/:pageNumber',
        element: <Home />,
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
