import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from './pages/Root';
import Shop from './pages/Shop.jsx'
import Admin from './pages/Admin.jsx'
import TestRedux from './pages/TestRedux.jsx';
import AuthPage, { action as authAction } from './pages/AuthenticationPage';
import { action as logoutAction } from './pages/Logout.js'
import { getAuthToken } from './util/auth';
import { Provider } from 'react-redux'
import store from './store/index.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <h2>An error occured!</h2>,
    id: 'root',
    loader: getAuthToken,
    children: [
      {
        index: true,
        element: <Shop />,
      },
      {
        path: '/auth',
        element: <AuthPage />,
        action: authAction
      },
      {
        path: '/testredux', /* test redux */
        element: <TestRedux/>,
      },
      {
        path: '/admin',
        element: <Admin/>
      },
      {
        path: '/logout',
        action: logoutAction
      }
    
    ]
  }
]);

/* ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
); */

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);