let button = document.getElementById("bot");
button.onclick = () => {
    console.log("click 2");
}

let input1 = document.getElementById("numero");
let input2 =document.getElementById("email");

// input1.onkeyup = () => {console.log("Keyup") }
// input2.onkeydown = () => {console.log("keydown")}

input1.addEventListener("input", () => {
    console.log (input1.value);
})
input2.addEventListener("input", () => {
    console.log (input2.value);
})
// let miformulario = document.getElementById("bot");
// miformulario.addEventListener("submit", validarformulario);
// function validarformulario (e){
//     console.log(e)
//     e.preventDefault ();
//     let formulario = e.target;
//     console.log(formulario.children[0].value);
//     console.log(formulario.children[1].value);
//     console.log("formulario enviado");
// }