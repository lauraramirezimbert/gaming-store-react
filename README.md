🎮 Gaming Store

Gaming Store es una tienda online de productos gamer desarrollada con React. Permite explorar un catálogo de productos, consultar sus detalles, gestionar un carrito de compras y realizar pedidos.

También cuenta con registro e inicio de sesión de usuarios y un panel de administración para gestionar los productos de la tienda.

🚀 Tecnologías utilizadas

React 19: desarrollo de interfaces.

Vite: entorno de desarrollo y compilación.

React Router DOM: navegación y rutas.

Firebase Authentication: registro e inicio de sesión.

Cloud Firestore: almacenamiento de productos y órdenes.

Bootstrap 5: estilos y diseño responsive.

React Bootstrap: componentes de interfaz y grillas.

Styled Components: estilos mediante componentes.

React Icons y Lucide React: iconografía.

React Helmet Async: administración de títulos y metadatos.

📋 Funcionalidades

Catálogo de productos

Visualización de productos disponibles.

Búsqueda de productos en tiempo real.

Navegación por categorías.

Paginación del catálogo.

Acceso al detalle de cada producto.

Carrito de compras

Agregar productos al carrito.

Aumentar y disminuir cantidades.

Eliminar productos.

Vaciar el carrito.

Cálculo automático de cantidades y total.

Usuarios y autenticación

Registro de usuarios.

Inicio y cierre de sesión.

Acceso al perfil del usuario.

Protección de rutas privadas.

Panel de administración

Acceso restringido al administrador autorizado.

Alta de productos.

Edición de productos.

Eliminación de productos con confirmación.

Validación de formularios.

Mensajes de error y confirmación.

Finalización de compra

Formulario con datos del comprador.

Registro de órdenes en Firestore.

Confirmación de compra.

Visualización del identificador de la orden.

Diseño y navegación

Diseño responsive.

Componentes reutilizables.

Navegación mediante React Router.

Títulos y descripciones específicos para cada página.

⚙️ Instalación y ejecución

1. Clonar el repositorio

git clone https://github.com/lauraramirezimbert/gaming-store-react.git

2. Ingresar a la carpeta del proyecto

cd gaming-store-react

3. Instalar las dependencias

npm install

4. Iniciar el servidor de desarrollo

npm run dev

Vite mostrará en la terminal la dirección local para abrir la aplicación en el navegador.

🛠️ Scripts disponibles

Comando

Descripción

npm run dev

Inicia el servidor de desarrollo.

npm run build

Genera la versión de producción.

npm run preview

Permite previsualizar la versión compilada.

npm run lint

Ejecuta ESLint para revisar el código.

🔥 Configuración de Firebase

El proyecto utiliza Firebase Authentication y Cloud Firestore.

Para ejecutar la aplicación es necesario contar con un proyecto de Firebase configurado y habilitar:

Authentication con el proveedor Email/Password.

Cloud Firestore como base de datos.

También es necesario configurar las credenciales del proyecto en el archivo src/firebase.js.

Las reglas de seguridad de Firestore deben estar configuradas para restringir las operaciones administrativas a la cuenta autorizada.

📱 Compatibilidad

La aplicación está desarrollada con tecnologías web y puede ejecutarse desde navegadores modernos en computadoras, tablets y dispositivos móviles.

👩‍💻 Autoría

Proyecto académico desarrollado como parte de una práctica de desarrollo web con React.

Gaming Store | Tu espacio gamer 🎮