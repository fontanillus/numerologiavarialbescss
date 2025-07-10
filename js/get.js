// get.js
window.addEventListener('DOMContentLoaded', () => {
  const queryStrings = new URLSearchParams(window.location.search);
  const parametrosGet = Object.fromEntries(queryStrings.entries());

  console.log('Parámetros GET:', parametrosGet);

  // Mostrar fecha si existe
  if ('fecha' in parametrosGet) {
    const fecha = parametrosGet.fecha;
    const inputFecha = document.getElementById('fechaNacimiento');

    // Validación básica de formato ISO: yyyy-mm-dd
    const esValida = /^\d{4}-\d{2}-\d{2}$/.test(fecha);

    if (esValida && inputFecha) {
      inputFecha.value = fecha;

      // Si hay una función definida para calcular, se llama
      if (typeof calcularDesdeFecha === 'function') {
        calcularDesdeFecha();
      }
    } else {
      mostrarErrorDOM('Fecha inválida');
    }
  }

  // Mostrar nombre si existe
  if ('nombre' in parametrosGet) {
    const nombre = decodeURIComponent(parametrosGet.nombre);
    const inputNombre = document.getElementById('nombreCompleto');

    if (inputNombre && nombre.trim()) {
      inputNombre.value = nombre.trim();

      if (typeof calcularDesdeNombre === 'function') {
        calcularDesdeNombre();
      }
    } else {
      mostrarErrorDOM('Nombre inválido');
    }
  }

  // Mostrar mensaje de error en el DOM si existe un div con id="resultado"
  function mostrarErrorDOM(mensaje) {
    const div = document.getElementById('resultado');
    if (div) {
      div.textContent = mensaje;
      div.style.color = 'red';
    } else {
      console.warn(mensaje);
    }
  }
});

