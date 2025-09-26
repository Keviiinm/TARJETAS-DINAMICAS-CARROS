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


function createVehicle(foto,nombre,marca,modelo,kilometraje,precio){

    // cramos el nodo o elemento padre

    // contenedor padre de los item
    const divPadre = document.createElement('div');
        divPadre.classList.add('col-md-6' , 'item-vehiculo');

    const altura = document.createElement('div');
        altura.classList.add('card' , 'h-100');

    const imagen = document.createElement('img');
        imagen.classList.add('card-img-top' , 'w-100');
        imagen.setAttribute('src' , foto)

    const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

    const nombreCarro = document.createElement('h3');
        nombreCarro.classList.add('card-title');
        nombreCarro.textContent=nombre

    const marcaCarro = document.createElement('h4');
        marcaCarro.classList.add('card-subtitle' , 'text-muted');
        marcaCarro.textContent=marca

    const modeloCarro = document.createElement('h4');
        modeloCarro.classList.add('card-text');
        modeloCarro.textContent='modelo: ' + modelo

    const kilometrajeCarro = document.createElement('h4');
        kilometrajeCarro.classList.add('card-text')   
        kilometrajeCarro.textContent='km: ' + kilometraje

    const precioCarro = document.createElement('h2');
        precioCarro.classList.add('text-success');
        precioCarro.textContent='$: ' + precio

    const divBotones = document.createElement('div');
        divBotones.classList.add('d-flex' , 'justify-content-between' , 'mt-3');


    const botonAgregar = document.createElement('button');
        botonAgregar.classList.add('btn', 'btn-success');
        botonAgregar.textContent = 'Seleccionar';

    const botonEliminar = document.createElement('button');
        botonEliminar.classList.add('btn' , 'btn-danger');
        botonEliminar.textContent='eliminar';


    // ensamblamos dentro del nodo padre sus nodos hijos, es decir la estructura de la card

    divPadre.appendChild(altura)
    altura.appendChild(imagen)
    altura.appendChild(cardBody)
    cardBody.appendChild(nombreCarro)
    cardBody.appendChild(marcaCarro)
    cardBody.appendChild(modeloCarro)
    cardBody.appendChild(kilometrajeCarro)
    cardBody.appendChild(precioCarro)
    cardBody.appendChild(divBotones)
    divBotones.appendChild(botonAgregar)
    divBotones.appendChild(botonEliminar)


    // utilizamos el return para retornar o dar respuesta del elemento creado ya que lo usaremos en otra funcion

    return divPadre;
}


// detectamos el click o evento click sobre el boton agregar con un evento de escucha o listener para que a partir de este evento se agregue la tarea dentro del contenedor cont-cards

const form = document.getElementById('vehiculo-form')
form.addEventListener('submit' , (e)=>{

    e.preventDefault();

    let foto = inputFoto.value.trim();
    const nombre = inputNombre.value.trim();
    const marca = inputMarca.value.trim();
    const modelo = inputModelo.value.trim();
    const kilometraje = inputKilometraje.value.trim();
    const precio = inputPrecio.value.trim();

    if (foto=="") {
        foto = 'https://cdn-icons-png.freepik.com/512/6356/6356630.png'
    }

    if (foto=="" || nombre=="" || marca=="" || modelo=="" || kilometraje=="" || precio=="") {
        alert("no se puede crear un item vacio");
    }else{
        const newVehicle = createVehicle(foto,nombre,marca,modelo,kilometraje,precio);
        eventsToVehicles(newVehicle);
        cards.appendChild(newVehicle);  
        inputFoto.value="";
        inputNombre.value="";
        inputMarca.value="";
        inputModelo.value="";
        inputKilometraje.value="";
        inputPrecio.value="";
    }
});


function eventsToVehicles(padre){

    // utilizamos querySelector para capturar el  input y el button que estan dentro del item
    const botonAgregar = padre.querySelector('.btn-success');
    const botonEliminar = padre.querySelector('.btn-danger');


    // cuando le de en agregar
    botonAgregar.addEventListener('click' , ()=>{
       const fotoPanel = padre.querySelector('img').getAttribute('src');
       const nombrePanel = padre.querySelector('.card-title').textContent;
       const marcaPanel = padre.querySelector('.card-subtitle' , 'text-muted').textContent;
       const precioPanel = padre.querySelector('.text-success').textContent;

       const newPanel = itemPanel(fotoPanel,nombrePanel,marcaPanel,precioPanel)

       document.querySelector('.panel').appendChild(newPanel);
    });

    // evento de eliminar de la de vehiculos
    botonEliminar.addEventListener('click', ()=>{
        padre.remove();
    });
}



const panel = document.querySelector('.panel');
const carrtio = document.getElementById('carrito');

carrtio.addEventListener('click' , ()=>{
    panel.classList.toggle('activo')
})


function itemPanel(foto, nombre, marca, precio){

    const divPadrePanel = document.createElement('div');
        divPadrePanel.classList.add('row' , 'tarjeta');

    const contImgPanel = document.createElement('div');
        contImgPanel.classList.add('col-md-4' , 'cont-img');

    const imgPanel = document.createElement('img');
        imgPanel.setAttribute('src' , foto);

    const contInfoPanel = document.createElement('div');
        contInfoPanel.classList.add('col-md-8' , 'cont-info');

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