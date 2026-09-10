import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import FormularioProducto from '../componentes/FormularioProducto'; 

function Dashboard() {
  const { logout } = useAuth();
  
  const [productos, setProductos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);

  const API_URL = import.meta.env.VITE_API_MARIA;

  const cargarProductos = async () => {
    try {
      const respuesta = await fetch(API_URL);
      if (respuesta.ok) {
        const datos = await respuesta.json();
        setProductos(datos);
      } else {
        console.error('Error al cargar los productos');
      }
    } catch (error) {
      console.error('Error de conexión con ApiMaria:', error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmar) return;

    try {
      const url = `${API_URL}/${id}`;
      const respuesta = await fetch(url, {
        method: 'DELETE',
      });

      if (respuesta.ok) {
        alert('Producto eliminado correctamente');
        cargarProductos(); 
      } else {
        alert('Hubo un error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar en Firestore:', error);
    }
  };

  const abrirFormularioCrear = () => {
    setProductoAEditar(null); 
    setMostrarFormulario(true);
  };

  const abrirFormularioEditar = (producto) => {
    setProductoAEditar(producto); 
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setProductoAEditar(null);
  };

  const handleExitoFormulario = () => {
    cargarProductos(); 
    cerrarFormulario(); 
  };

  // Helper para armar la ruta hacia public/img
  const formatearSrcImagen = (valor) => {
    if (!valor) return 'https://placehold.co/250x120?text=Sin+Imagen';
    if (valor.startsWith('http://') || valor.startsWith('https://')) return valor;
    if (valor.startsWith('/img/')) return valor;
    if (valor.startsWith('img/')) return `/${valor}`;
    return `/img/${valor}`;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Panel de Administración</h1>
          <p>Gestión de Catálogo - TiendaMaría</p>
        </div>
        <button 
          onClick={logout}
          style={{ padding: '8px 12px', backgroundColor: '#555', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Cerrar Sesión
        </button>
      </div>

      <hr style={{ border: '0', borderTop: '1px solid #ccc', margin: '20px 0' }} />

      {mostrarFormulario ? (
        <FormularioProducto 
          productoActual={productoAEditar}
          onExito={handleExitoFormulario}
          onCancelar={cerrarFormulario}
        />
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2>Catálogo de Mercancía</h2>
            <button 
              onClick={abrirFormularioCrear}
              style={{ padding: '10px 15px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              + Agregar Nuevo Producto
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {productos.length === 0 ? (
              <p>No hay productos registrados en la base de datos.</p>
            ) : (
              productos.map((producto) => {
                // Toma el primer elemento del arreglo imagenes, o las variantes en string
                const rutaOrigen = Array.isArray(producto.imagenes) && producto.imagenes.length > 0
                  ? producto.imagenes[0]
                  : (producto.imagen || producto.foto);

                const srcFinal = formatearSrcImagen(rutaOrigen);

                return (
                  <div key={producto.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: '#fff' }}>
                    <img 
                      src={srcFinal} 
                      alt={producto.nombre || producto.titulo || 'Producto'} 
                      style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }}
                      onError={(e) => { 
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/250x120?text=Sin+Imagen'; 
                      }}
                    />
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>{producto.nombre || producto.titulo}</h3>
                    <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#666' }}>Precio: ${producto.precio}</p>
                    
                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                      <button 
                        onClick={() => abrirFormularioEditar(producto)}
                        style={{ flex: 1, padding: '8px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleEliminar(producto.id)}
                        style={{ flex: 1, padding: '8px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;