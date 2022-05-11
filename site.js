const carrito = document.getElementById("carrito");
const zapatillas = document.getElementById("lista-zapatillas");
const listazapatillas = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners() {
  zapatillas.addEventListener("click", comprarzapatilla);
  carrito.addEventListener("click", eliminarzapatilla);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarzapatilla(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const zapatilla = e.target.parentElement.parentElement;
        leerDatoszapatilla(zapatilla);
    }
}

function leerDatoszapatilla(zapatilla){
    const infozapatilla = {
        imagen: zapatilla.querySelector('img').src,
        titulo: zapatilla.querySelector('h4').textContent,
        precio: zapatilla.querySelector('.precio span').textContent,
        id: zapatilla.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infozapatilla);
}

function insertarCarrito(zapatilla) {
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
           <img src="${zapatilla.imagen}" width=100> 
       </td> 
       <td>${zapatilla.titulo}</td>
       <td>${zapatilla.precio}</td>
       <td>
        <a href="#" class="borrar-zapatilla" data-id="${zapatilla.id}">X</a>
       </td>
    `;
    listazapatillas.appendChild(row);
    guardarzapatillaLocalStorage(zapatilla);
}

function eliminarzapatilla(e) {
    e.preventDefault();

    let zapatilla,
        zapatillaId;
    
    if(e.target.classList.contains('borrar-zapatilla')) {
        e.target.parentElement.parentElement.remove();
        zapatilla = e.target.parentElement.parentElement;
        zapatillaId = zapatilla.querySelector('a').getAttribute('data-id');
    }
    eliminarzapatillaLocalStorage(zapatillaId)
}

function vaciarCarrito(){
    while(listazapatillas.firstChild){
        listazapatillas.removeChild(listazapatillas.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

function guardarzapatillaLocalStorage(zapatilla) {
    let zapatillas;

    zapatillas = obtenerzapatillasLocalStorage();
    zapatillas.push(zapatilla);

    localStorage.setItem('zapatillas', JSON.stringify(zapatillas));
}

function obtenerzapatillasLocalStorage() {
    let zapatillasLS;

    if(localStorage.getItem('zapatillas') === null) {
        zapatillasLS = [];
    }else {
        zapatillasLS = JSON.parse(localStorage.getItem('zapatillas'));
    }
    return zapatillasLS;
}

function leerLocalStorage() {
    let zapatillasLS;

    zapatillasLS = obtenerzapatillasLocalStorage();

    zapatillasLS.forEach(function(zapatilla){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${zapatilla.imagen}" width=100>
            </td>
            <td>${zapatilla.titulo}</td>
            <td>${zapatilla.precio}</td>
            <td>
                <a href="#" class="borrar-zapatilla" data-id="${zapatilla.id}">X</a>
            </td>
        `;
        listazapatillas.appendChild(row);
    });
}

function eliminarzapatillaLocalStorage(zapatilla) {
    let zapatillasLS;
    zapatillasLS = obtenerzapatillasLocalStorage();

    zapatillasLS.forEach(function(zapatillaLS, producto){
        if(zapatillaLS.id === zapatilla) {
            zapatillasLS.splice(producto, 1);
        }
    });

    localStorage.setItem('zapatillas', JSON.stringify(zapatillasLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}
