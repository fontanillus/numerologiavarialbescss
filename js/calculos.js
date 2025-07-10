// --- Mapas numerológicos ---
const mapaNumerologico = {
  A: 1, J: 1, S: 1,
  B: 2, T: 2,
  C: 3, Ç: 3, L: 3, U: 3,
  D: 4, M: 4,
  E: 5, N: 5, Ñ: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
  K: 11,
  V: 22
};

const mapaNumerologicoAlma = {
  A: 1, U: 3, E: 5, O: 6, I: 9
};

// --- Variables globales ---
let ultimoNumeroAnio, ultimoSignificadoAnio;
let ultimoNumeroPersonal, ultimoSignificadoPersonal;
let ultimoNumeroDestino, ultimoSignificadoDestino;
let ultimoNumeroNombre, ultimoSignificadoNombre;
let ultimoNumeroAlma, ultimoSignificadoAlma;
let ultimoNumeroExpresionAlma, ultimoSignificadoExpresionAlma;
let ultimoNumeroProyectoSentido, ultimoSignificadoProyectoSentido;
let ultimoNumeroAnioPersonal, ultimoSignificadoAnioPersonal;
let ultimoNumeroMesPersonal, ultimoSignificadoMesPersonal;

// --- Utilidades ---
function esFechaValida(año, mes, dia) {
  const fecha = new Date(año, mes - 1, dia);
  return fecha.getFullYear() === año && fecha.getMonth() === mes - 1 && fecha.getDate() === dia;
}

function obtenerPartesFecha(fechaStr) {
  const partes = fechaStr.split('-');
  if (partes.length !== 3) return null;
  const [anio, mes, dia] = partes.map(Number);
  if (!esFechaValida(anio, mes, dia)) return null;
  return { anio, mes, dia };
}

function reducirNumero(num) {
  const maestros = [11, 22, 33];
  while (num > 9 && !maestros.includes(num)) {
    num = num.toString().split('').reduce((acc, val) => acc + Number(val), 0);
  }
  return num;
}

function mostrarResultado(id, numero, significado) {
  const div = document.getElementById(id);
  if (!div) return;
  div.innerHTML = `
    <div style="font-size: 20px; color: darkblue;">Tu número es: ${numero}</div>
    <div style="font-size: 14px; color: darkblue;">${significado}</div>
  `;
  div.style.color = 'black';
}

function mostrarError(id, mensaje) {
  const div = document.getElementById(id);
  if (div) {
    div.textContent = mensaje;
    div.style.color = 'red';
  }
}

function mostrarEnConsola(tipo, numero, significado) {
  console.log(`[${tipo}] Número: ${numero}, Significado: ${significado}`);
}

function sumarValoresDeTexto(texto, mapa) {
  return [...texto].reduce((suma, letra) => suma + (mapa[letra] || 0), 0);
}

function calcularNumeroDesdeTexto(idResultado, texto, mapa, diccionarioSignificado, tipoLog) {
  if (!texto) {
    mostrarError(idResultado, 'Por favor introduce un texto válido.');
    return;
  }

  const limpio = texto.toUpperCase().replace(/[^A-ZÑÇ]/g, '');
  const suma = sumarValoresDeTexto(limpio, mapa);
  const numero = reducirNumero(suma);
  const significado = diccionarioSignificado?.[numero] || 'Significado no encontrado.';

  mostrarResultado(idResultado, numero, significado);
  mostrarEnConsola(tipoLog, numero, significado);

  return { numero, significado };
}

// --- NUEVA FUNCIÓN DRY ---
function calcularNumeroDesdeFecha({
  idResultado,
  fecha,
  significadoDiccionario,
  tipoLog,
  guardarResultado
}) {
  const partes = obtenerPartesFecha(fecha);
  if (!partes) {
    mostrarError(idResultado, 'Fecha inválida.');
    return;
  }

  const { anio, mes, dia } = partes;
  const digitos = [...anio.toString(), ...mes.toString().padStart(2, '0'), ...dia.toString().padStart(2, '0')];
  const suma = digitos.reduce((acc, val) => acc + Number(val), 0);
  const numero = reducirNumero(suma);
  const significado = significadoDiccionario?.[numero] || 'Significado no encontrado.';

  mostrarResultado(idResultado, numero, significado);
  mostrarEnConsola(tipoLog, numero, significado);

  if (guardarResultado) guardarResultado(numero, significado);
}

// --- Inicialización automática del año ---
window.addEventListener('DOMContentLoaded', () => {
  const hoy = new Date();
  const campoAnio = document.getElementById('anio');
  if (campoAnio) campoAnio.value = hoy.getFullYear();
});

// --- Cálculos específicos usando DRY ---
function calcularNumeroDestino() {
  const fecha = document.getElementById('fechaNac').value;

  calcularNumeroDesdeFecha({
    idResultado: 'resultadoDestino',
    fecha,
    significadoDiccionario: significadosNumeroDestino,
    tipoLog: 'Número Destino',
    guardarResultado: (numero, significado) => {
      ultimoNumeroDestino = numero;
      ultimoSignificadoDestino = significado;
    }
  });
}


function calcularProyectoSentido() {
  const fechaInput = document.getElementById('fechaNac');
  const fecha = fechaInput.value;
  const errorDiv = document.getElementById('errorFecha');
  const resultadoDiv = document.getElementById('resultadoProyectoSentido');

  errorDiv.textContent = "";
  resultadoDiv.textContent = "";

  if (!fecha) {
    errorDiv.textContent = "Por favor, ingresa una fecha.";
    return;
  }

  const fechaSeleccionada = new Date(fecha);

  // Validar que la fecha sea válida
  if (isNaN(fechaSeleccionada.getTime())) {
    errorDiv.textContent = "Fecha inválida, por favor verifica el formato.";
    return;
  }

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (fechaSeleccionada > hoy) {
    errorDiv.textContent = "La fecha no puede ser futura.";
    return;
  }

  // Reducir fecha a número
  const numero = reducirADigito(fecha.replace(/-/g, ''));

  const significado = significadosProyectoSentido[numero] || "Significado no definido.";

  resultadoDiv.innerHTML = `<strong>Número Proyecto Sentido:</strong> ${numero} <br> ${significado}`;
}


function calcularNumeroPersonal() {
  const fecha = document.getElementById('fechaNac').value;

  calcularNumeroDesdeFecha({
    idResultado: 'resultado',
    fecha,
    significadoDiccionario: significadosNumeroPersonales,
    tipoLog: 'Número Personal',
    guardarResultado: (numero, significado) => {
      ultimoNumeroPersonal = numero;
      ultimoSignificadoPersonal = significado;
    }
  });
}

// --- Cálculos que no usan la función DRY (diferente lógica) ---
function calcularNumeroAnio() {
  const input = parseInt(document.getElementById('anio').value);
  if (isNaN(input) || input < 1900 || input > 2100) {
    mostrarError('resultadoAnio', 'Año inválido');
    return;
  }

  const suma = reducirNumero([...input.toString()].reduce((acc, val) => acc + Number(val), 0));
  const significado = significadosNumeroAnios?.[suma] || 'Significado no encontrado.';

  ultimoNumeroAnio = suma;
  ultimoSignificadoAnio = significado;
  mostrarResultado('resultadoAnio', suma, significado);
  mostrarEnConsola('Número Año', suma, significado);
}

function mostrarExplicacionAnio() {
  if (ultimoSignificadoAnio)
    mostrarResultado('explicacionAnio', ultimoNumeroAnio, ultimoSignificadoAnio);
  else mostrarError('explicacionAnio', 'No hay explicación disponible.');
}

function calcularNumeroNombre() {
  const nombre = document.getElementById('nombreCompleto').value;
  const resultado = calcularNumeroDesdeTexto('resultado', nombre, mapaNumerologico, significadosNumeroNombre, 'Número Nombre');
  if (resultado) {
    ultimoNumeroNombre = resultado.numero;
    ultimoSignificadoNombre = resultado.significado;
  }
}

function calcularNumeroAlma() {
  const nombre = document.getElementById('nombreCompleto').value;
  const resultado = calcularNumeroDesdeTexto('resultadoAlma', nombre, mapaNumerologicoAlma, significadosNumeroAlma, 'Número Alma');
  if (resultado) {
    ultimoNumeroAlma = resultado.numero;
    ultimoSignificadoAlma = resultado.significado;
  }
}

function calcularNumeroExpresionAlma() {
  const nombre = document.getElementById('nombreCompleto').value;
  const resultado = calcularNumeroDesdeTexto('resultadoExpresionAlma', nombre, mapaNumerologico, significadosNumeroExpresionAlma, 'Número Expresión Alma');
  if (resultado) {
    ultimoNumeroExpresionAlma = resultado.numero;
    ultimoSignificadoExpresionAlma = resultado.significado;
  }
}

function calcularNumeroAnioPersonal() {
  const fecha = document.getElementById('fechaNac').value;
  const partes = obtenerPartesFecha(fecha);
  if (!partes) {
    mostrarError('resultadoAnioPersonal', 'Fecha inválida.');
    return;
  }

  const { dia, mes } = partes;
  const anioActual = new Date().getFullYear();
  const suma = reducirNumero(dia + mes + anioActual);
  const significado = significadosAnioPersonal?.[suma] || 'Significado no encontrado.';

  ultimoNumeroAnioPersonal = suma;
  ultimoSignificadoAnioPersonal = significado;

  mostrarResultado('resultadoAnioPersonal', suma, significado);
  mostrarEnConsola('Número Año Personal', suma, significado);
}

function calcularMesPersonal() {
  const fecha = document.getElementById('fechaNac').value;
  const partes = obtenerPartesFecha(fecha);
  if (!partes) {
    mostrarError('resultadoMesPersonal', 'Fecha inválida.');
    return;
  }

  const { dia } = partes;
  const hoy = new Date();
  const mesActual = hoy.getMonth() + 1;
  const anioActual = hoy.getFullYear();

  const suma = reducirNumero(dia + mesActual + anioActual);
  const significado = significadosMesPersonal?.[suma] || 'Significado no encontrado.';

  ultimoNumeroMesPersonal = suma;
  ultimoSignificadoMesPersonal = significado;

  mostrarResultado('resultadoMesPersonal', suma, significado);
  mostrarEnConsola('Número Mes Personal', suma, significado);
}
