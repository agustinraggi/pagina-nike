let contenedor = document.getElementsByTagName("div");
let zapatilla__name= document.getElementsByClassName("zapatilla__name");


console.log(contenedor);


for (const zapatilla of zapatilla__name ) {
    console.log(zapatilla.innerHTML);
}

for (const div of contenedor) {
console.log(div.innerHTML);
}

// faltataria que se aplique el css
let miul = document.getElementById("barra__tareas2");
let barra__tareas2 = ["inicio"  , "producto" , "acerca" , "envio" , "contacto"];

for (const menu of barra__tareas2) {
    let li =document.createElement("li");
    li.innerHTML = menu;
    miul.appendChild(li);
}