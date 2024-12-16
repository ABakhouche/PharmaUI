import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './HomePage.jsx';
import './index.css';
import './input.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Requests from "./Requests.jsx";
import PrivateRoute from './PrivateRoute.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/Requests',
        element: (
            <PrivateRoute>
                <Requests />
            </PrivateRoute>
        ),
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);

