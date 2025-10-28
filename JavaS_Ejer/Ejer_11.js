//1. Agregar un único elemento
let ciudades = ["Londres", "París"];
ciudades.push("Madrid");
console.log(ciudades); // Salida: ["Londres", "París", "Madrid"]

//2. Agregar múltiples elementos a la vez
let Ciudades = ["Londres", "París"];
ciudades.push("Roma", "Berlín");
console.log(Ciudades); // Salida: ["Londres", "París", "Roma", "Berlín"]

//3. Guardar la nueva longitud del array 
let numeros = [1, 2, 3];
let nuevaLongitud = numeros.push(4, 5);
console.log(numeros); // Salida: [1, 2, 3, 4, 5]
console.log(nuevaLongitud); // Salida: 5

//4. Agregar elementos a un array vacío 
let productos = [];
productos.push("Laptop");
productos.push("Teclado");
productos.push("Ratón");
console.log(productos); // Salida: ["Laptop", "Teclado", "Ratón"]

//5. Combinar push() y pop()
let elementos = ["a", "b"];
elementos.push("c"); // Añade "c"
console.log(elementos); // Salida: ["a", "b", "c"]

let elementoEliminado = elementos.pop(); // Quita el último elemento y lo guarda    
console.log(elementos); // Salida: ["a", "b"]
console.log(elementoEliminado); // Salida: "c"
