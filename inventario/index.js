let baseDatos = [];
let carroCompras = [];
let bdLocal =[];
let stockGraficos = [];
let productoGraficos = [];
let modelGrafico =[];
let bdLocalOrdenada=[];
let graficoNuevo;


localStorage.length > 0 ? console.log('El Local Storage tiene Datos') : console.log('El Local Storage esta VACIO');
window.onload = ()=>{
    if (localStorage.length > 0) {
        extraerLocal();
        baseDatos = bdLocal;
        actualizaGrafico();
    } else{
        pedirPosts();
        console.log('en el else')
    }
};


const pedirPosts = async () => {
    const resp = await fetch('./productos.json')
    const data = await resp.json()
    console.log(data);
    baseDatos = data;
    guardarLocal();
   
} 

let btnAgregar = document.getElementById("botonAgregarInventario");
btnAgregar.addEventListener("click", (e) => {
    e.preventDefault();
    inventario();
    });

function inventario (){
    function Producto (nombreProducto, modeloProducto, stock, precioProducto, idProducto){
        this.nombreProducto = nombreProducto;
        this.modeloProducto = modeloProducto;
        this.stock = stock;
        this.precioProducto = precioProducto;
        this.idProducto = idProducto;
    }
    let ingNombreProducto = document.getElementById("InputNombre").value.toUpperCase();
    let ingModeloProducto = document.getElementById("InputModelo").value.toUpperCase();
    let ingStock = parseInt (document.getElementById("InputCant").value);
    let ingPrecioProducto = parseInt (document.getElementById("InputPrecio").value);
    let idProducto = Date.now();


    if (bdLocal.some((el) => el.nombreProducto == ingNombreProducto && el.modeloProducto == ingModeloProducto)) {
        console.log('Producto Ingresado YA Existe en Inventario; se sumará al stock ya disponible y Reemplazar precio');
        let nombreCompleto = ingNombreProducto + ingModeloProducto;
        console.log(nombreCompleto);
        let productoExistente = bdLocal.find((el) => el.nombreProducto.concat(el.modeloProducto)==nombreCompleto);
        resultadoStock = productoExistente.stock + ingStock;
        productoExistente.stock = resultadoStock;
        productoExistente.precioProducto = ingPrecioProducto;
        console.log(bdLocal);
        baseDatos = bdLocal;
        guardarLocal();
        document.getElementById("InputNombre").value = "";
        document.getElementById("InputModelo").value = "";
        document.getElementById("InputCant").value = "";
        document.getElementById("InputPrecio").value = "";

    } else
    {
    console.log('Producto Ingresado NO Existe en Inventario');
    nuevoProducto = new Producto (ingNombreProducto, ingModeloProducto, ingStock, ingPrecioProducto, idProducto);
    baseDatos.push(nuevoProducto);
    guardarLocal();
    document.getElementById("InputNombre").value = "";
    document.getElementById("InputModelo").value = "";
    document.getElementById("InputCant").value = "";
    document.getElementById("InputPrecio").value = "";
}}

function guardarLocal(){
    console.log(baseDatos);
    guardarJSON = JSON.stringify(baseDatos);
    console.log(guardarJSON);
    localStorage.setItem('bdLocal', guardarJSON)
    extraerLocal();
}

function extraerLocal(){
    bdLocal = JSON.parse(localStorage.getItem('bdLocal'));
    console.log(bdLocal);
    mostrarInventario();
    actualizaGrafico();
}


function mostrarInventario(){
    console.log(bdLocal);
    let mostrarProductos = document.getElementById("listadoInventario");
    mostrarProductos.innerHTML = ""; 
    for (let indice of bdLocal){
        mostrarProductos.innerHTML += 
        `<div id = "${indice.idProducto}" class="container col-md-12 d-flex justify-content-center">
        <div class="d-flex col-md-3">
        <p class="align-self-center">${indice.nombreProducto}</p>
        </div>
        <div class="d-flex col-md-2">
        <p class="align-self-center">${indice.modeloProducto}</p>
        </div>
        <div class="d-flex col-md-2 justify-content-center">
        <p class="align-self-center ">${indice.stock}</p>
        </div>
        <div class="d-flex col-md-2 justify-content-end">
        <p class="align-self-center">$</p>
        <p class="align-self-center text-end">${indice.precioProducto}</p>
        </div>
        <div class="d-flex col-md-3 justify-content-end">
        <p class="align-self-center text-end">${indice.idProducto}</p>
        </div>
        </div>`
    }
}

let btnEliminar = document.getElementById("botonEliminarInventario");
btnEliminar.addEventListener("click", (e) => {
    e.preventDefault();
    EliminarInventario()})
    
function EliminarInventario () {
        let ingIdProducto = parseInt (document.getElementById("IdProdEliminar").value);
        let ingCantEliminar = parseInt (document.getElementById("InputCantEliminar").value);
        console.log(ingIdProducto);
        console.log(ingCantEliminar);
        if (bdLocal.some((el) => el.idProducto == ingIdProducto) != true) {
            console.log('Producto NO Existe en Inventario');
            document.getElementById("IdProdEliminar").value = "";
            document.getElementById("InputCantEliminar").value = "";
        } else
        {
            let cantidad = bdLocal.find((el) => el.idProducto == ingIdProducto);
            console.log(cantidad);
            let indice = bdLocal.findIndex((el) => el.idProducto == ingIdProducto)
            resultadoStock = cantidad.stock - ingCantEliminar;
            console.log (resultadoStock);
            console.log (indice);
            if (resultadoStock <= 0){
                console.log('No hay Stock suficiente para compra  - BORRAR DEL INVENTARIO');
                bdLocal.splice( 
                    bdLocal.findIndex((el) => el.idProducto == ingIdProducto), 1);
                    console.log(bdLocal);
                    baseDatos = bdLocal;
                    guardarLocal();
                    
                    mostrarInventario();
                    document.getElementById("IdProdEliminar").value = "";
                    document.getElementById("InputCantEliminar").value = "";
                }  else
                {
                    console.log('Stock Disponible - SEGUIR MOSTRANDO INVENTARIO');
                    let actualizar = bdLocal.find((el) => el.idProducto == ingIdProducto);
                    actualizar.stock = resultadoStock;
                    console.log(bdLocal);
                    baseDatos = bdLocal;
                    guardarLocal();
                    mostrarInventario();
                    document.getElementById("IdProdEliminar").value = "";
                    document.getElementById("InputCantEliminar").value = "";
                }        
            }
        }

function actualizaGrafico(){
    baseDatos.sort(((a, b) => b.stock - a.stock));
    stockGraficos = baseDatos.map((el) => el.stock);
    productoGraficos = baseDatos.map((el) => el.nombreProducto.concat(" ").concat(el.modeloProducto));
    console.log (stockGraficos);
    console.log (productoGraficos);
    let chartStatus = Chart.getChart("myChart");
    if (graficoNuevo != undefined) {
        graficoNuevo.destroy();
    }
    const graficoHtml = document.getElementById('myChart').getContext('2d');
    graficoNuevo = new Chart(graficoHtml,{
        type: 'bar',
        data: {
            labels: productoGraficos,
            datasets: [{
                label: 'Stock Disponible',
                backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)'
            ],
                borderColor: 'rgb(255, 99, 132)',
                borderRadius: 15,
                data: stockGraficos,
            }]
        },
        options: {
            scale: {
                y: {
                    beginAtZero: true
                },
            }
        }
    })
}