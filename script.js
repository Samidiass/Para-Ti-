const messages = [
"Você é o amor da minha vida ❤️",
"Penso em você o tempo todo 💭",
"Seu sorriso ilumina meu dia ☀️",
"Te amo mais a cada instante 💖",
"Com você, tudo é mais bonito 🌸",
"Você é meu lugar favorito 😍",
"Quero estar com você para sempre 💍",
"Seu abraço é meu lar 🏡",
"Você me completa 💞",
"Meu coração é todo seu 💘"
];


// Función que crea una burbuja de texto con un mensaje aleatorio
function createTextBubble() {
  // Creamos un nuevo elemento <div>
  const bubble = document.createElement("div");

  // Le asignamos la clase CSS "text-bubble" (debes definirla en tu CSS)
  bubble.className = "text-bubble";

  // Seleccionamos un mensaje aleatorio del arreglo
  bubble.innerText = messages[Math.floor(Math.random() * messages.length)];

  // Calculamos una posición aleatoria dentro de la pantalla (entre 10% y 90%)
  const left = Math.random() * 80 + 10;
  const top = Math.random() * 80 + 10;

  // Establecemos la posición absoluta y aplicamos las coordenadas calculadas
  bubble.style.position = "absolute";
  bubble.style.left = left + "vw"; // vw = porcentaje del ancho de la ventana
  bubble.style.top = top + "vh";   // vh = porcentaje del alto de la ventana

  // Buscamos el contenedor con ID "bubbles-text" y añadimos la burbuja
  const container = document.getElementById("bubbles-text");
  container.appendChild(bubble);

  // Esperamos un momento (10ms) para asegurarnos de que se renderizó
  setTimeout(() => {
    const rect = bubble.getBoundingClientRect(); // Obtenemos las coordenadas reales del div

    // Si la burbuja se sale por la derecha, la ajustamos hacia la izquierda
    if (rect.right > window.innerWidth) {
      const newLeft = window.innerWidth - rect.width - 10;
      bubble.style.left = `${newLeft}px`;
    }

    // Si la burbuja se sale por la parte inferior, la subimos
    if (rect.bottom > window.innerHeight) {
      const newTop = window.innerHeight - rect.height - 10;
      bubble.style.top = `${newTop}px`;
    }

    // Si se va muy a la izquierda, la traemos hacia adentro
    if (rect.left < 0) {
      bubble.style.left = "10px";
    }

    // Si se va muy arriba, la bajamos un poco
    if (rect.top < 0) {
      bubble.style.top = "10px";
    }
  }, 10);

  // Eliminamos la burbuja automáticamente después de 8 segundos
  setTimeout(() => {
    bubble.remove();
  }, 8000);
}

// Llamamos a la función createTextBubble cada 500 milisegundos (0.5 segundos)
setInterval(createTextBubble, 500);
