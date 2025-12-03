// Variables Globales
let todos = [];
const API_URL = 'http://localhost:3000/api';

// --- FUNCIONES CORE RESTFUL ---

// Función Central de Actualización (PUT)
const actualizarTodoAPI = async (todo) => {
    try {
        const response = await fetch(`${API_URL}/todos/${todo.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        });
        if (!response.ok) throw new Error('Falló la actualización.');
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
    }
};

// --- FUNCIÓN DE LECTURA (READ.HTML) ---

const cargarLista = async () => {
    const listaTareas = document.querySelector("#lista-tareas");
    if (!listaTareas) return; // Solo se ejecuta en read.html

    try {
        const response = await fetch(`${API_URL}/todos`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        todos = await response.json();

        listaTareas.innerHTML = "";

        if (todos.length === 0) {
            listaTareas.innerHTML = '<li class="list-group-item text-center text-muted">No hay tareas.</li>';
            return;
        }

        todos.forEach((item) => {
            const li = document.createElement("li");
            li.className = `list-group-item d-flex justify-content-between align-items-center ${item.completada ? 'completada' : ''}`;

            li.innerHTML = `
                <span class="flex-grow-1" onclick="window.toggleCompletada(${item.id})">${item.tarea}</span>
                <div class="d-flex gap-2">
                    <a href="edit.html?id=${item.id}" class="btn btn-sm btn-outline-warning">
                        <i class="fas fa-pencil-alt"></i>
                    </a>
                    <button class="btn btn-sm btn-outline-danger"
                    onclick="window.borrarTodo(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            listaTareas.appendChild(li);
        });
    } catch (error) {
        console.error("Error al obtener datos:", error);
        listaTareas.innerHTML = `<li class="list-group-item text-danger">Error: ${error.message}</li>`;
    }
};

// --- FUNCIÓN DE CREACIÓN (CREATE.HTML) ---

const agregarTodo = async (e) => { 
    e.preventDefault();
    const inputTarea = document.querySelector("#input-tarea");
    const tarea = inputTarea.value.trim();

    if (!tarea) return; 
    const nuevoTodo = { tarea: tarea, completada: false };
    
    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoTodo)
        });
        
        if (!response.ok) throw new Error('Falló la creación de la tarea.');
        
        alert('Tarea creada correctamente. Volviendo a la lista.');
        window.location.href = 'read.html'; // 🚨 Redirige a la nueva página de lectura
        
    } catch (error) {
        console.error('Error al agregar tarea:', error);
    }
};


// --- FUNCIONES DE ACCIÓN (UPDATE/DELETE) ---

window.toggleCompletada = async (id) => {
    // Para toogle, recargamos 'todos' desde la API para asegurar que no estamos editando datos viejos.
    await cargarLista(); 
    const todo = todos.find((item) => item.id === id);
    if (todo) {
        const todoActualizado = { ...todo, completada: !todo.completada };
        await actualizarTodoAPI(todoActualizado);
        cargarLista(); // Recargar lista para reflejar el cambio
    }
};

window.borrarTodo = async (id) => { 
    const todo = todos.find((item) => item.id === id);
    if (!todo) return;

    const validar = confirm(`¿Seguro que quiere eliminar: "${todo.tarea}"?`);
    
    if (validar) {
        try {
            const response = await fetch(`${API_URL}/todos/${id}`, {
                method: 'DELETE'
            });

            if (response.status !== 204) throw new Error('Falló la eliminación.');
            
            cargarLista();
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
        }
    }
};

// --- LÓGICA DE EDICIÓN (EDIT.HTML) ---

const cargarTareaParaEditar = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const formEditar = document.querySelector("#form-editar");
    const inputTareaEdit = document.querySelector("#input-tarea-edit");
    const idDisplay = document.querySelector("#tarea-id-display");
    const msgError = document.querySelector("#mensaje-error");

    if (!formEditar || !id) return; // No estamos en edit.html o falta ID

    msgError.style.display = 'block';

    try {
        // 1. Obtener la tarea específica (GET /api/todos/:id)
        const response = await fetch(`${API_URL}/todos/${id}`);
        if (!response.ok) throw new Error(`Tarea ID ${id} no encontrada.`);
        
        const tarea = await response.json();

        // 2. Llenar el formulario
        idDisplay.textContent = `(ID: ${tarea.id})`;
        inputTareaEdit.value = tarea.tarea;
        formEditar.style.display = 'block';
        msgError.style.display = 'none';

        // 3. Manejar el envío del formulario de edición
        formEditar.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nuevoTexto = inputTareaEdit.value.trim();
            
            if (nuevoTexto === "" || nuevoTexto === tarea.tarea) {
                alert("No se realizaron cambios.");
                return;
            }

            const todoActualizado = { ...tarea, tarea: nuevoTexto };
            await actualizarTodoAPI(todoActualizado); // Envía PUT
            
            alert('Tarea modificada con éxito.');
            window.location.href = 'read.html'; // Redirige a la lista
        });

    } catch (error) {
        idDisplay.textContent = '';
        msgError.textContent = `Error: ${error.message}`;
        msgError.style.display = 'block';
    }
};


// ------------------------------------------------------------------
// 🚦 PUNTO DE ARRANQUE: Ejecutar solo la lógica necesaria
// ------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Lógica para read.html
    const listaTareas = document.querySelector("#lista-tareas");
    if (listaTareas) {
        cargarLista(); 
    }

    // Lógica para create.html
    const formAgregar = document.querySelector("#form-agregar");
    if (formAgregar) {
        formAgregar.addEventListener('submit', agregarTodo);
    }

    // Lógica para edit.html
    const formEditar = document.querySelector("#form-editar");
    if (formEditar) {
        cargarTareaParaEditar();
    }
});