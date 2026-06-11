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
        </tr>`;
    });
  } catch (err) {
    console.error('Error al traer autos:', err);
  }
}
 
document.getElementById('formAuto').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nuevoAuto = {
    marca: document.getElementById('marca').value,
    modelo: document.getElementById('modelo').value,
    anio: Number(document.getElementById('anio').value),
    precio: Number(document.getElementById('precio').value),
    color: document.getElementById('color').value
  };
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoAuto)
    });
    if (res.ok) {
      alert('Auto registrado en MongoDB Atlas!');
      document.getElementById('formAuto').reset();
      obtenerAutos();
    }
  } catch (err) {
    console.error('Error al guardar auto:', err);
  }
});
 
obtenerAutos();
