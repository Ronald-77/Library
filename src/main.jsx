import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './router';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { SessionContextProvider } from './contexts/SessionContext';




ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <SessionContextProvider>
      <RouterProvider router={router} />
    </SessionContextProvider>
  </ThemeContextProvider>
)
