const prompt = require("prompt-sync")(); 

/** Ejercicio 1 For */
for (let i = 0; i < 3; i++) {
  console.log("Hola mundo");
}


/** Ejercicio 2 For */
let frutas = ["manzana", "banana", "pera"];

for (let i = 0; i < frutas.length; i++) {
  console.log(frutas[i]);
}


/** Ejercicio 3 For */
for (let i = 1; i <= 5; i++) {
  console.log(i);
}


/** Ejercicio 4 For */
for (let i = 5; i >= 1; i--) {
  console.log(i);
}


/** Ejercicio 5 For*/
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}
