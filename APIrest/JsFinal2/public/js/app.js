// ================================
// CONFIG
// ================================
let todos = [];
const API_URL = 'http://localhost:3000/api';

// ================================
// REQUEST HELPER (ROBUSTO)
// ================================
const request = async (url, options = {}) => {
    const res = await fetch(url, options);
    const text = await res.text();

    if (!res.ok) {
        throw new Error(text || `Error HTTP ${res.status}`);
    }

    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
};

// ================================
// READ (LISTAR) - read.html
// ================================
const cargarLista = async () => {
    const lista = document.querySelector("#lista-tareas");
    if (!lista) return;

    try {
        todos = await request(`${API_URL}/todos`);
        lista.innerHTML = "";

        if (!todos.length) {
            lista.innerHTML = `<li class="list-group-item text-muted">No hay tareas.</li>`;
            return;
        }

        todos.forEach(t => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                <span>${t.tarea}</span>
                <div class="d-flex gap-2">
                    <button class="btn btn-warning btn-sm" onclick="editarDesdeRead(${t.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="borrarTodo(${t.id})">Eliminar</button>
                </div>
            `;
            lista.appendChild(li);
        });

    } catch (err) {
        lista.innerHTML = `<li class="list-group-item text-danger">Error: ${err.message}</li>`;
    }
};

window.editarDesdeRead = (id) => {
    location.href = `edit.html?id=${id}`;
};

// ================================
// LISTAR - edit.html
// ================================
const cargarListaParaEditar = async () => {
    const lista = document.querySelector("#lista-editar");
    if (!lista) return;

    try {
        const data = await request(`${API_URL}/todos`);
        todos = data;  // guardar en memoria

        lista.innerHTML = "";

        if (!data.length) {
            lista.innerHTML = `<li class="list-group-item text-muted">No hay tareas.</li>`;
            return;
        }

        data.forEach(t => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                <span>${t.tarea}</span>
                <button class="btn btn-primary btn-sm" onclick="abrirModal(${t.id})">Editar</button>
            `;
            lista.appendChild(li);
        });

    } catch (err) {
        lista.innerHTML = `<li class="list-group-item text-danger">Error: ${err.message}</li>`;
    }
};

// ================================
// ABRIR MODAL (SIN DEPENDER DEL BACKEND)
// ================================
window.abrirModal = (id) => {
    const tarea = todos.find(t => t.id == id);

    if (!tarea) {
        alert("No se encontró la tarea en memoria");
        return;
    }

    document.querySelector("#modal-id").value = tarea.id;
    document.querySelector("#modal-input-tarea").value = tarea.tarea;

    new bootstrap.Modal(document.getElementById('modalEditar')).show();
};

// ================================
// UPDATE (GUARDAR EDICIÓN)
// ================================
const guardarEdicion = async (e) => {
    e.preventDefault();

    const id = document.querySelector("#modal-id").value;
    const texto = document.querySelector("#modal-input-tarea").value.trim();

    if (!texto) {
        alert("No puedes guardar vacío");
        return;
    }

    try {
        await request(`${API_URL}/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tarea: texto, completada: false })
        });

        // actualizar en memoria
        const index = todos.findIndex(t => t.id == id);
        if (index !== -1) {
            todos[index].tarea = texto;
        }

        bootstrap.Modal
            .getInstance(document.getElementById("modalEditar"))
            .hide();

        cargarListaParaEditar();

    } catch (err) {
        alert("Error al guardar:\n" + err.message);
    }
};

// ================================
// CARGAR AUTOMÁTICO POR URL ?id=
// ================================
const cargarTareaPorURL = () => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    if (!id) return;

    // espera a que cargue la lista
    setTimeout(() => abrirModal(id), 300);
};

// ================================
// DELETE
// ================================
window.borrarTodo = async (id) => {
    if (!confirm("¿Seguro que quieres borrar?")) return;

    try {
        await request(`${API_URL}/todos/${id}`, { method: "DELETE" });
        cargarLista();
    } catch (err) {
        alert("Error al borrar:\n" + err.message);
    }
};

// ================================
// CREATE
// ================================
const initCreate = () => {
    const form = document.querySelector("#form-agregar");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const input = document.querySelector("#input-tarea");
        const texto = input.value.trim();
        if (!texto) return;

        try {
            await request(`${API_URL}/todos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tarea: texto, completada: false })
            });

            location.href = "read.html";
        } catch (err) {
            alert("Error al crear:\n" + err.message);
        }
    });
};

// ================================
// INIT
// ================================
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#lista-tareas")) cargarLista();
    if (document.querySelector("#lista-editar")) cargarListaParaEditar();
    if (document.querySelector("#form-modal-editar")) {
        document.querySelector("#form-modal-editar")
            .addEventListener("submit", guardarEdicion);
    }

    initCreate();
    cargarTareaPorURL();
});
