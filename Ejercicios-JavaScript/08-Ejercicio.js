const prompt = require("prompt-sync")(); 

/** Ejercicio 1 */
let num = Number(prompt('Digita un número: '))

if (num > 0) {
    console.log('Este número es positivo. ');

}   else if (num < 0) {
    console.log('Este número es negativo. ');

}   else {console.log('Este número es 0.');

}

let Numero_tipo = num > 0? 'Este número es positivo. ': (num < 0? 'Este número es negativo. ': 'Este número es 0.');
console.log(Numero_tipo);


/** Ejercicio 2 */
let nombre = prompt('Digita tu nombre: ')

if (nombre === '') {
    console.log('El nombre está vacio. ');
} else {
    console.log('Nombre ingresado: ', nombre)
}

let Validar_nombre = nombre === ''? 'El nombre está vacio. ': 'Nombre ingresado: ';
console.log(Validar_nombre)
console.log(nombre === ''? 'El nombre está vacio. ': 'Nombre ingresado: ${nombre} ');


/** Ejercicio 3 */
let temperatura = 22;

// Con if
if (temperatura >= 20 && temperatura <= 25) {
  console.log("Temperatura ideal");
} else {
  console.log("Temperatura fuera de rango");
}

// Con ternario
console.log((temperatura >= 20 && temperatura <= 25) ? "Temperatura ideal" : "Temperatura fuera de rango");


/** Ejercicio 4 */
let contraseña = "abc123";

// Con if
if (contraseña.length >= 8) {
  console.log("Contraseña segura");
} else {
  console.log("Contraseña débil");
}

// Con ternario
console.log(contraseña.length >= 8 ? "Contraseña segura" : "Contraseña débil");


/** Ejercicio 5 */
let numero = 10;

// Con if
if (numero % 5 === 0) {
  console.log("Es divisible por 5");
} else {
  console.log("No es divisible por 5");
}

// Con ternario
console.log(numero % 5 === 0 ? "Es divisible por 5" : "No es divisible por 5");
