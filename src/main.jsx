import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './providers/AuthProvider.jsx';
import { RouterProvider } from "react-router-dom";
import { router } from './Router/Router';
import { PropertyProvider } from './context/PropertyContext.jsx';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PropertyProvider>
        <div className="max-w-[1440px] mx-auto bg-white">
          <RouterProvider router={router} />
        </div>
      </PropertyProvider>
    </AuthProvider>
  </StrictMode>,
)
