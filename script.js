// Definición de algunas cartas del Tarot con estilo Arcane (5 de muestra)
const tarot = {
    1: { name: "El Mago", value: 1, desc: "Un inventor con chispas doradas y engranajes girando en un taller neón." },
    4: { name: "El Emperador", value: 4, desc: "Un rey steampunk en un trono mecánico, cetro brillando en turquesa." },
    16: { name: "La Torre", value: 16, desc: "Una torre colapsa con relámpagos rojos, escombros en un cielo tormentoso." },
    57: { name: "Siete de Espadas", value: 7, desc: "Un traidor encapuchado escapa, espadas destellando púrpura en la sombra." },
    68: { name: "La Fuerza", value: 8, desc: "Una guerrera doma un león mecánico, luz ámbar pulsando en la penumbra." }
  };
  
  // Cargar el diario desde localStorage
  let diary = JSON.parse(localStorage.getItem("diary")) || [];
  
  function drawCards() {
    // Simulación de barajeo con un mazo reducido
    const deck = [1, 4, 16, 57, 68];
    const hand = deck.sort(() => Math.random() - 0.5).slice(0, 5);
    const positions = ["Pasado", "Presente", "Futuro Cercano", "Desafío", "Consejo"];
  
    // Calcular Valor Total (base + bono simulado)
    const total = hand.reduce((sum, card) => sum + tarot[card].value, 0) + 4;
  
    // Mostrar las cartas
    const cardsHtml = hand.map((card, i) => 
      `<div class="card"><b>${positions[i]}</b><br>${tarot[card].name}<br>${tarot[card].desc}<br>Valor: ${tarot[card].value}</div>`
    ).join("");
    document.getElementById("cards").innerHTML = cardsHtml;
  
    // Generar narrativa
    const narrative = `Tu destino se revela: un pasado de poder (${tarot[hand[0]].name}), un presente de traición (${tarot[hand[1]].name}), un futuro de caos (${tarot[hand[2]].name}), un desafío de lucha (${tarot[hand[3]].name}), y un consejo de fuerza (${tarot[hand[4]].name}).`;
    document.getElementById("narrative").innerHTML = `<p>${narrative}</p><p><b>Valor Total:</b> ${total}</p>`;
  
    // Guardar automáticamente en el diario
    const chapter = { date: new Date().toLocaleString(), cards: hand.map(card => tarot[card]), total, narrative };
    diary.push(chapter);
    localStorage.setItem("diary", JSON.stringify(diary));
  }
  
  function viewDiary() {
    const diaryHtml = diary.length > 0 
      ? diary.map((entry, i) => 
          `<p><b>Capítulo ${i + 1} - ${entry.date}</b><br>Cartas: ${entry.cards.map(c => c.name).join(", ")}<br>${entry.narrative}<br>Valor: ${entry.total}</p>`
        ).join("")
      : "<p>No hay capítulos en el diario aún.</p>";
    document.getElementById("diary").innerHTML = diaryHtml;
  }
  