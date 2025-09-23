const prompt = require("prompt-sync")();

console.log("Esta es una calculadora:");
let operador = prompt("Digita el cálculo que vas a hacer (+, -, *, /): ");

let numero1 = Number(prompt("Digita tu el primer número: "));
let numero2 = Number(prompt("Digita tu el segundo número: "));

if (operador == '+') {
    console.log("Resultado:", numero1 + numero2);
} else if (operador == '-') {
    console.log("Resultado:", numero1 - numero2);
} else if (operador == '*') {
    console.log("Resultado:", numero1 * numero2);
} else if (operador == '/') {
    if (numero2 === 0) {
        console.log("No es posible dividir por 0.");
    } else {
        console.log("Resultado:", numero1 / numero2);
    }
} else {
    console.log("Operación inválida.");
}
