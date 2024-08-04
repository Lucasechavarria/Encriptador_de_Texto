const texto = document.getElementById('texto');
const textoEncriptado = document.getElementById('texto-encriptado');
const encriptar = document.getElementById('encriptar');
const desencriptar = document.getElementById('desencriptar');
const mostrarEntrada = document.getElementById('mostrar-entrada');
const limpiar = document.getElementById('limpiar');
const copiar = document.getElementById('copiar');

let entradaOculta = false;
let textoOriginal = '';
let textoEncriptadoOriginal = '';

// Función para encriptar texto
const encriptarTexto = (texto) => {
  const llaves = {
    e: 'enter',
    i: 'imes',
    a: 'ai',
    o: 'ober',
    u: 'ufat',
  };

  return texto.replace(/[eioua]/g, (letra) => llaves[letra]);
};

// Función para desencriptar texto
const desencriptarTexto = (texto) => {
  const llaves = {
    enter: 'e',
    imes: 'i',
    ai: 'a',
    ober: 'o',
    ufat: 'u',
  };

  let desencriptado = texto;
  for (const [key, value] of Object.entries(llaves)) {
    desencriptado = desencriptado.replace(new RegExp(key, 'g'), value);
  }

  return desencriptado;
};

// Función para validar el texto
const validarTexto = (texto) => {
  const regex = /^[a-z\s]*$/;
  return regex.test(texto);
};

// Evento para el botón de encriptar
encriptar.addEventListener('click', () => {
  const textoValor = texto.value.trim();
  if (!validarTexto(textoValor)) {
    alert('Solo acepta texto en minúsculas, sin acentos ni caracteres especiales');
    return;
  }
  const encriptado = encriptarTexto(textoValor);
  textoEncriptado.value = encriptado;
});

// Evento para el botón de desencriptar
desencriptar.addEventListener('click', () => {
  const textoValor = textoEncriptado.value.trim();
  if (!validarTexto(textoValor)) {
    alert('Solo acepta texto en minúsculas, sin acentos ni caracteres especiales');
    return;
  }
  const desencriptado = desencriptarTexto(textoValor);
  texto.value = desencriptado;
  textoEncriptado.value = desencriptado;
});

// Evento para el botón de limpiar
limpiar.addEventListener('click', () => {
  texto.value = '';
  textoEncriptado.value = '';
});

// Evento para el botón de copiar
copiar.addEventListener('click', () => {
  const textoSeleccionado = textoEncriptado.value || texto.value;
  if (textoSeleccionado) {
    navigator.clipboard.writeText(textoSeleccionado).then(() => {
      alert('Texto copiado al portapapeles!');
    }, () => {
      alert('No se pudo copiar el texto.');
    });
  } else {
    alert('No hay texto para copiar.');
  }
});

// Evento para mostrar/ocultar la entrada
mostrarEntrada.addEventListener('click', () => {
  if (entradaOculta) {
    texto.value = textoOriginal;
    textoEncriptado.value = textoEncriptadoOriginal;
    mostrarEntrada.textContent = '👁️'; // Ojo abierto
    entradaOculta = false;
  } else {
    textoOriginal = texto.value;
    textoEncriptadoOriginal = textoEncriptado.value;
    texto.value = '*'.repeat(textoOriginal.length);
    textoEncriptado.value = '*'.repeat(textoEncriptadoOriginal.length);
    mostrarEntrada.textContent = '🔒'; // Candado cerrado
    entradaOculta = true;
  }
});

// Evento para el interruptor de modo
document.getElementById('mode-switch').addEventListener('change', function() {
  document.body.classList.toggle('dark', this.checked);

  // Cambiar placeholders según el modo
  if (this.checked) {
    texto.placeholder = "Ingrese el texto";
    textoEncriptado.placeholder = "Texto encriptado";
  } else {
    texto.placeholder = "Ingrese el texto";
    textoEncriptado.placeholder = "Texto encriptado";
  }
});
