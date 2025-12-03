// Importar módulos
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000; 

// Middleware
app.use(cors()); 
app.use(express.json());

// Esto hace que el navegador pueda acceder a index.html, /js/app.js, etc.
app.use(express.static(path.join(__dirname, 'public'))); 

// Ubicación del archivo JSON
const dataPath = path.join(__dirname, 'data', 'todos.json');

// Función auxiliar para leer y escribir el JSON
const readTodos = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') return [];
        throw error;
    }
};

const writeTodos = (todos) => {
    fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2), 'utf-8');
};

// ----------------------------------------------------
// 🟢 READ (GET): Obtener todas las tareas
// ---------------------------------------------------- 
app.get('/api/todos', (req, res) => {
    try {
        const todos = readTodos();
        res.json(todos);
    } catch (error) {
        res.status(500).send({ message: "Error al cargar las tareas." });
    }
});

// ----------------------------------------------------
// 🔵 CREATE (POST): Añadir una nueva tarea
// ----------------------------------------------------
app.post('/api/todos', (req, res) => {
    try {
        const todos = readTodos();
        const nuevaTarea = req.body; // Recibimos solo el objeto de la nueva tarea
        
        // Generar ID (la lógica de ID es ahora responsabilidad del servidor)
        const id = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
        
        const todoCompleto = { ...nuevaTarea, id: id };
        todos.push(todoCompleto);
        
        writeTodos(todos);
        
        // Devolvemos el objeto creado con su ID y el código 201 (Created)
        res.status(201).json(todoCompleto);
    } catch (error) {
        res.status(500).send({ message: "Error al crear la tarea." });
    }
});

// ----------------------------------------------------
// 🟡 UPDATE (PUT): Modificar una tarea existente por ID
// ----------------------------------------------------
app.put('/api/todos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id); // Capturamos el ID de la URL
        const tareaActualizada = req.body; // Recibimos el objeto con los datos actualizados
        
        let todos = readTodos();
        const index = todos.findIndex(t => t.id === id);
        
        if (index === -1) {
            return res.status(404).send({ message: "Tarea no encontrada." });
        }
        
        // Reemplazamos el objeto completo (manteniendo el ID original)
        todos[index] = { ...tareaActualizada, id: id };
        
        writeTodos(todos);
        
        // Devolvemos el objeto actualizado
        res.json(todos[index]);
    } catch (error) {
        res.status(500).send({ message: "Error al actualizar la tarea." });
    }
});

// ----------------------------------------------------
// 🔴 DELETE (DELETE): Eliminar una tarea por ID
// ----------------------------------------------------
app.delete('/api/todos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id); // Capturamos el ID de la URL
        
        let todos = readTodos();
        const initialLength = todos.length;
        
        // Filtramos para eliminar la tarea
        todos = todos.filter(t => t.id !== id);
        
        if (todos.length === initialLength) {
            return res.status(404).send({ message: "Tarea no encontrada." });
        }

        writeTodos(todos);
        
        // Devolvemos el código 204 (No Content) porque la acción fue exitosa
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ message: "Error al eliminar la tarea." });
    }
});
// ... (app.listen sin cambios) ...

// Iniciar el servidor
app.listen(PORT, () => {
    // 🌟 2. CLAVE: El mensaje de inicio debe apuntar a la URL de la APLICACIÓN (el Frontend).
    console.log(`✅ Aplicación CRUD corriendo en: http://localhost:${PORT}`); 
});