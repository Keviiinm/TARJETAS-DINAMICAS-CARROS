// *CREAMOS LAS CONSTANTES PARA LOS ELEMNTOS PRINCIPALES
const inputFoto = document.getElementById("foto")
const inputNombre = document.getElementById("nombre")
const inputMarca = document.getElementById("marca")
const inputModelo = document.getElementById("modelo")
const inputKilometraje = document.getElementById("kilometraje")
const inputPrecio = document.getElementById("precio")
const card = document.getElementById("cont-cards2")
const addBtn = document.getElementById("agregar")

// *CREAMOS LA FUNCION QUE NOS PERMITA CREAR UNA NUEVA TAREA APARTIR DEL FORMULARIO
// *TODA ETIQUETA QUE VAMOS ACREAR ES APARTIR DE LA MAQUETA HTML PRE EXISTENTE

function createVehicle(foto, nombre, marca, modelo, kilometraje, precio) {

    // *creamos el nodo o elemento padre
    const padre = document.createElement("div");
    padre.classList.add("col-md-6", "cont-cards");


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
    h3.textContent = nombre;

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
    btnComprar.id = 'button_comprar';
    btnComprar.textContent = "Comprar";

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger");
    btnEliminar.textContent = "Eliminar";

    // *ENSAMBLAMOS LA ESTRUCTURA
     padre.appendChild(col);
     col.appendChild(img);
    col.appendChild(cardBody);

    

    cardBody.appendChild(h3);
    cardBody.appendChild(h4Marca);
    cardBody.appendChild(h4Modelo);
    cardBody.appendChild(h4km);
    cardBody.appendChild(precio1);
    cardBody.appendChild(divBtns);
    divBtns.appendChild(btnComprar);
    divBtns.appendChild(btnEliminar);

    

   

    // retornar la tarjeta completa
    return padre;
}


const form = document.getElementById("vehiculo-form");


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


    if (foto == "") {
        foto = 'https://cdn-icons-png.freepik.com/512/6356/6356630.png'
    }

    if (foto == "" || nombre == "" || marca == "" || modelo == "" || kilometraje == "" || precio == "") {
        alert("no se puede crear una tarea vacia")
    } else {
        const newCol = createVehicle(foto, nombre, marca, modelo, kilometraje, precio);
        // col.appendChild(newCol);

        // inputFoto.value = "";
        // inputNombre.value = "";
        // inputMarca.value = "";
        // inputModelo.value = "";
        // inputKilometraje.value = "";
        // inputPrecio.value = "";
form.reset();
eventsToVehicles(newCol)

    }
    // resetear formulario
    



});



// !CARRITO

function eventsToVehicles(padre) {

    // utilizamos querySelector para capturar el  input y el button que estan dentro del item
    const botonAgregar = padre.querySelector('#button_comprar');
    const botonEliminar = padre.querySelector('.btn-danger');


    // cuando le de en agregar
    botonAgregar.addEventListener('click', () => {
        const fotoPanel = padre.querySelector('img').getAttribute('src');
        const nombrePanel = padre.querySelector('.card-title').textContent;
        const marcaPanel = padre.querySelector('.card-subtitle', 'text-muted').textContent;
        const precioPanel = padre.querySelector('.text-success').textContent;

        const newPanel = itemPanel(fotoPanel, nombrePanel, marcaPanel, precioPanel)

        document.querySelector('.cont-products').appendChild(newPanel);
    });

    // evento de eliminar de la de vehiculos
    botonEliminar.addEventListener('click', () => {
        padre.remove();
    });
    
}



const panel = document.querySelector('.panel');
const carrito = document.getElementById('carrito-panel');

carrito.addEventListener('click', ()=> {
    panel.classList.toggle('activo');
});


function itemPanel(foto, nombre, marca, precio) {

    const divPadrePanel = document.createElement('div');
    divPadrePanel.classList.add('row', 'tarjeta');

    const contImgPanel = document.createElement('div');
    contImgPanel.classList.add('col-md-4', 'cont-img');

    const imgPanel = document.createElement('img');
    imgPanel.setAttribute('src', foto);

    const contInfoPanel = document.createElement('div');
    contInfoPanel.classList.add('col-md-8', 'cont-info');

    const h3Nombre = document.createElement('h3');
    h3Nombre.textContent = nombre

    const h3Marca = document.createElement('h3');
    h3Marca.textContent = marca;

    const h3Precio = document.createElement('h3');
    h3Precio.textContent = precio

    const btnEliminar = document.createElement('h3');
    btnEliminar.classList.add('btn-original')
    btnEliminar.textContent = 'X'
    btnEliminar.addEventListener('click', () => divPadrePanel.remove());

    // ENSAMBLAMOS TODO EL HTML DEL ITEM DE LA CARD DEL PANEL

    contImgPanel.appendChild(imgPanel);
    contInfoPanel.appendChild(h3Nombre);
    contInfoPanel.appendChild(h3Marca);
    contInfoPanel.appendChild(h3Precio);
    contInfoPanel.appendChild(btnEliminar);

    divPadrePanel.appendChild(contImgPanel);
    divPadrePanel.appendChild(contInfoPanel);

    return divPadrePanel;
}
