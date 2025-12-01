// Importar la clase Gift desde clases.js
import { Gift } from "./clases";
// Importar datos del archivo JSON
// 'assert { type: "json" }' es obligatorio para JSON
import datos from "./Data/Data.json" assert { type: "json" };
// Variable global para el ID del gift en edición
let idGiftUpdate = null;
// Capturar elemento del DOM: cuerpo de la tabla
const cuerpoTabla = document.querySelector("#cuerpo-tabla");
// Inicializar el modal de Bootstrap
const myModal = new bootstrap.Modal(
    document.getElementById("modal-gift")
);
// Métodos principales del modal
myModal.show(); // Abre/muestra el modal
myModal.hide(); // Cierra/oculta el modal


const cargarTabla = () => {
    // Limpiar tabla antes de cargar
    cuerpoTabla.innerHTML = "";
    // Recorrer el arreglo de datos
    datos.map((item) => {
        // Crear fila de tabla
        const fila = document.createElement("tr");
        // Crear contenido HTML de las celdas
        const celdas = `
            <td>${item.gift}</td>
            <td>${item.tipo}</td>
            <td>${item.tiempo}</td>
            <td>$${item.precio}</td>
            <td>
            <div class="d-flex gap-2">
            <button class="btn btn-outline-warning"
            onclick="window.MostrarModal(${item.id})">
            <i class="fas fa-pencil-alt"></i>
            </button>
            <button class="btn btn-outline-danger"
            onclick="window.BorrarGift(${item.id})">
            <i class="fas fa-times"></i>
            </button>
            </div>
            </td>
            `;

        fila.innerHTML = celdas;
        cuerpoTabla.appendChild(fila);
    });
};

// Ejecutar al cargar la página
cargarTabla();

// Función global para ser llamada desde onclick
window.BorrarGift = (id) => {
    // Encontrar la posición del elemento en el arreglo
    const index = datos.findIndex((item) => item.id === id);
    // Mostrar diálogo de confirmación
    const validar = confirm(
        `¿Está seguro que quiere eliminar la gift Card ${datos[index].gift}?`
    );
    // Si el usuario confirma (presiona Aceptar)
    if (validar) {
        // Eliminar 1 elemento en la posición 'index'
        datos.splice(index, 1);
        // Recargar la tabla para mostrar cambios
        cargarTabla();
    }
};

const agregarGift = (e) => {
    // Prevenir el comportamiento por defecto del formulario
    e.preventDefault();
    // Generar nuevo ID (último ID + 1)
    const id = datos.at(-1).id + 1;
    // Capturar valores de los inputs
    const gift = document.querySelector("#gift").value;
    const tipo = document.querySelector("#tipo").value;
    const tiempo = document.querySelector("#tiempo").value;
    const precio = document.querySelector("#precio").value;
    const imagen = document.querySelector("#imagen").value;
    // Agregar nuevo objeto Gift al arreglo
    datos.push(new Gift(id, gift, tipo, tiempo, precio, imagen));
    // Limpiar todos los campos del formulario
    formAgregar.reset();
    // Actualizar la tabla para mostrar el nuevo elemento
    cargarTabla();
};

// Función global para ser llamada desde onclick
window.MostrarModal = (id) => {
// PASO 1: Guardar el ID globalmente
// Necesitamos recordar qué elemento estamos editando
// para cuando el usuario presione "Actualizar"
idGiftUpdate = id;
// PASO 2: Encontrar el elemento en el arreglo
// Localizamos la posición (index) del objeto que tiene este ID
const index = datos.findIndex((item) => item.id === id);
// PASO 3: Pre-llenar los inputs del modal
// Asignamos los valores actuales del objeto a cada input
// Nota: los inputs del modal tienen el sufijo "-modal"
document.querySelector("#gift-modal").value = datos[index].gift;
document.querySelector("#tipo-modal").value = datos[index].tipo;
document.querySelector("#tiempo-modal").value = datos[index].tiempo;
document.querySelector("#precio-modal").value = datos[index].precio;
document.querySelector("#imagen-modal").value = datos[index].imagen;
// PASO 4: Mostrar el modal
// Usamos el método .show() del objeto Bootstrap Modal
myModal.show();
};

// Capturar el formulario dentro del modal
const formModal = document.querySelector("#form-modal");
// Escuchar el evento 'submit' del formulario modal
formModal.addEventListener("submit", giftUpdate);



const giftUpdate = (e) => {
// Prevenir recarga de página
e.preventDefault();
// Localizar el elemento usando el ID almacenado globalmente
const index = datos.findIndex((item) => item.id === idGiftUpdate);
// Actualizar cada propiedad del objeto en el arreglo
// con los nuevos valores capturados del modal
datos[index].gift = document.querySelector("#gift-modal").value;
datos[index].tipo = document.querySelector("#tipo-modal").value;
datos[index].tiempo = document.querySelector("#tiempo-modal").value;
datos[index].precio = document.querySelector("#precio-modal").value;
datos[index].imagen = document.querySelector("#imagen-modal").value;
// Recargar la tabla para mostrar los cambios
cargarTabla();
// Cerrar el modal
myModal.hide();
};

