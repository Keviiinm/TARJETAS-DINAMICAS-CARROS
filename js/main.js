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
    padre.classList.add("cont-cards")


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
});
