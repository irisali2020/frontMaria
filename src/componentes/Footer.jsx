import { useState } from 'react';

const Footer = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5 border-top border-secondary">
      <div className="container">
        <div className="row text-center text-md-start align-items-center g-4">
          
          {/* Sección de Contacto Comercial (Más grande y destacada) */}
          <div className="col-12 col-md-7 mb-2 mb-md-0">
            {/* Aumentamos a fs-4 el título */}
            <h5 className="text-uppercase fw-bold text-warning mb-3" style={{ letterSpacing: '1px' }}>
              Información de Contacto
            </h5>
            {/* Usamos fs-5 para que el texto de María sea bastante legible */}
            <p className="mb-2 text-white-50 fs-5">
              Los interesados pueden comunicarse con: <strong className="text-light text-decoration-underline">Maria Ubieda</strong>
            </p>
            {/* Agregamos fs-5 también a los enlaces de contacto */}
            <p className="mb-0 fs-5">              
              <span className="mx-2 text-secondary d-none d-lg-inline">|</span> 
              <br className="d-block d-lg-none my-2" />
              ✉️ <span className="text-white-50">Email:</span> <a href="mailto:mariaubieda1@gmail.com" className="text-warning text-decoration-none fw-bold bg-secondary bg-opacity-25 px-2 py-1 rounded">mariaubieda1@gmail.com</a>
            </p>
          </div>

          {/* Sección de Créditos del Desarrollador (Mediana-Grande) */}
          <div className="col-12 col-md-5 text-center text-md-end">
            {/* Aumentamos a fs-5 el título de soporte */}
            <h5 className="text-uppercase fw-bold text-info mb-3" style={{ letterSpacing: '1px' }}>
              Soporte Técnico
            </h5>
            {/* Cambiamos a fs-5 el crédito principal */}
            <p className="mb-2 fs-5 text-white-50">
              Desarrollado por: <strong className="text-light">Iris Henriquez</strong>
            </p>
            {/* Ajustamos a fs-5 el correo del desarrollador */}
            <p className="mb-0 fs-5">
              ✉️ <span className="text-white-50">Email:</span> <a href="mailto:vivasiris9@gmail.com" className="text-info text-decoration-none fw-semibold">vivasiris9@gmail.com</a>
            </p>
          </div>

        </div>

        <hr className="bg-secondary my-4 opacity-25" />
        
        <div className="text-center">
          <small className="text-white-50" style={{ fontSize: '0.8rem' }}>
            &copy; {anioActual} Todos los derechos reservados.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;