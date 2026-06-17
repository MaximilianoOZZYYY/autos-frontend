const API_URL = 'https://autos-backend-1.onrender.com/autos';

async function obtenerAutos() {
  try {
    const res = await fetch(API_URL);
    const datos = await res.json();
    const tabla = document.getElementById('tabla');
    tabla.innerHTML = '';
    datos.forEach(auto => {
      tabla.innerHTML += `
        <tr>
          <td>${auto.marca}</td>
          <td>${auto.modelo}</td>
          <td>${auto.anio}</td>
          <td>$${auto.precio}</td>
          <td>${auto.color}</td>
          <td class="acciones">
            <button class="btn-editar" onclick='editar("${auto._id}", "${auto.marca}", "${auto.modelo}", ${auto.anio}, ${auto.precio}, "${auto.color}")'>Editar</button>
            <button class="btn-eliminar" onclick='eliminar("${auto._id}")'>Eliminar</button>
          </td>
        </tr>`;
    });
  } catch (err) {
    console.error('Error al traer autos:', err);
  }
}

document.getElementById('formAuto').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('autoId').value;
  const nuevoAuto = {
    marca: document.getElementById('marca').value,
    modelo: document.getElementById('modelo').value,
    anio: Number(document.getElementById('anio').value),
    precio: Number(document.getElementById('precio').value),
    color: document.getElementById('color').value
  };
  try {
    let res;
    if (id) {
      res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoAuto)
      });
    } else {
      res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoAuto)
      });
    }
    if (res.ok) {
      alert(id ? 'Auto actualizado!' : 'Auto registrado en MongoDB Atlas!');
      cancelarEdicion();
      obtenerAutos();
    }
  } catch (err) {
    console.error('Error al guardar auto:', err);
  }
});

function editar(id, marca, modelo, anio, precio, color) {
  document.getElementById('autoId').value = id;
  document.getElementById('marca').value = marca;
  document.getElementById('modelo').value = modelo;
  document.getElementById('anio').value = anio;
  document.getElementById('precio').value = precio;
  document.getElementById('color').value = color;
  document.getElementById('tituloForm').textContent = '✏️ Editar Vehículo';
  document.getElementById('btnSubmit').textContent = '✏️ Actualizar';
}

function cancelarEdicion() {
  document.getElementById('formAuto').reset();
  document.getElementById('autoId').value = '';
  document.getElementById('tituloForm').textContent = '➕ Registrar Vehículo';
  document.getElementById('btnSubmit').textContent = '🚀 Guardar en la Nube';
}

async function eliminar(id) {
  if (!confirm('¿Seguro que quieres eliminar este auto?')) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Auto eliminado!');
      obtenerAutos();
    }
  } catch (err) {
    console.error('Error al eliminar:', err);
  }
}

obtenerAutos();