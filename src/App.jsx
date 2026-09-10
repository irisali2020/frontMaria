import { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// 1. Importa tus componentes de vistas
import Productos from './componentes/Productos.jsx';
import Footer from './componentes/Footer.jsx';
// Asegúrate de que las rutas a Login y Dashboard coincidan con tus carpetas
import Login from './pages/Login.jsx'; 
import Dashboard from './pages/Dashboard.jsx'; 
// import Navbar from './componentes/Navbar.jsx'; // Descomenta si tienes un Navbar separado

const App = () => {
  const footerRef = useRef(null);

  const manejarScrollAlFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Empaquetamos tu vista original para mantener el código ordenado
  const VistaInicio = (
    <>
      <h1>Mi Tienda en Linea</h1>
      <Productos alHacerClickContacto={manejarScrollAlFooter} />
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );

  return (
    <div>
      {/* 2. El Navbar debe ir FUERA de Routes para que se vea en todas las páginas */}
      {/* <Navbar /> */}

      {/* 3. Definimos qué componente se muestra en cada URL */}
      <Routes>
        <Route path="/" element={VistaInicio} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
     <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;