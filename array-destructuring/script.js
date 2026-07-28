// ===== PARTE A: array de valores simples =====
console.log("--- PARTE A ---");

// 1. Declarar un array de categorias
let categorias = ["simulacion", "rpg", "moba", "estrategia"];

// 2. Mostrar el array completo y la cantidad de elementos
console.log(categorias);
console.log("Cantidad de categorias:", categorias.length);

// 3. Mostrar el primer y ultimo elemento (usando .length)
console.log("Primera categoria:", categorias[0]);
console.log("Ultima categoria:", categorias[categorias.length - 1]);

// 4. Incorporar una categoria adicional y mostrar nueva cantidad
categorias.push("accion");
console.log("Cantidad de categorias:", categorias.length);

// 5. Eliminar el ultimo elemento y mostrar cual fue
let eliminada = categorias.pop();
console.log("Categoria eliminada:", eliminada);


// ===== PARTE B: objeto =====
console.log("--- PARTE B ---");

// 6. Declarar objeto usuario
let usuario = {
    nombre: "Elias",
    edad: 23, 
    ciudad: "Posadas",
    temaFavorito: "desarrollo web"
};

// 7. Mostrar frase con notacion de punto
console.log(`Nombre: ${usuario.nombre} - Edad: ${usuario.edad} - Ciudad: ${usuario.ciudad} - Tema favorito: ${usuario.temaFavorito}`);

// 8. Modificar una propiedad y mostrar resultado
usuario.edad = 24;
console.log("Edad actualizada:", usuario.edad);

// 9. Incorporar propiedad nueva y mostrar objeto completo
usuario.signo = "Tauro";
console.log(usuario);


// ===== PARTE C: array de objetos =====
console.log("--- PARTE C ---");

// 10. Declarar array de objetos (catalogo)
let catalogo = [
    { titulo: "Dispatch", categoria: "simulacion", puntaje: 8, visto: true },
    { titulo: "Clair Obscure: Expedition 33", categoria: "rpg", puntaje: 9, visto: true },
    { titulo: "League of Legends", categoria: "moba", puntaje: 7, visto: true },
    { titulo: "Elden Ring", categoria: "rpg", puntaje: 10, visto: false }
];

// 11. Mostrar titulo del primero y puntaje del tercero
console.log("Primer titulo:", catalogo[0].titulo);
console.log("Puntaje del tercer elemento:", catalogo[2].puntaje);

// 12. Linea descriptiva del segundo elemento con formato especifico y operador ternario para 'visto'
let estadoSegundo = catalogo[1].visto ? "visto" : "pendiente";
console.log(`${catalogo[1].titulo} ${catalogo[1].categoria} ${catalogo[1].puntaje}/10 ${estadoSegundo}`);

// 13. Modificar el puntaje de un elemento y mostrar actualizado
catalogo[2].puntaje = 8;
console.log("Puntaje actualizado:", catalogo[2].puntaje);

// 14. Incorporar quinto elemento y mostrar cantidad total
catalogo.push({ titulo: "Hades", categoria: "accion", puntaje: 10, visto: true });
console.log("Cantidad de elementos del catalogo:", catalogo.length);


// ===== PARTE D: destructuring =====
console.log("--- PARTE D ---");

// 15. Destructuring sobre el primer elemento y linea descriptiva
let { titulo, categoria, puntaje, visto } = catalogo[0];
let estadoPrimero = visto ? "visto" : "pendiente";
console.log(`${titulo} ${categoria} ${puntaje}/10 ${estadoPrimero}`);

// 16. Destructuring sobre usuario para nombre y ciudad
let { nombre, ciudad } = usuario;
console.log(`Nombre: ${nombre} - Ciudad: ${ciudad}`);

// 17. Destructuring de array para primero y segundo
let [primero, segundo] = catalogo;
console.log("Primero:", primero.titulo);
console.log("Segundo:", segundo.titulo);


// ===== PARTE E: complementaria (OPCIONAL) =====
console.log("--- PARTE E ---");

// 18. Extraer propiedad con renombrado
let { titulo: tituloDestacado } = catalogo[3];
console.log("Titulo destacado:", tituloDestacado);

// 19. Extraer propiedad inexistente con valor por defecto
let { sistemaOperativo = "Ubuntu" } = usuario;
console.log("Sistema operativo:", sistemaOperativo);

// 20. Intercambiar contenido de dos variables
let a = 10;
let b = 20;
[a, b] = [b, a];
console.log(`Valores intercambiados: a=${a}, b=${b}`);