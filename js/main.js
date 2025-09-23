// *CREAMOS LAS CONSTANTES PARA LOS ELEMNTOS PRINCIPALES
const inputFoto = document.getElementById ("foto")
const inputNombre = document.getElementById ("nombre")
const inputMarca = document.getElementById ("marca")
const inputModelo = document.getElementById ("modelo")
const inputKilometraje = document.getElementById ("kilometraje")
const inputPrecio = document.getElementById ("precio")
const card = document.getElementById ("cont-cards2")
const addBtn = document.getElementById("agregar")

// *CREAMOS LA FUNCION QUE NOS PERMITA CREAR UNA NUEVA TAREA APARTIR DEL FORMULARIO
// *TODA ETIQUETA QUE VAMOS ACREAR ES APARTIR DE LA MAQUETA HTML PRE EXISTENTE

function createVehicle(foto, nombre, marca, modelo, kilometraje, precio){
    
    // *creamos el nodo o elemento padre
    const padre = document.createElement("div");
    padre.classList.add("cont-cards");


    const col = document.createElement("div");
    col.classList.add("card", "h-100");

    const img = document.createElement("img");
    img.src = foto
    img.alt = "foto vehiculo"
    img.classList.add("card-img-top", "w-100");


    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    
    const h3 = document.createElement("h3");
    h3.classList.add("card-title");
    h3.textContent =  nombre;

    const h4Marca = document.createElement("h4");
    h4Marca.classList.add("h4");
    h4Marca.textContent = marca;

    const h4Modelo = document.createElement("h4");
    h4Modelo.classList.add("card-text");
    h4Modelo.textContent = ("Modelo: ") + modelo;

    const h4km = document.createElement("h4");
    h4km.classList.add("card-text");
    h4km.textContent = ("kilometraje: ") + kilometraje;

    const precio1 = document.createElement("h2");
    precio1.classList.add("text-success");
    precio1.textContent = ("$ ") + precio;


    const divBtns = document.createElement("div");
    divBtns.classList.add("d-flex", "justify-content.between", "mt-3");

    const btnComprar = document.createElement("button");
    btnComprar.classList.add("btn", "btn-success");
    btnComprar.textContent = "Comprar";

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger");
    btnEliminar.textContent = "Eliminar";

    // *ENSAMBLAMOS LA ESTRUCTURA

    divBtns.appendChild(btnComprar);
    divBtns.appendChild(btnEliminar);

    cardBody.appendChild(h3);
    cardBody.appendChild(h4Marca);
    cardBody.appendChild(h4Modelo);
    cardBody.appendChild(h4km);
    cardBody.appendChild(precio1);
    cardBody.appendChild(divBtns);

    col.appendChild(img);
    col.appendChild(cardBody);

    padre.appendChild(col);

    // retornar la tarjeta completa
    return padre;
}


const form  = document.getElementById("vehiculo-form");


    form.addEventListener("submit", (e) => {
    e.preventDefault();

    // captura los valores de los inputs
    const foto = inputFoto.value.trim();
    const nombre = inputNombre.value.trim();
    const marca = inputMarca.value.trim();
    const modelo = inputModelo.value.trim();
    const kilometraje = inputKilometraje.value.trim();
    const precio = inputPrecio.value.trim();

    // crea la tarjeta
    const newCard = createVehicle(foto, nombre, marca, modelo, kilometraje, precio);
    card.appendChild(newCard)
    // agrega al contenedor
    
    
    if (foto== "" || nombre =="" || marca =="" || modelo =="" || kilometraje =="" || precio =="" ){
        alert("no se puede crear una tarea vacia")
    }else{
        const newCol = createVehicle(foto, nombre, marca, modelo, kilometraje, precio);
        col.appendChild(newCol)

        inputFoto.value="";
        inputNombre.value="";
        inputMarca.value="";
        inputModelo.value="";
        inputKilometraje.value="";
        inputPrecio.value="";

        
    }
    // resetear formulario
    form.reset();

    
    


    // !==================== PANEL CARRITO ====================
    const btnCarro = document.getElementById("carrito-btn");
    const carritoPanel = document.getElementById("carrito-panel");
    const cerrarCarrito = document.getElementById("cerrar-carrito");

    btnCarro.addEventListener("click", () => {
    carritoPanel.classList.add("abierto");
    });
    cerrarCarrito.addEventListener("click", () => {
    carritoPanel.classList.remove("abierto");
    });

    // ==================== LÓGICA DEL CARRITO ====================
    const contenedorVehiculos = document.getElementById("cont-cards2");
    const carritoLista = document.getElementById("carrito-lista");
    const contador = document.getElementById("contador");

    // Contenedor para total
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("p-3", "border-top", "fw-bold");
    carritoLista.insertAdjacentElement("afterend", totalDiv);

    let carrito = [];

    // Renderizar carrito
    function renderizarCarrito() {
    carritoLista.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("carrito-item", "d-flex", "align-items-center", "mb-3");

        itemDiv.innerHTML = `
        <img src="${item.foto}" alt="${item.nombre}" width="70" class="me-2 rounded">
        <div class="detalles flex-grow-1">
            <h5 class="mb-0">${item.nombre}</h5>
            <small>Marca: ${item.marca}</small><br>
            <small>Modelo: ${item.modelo}</small><br>
            <span class="text-success">$${item.precio.toLocaleString()}</span>
        </div>
        <button class="btn btn-sm btn-outline-danger btn-eliminar">❌</button>
        `;

        // Eliminar producto del carrito
        itemDiv.querySelector(".btn-eliminar").addEventListener("click", () => {
        carrito.splice(index, 1);
        actualizarContador();
        renderizarCarrito();
        });

        carritoLista.appendChild(itemDiv);
    });

    totalDiv.textContent = "total: " + total.toLocaleString();
    }

    // Actualizar contador
    function actualizarContador() {
    contador.textContent = carrito.length;
    }

    // Delegación de eventos para botón "Comprar"
    contenedorVehiculos.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-comprar")) {
        const card = e.target.closest(".card");
        const foto = card.querySelector("img").src;
        const nombre = card.querySelector(".card-title").textContent;
        const marca = card.querySelector(".card-subtitle").textContent;
        const modelo = card.querySelectorAll(".card-text")[0].textContent.split(": ")[1];
        const precioTexto = card.querySelector(".text-success").textContent.replace(/[^\d]/g, "");
        const precio = parseInt(precioTexto);

        const vehiculo = { foto, nombre, marca, modelo, precio };

        carrito.push(vehiculo);
        actualizarContador();
        renderizarCarrito();
    }
    });
    

});
