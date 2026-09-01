const area = document.querySelector("#texto");
const caracteres = document.querySelector("#caracteres");
const palabras = document.querySelector("#palabras");
const sinEspacios = document.querySelector("#sinEspacios");
const restantes = document.querySelector("#restantes");
const botonLimpiar = document.querySelector("#limpiar");
const fondoo = document.querySelector("#fondo");
const barra = document.querySelector("#barraProgreso");
const LIMITE = 20;
restantes.textContent = LIMITE;
barra.max = LIMITE;

function actualizar() {
    const textoActual = area.value;
    
    caracteres.textContent = textoActual.length;
    
    const textoTrim = textoActual.trim();
    palabras.textContent = textoTrim === "" ? 0 : textoTrim.split(/\s+/).length;
    
    sinEspacios.textContent = textoActual.replaceAll(" ", "").length;
    
    const charsRestantes = LIMITE - textoActual.length;
    restantes.textContent = charsRestantes;
    barra.value = textoActual.length;
    if (textoActual.length > LIMITE) {

        area.classList.add("excedido");
        restantes.classList.add("excedido");
        fondoo.classList.add("fondo-excedido");
        barra.classList.add("excedido");
    } else {
        area.classList.remove("excedido");
        restantes.classList.remove("excedido");
        fondoo.classList.remove("fondo-excedido");
        barra.classList.remove("excedido");
    }
}
area.addEventListener("input", actualizar);

botonLimpiar.addEventListener("click", () => {
    area.value = "";
    actualizar();
});