// Cambiar tema
let cambiarTema = document.getElementById('temaBtn');
temaBtn.onclick = function () {
    document.body.classList.toggle('dark');
};

// Saludo personalizado
const nombreInput = document.getElementById('nombreInput');
const saludarBtn = document.getElementById('saludarBtn');
const mensaje = document.getElementById('mensaje');

saludarBtn.addEventListener('click', function() {
    const nombre = nombreInput.value.trim();
    if (nombre) {
        mensaje.textContent = `¡Hola, ${nombre}! 😇 ¿ Cómo estas ?`;
    } else {
        mensaje.textContent = `Por favor, escribe tu nombre.`;
    }
});

// Mostrar - Ocultar Imagen
const mostrarBtn = document.getElementById('mostrarBtn');
const foto = document.getElementById('foto');

mostrarBtn.onclick = function () {
    if (foto.style.display === 'none') {
        foto.style.display = 'block';
        mostrarBtn.textContent = 'Ocultar Imagen';
    } else {
        foto.style.display = 'none';
        mostrarBtn.textContent = 'Mostar Imagen';
    }
};

// Contador
const likeBtn = document.getElementById('likeBtn');
const contador = document.getElementById('contador');
let likes = 0;

likeBtn.addEventListener('click', function () {
    likes ++
    contador.textContent = `Likes: ${likes}`;
});