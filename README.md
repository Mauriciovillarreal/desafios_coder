# EntregasBackEnd
Entreas para el curso CoderHouse-Backend

# Descripción
Esta aplicación es un simple servidor para una tienda en línea que ofrece una API para manejar productos y carritos de compras, así como una interfaz de usuario básica para visualizar y administrar productos.

## Tecnologías Utilizadas
- Node.js
- Express.js
- Handlebars
- Socket.IO

## Funcionalidades
- Gestión de productos: La aplicación permite la creación, lectura, actualización y eliminación (CRUD) de productos a través de una API RESTful.
- Gestión de carritos de compras: Los usuarios pueden agregar productos a un carrito de compras, así como ver y eliminar productos del mismo.
- Interfaz de usuario básica: Se proporciona una interfaz web sencilla para visualizar y administrar productos.

### Instalación
1. Clonar el repositorio en tu máquina local.
2. Abrimos una terminal.
3. Ejecutamos el comando npm install para instalar dependecias.

### API Endpoints
-  GET /api/products: Obtiene la lista de todos los productos.
-  POST /api/products: Crea un nuevo producto.
-  GET /api/products/:id: Obtiene un producto específico por su ID.
-  PUT /api/products/:id: Actualiza un producto existente por su ID.
-  DELETE /api/products/:id: Elimina un producto por su ID.
-  POST /api/carts/add/:productId: Agrega un producto al carrito de compras.
-  GET /api/carts: Obtiene el contenido del carrito de compras.

### Licencias
Este proyecto esta licenciado bajo MIT.