import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token_sesion') || null;
  });

  const usuarioLogueado = Boolean(token);

  const login = async (email, password) => {
    try {
      // Tomamos la URL del backend desde la variable de entorno o localhost
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

      const respuesta = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await respuesta.json();

      if (respuesta.ok && data.success) {
        // Generamos o asignamos el token de sesión
        const tokenSimulado = data.token || "mockTokenParaTiendaMaria";

        setToken(tokenSimulado);
        localStorage.setItem('token_sesion', tokenSimulado);

        return true;
      }

      return false;
    } catch (error) {
      console.error("Error en la autenticación:", error);
      return false;
    }
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