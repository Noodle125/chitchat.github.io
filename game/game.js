// game.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const dino = {
  x: 50,
  y: canvas.height - 50,
  width: 50,
  height: 50,
  speedY: 0,
  gravity: 1.5,
  jumping: false,
  jumpHeight: 30,
};

const obstacles = [];
let isGameOver = false;
let score = 0;
let highScore = 0;

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
  if (event.code === 'Space' && !dino.jumping && !isGameOver) {
    dino.jumping = true;
    dino.speedY = -dino.jumpHeight;
  }
}

function update() {
  if (!isGameOver) {
    score++;
    if (score > highScore) {
      highScore = score;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDino();
    updateDino();
    drawObstacles();
    updateObstacles();
    drawScore();
    requestAnimationFrame(update);
  } else {
    drawGameOver();
  }
}

function drawDino() {
  ctx.fillStyle = '#000';
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function updateDino() {
  if (dino.jumping) {
    dino.y += dino.speedY;
    dino.speedY += dino.gravity;
    if (dino.y >= canvas.height - dino.height) {
      dino.y = canvas.height - dino.height;
      dino.jumping = false;
    }
  }
}

function drawObstacles() {
  obstacles.forEach(obstacle => {
    ctx.fillStyle = '#f00';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

function updateObstacles() {
  if (Math.random() < 0.01) {
    const obstacle = {
      x: canvas.width,
      y: canvas.height - 50,
      width: 20,
      height: 50,
    };
    obstacles.push(obstacle);
  }
  obstacles.forEach(obstacle => {
    obstacle.x -= 5;
    if (isColliding(obstacle, dino)) {
      gameOver();
    }
  });
  obstacles.forEach((obstacle, index) => {
    if (obstacle.x + obstacle.width <= 0) {
      obstacles.splice(index, 1);
    }
  });
}

function drawScore() {
  ctx.fillStyle = '#000';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
  ctx.fillText(`High Score: ${highScore}`, 10, 60);
}

function drawGameOver() {
  ctx.fillStyle = '#f00';
  ctx.font = '40px Arial';
  ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
}

function gameOver() {
  isGameOver = true;
}

function isColliding(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y;
}

update();
