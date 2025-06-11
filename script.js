const messages = [
  "Eu Te Amo com todo o meu coração ❤️",
  "Você é a minha pessoa favorita 💕",
  "Obrigada por fazer parte da minha vida 🌟",
  "Eu e você, para sempre 💖",
  "Seu sorriso ilumina meus dias 💫",
  "Você é a melhor coisa que já me aconteceu 😍",
  "O brilho do seu sorriso acende minha alma. 😍",
  "Meu coração é seu 💘",
  "Tudo que sou, quero ser com você. ❤️",
  "Mesmo longe, meu coração te sente perto. 💘"
];

// Função que cria uma bolha de texto com mensagem aleatória
function createTextBubble() {
  const bubble = document.createElement("div");
  bubble.className = "text-bubble";
  bubble.innerText = messages[Math.floor(Math.random() * messages.length)];

  const left = Math.random() * 80 + 10;
  const top = Math.random() * 80 + 10;

  bubble.style.position = "absolute";
  bubble.style.left = left + "vw";
  bubble.style.top = top + "vh";

  const container = document.getElementById("bubbles-text");
  container.appendChild(bubble);

  setTimeout(() => {
    const rect = bubble.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      bubble.style.left = window.innerWidth - rect.width - 10 + "px";
    }
    if (rect.bottom > window.innerHeight) {
      bubble.style.top = window.innerHeight - rect.height - 10 + "px";
    }
    if (rect.left < 0) {
      bubble.style.left = "10px";
    }
    if (rect.top < 0) {
      bubble.style.top = "10px";
    }
  }, 10);

  setTimeout(() => {
    bubble.remove();
  }, 8000);
}

setInterval(createTextBubble, 500);

// Função para criar o jogo da memória (exemplo simples)
function criarJogoDaMemoria() {
  const jogoDiv = modalCarta.querySelector(".memory-game");
  if (!jogoDiv) return;

  // Limpa o jogo anterior
  jogoDiv.innerHTML = "";

  const cartas = [
    "🥰", "🥰",
    "💗", "💗",
    "💝", "💝",
    "💌", "💌"
  ];

  // Embaralha as cartas
  cartas.sort(() => 0.5 - Math.random());

  cartas.forEach((emoji) => {
    const carta = document.createElement("button");
    carta.className = "card";
    carta.innerText = "?";
    carta.dataset.emoji = emoji;

    carta.addEventListener("click", () => {
      if (carta.innerText === "?") {
        carta.innerText = carta.dataset.emoji;
        verificarPar();
      }
    });

    jogoDiv.appendChild(carta);
  });

  let cartasViradas = [];
  function verificarPar() {
    const abertas = [...jogoDiv.querySelectorAll(".card")].filter(c => c.innerText !== "?");
    if (abertas.length % 2 === 0) {
      // Verifica o último par aberto
      const ultimas = abertas.slice(-2);
      if (ultimas[0].dataset.emoji === ultimas[1].dataset.emoji) {
        // Par correto, mantém virado
      } else {
        // Errou, vira as cartas de volta depois de 1s
        setTimeout(() => {
          ultimas[0].innerText = "?";
          ultimas[1].innerText = "?";
        }, 1000);
      }
    }
  }
}

// Função que cria a modal e adiciona no body
function criarModalCarta() {
  const modal = document.createElement('div');
  modal.classList.add('modal-carta');

  modal.innerHTML = `
    <div class="modal-conteudo">
      <span class="modal-fechar">&times;</span>
      <h2 class="modal-titulo">Minha carta para você</h2>

      <div class="tabs">
        <button class="tablinks active" data-tab="carta">Carta de Amor</button>
        <button class="tablinks" data-tab="tempo">Nossa Jornada do Amor</button>
        <button class="tablinks" data-tab="jogo">Jogo da Memória</button>
      </div>

      <div class="tabcontent show" id="carta">
        <p>
        Hoje é Dia das Namoradas, mas a verdade é que todo dia ter você comigo, já é especial por si só, minha vida, eu me sinto tão sortuda por ter você, por poder te chamar de "minha", por te ver sorrindo por causa de mim, meu amor, o seu jeitinho, suas manias, sua risada, tudo em você me encanta, minha princesa.
        E eu só quero te lembrar hoje, e em todos os dias da nossa vida, que eu sou completamente apaixonada por você, amor da minha vida todinha, que você é o amor que eu sempre sonhei.
        Quero te lembrar o quanto você é incrível, o quanto me faz bem e o quanto sou grato por te ter na minha vida, meu amô, você é o meu sorriso favorito, a razão de tantos suspiros bobos e pensamentos felizes.
        Obrigada por me escolher, Obrigada por ser quem você é, Obrigada por existir na minha vida.
        <br>
        <br>
        Com todo o amor do mundo,<br>
        Sua namorada 💗
        </p>
        <button id="btn-carta" class="btn-aba">Clique aqui para receber um beijo 😘</button>
        <div id="resposta-carta"></div>
      </div>

      <div class="tabcontent" id="tempo">
        <p>
          Estamos juntas há <span id="tempo-namoro">calculando...</span>! ❤️
        </p>
        <button id="btn-tempo" class="btn-aba">Mostrar data do começo</button>
        <div id="resposta-tempo"></div>
      </div>

      <div class="tabcontent" id="jogo">
        <p>Jogo da Memória (clique nas cartas iguais para combinar):</p>
        <div class="memory-game"></div>
        <button id="btn-jogo" class="btn-aba">Reiniciar Jogo</button>
      </div>
    </div>
  `;

  // Fecha modal ao clicar no "x"
  modal.querySelector('.modal-fechar').addEventListener('click', () => {
    modal.classList.remove('show');
  });

  // Fecha modal ao clicar fora da caixa
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });

  // Controle das abas
  const tabButtons = modal.querySelectorAll('.tablinks');
  const tabContents = modal.querySelectorAll('.tabcontent');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active das abas e esconder conteúdos
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('show'));

      // Ativa aba clicada
      btn.classList.add('active');
      const tabId = btn.dataset.tab;
      modal.querySelector('#' + tabId).classList.add('show');
    });
  });

  // Botão da aba Carta de Amor
  modal.querySelector('#btn-carta').addEventListener('click', () => {
    const divResp = modal.querySelector('#resposta-carta');
    divResp.innerText = "Beijo enviado! 💋❤️";
  });

  // Botão da aba Tempo de Namoro
  modal.querySelector('#btn-tempo').addEventListener('click', () => {
    const divResp = modal.querySelector('#resposta-tempo');
    divResp.innerText = "Começamos nosso namoro em 30 de julho de 2023.";
  });

  // Botão da aba Jogo da Memória
  modal.querySelector('#btn-jogo').addEventListener('click', () => {
    criarJogoDaMemoria();
  });

  document.body.appendChild(modal);
  return modal;
}

const messagesDiv = document.querySelector('.messages');
const modalCarta = criarModalCarta();

// Abre a modal ao clicar no "Eu Te Amo"
messagesDiv.addEventListener('click', () => {
  modalCarta.classList.add('show');
  criarJogoDaMemoria(); // inicia o jogo na aba Jogo da Memória
});

// Atualiza o tempo de namoro (exemplo simples)
function calcularTempoNamoro() {
  const dataInicio = new Date('2023-07-30'); // coloque a data correta do início do namoro
  const agora = new Date();
  const diffMs = agora - dataInicio;

  const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  document.getElementById('tempo-namoro').innerText = dias + ' dias';
}

// Atualiza o tempo quando a modal abrir
modalCarta.addEventListener('transitionend', () => {
  if (modalCarta.classList.contains('show')) {
    calcularTempoNamoro();
  }
});

