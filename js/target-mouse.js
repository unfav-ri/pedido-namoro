const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const params = {
  pointsNumber: 40,
  widthFactor: 0.3,
  spring: 0.4,
  friction: 0.5,
  idleTimeout: 2000, // Tempo limite de inatividade em milissegundos (2 segundos)
};

let pointer = {
  x: 0.5 * window.innerWidth,
  y: 0.5 * window.innerHeight,
};

const trail = new Array(params.pointsNumber).fill().map(() => ({
  x: pointer.x,
  y: pointer.y,
  dx: 0,
  dy: 0,
}));

let idleTimer;

window.addEventListener("mousemove", updateMousePosition);
window.addEventListener("touchmove", updateTouchPosition);
window.addEventListener("mouseout", clearPointer);

function updateMousePosition(e) {
  resetIdleTimer();
  const { pageX, pageY } = e;
  pointer = { x: pageX, y: pageY };
}

function updateTouchPosition(e) {
  resetIdleTimer();
  const { pageX, pageY } = e.touches[0];
  pointer = { x: pageX, y: pageY };
}

function clearPointer() {
  pointer = null;
  clearCanvas();
}

setupCanvas();
update();

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (pointer) {
    trail.forEach((p, pIdx) => {
      const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
      const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
      p.dx += (prev.x - p.x) * spring;
      p.dy += (prev.y - p.y) * spring;
      p.dx *= params.friction;
      p.dy *= params.friction;
      p.x += p.dx;
      p.y += p.dy;
    });

    ctx.lineCap = "round";
    ctx.strokeStyle = "#8a4d60"; // Definindo a cor da linha para rosa
    ctx.lineWidth = 3; // Definindo a largura da linha como 5 pixels

    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);

    for (let i = 1; i < trail.length - 1; i++) {
      const xc = 0.5 * (trail[i].x + trail[i + 1].x);
      const yc = 0.5 * (trail[i].y + trail[i + 1].y);
      ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
    }
    ctx.stroke();
  }

  requestAnimationFrame(update);
}

function setupCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(clearCanvas, params.idleTimeout);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
