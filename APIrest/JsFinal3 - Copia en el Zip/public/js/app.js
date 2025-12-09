const API = 'http://localhost:3000/api/solicitudes';

// ==============================
// CREATE
// ==============================
const formCrear = document.querySelector('#form-crear');
if (formCrear) {
  formCrear.addEventListener('submit', async e => {
    e.preventDefault();

    const data = {
      nombre: document.querySelector('#nombre').value,
      correo: document.querySelector('#correo').value,
      tipo: document.querySelector('#tipo').value,
      descripcion: document.querySelector('#descripcion').value
    };

    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    location.href = 'readSoli.html';
  });
}

// ==============================
// READ
// ==============================
const lista = document.querySelector('#lista-solicitudes');
if (lista) {
  fetch(API)
    .then(r => r.json())
    .then(data => {
      lista.innerHTML = '';
      data.forEach(s => {
        lista.innerHTML += `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${s.nombre} - ${s.correo} - ${s.tipo} - ${s.descripcion}</span>
            <button class="btn btn-danger btn-sm" onclick="eliminar(${s.id})">Eliminar</button>
          </li>
        `;
      });
    });
}

window.eliminar = async (id) => {
  if (!confirm('¿Eliminar?')) return;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  location.reload();
};

// ==============================
// EDIT
// ==============================
const listaEditar = document.querySelector('#lista-editar');
if (listaEditar) {
  fetch(API)
    .then(r => r.json())
    .then(tareas => {
      listaEditar.innerHTML = '';
      tareas.forEach(s => {
        listaEditar.innerHTML += `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${s.nombre} - ${s.correo} - ${s.tipo} - ${s.descripcion}</span>
            <button class="btn btn-warning btn-sm" onclick="abrirModal(${s.id})">Editar</button>
          </li>
        `;
      });
    });
}

window.abrirModal = async (id) => {
  const res = await fetch(`${API}/${id}`);
  const s = await res.json();

  document.querySelector('#edit-id').value = s.id;
  document.querySelector('#edit-nombre').value = s.nombre;
  document.querySelector('#edit-correo').value = s.correo;
  document.querySelector('#edit-tipo').value = s.tipo;
  document.querySelector('#edit-descripcion').value = s.descripcion;

  new bootstrap.Modal(document.getElementById('modalEditar')).show();
};

const formEditar = document.querySelector('#form-modal-editar');
if (formEditar) {
  formEditar.addEventListener('submit', async e => {
    e.preventDefault();

    const id = document.querySelector('#edit-id').value;
    const data = {
      nombre: document.querySelector('#edit-nombre').value,
      correo: document.querySelector('#edit-correo').value,
      tipo: document.querySelector('#edit-tipo').value,
      descripcion: document.querySelector('#edit-descripcion').value
    };

    await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    location.reload();
  });
}
