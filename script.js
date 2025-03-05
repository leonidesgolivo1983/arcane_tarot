// Definición de algunas cartas del Tarot con estilo Arcane (5 de muestra)
const tarot = {
  1: { name: "El Mago", value: 1, desc: "Un inventor con chispas doradas y engranajes girando en un taller neón." },
  4: { name: "El Emperador", value: 4, desc: "Un rey steampunk en un trono mecánico, cetro brillando en turquesa." },
  16: { name: "La Torre", value: 16, desc: "Una torre colapsa con relámpagos rojos, escombros en un cielo tormentoso." },
  57: { name: "Siete de Espadas", value: 7, desc: "Un traidor encapuchado escapa, espadas destellando púrpura en la sombra." },
  68: { name: "La Fuerza", value: 8, desc: "Una guerrera doma un león mecánico, luz ámbar pulsando en la penumbra." }
};

/*******************************************
 * 1) MAZO DE TAROT (10 CARTAS DE EJEMPLO)
 ******************************************/
// Ejemplo parcial de mazo de tarot (completa hasta 78 cartas)
const tarotDeck = {
  0: { name: "El Loco", value: 0, desc: "Inicio, libertad y aventura." },
  1: { name: "El Mago", value: 1, desc: "Habilidad y poder para manifestar." },
  2: { name: "La Sacerdotisa", value: 2, desc: "Misterio, intuición y sabiduría interior." },
  3: { name: "La Emperatriz", value: 3, desc: "Creatividad, abundancia y conexión con la naturaleza." },
  4: { name: "El Emperador", value: 4, desc: "Autoridad, estructura y liderazgo." },
  5: { name: "El Hierofante", value: 5, desc: "Tradición, enseñanza y espiritualidad." },
  6: { name: "Los Enamorados", value: 6, desc: "Decisión, amor y relaciones." },
  7: { name: "El Carro", value: 7, desc: "Determinación y victoria." },
  8: { name: "La Fuerza", value: 8, desc: "Coraje y control de las pasiones." },
  9: { name: "El Ermitaño", value: 9, desc: "Búsqueda interior y sabiduría." }
  // ... agrega las cartas restantes hasta la 77
};

/*******************************************
 * 2) GENERAR LISTA DE CLAVES (0 A 77)
 *    Por ahora, solo 10 cartas de ejemplo (0-9)
 ******************************************/
// Para este ejemplo, usamos las cartas definidas (0 a 9)
const fullDeckKeys = Object.keys(tarotDeck).map(Number);

/*******************************************
 * 3) POSICIONES DE LA TIRADA CRUZ CELESTIAL
 ******************************************/
// Definir las 10 posiciones de la tirada combinada (Cruz Celestial)
const readingPositions = [
  { pos: 1, title: "Situación Actual", casa: "Casa I", description: "Estado presente y energía personal." },
  { pos: 2, title: "El Desafío", casa: "Casa II", description: "Obstáculo relacionado con tus valores." },
  { pos: 3, title: "Pasado Inmediato", casa: "Casa III", description: "Influencia reciente en tu situación." },
  { pos: 4, title: "Fundamento", casa: "Casa IV", description: "Orígenes y bases emocionales." },
  { pos: 5, title: "Aspiraciones", casa: "Casa V", description: "Metas y expresión creativa." },
  { pos: 6, title: "Lo Inconsciente", casa: "Casa VI", description: "Miedos y hábitos ocultos." },
  { pos: 7, title: "Influencias Externas", casa: "Casa VII", description: "Relaciones y alianzas." },
  { pos: 8, title: "Esperanzas y Miedos", casa: "Casa VIII", description: "Transformaciones y temores profundos." },
  { pos: 9, title: "Lecciones", casa: "Casa IX", description: "Aprendizajes y caminos a seguir." },
  { pos: 10, title: "Desenlace", casa: "Casa X", description: "Resultado y reflejo profesional." }
];

/*******************************************
 * 4) DIARIO GUARDADO EN localStorage
 ******************************************/
// Diario almacenado en localStorage
let diary = JSON.parse(localStorage.getItem("diary")) || [];

/*******************************************
 * 5) FUNCIONES BÁSICAS DEL JUEGO
 ******************************************/

// Función para seleccionar 'count' cartas aleatorias (sin repetición)
function getRandomCards(deckKeys, count) {
  const copy = deckKeys.slice();
  const selected = [];
  for (let i = 0; i < count; i++) {
    if (copy.length === 0) break;
    const index = Math.floor(Math.random() * copy.length);
    selected.push(copy.splice(index, 1)[0]);
  }
  return selected;
}

// Función para iniciar el juego (muestra la interfaz y activa la música)
function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game").style.display = "block";
  const bgMusic = document.getElementById("bg-music");
  bgMusic.volume = 0.5;
  bgMusic.play().catch(err => console.log("Error al reproducir la música:", err));
}

// Función para generar la tirada combinada (Cruz Celestial) con animación y narración
function drawCombinedReading() {
  const cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = ""; // Limpia cartas previas
  
  // Selecciona 10 cartas aleatorias
  const selectedKeys = getRandomCards(fullDeckKeys, 10);
  
  let readingText = "";
  const selectedCards = [];
  
  for (let i = 0; i < readingPositions.length; i++) {
    const posData = readingPositions[i];
    const cardKey = selectedKeys[i];
    const card = tarotDeck[cardKey] || { name: "Carta desconocida", value: "-", desc: "Sin descripción." };
    
    // Crear la carta con animación
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.style.animationDelay = `${i * 0.2}s`;
    cardDiv.innerHTML = `
      <div class="overlay">
        <b>Posición ${posData.pos}: ${posData.title}</b><br>
        <i>${posData.casa}</i><br>
        ${posData.description}<br><br>
        <b>${card.name}</b><br>
        ${card.desc}
      </div>
    `;
    cardsContainer.appendChild(cardDiv);
    
    // Construir el texto de la lectura (con enfoque oracular)
    readingText += `En la posición ${posData.pos} (${posData.title}), aparece ${card.name}. ${card.desc}. `;
    
    selectedCards.push({
      name: card.name,
      value: card.value,
      desc: card.desc
    });
  }
  
  // Mostrar el resumen en el contenedor "narrative"
  document.getElementById("narrative").innerHTML = `<p>${readingText}</p>`;
  
  // Reproducir la narración en voz alta
  speakNarrative(readingText);
  
  // Guardar la tirada en el diario
  const chapter = {
    date: new Date().toLocaleString(),
    cards: selectedCards,
    narrative: readingText,
    total: 0 // Puedes calcular un total si lo deseas
  };
  diary.push(chapter);
  localStorage.setItem("diary", JSON.stringify(diary));
}

// Función para la narración mística usando Web Speech API
function speakNarrative(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.pitch = 0.8;
    utterance.rate = 0.8;
    utterance.volume = 1.0;
    speechSynthesis.speak(utterance);
  } else {
    console.log("Este navegador no soporta Speech Synthesis.");
  }
}

// Función para ver el diario
function viewDiary() {
  const diaryContainer = document.getElementById("diary");
  if (diary.length === 0) {
    diaryContainer.innerHTML = "<p>No hay entradas en el diario aún.</p>";
    return;
  }
  let diaryHTML = "";
  diary.forEach((entry, i) => {
    diaryHTML += `
      <p>
        <b>Capítulo ${i + 1} - ${entry.date}</b><br>
        Cartas: ${entry.cards.map(c => c.name).join(", ")}<br>
        ${entry.narrative}
      </p>
    `;
  });
  diaryContainer.innerHTML = diaryHTML;
}

// Función placeholder para el modo multijugador
function joinMultiplayer() {
  alert("Función multijugador en desarrollo. ¡Próximamente podrás jugar con otros!");
}

// Cadena de dígitos de π (puedes ampliarla para mayor variedad)
const piDigits = "314159265358979323846264338327950288419716939937510";

/* 
  Función para obtener un índice a partir de dos dígitos de π 
  a partir de una posición dada en la cadena.
*/
function getIndexFromPi(posicion) {
  const digitos = piDigits.substring(posicion, posicion + 2);
  const num = parseInt(digitos);
  // Mapear al rango del mazo (por ejemplo, 78)
  return num % fullDeckKeys.length;
}

/*
  Función para generar una tirada usando los dígitos de π.
  Se obtiene un array de 'count' índices.
*/
function generatePiReading(count) {
  let tirada = [];
  // Posición inicial aleatoria en la cadena, asegurándose de que queden suficientes dígitos
  let posicion = Math.floor(Math.random() * (piDigits.length - (2 * count)));
  
  for (let i = 0; i < count; i++) {
    let indice = getIndexFromPi(posicion);
    // Evitar duplicados en la misma tirada
    while (tirada.includes(indice)) {
      posicion += 2;
      indice = getIndexFromPi(posicion);
    }
    tirada.push(indice);
    posicion += 2;
  }
  return tirada;
}

// Función para generar la tirada combinada (Cruz Celestial) usando π
function drawCombinedReading() {
  const cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = ""; // Limpia cartas previas
  
  // Genera una tirada de 10 cartas usando π
  const selectedKeys = generatePiReading(10);
  
  let readingText = "";
  const selectedCards = [];
  
  for (let i = 0; i < readingPositions.length; i++) {
    const posData = readingPositions[i];
    const cardKey = selectedKeys[i];
    const card = tarotDeck[cardKey] || { name: "Carta desconocida", value: "-", desc: "Sin descripción." };
    
    // Crear el elemento de la carta con animación
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.style.animationDelay = `${i * 0.2}s`;
    cardDiv.innerHTML = `
      <div class="overlay">
        <b>Posición ${posData.pos}: ${posData.title}</b><br>
        <i>${posData.casa}</i><br>
        ${posData.description}<br><br>
        <b>${card.name}</b><br>
        ${card.desc}
      </div>
    `;
    cardsContainer.appendChild(cardDiv);
    
    // Construir el texto oracular para la lectura
    readingText += `En la posición ${posData.pos} (${posData.title}), aparece ${card.name}. ${card.desc}. `;
    
    selectedCards.push({
      name: card.name,
      value: card.value,
      desc: card.desc
    });
  }
  
  // Muestra el resumen en el contenedor "narrative"
  document.getElementById("narrative").innerHTML = `<p>${readingText}</p>`;
  
  // Reproduce la narración en voz alta
  speakNarrative(readingText);
  
  // Guarda la tirada en el diario
  const chapter = {
    date: new Date().toLocaleString(),
    cards: selectedCards,
    narrative: readingText,
    total: 0
  };
  diary.push(chapter);
  localStorage.setItem("diary", JSON.stringify(diary));
}

