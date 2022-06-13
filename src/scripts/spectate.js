const main = document.querySelector('main');
const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

window.addEventListener('resize', resizeCanvas, { passive: true });

function resizeCanvas() {
  canvas.width = main.clientWidth;
  canvas.height = main.clientWidth / 16 * 9;

  draw();
}

function draw() {
  ctx.fillStyle = '#2a62c9';
  ctx.fillRect(20, 20, 50, 50);
  ctx.stroke();
}

resizeCanvas();