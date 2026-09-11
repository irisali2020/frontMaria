import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token_sesion') || null;
  });

  const usuarioLogueado = Boolean(token);

  const login = (email, password) => {
    // CAMBIO 1: Actualizamos el correo para TiendaMaría
    if (email === 'admin@tiendamaria.com' && password === 'arti3489') {
      
      // CAMBIO 2: Actualizamos el nombre del token simulado
      const tokenSimulado = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockTokenParaTiendaMaria";
      
      setToken(tokenSimulado);
      localStorage.setItem('token_sesion', tokenSimulado);
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token_sesion');
  };

  return (
    <AuthContext.Provider value={{ usuarioLogueado, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);