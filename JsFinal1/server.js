// Importar módulos
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000; // El puerto donde correrá el servidor

// Middleware
app.use(cors()); 
app.use(express.json());

// ----------------------------------------------------------------
// 🌟 NUEVO CÓDIGO CLAVE 🌟: SERVIR ARCHIVOS ESTÁTICOS
// ----------------------------------------------------------------
// Le decimos a Express que debe servir todos los archivos (HTML, JS, CSS)
// que están en la carpeta donde se ejecuta este script (__dirname).
// Cuando el navegador pida '/', Express buscará index.html.
app.use(express.static(path.join(__dirname))); 

// Ubicación del archivo JSON
const dataPath = path.join(__dirname, 'data', 'data.json');

// ----------------------------------------------------
// ENDPOINT PRINCIPAL: Obtener datos (LECTURA - READ)
// ----------------------------------------------------
app.get('/api/gifts', (req, res) => {
    try {
        const data = fs.readFileSync(dataPath, 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error("Error al leer datos:", error);
        res.status(500).send({ message: "Error al cargar los datos." });
    }
});

// ----------------------------------------------------
// ENDPOINT para MANIPULAR DATOS (ESCRITURA - CREATE, UPDATE, DELETE)
// ----------------------------------------------------
app.post('/api/gifts/save', (req, res) => {
    try {
        const newData = req.body;
        
        fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2), 'utf-8');
        
        res.status(200).send({ message: "Datos guardados correctamente." });
        
    } catch (error) {
        console.error("Error al guardar datos:", error);
        res.status(500).send({ message: "Error al guardar los datos." });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`✅ Aplicación Frontend y Backend corriendo en: http://localhost:${PORT}`);
});