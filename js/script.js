// Variável global para verificar se a caixa de mensagem já foi exibida
var mensagemExibida = false;

// Função para mostrar a caixa de mensagem
function showMessageBox() {
  var msgBox = document.getElementById('mensagemBox');
  var eyeIcon = document.getElementById('eyeIcon');
  if (msgBox && eyeIcon) {
    msgBox.style.display = 'block';
    eyeIcon.classList.remove('fa-eye-slash');
    eyeIcon.classList.add('fa-eye');
    mensagemExibida = true;
  }
}

// Função de digitação
function type() {
  // Lógica para digitação do texto...
  var cursorPosition = 0;
  var typewriter = document.getElementById('typewriter');
  var HTML = typewriter ? typewriter.innerHTML : '';

  function typeCharacter() {
    if (typewriter && cursorPosition < HTML.length) {
      typewriter.innerHTML = HTML.substring(0, cursorPosition + 1);
      cursorPosition++;
      setTimeout(typeCharacter, 50);
    } else {
      // Verificar se o texto foi completamente digitado
      if (!mensagemExibida) {
        showMessageBox();
      }
    }
  }

  typeCharacter();
}

// Função para mostrar/esconder a caixa de mensagem
function toggleMessageBox() {
  var msgBox = document.getElementById('mensagemBox');
  var toggleBtn = document.getElementById('toggleMsgBoxBtn');
  var eyeIcon = document.getElementById('eyeIcon');

  if (msgBox && eyeIcon) {
    if (msgBox.style.display === 'none') {
      msgBox.style.display = 'block';
      eyeIcon.classList.remove('fa-eye-slash');
      eyeIcon.classList.add('fa-eye');
      mensagemExibida = true;
    } else {
      msgBox.style.display = 'none';
      eyeIcon.classList.remove('fa-eye');
      eyeIcon.classList.add('fa-eye-slash');
      mensagemExibida = false;
    }
  }
}

function responder(resposta) {
  if (resposta) {
    alert(
      "Eu te amo muitoooo. Obrigado por aceitar meu amor, estou no céu por ter você ao meu lado!"
    );
    window.location.href = "https://www.youtube.com/watch?v=Gu0F3-zj0EA&ab_channel=Nostalgia";
  } else {
    alert(
      "Peço desculpas se minha abordagem causou desconforto, aceito sua decisão e desejo sua felicidade."
    );
    window.location.href = "https://www.youtube.com/watch?v=T28LyXf8MlU&ab_channel=sage";
  }
}

function redirecionarParaPagina() {
  window.location.href = 'pedido.html';
}

// Função para mover o botão "Não"
function moverNao() {
  var buttonNao = document.getElementById("nao");
  if (buttonNao) {
    var bodyRect = document.body.getBoundingClientRect();
    var randomX = Math.random() * (window.innerWidth - 100);
    var randomY = Math.random() * (window.innerHeight - 100);

    buttonNao.style.position = "absolute";
    buttonNao.style.left = randomX + "px";
    buttonNao.style.top = randomY + "px";

    // Adiciona a classe shake para iniciar a animação
    buttonNao.classList.add("shake");

    // Remove a classe shake após a animação
    setTimeout(function () {
      buttonNao.classList.remove("shake");
    }, 300);
  }
}

// Função de inicialização
window.onload = function() {
  // Chamar a função type() para começar a digitação
  type();

  // Verificar o estado inicial da caixa de mensagem e atualizar o ícone do olho
  var msgBox = document.getElementById('mensagemBox');
  var eyeIcon = document.getElementById('eyeIcon');

  if (msgBox && eyeIcon) {
    if (msgBox.style.display === 'none') {
      eyeIcon.classList.remove('fa-eye');
      eyeIcon.classList.add('fa-eye-slash');
    } else {
      eyeIcon.classList.remove('fa-eye-slash');
      eyeIcon.classList.add('fa-eye');
    }
  }
};
