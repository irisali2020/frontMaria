# TiendaMariaMejoradaFront (FrontMaria)

Aplicación cliente del proyecto **TiendaMariaMejorada**, desarrollada con fines educativos. La plataforma ofrece un catálogo de artículos para compras mediante contacto directo por correo electrónico con el vendedor, además de un panel de control para la gestión de productos.

---

## Características Principales

* **Catálogo de productos:** Visualización y filtrado de artículos disponibles para compra.
* **Contacto directo:** Conexión vía correo electrónico entre el cliente y el vendedor para concretar pedidos.
* **Dashboard administrativo:** Panel para crear, editar y gestionar el catálogo de artículos.
* **Gestión de imágenes:** Fotografías servidas directamente desde los assets locales del proyecto.

---

## Integraciones y Dependencias

* **Backend:** Consume la API REST de **BackendMaria**.
* **Base de Datos:** Los datos provienen de Cloud Firestore a través del proyecto de Firebase **MariaArticulos**.

---

## Requisitos Previos

* [Node.js](https://nodejs.org/) (versión LTS recomendada)
* Instancia activa del servicio **BackendMaria** (localmente o desplegada en Vercel)

---

## Instalación y Configuración

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO_FRONT>
   cd FrontMaria