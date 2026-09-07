import { useRef } from 'react';
import Productos from './componentes/Productos.jsx';
import Footer from './componentes/Footer.jsx'; // O como se llame tu componente de pie de página

const App = () => {
  const footerRef = useRef(null);

  const manejarScrollAlFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Contenido, Navbar, etc. */}
      <h1>Mi Tienda en Linea</h1>
      
      {/* Le pasamos la función al botón de productos */}
      <Productos alHacerClickContacto={manejarScrollAlFooter} />
      
      {/* Le asignamos la referencia al Footer */}
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default App;