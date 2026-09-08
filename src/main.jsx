import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // 1. Agrega esta importación
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Envuelve tu App con BrowserRouter */}
    <BrowserRouter> 
      <AuthProvider>
        <App />
      </AuthProvider>      
    </BrowserRouter>
  </React.StrictMode>,
)
