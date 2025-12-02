import http from "http";
import fs from "fs";
import path from "path";

const PORT = 3000;

// Tipos MIME para servir archivos correctamente
const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".jpeg": "image/jpeg",
    ".ico": "image/x-icon"
};

// Servidor HTTP principal
const server = http.createServer((req, res) => {

    // Si no se pide una ruta específica → devolver index.html
    let filePath = "." + (req.url === "/" ? "/index.html" : req.url);

    // Obtener extensión del archivo
    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || "application/octet-stream";

    // Verificar si el archivo existe
    fs.readFile(filePath, (error, content) => {
        if (error) {
            // Archivo no encontrado → 404
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>404 - Archivo no encontrado</h1>");
        } else {
            // Devolver archivo
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf-8");
        }
    });
});

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
