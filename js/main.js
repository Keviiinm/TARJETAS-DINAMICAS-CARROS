const inputFoto = document.getElementById('foto');
const inputNombre = document.getElementById('nombre');
const inputMarca = document.getElementById('marca');
const inputModelo = document.getElementById('modelo');
const inputKilometraje = document.getElementById('kilometraje');
const inputPrecio = document.getElementById('precio');
const cards = document.getElementById('cont-cardss');
const addBtn = document.getElementById('agregar')
const panelLateral = document.querySelector('.panel')




// creamos la funcion que nos permite crear una nueva tarea a partir del formulario
// toda etiqueta que vamos a crear es partir de la maqueta html preexistente

// esta funcion solo crea la estructura del html y la deja en un limbo, aun no la inserta en la pagina


function createVehicle(foto, nombre, marca, modelo, kilometraje, precio) {

    // cramos el nodo o elemento padre

    // contenedor padre de los item
    const padre = document.createElement('div');
    padre.classList.add('col-md-6', 'item-vehiculo');

    const col = document.createElement('div');
    col.classList.add('card', 'h-100');

    const imagen = document.createElement('img');
    imagen.classList.add('card-img-top', 'w-100');
    imagen.setAttribute('src', foto)

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const nombreCarro = document.createElement('h3');
    nombreCarro.classList.add('card-title');
    nombreCarro.textContent = nombre

    const marcaCarro = document.createElement('h4');
    marcaCarro.classList.add('card-subtitle', 'text-muted');
    marcaCarro.textContent = marca

    const modeloCarro = document.createElement('h4');
    modeloCarro.classList.add('card-text');
    modeloCarro.textContent = 'Modelo: ' + modelo

    const kilometrajeCarro = document.createElement('h4');
    kilometrajeCarro.classList.add('card-text')
    kilometrajeCarro.textContent = 'Km: ' + kilometraje

    const precioCarro = document.createElement('h2');
    precioCarro.classList.add('text-success');
    precioCarro.textContent = '$ ' + precio

    const divBotones = document.createElement('div');
    divBotones.classList.add('d-flex', 'justify-content-between', 'mt-3');


    const botonAgregar = document.createElement('button');
    botonAgregar.classList.add('btn', 'btn-success');
    botonAgregar.textContent = 'Comprar';

    const botonEliminar = document.createElement('button');
    botonEliminar.classList.add('btn', 'btn-danger');
    botonEliminar.textContent = 'eliminar';


    // *ensamblamos dentro del nodo padre sus nodos hijos, es decir la estructura de la card

    padre.appendChild(col)
    col.appendChild(imagen)
    col.appendChild(cardBody)
    cardBody.appendChild(nombreCarro)
    cardBody.appendChild(marcaCarro)
    cardBody.appendChild(modeloCarro)
    cardBody.appendChild(kilometrajeCarro)
    cardBody.appendChild(precioCarro)
    cardBody.appendChild(divBotones)
    divBotones.appendChild(botonAgregar)
    divBotones.appendChild(botonEliminar)


    // *utilizamos el return para retornar o dar respuesta del elemento creado ya que lo usaremos en otra funcion

    return padre;
}


// *detectamos el click o evento click sobre el boton agregar con un evento de escucha o listener para que a partir de este evento se agregue la tarea dentro del contenedor cont-cards

const form = document.getElementById('vehiculo-form')

form.addEventListener('submit', (e) => {

    e.preventDefault();

    let foto = inputFoto.value.trim();
    const nombre = inputNombre.value.trim();
    const marca = inputMarca.value.trim();
    const modelo = inputModelo.value.trim();
    const kilometraje = inputKilometraje.value.trim();
    const precio = inputPrecio.value.trim();

    if (foto == "") {
        foto = 'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/m/RT_V_34a076aa1776473abf93874054d3e523.webp'
    }

    if (foto == "" || nombre == "" || marca == "" || modelo == "" || kilometraje == "" || precio == "") {
        alert("no se puede crear un item vacio");
    } else {
        const newVehicle = createVehicle(foto, nombre, marca, modelo, kilometraje, precio);

        eventsToVehicles(newVehicle);
        cards.appendChild(newVehicle);

        const newCar = {
            nombre: nombre,
            marca: marca,
            modelo: modelo,
            kilometraje: kilometraje,
            precio: precio,
            foto: foto
        };

        const vehiculosGuardados = JSON.parse(localStorage.getItem("carros")) || [];

        vehiculosGuardados.push(newCar);

        form.reset();



        inputFoto.value = "";
        inputNombre.value = "";
        inputMarca.value = "";
        inputModelo.value = "";
        inputKilometraje.value = "";
        inputPrecio.value = "";
    }
});


function eventsToVehicles(padre) {


    const botonAgregar = padre.querySelector('.btn-success');
    const botonEliminar = padre.querySelector('.btn-danger');


    // cuando le de en agregar
    botonAgregar.addEventListener('click', () => {
        const fotoPanel = padre.querySelector('img').getAttribute('src');
        const nombrePanel = padre.querySelector('.card-title').textContent;
        const marcaPanel = padre.querySelector('.card-subtitle').textContent;
        const modeloPanel = padre.querySelectorAll('.card-text')[0].textContent;
        const kmPanel = padre.querySelectorAll('.card-text')[1].textContent;
        const precioPanel = padre.querySelector('.text-success').textContent;

        const precioNum = parseInt(precioPanel.replace(/\D/g, ""));

        const newPanel = itemPanel(fotoPanel, nombrePanel, marcaPanel, precioPanel, precioNum)

        document.querySelector('.panel').appendChild(newPanel);

        totalCarrito += precioNum;
        cantidadCarrito++;
        actualizarTotal();

        // Crear objeto de compra
        const compra = {
            foto: fotoPanel,
            nombre: nombrePanel,
            marca: marcaPanel,
            modelo: modeloPanel.replace('Modelo: ', ''),
            kilometraje: kmPanel.replace('Km: ', ''),
            precio: precioPanel,
            precioNum: precioNum
        };

        // Agregar a compras
        compras.push(compra);
        // Guardar compras en localStorage
        localStorage.setItem("compras", JSON.stringify(compras));


    });

    // *evento de eliminar de la de vehiculos
    botonEliminar.addEventListener('click', () => {
        padre.remove();
    });


}

function loadCompras() {
    compras = JSON.parse(localStorage.getItem("compras")) || [];
    compras.forEach(compra => {
        const precioNum = parseInt(compra.precio.replace(/\D/g, ""));
        const newPanel = itemPanel(compra.foto, compra.nombre, compra.marca, compra.precio, precioNum);
        document.querySelector('.panel').appendChild(newPanel);
        totalCarrito += precioNum;
        cantidadCarrito++;
    });
    actualizarTotal();
}

// Llamar a loadCompras cuando la página se cargue
document.addEventListener('DOMContentLoaded', loadCompras);


const panel = document.querySelector('.panel');
const carrito = document.getElementById('carrito');

carrito.addEventListener('click', () => {
    panel.classList.toggle('activo')
})


function itemPanel(foto, nombre, marca, precio, precioNum) {

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

    btnEliminar.addEventListener('click', () => {
        divPadrePanel.remove();
        totalCarrito -= precioNum;
        cantidadCarrito--;
        actualizarTotal();


        // Eliminar de compras en localStorage
        compras = compras.filter(compra =>
            !(compra.nombre === nombre && compra.marca === marca && compra.precio === precio)
        );
        localStorage.setItem("compras", JSON.stringify(compras));

    });


    // *ENSAMBLAMOS TODO EL HTML DEL ITEM DE LA CARD DEL PANEL

    contImgPanel.appendChild(imgPanel);
    contInfoPanel.appendChild(h3Nombre);
    contInfoPanel.appendChild(h3Marca);
    contInfoPanel.appendChild(h3Precio);
    contInfoPanel.appendChild(btnEliminar);

    divPadrePanel.appendChild(contImgPanel);
    divPadrePanel.appendChild(contInfoPanel);

    return divPadrePanel;
}

const totalPanel = document.getElementById("total-panel");
let totalCarrito = 0;
let cantidadCarrito = 0;

// *INICIAMOS COMPRAS DESDE LOCAL STORAGE
let compras = JSON.parse(localStorage.getItem("compras")) || [];



// *Función para actualizar el h3
function actualizarTotal() {
    totalPanel.textContent = `total (${cantidadCarrito}): $${totalCarrito.toLocaleString()}`;
}



