import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Productos = ({ alHacerClickContacto }) => { 
  const [listaProductos, setListaProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  // Inicializamos los hooks para la navegación y validación de sesión
  const navigate = useNavigate();
  const { usuarioLogueado } = useAuth();

  useEffect(() => {
    const obtenerProductos = async () => {
      setCargando(true);
      try {
        const url = `${import.meta.env.VITE_API_URL}/products?page=${paginaActual}&search=${busqueda}&category=${categoria}`;
        
        const respuesta = await fetch(url);        
        const datos = await respuesta.json();
        console.log("Respuesta del backend:", datos);

        setListaProductos(datos.productos || datos); 
        if (datos.totalPages) setTotalPaginas(datos.totalPages);
        
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, [paginaActual, busqueda, categoria]); 

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h2 className="m-0">Nuestros Productos</h2>
        
        {/* Agrupamos los botones usando flexbox y un gap para separarlos */}
        <div className="d-flex gap-2">
          <button 
            className="btn btn-primary px-4 fw-bold shadow-sm"
            onClick={alHacerClickContacto} 
          >
            Información de Contacto 
          </button>

          {/* Renderizado condicional del botón de sesión */}
          {usuarioLogueado ? (
            <button 
              onClick={() => navigate('/dashboard')}
              className="btn btn-success px-4 fw-bold shadow-sm"
            >
              Ir al Dashboard
            </button>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="btn btn-outline-secondary px-4 fw-bold shadow-sm"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Buscar por nombre..." 
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPaginaActual(1); 
            }}
          />
        </div>
        <div className="col-md-6 mb-2">
          <select 
            className="form-select" 
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
              setPaginaActual(1); 
            }}
          >
            <option value="">Todas las categorías</option>
            <option value="cocina">Cocina</option>
            <option value="lavanderia">Lavandería</option>
            <option value="entretenimiento">Entretenimiento</option>
            <option value="playa">Playa</option>
            <option value="sala">Sala</option>
            <option value="recibo">Recibo</option>
            <option value="viaje">Viaje</option>
            <option value="dormitorio">Dormitorio</option>
            <option value="sitio de trabajo">Sitio de trabajo</option>
            <option value="estudio">Estudio</option>
            <option value="varios">Varios</option>
            <option value="balcon">Balcón</option>
            <option value="ropa">Ropa</option>
            <option value="salud">Salud</option>
            <option value="comedor">Comedor</option>
            <option value="adorno">Adorno</option>
            <option value="miscelaneos">Miscelaneos</option>            
          </select>
        </div>
      </div>

      {cargando ? (
        <div className="text-center my-5"><p>Cargando productos...</p></div>
      ) : listaProductos.length === 0 ? (
        <div className="text-center my-5"><p>No se encontraron productos.</p></div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {listaProductos.map((producto) => (
              <div key={producto.id || producto._id} className="col">
                <div className="card h-100 shadow-sm position-relative">
                  
                  {/* Atención aquí: en el dashboard usamos 'producto.imagen', pero aquí esperas un arreglo 'producto.imagenes'. 
                      Asegúrate de que ambas partes usen el mismo formato para que las imágenes carguen correctamente. */}
                  {producto.imagen ? (
                    <div style={{ height: '240px', background: '#f8f9fa', display: 'flex', alignItems: 'center' }}>
                      <img 
                        src={producto.imagen} 
                        className="card-img-top p-3"
                        alt={producto.nombre} 
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', margin: '0 auto' }}
                      />
                    </div>
                  ) : producto.imagenes && producto.imagenes.length > 0 && (
                    <div style={{ height: '240px', background: '#f8f9fa', display: 'flex', alignItems: 'center' }}>
                      <img 
                        src={`/${producto.imagenes[0]}`} 
                        className="card-img-top p-3"
                        alt={producto.nombre} 
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', margin: '0 auto' }}
                      />
                    </div>
                  )}
                  
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-dark fw-bold mb-2">{producto.nombre}</h5>
                    <div className="mb-3 flex-grow-1 d-flex align-items-center flex-wrap gap-2">
                      <span className="badge bg-secondary text-capitalize px-2 py-1.5" style={{ fontSize: '0.8rem' }}>
                        {producto.categoria}
                      </span>
                      {producto.condicion === 'usado' && (
                        <span className="badge bg-warning text-dark text-capitalize px-2 py-1.5" style={{ fontSize: '0.8rem' }}>Usado</span>
                      )}
                      {producto.vendido && (
                        <span className="badge bg-danger text-capitalize px-2 py-1.5" style={{ fontSize: '0.8rem' }}>Vendido</span>
                      )}
                    </div>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="fs-5 fw-bold text-success">
                        ${producto.precio ? Number(producto.precio).toFixed(2) : '0.00'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center align-items-center mt-5 gap-3">
            <button 
              className="btn btn-outline-secondary" 
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual(paginaActual - 1)}
            >
              Anterior
            </button>
            <span>Página {paginaActual} de {totalPaginas}</span>
            <button 
              className="btn btn-outline-secondary" 
              disabled={paginaActual === totalPaginas}
              onClick={() => setPaginaActual(paginaActual + 1)}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Productos;