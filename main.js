// Diccionarios para las conversiones
const codigoMorse = {
    'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 'g': '--.', 'h': '....',
    'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 'p': '.--.',
    'q': '--.-', 'r': '.-.', 's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
    'y': '-.--', 'z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '.......', // Espacio representado con 7 puntos
    '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.',
    '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', 
    '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
    '[': '-.--.', ']': '-.--.-', '{': '-.--.', '}': '-.--.-'
};

const codigoTexto = {
    '.-': 'a', '-...': 'b', '-.-.': 'c', '-..': 'd', '.': 'e', '..-.': 'f', '--.': 'g', '....': 'h',
    '..': 'i', '.---': 'j', '-.-': 'k', '.-..': 'l', '--': 'm', '-.': 'n', '---': 'o', '.--.': 'p',
    '--.-': 'q', '.-.': 'r', '...': 's', '-': 't', '..-': 'u', '...-': 'v', '.--': 'w', '-..-': 'x',
    '-.--': 'y', '--..': 'z', '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5',
    '-....': '6', '--...': '7', '---..': '8', '----.': '9', '-----': '0', '.......': ' ', // Espacio representado con 7 puntos
    '.-.-.-': '.', '--..--': ',', '..--..': '?', '.----.': "'", '-.-.--': '!', '-..-.': '/',
    '-.--.': '(', '-.--.-': ')', '.-...': '&', '---...': ':', '-.-.-.': ';', '-...-': '=',
    '.-.-.': '+', '-....-': '-', '..--.-': '_', '.-..-.': '"', '...-..-': '$', '.--.-.': '@',
    '-.--.': '[', '-.--.-': ']', '-.--.': '{', '-.--.-': '}'
};

// Función para verificar caracteres válidos en texto (sin caracteres especiales) solo para texto
const verificarCaracteresTexto = (texto) => {
    const caracteresInvalidos = /[^a-zA-Z0-9\s]/;
    return !caracteresInvalidos.test(texto); // Retorna true si no hay caracteres inválidos
};

// Función para verificar caracteres válidos en código Morse
const verificarCaracteresMorse = (morse) => {
    const caracteresInvalidosMorse = /[^.-\s]/; // Solo permite puntos, guiones y espacios
    return !caracteresInvalidosMorse.test(morse); // Retorna true si no hay caracteres inválidos
};

// Función para convertir texto a código Morse
const convertirAMorse = (texto) => 
    texto.toLowerCase().split('').map(letra => codigoMorse[letra] || '').join(' ').trim();

// Función para convertir código Morse a texto
const convertirATexto = (morse) => 
    morse.split(' ').map(codigo => codigoTexto[codigo] || '').join('');

// Función para manejar la conversión cuando se hace clic en el botón
const realizarConversion = () => {
    const entradaTexto = document.getElementById('textoEntrada').value.trim();
    const tipoConversion = document.getElementById('tipoConversion').value;
    const salidaTexto = document.getElementById('textoSalida');

    // Verifica si el campo de entrada está vacío
    if (entradaTexto === '') {
        salidaTexto.textContent = 'Por favor, introduce un texto válido.';
        salidaTexto.style.display = 'block';
    } else if (tipoConversion === 'texto-a-morse' && !verificarCaracteresTexto(entradaTexto)) {
        salidaTexto.textContent = 'Error: No se permiten caracteres especiales o expresiones en el texto.';
        salidaTexto.style.display = 'block'; // Muestra el cuadro de salida
    } else if (tipoConversion === 'texto-a-morse') {
        salidaTexto.textContent = convertirAMorse(entradaTexto);
        salidaTexto.style.display = 'block';
    } else if (tipoConversion === 'morse-a-texto') {
        if (!verificarCaracteresMorse(entradaTexto)) {
            salidaTexto.textContent = 'Error: Solo se permiten puntos, guiones y espacios en el código Morse.';
            salidaTexto.style.display = 'block'; // Muestra el cuadro de salida
        } else {
            // Aquí se permite el texto Morse válido
            salidaTexto.textContent = convertirATexto(entradaTexto);
            salidaTexto.style.display = 'block';
        }
    }
};

// Función para limpiar todo
const limpiarTodo = () => {
    document.getElementById('textoEntrada').value = '';
    document.getElementById('textoSalida').textContent = '';
    document.getElementById('tipoConversion').selectedIndex = 0; 
    document.getElementById('textoSalida').style.display = 'none'; 
};

// Agregar eventos de clic a los botones
document.getElementById('botonConvertir').onclick = realizarConversion;
document.getElementById('botonLimpiar').onclick = limpiarTodo;
