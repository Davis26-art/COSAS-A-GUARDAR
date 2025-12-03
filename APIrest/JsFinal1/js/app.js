// Importar la clase Gift desde clases.js
import { Gift } from "./clases.js";
// Ya no necesitamos importar el JSON, lo gestionará el servidor.
// import datos from "../data/data.json" assert { type: "json" };

// Array que contendrá los datos del servidor. Se inicializa vacío.
let datos = []; 

// URL del servidor backend (debe coincidir con el puerto de server.js)
const API_URL = 'http://localhost:3000/api'; 

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

// ------------------------------------------------------------------
// NUEVA FUNCIÓN: ENVIAR DATOS AL SERVIDOR (GUARDA EN data.json)
// ------------------------------------------------------------------
const guardarDatosAPI = async () => {
    try {
        const response = await fetch(`${API_URL}/gifts/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Enviamos el array 'datos' completo al servidor
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`Error al guardar: ${response.statusText}`);
        }
        console.log('✅ Datos guardados en data.json.');
        
    } catch (error) {
        console.error('❌ Error al guardar en la API:', error);
        alert('Error al guardar datos. ¿Está el servidor (node server.js) corriendo?');
    }
}


// ------------------------------------------------------------------
// MODIFICADA: CARGAR TABLA (OBTENER DATOS DEL SERVIDOR)
// ------------------------------------------------------------------
const cargarTabla = async () => {
    try {
        // 1. Obtener datos del servidor (GET)
        const response = await fetch(`${API_URL}/gifts`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        datos = await response.json(); // Actualiza el array 'datos' con la data de data.json
        
        // 2. Limpiar e iterar
        cuerpoTabla.innerHTML = "";
        datos.map((item) => {
            const fila = document.createElement("tr");
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

    } catch (error) {
        console.error("Error al obtener datos:", error);
        cuerpoTabla.innerHTML = `<tr><td colspan="5">Error al conectar con el servidor: ${error.message}</td></tr>`;
    }
};

// ------------------------------------------------------------------
// MODIFICADA: AGREGAR GIFT
// ------------------------------------------------------------------
const agregarGift = async (e) => { // AÑADIDO 'async'
    e.preventDefault();
    
    // Generar nuevo ID (último ID + 1)
    const id = datos.length ? datos.at(-1).id + 1 : 1;
    
    // Capturar valores de los inputs
    const gift = document.querySelector("#gift").value;
    const tipo = document.querySelector("#tipo").value;
    const tiempo = document.querySelector("#tiempo").value;
    const precio = document.querySelector("#precio").value;
    const imagen = document.querySelector("#imagen").value;
    
    // Agregar nuevo objeto Gift al arreglo local
    datos.push(new Gift(id, gift, tipo, tiempo, precio, imagen));
    
    // !!! GUARDAR EN EL SERVIDOR (data.json) !!!
    await guardarDatosAPI(); 
    
    // Limpiar y actualizar
    formAgregar.reset();
    cargarTabla();
};

// ------------------------------------------------------------------
// MODIFICADA: ACTUALIZAR GIFT
// ------------------------------------------------------------------
const giftUpdate = async (e) => { // AÑADIDO 'async'
    e.preventDefault();
    
    const index = datos.findIndex((item) => item.id === idGiftUpdate);
    
    // Actualizar cada propiedad del objeto en el arreglo local
    datos[index].gift = document.querySelector("#gift-modal").value;
    datos[index].tipo = document.querySelector("#tipo-modal").value;
    datos[index].tiempo = document.querySelector("#tiempo-modal").value;
    datos[index].precio = document.querySelector("#precio-modal").value;
    datos[index].imagen = document.querySelector("#imagen-modal").value;

    // !!! GUARDAR EN EL SERVIDOR (data.json) !!!
    await guardarDatosAPI(); 
    
    // Recargar la tabla y cerrar modal
    cargarTabla();
    myModal.hide();
};

// ------------------------------------------------------------------
// MODIFICADA: BORRAR GIFT
// ------------------------------------------------------------------
window.BorrarGift = async (id) => { // AÑADIDO 'async'
    const index = datos.findIndex((item) => item.id === id);
    const validar = confirm(
        `¿Está seguro que quiere eliminar la gift Card ${datos[index].gift}?`
    );
    
    if (validar) {
        datos.splice(index, 1);
        
        // !!! GUARDAR EN EL SERVIDOR (data.json) !!!
        await guardarDatosAPI(); 
        
        cargarTabla();
    }
};



// Función global para ser llamada desde onclick
window.MostrarModal = (id) => {
    idGiftUpdate = id;
    const index = datos.findIndex((item) => item.id === id);
    document.querySelector("#gift-modal").value = datos[index].gift;
    document.querySelector("#tipo-modal").value = datos[index].tipo;
    document.querySelector("#tiempo-modal").value = datos[index].tiempo;
    document.querySelector("#precio-modal").value = datos[index].precio;
    document.querySelector("#imagen-modal").value = datos[index].imagen;
    myModal.show();
};

// Ejecutar al cargar la página (la versión asíncrona)
cargarTabla();

// Escuchar el envío del formulario AGREGAR
formAgregar.addEventListener('submit', agregarGift);

// Escuchar el evento 'submit' del formulario modal
formModal.addEventListener("submit", giftUpdate);