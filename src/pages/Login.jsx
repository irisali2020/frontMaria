import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { toast } from 'react-toastify'; 
import styled from 'styled-components';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Redirigimos al dashboard por defecto si no viene de una ruta protegida
  const from = location.state?.from?.pathname || "/dashboard";

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      // Llamada asíncrona al login conectado con el backend
      const esValido = await login(email, password);

      if (esValido) {
        toast.success('¡Bienvenido! Sesión iniciada correctamente.');
        navigate(from, { replace: true });
      } else {
        toast.error('Credenciales incorrectas. Verifica tu email y contraseña.');
      }
    } catch (error) {
      toast.error('Error al conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={estilos.contenedor}>
      <form onSubmit={manejarEnvio} style={estilos.formulario}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Acceso Administrativo</h2>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={estilos.input}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={estilos.input}
          required
        />
        
        <BotonMagico type="submit" disabled={cargando}>
          {cargando ? 'Verificando...' : 'Ingresar al Dashboard'}
        </BotonMagico>
      </form>
    </div>
  );
}

const estilos = {
  contenedor: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '20px' 
  },
  formulario: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    width: '100%', 
    maxWidth: '400px', 
    textAlign: 'center'
  },
  input: {
    marginBottom: '15px',
    padding: '12px', 
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem'
  }
};

const BotonMagico = styled.button`
  padding: 12px;
  background-color: rgb(117, 119, 241);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 10px;
  width: 100%;
  transition: all 0.3s ease; 

  &:hover {
    background-color: rgb(90, 92, 210); 
    transform: translateY(-3px); 
    box-shadow: 0 6px 15px rgba(117, 119, 241, 0.4); 
  }

  &:active {
    transform: translateY(0); 
    box-shadow: 0 2px 5px rgba(117, 119, 241, 0.4); 
  }

  &:disabled {
    background-color: #a0a2f3;
    cursor: not-allowed;
    transform: none;
  }
`;

export default Login;

