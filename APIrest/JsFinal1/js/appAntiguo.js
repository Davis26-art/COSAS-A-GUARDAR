// Importar la clase Gift desde clases.js
import { Gift } from "./clases.js";
// Importar datos del archivo JSON
// 'assert { type: "json" }' es obligatorio para JSON
import datos from "../data/data.json" assert { type: "json" };


// const datos = [
//     { "id": 1, "gift": "Amazon", "tipo": "Suscripción", "tiempo": "Mensual", "precio": 100, "imagen": "url..." },
//     { "id": 2, "gift": "Netflix", "tipo": "Tarjeta", "tiempo": "Anual", "precio": 200, "imagen": "url..." }
// ];


// Variable global para el ID del gift en edición
let idGiftUpdate = null;
// Capturar elemento del DOM: cuerpo de la tabla
const cuerpoTabla = document.querySelector("#cuerpo-tabla");
// Seleccionamos los formularios aquí arriba para usarlos en todo el archivo
const formAgregar = document.querySelector("#form-agregar");
const formModal = document.querySelector("#form-modal");

// Inicializar el modal de Bootstrap
const myModal = new bootstrap.Modal(
    document.getElementById("modal-gift")
);

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

const agregarGift = (e) => {
    // Prevenir el comportamiento por defecto del formulario
    e.preventDefault();
    // Generar nuevo ID (último ID + 1)
    const id = datos.length ? datos.at(-1).id + 1 : 1;
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
    // // Conectar el formulario con la funcion agregarGift
    // const formAgregar = document.querySelector('#form-agregar');
    // formAgregar.addEventListener('submit', agregarGift);
};

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

// Ejecutar al cargar la página
cargarTabla();

// Escuchar el envío del formulario AGREGAR
// Esto conecta tu función con el botón antes de que el usuario haga clic
formAgregar.addEventListener('submit', agregarGift);// Escuchar el evento 'submit' del formulario modal

formModal.addEventListener("submit", giftUpdate);





// Métodos principales del modal
// myModal.show(); // Abre/muestra el modal
// myModal.hide(); // Cierra/oculta el modal

