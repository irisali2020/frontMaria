// Función auxiliar para resolver la ruta en public/img
const obtenerRutaImagen = (nombreOUrl) => {
  if (!nombreOUrl) return 'https://placehold.co/250x120?text=Sin+Imagen';

  // Si por alguna razón ya viene con la ruta '/img/' o es una URL externa
  if (nombreOUrl.startsWith('http') || nombreOUrl.startsWith('/img/')) {
    return nombreOUrl;
  }

  // Si viene con 'img/' sin la barra inicial
  if (nombreOUrl.startsWith('img/')) {
    return `/${nombreOUrl}`;
  }

  // Si solo viene el nombre del archivo (ej. "pantalon.jpg")
  return `/img/${nombreOUrl}`;
};