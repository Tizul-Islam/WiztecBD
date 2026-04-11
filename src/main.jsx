import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import AuthProvider from './providers/AuthProvider.jsx';
import { RouterProvider } from "react-router-dom";
import { router } from './Router/Router';
import { PropertyProvider } from './context/PropertyContext.jsx';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PropertyProvider>
        <RouterProvider router={router} />
      </PropertyProvider>
    </AuthProvider>
  </StrictMode>,
)
