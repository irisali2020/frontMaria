import React, { useState, useEffect } from 'react';

export default function FormularioProducto({ productoActual, onExito, onCancelar }) {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    imagen: '',
    condicion: '',
    vendido: 'false' // Lo manejamos como string en el select, luego lo convertimos
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (productoActual) {
      // Si el boolean es true/false, lo pasamos a string para el <select>
      setFormData({
        ...productoActual,
        vendido: String(productoActual.vendido)
      });
    } else {
      setFormData({ nombre: '', precio: '', categoria: '', imagen: '', condicion: '', vendido: 'false' });
    }
  }, [productoActual]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errores[name]) {
      setErrores({ ...errores, [name]: null });
    }
  };

  const validarFormulario = () => {
    let nuevosErrores = {};
    let esValido = true;

    if (!formData.nombre.trim()) { nuevosErrores.nombre = 'El nombre es obligatorio'; esValido = false; }
    if (!formData.precio || formData.precio <= 0) { nuevosErrores.precio = 'Precio inválido'; esValido = false; }
    if (!formData.imagen.trim()) { nuevosErrores.imagen = 'La imagen es obligatoria'; esValido = false; }
    if (!formData.categoria) { nuevosErrores.categoria = 'Selecciona una categoría'; esValido = false; }
    if (!formData.condicion) { nuevosErrores.condicion = 'Selecciona la condición'; esValido = false; }

    setErrores(nuevosErrores);
    return esValido;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!validarFormulario()) return;

    try {
      const urlBase = import.meta.env.VITE_API_MARIA;
      const urlAPI = productoActual ? `${urlBase}/${productoActual.id}` : urlBase;
      const metodoHTTP = productoActual ? 'PUT' : 'POST';

      // Parseamos los datos para que el Backend los reciba con el tipo de dato correcto
      const datosAEnviar = {
        nombre: formData.nombre,
        precio: Number(formData.precio), // Convertido a Número
        categoria: formData.categoria,
        imagen: formData.imagen,
        condicion: formData.condicion,
        vendido: formData.vendido === 'true' // Convertido a Booleano (true/false)
      };

      const respuesta = await fetch(urlAPI, {
        method: metodoHTTP, 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosAEnviar) 
      });

      if (respuesta.ok) {
        alert(productoActual ? '¡Producto actualizado!' : '¡Producto creado!');
        onExito(); 
      } else {
        alert('Hubo un problema al guardar el producto.');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert('No se pudo conectar con el servidor.');
    }
  };

  return (
    <div style={estilos.contenedor}>
      <h2>{productoActual ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
      
      <form onSubmit={handleSubmit} style={estilos.formulario}>
        <div style={estilos.grupo}>
          <label>Nombre del Producto:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} style={estilos.input} />
          {errores.nombre && <span style={estilos.error}>{errores.nombre}</span>}
        </div>

        <div style={estilos.grupo}>
          <label>Precio:</label>
          <input type="number" name="precio" value={formData.precio} onChange={handleChange} style={estilos.input} />
          {errores.precio && <span style={estilos.error}>{errores.precio}</span>}
        </div>

        <div style={estilos.grupo}>
          <label>Condición:</label>
          <select name="condicion" value={formData.condicion} onChange={handleChange} style={estilos.input}>
            <option value="">-- Selecciona --</option>
            <option value="nuevo">Nuevo</option>
            <option value="usado">Usado</option>
          </select>
          {errores.condicion && <span style={estilos.error}>{errores.condicion}</span>}
        </div>

        <div style={estilos.grupo}>
          <label>Categoría:</label>
          <select name="categoria" value={formData.categoria} onChange={handleChange} style={estilos.input}>
            <option value="">-- Selecciona --</option>
            <option value="ropa">Ropa</option>
            <option value="accesorios">Accesorios</option>
            <option value="hogar">Hogar</option>
            <option value="electronica">Electrónica</option>
            <option value="otros">Otros</option>
          </select>
          {errores.categoria && <span style={estilos.error}>{errores.categoria}</span>}
        </div>

        <div style={estilos.grupo}>
          <label>Estado (Vendido):</label>
          <select name="vendido" value={formData.vendido} onChange={handleChange} style={estilos.input}>
            <option value="false">Disponible</option>
            <option value="true">Agotado / Vendido</option>
          </select>
        </div>

        <div style={estilos.grupo}>
          <label>Imagen (URL):</label>
          <input type="text" name="imagen" value={formData.imagen} onChange={handleChange} style={estilos.input} />
          {errores.imagen && <span style={estilos.error}>{errores.imagen}</span>}
          {formData.imagen && (
            <img 
              src={formData.imagen} 
              alt="Preview" 
              style={estilos.imagenPreview}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=Error'; }}
            />
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={estilos.botonGuardar}>
            {productoActual ? 'Actualizar' : 'Guardar'}
          </button>
          <button type="button" onClick={onCancelar} style={estilos.botonCancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

const estilos = {
  contenedor: { padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' },
  formulario: { display: 'flex', flexDirection: 'column', gap: '15px' },
  grupo: { display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left' },
  input: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' },
  botonGuardar: { flex: 1, padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  botonCancelar: { flex: 1, padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  error: { color: 'red', fontSize: '0.8rem' },
  imagenPreview: { width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px', marginTop: '5px' }
};