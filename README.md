*Proyecto Vehículos DOM + LocalStorage*

Este repositorio contiene un proyecto web que permite gestionar un catálogo de vehículos mediante manipulación del DOM y almacenamiento en LocalStorage. La idea es simular una pequeña tienda donde se pueden agregar, mostrar, eliminar y comprar vehículos, manteniendo los datos aún después de recargar la página.

*Descripción del Proyecto*

El objetivo de este proyecto es practicar y aplicar los conceptos de manipulación del DOM en JavaScript y el uso de LocalStorage para la persistencia de datos. A través de un formulario se pueden agregar vehículos con información detallada (imagen, marca, modelo, kilometraje y precio). Estos vehículos se muestran como tarjetas dinámicas y también se pueden añadir a un carrito lateral que calcula el total de la compra.

*Contenido del Repositorio*
A continuación, se presenta una lista de las principales funcionalidades implementadas en este proyecto:
Creación dinámica de tarjetas de vehículos
Generación de elementos HTML a partir de los datos del formulario.
Inclusión de imagen, nombre, marca, modelo, kilometraje y precio en cada tarjeta.

*Gestión de LocalStorage*
Guardado automático de los vehículos creados.
Carga de vehículos y compras previas al iniciar la página.
Carrito de compras (panel lateral)
Agregar vehículos al carrito con su respectiva información.
Cálculo automático del total y cantidad de vehículos.
Eliminación de vehículos del carrito con actualización en LocalStorage.
Interactividad con el usuario
Validaciones de formulario (no permitir campos vacíos).
Botones de "Comprar" y "Eliminar" en cada tarjeta.
Panel lateral desplegable para visualizar las compras.

*Posibles mejoras futuras*
Implementar buscador y filtros para los vehículos.
Añadir categorías o tipos de vehículos.
Optimizar el diseño responsivo del carrito.
Usar IndexedDB como alternativa más avanzada a LocalStorage.
