const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const monkeyImg = new Image();
monkeyImg.src = 'monkey.png'; 

monkeyImg.addEventListener('load', () => {
  gameLoop();
});

const hoopImg = new Image();
hoopImg.src = 'hoop.jpeg'; 

hoopImg.addEventListener('load', () => {
  gameLoop();
});

const monkey = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 100,
  width: 100,
  height: 100,
  speed: 5
};

const hoop = {
  x: canvas.width - 100,
  y: 100,
  width: 50,
  height: 50,
  speed: 2,
  direction: 1
};

const ball = {
  x: monkey.x + monkey.width / 2,
  y: monkey.y,
  radius: 5,
  speed: 10,
  isMoving: false
};

function drawMonkey() {
  ctx.drawImage(monkeyImg, monkey.x, monkey.y, monkey.width, monkey.height);
}

function drawHoop() {
  ctx.drawImage(hoopImg, hoop.x, hoop.y, hoop.width, monkey.height);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'orange';
  ctx.fill();
  ctx.closePath();
}

function updateMonkey(event) {
  if (event.key === 'ArrowLeft' && monkey.x > 0) {
    monkey.x -= monkey.speed;
  } else if (event.key === 'ArrowRight' && monkey.x < canvas.width - monkey.width) {
    monkey.x += monkey.speed;
  }
}

function throwBall(event) {
  if (event.key === ' ') {
    if (!ball.isMoving) {
      ball.isMoving = true;
      ball.x = monkey.x + monkey.width / 2;
      ball.y = monkey.y;
    }
  }
}

function updateBall() {
  if (ball.isMoving) {
    ball.y -= ball.speed;

    if (ball.y <= 0) {
      ball.isMoving = false;
      ball.y = monkey.y;
    }

    if (ball.x > hoop.x && ball.x < hoop.x + hoop.width &&
        ball.y > hoop.y && ball.y < hoop.y + hoop.height) {
      ball.isMoving = false;
      ball.y = monkey.y;
      // Increase score, display a message, or add any
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMonkey();
  drawHoop();
  drawBall();
  updateBall();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', updateMonkey);
document.addEventListener('keydown', throwBall);

let score = 0;

function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

if (ball.x > hoop.x && ball.x < hoop.x + hoop.width &&
    ball.y > hoop.y && ball.y < hoop.y + hoop.height) {
  ball.isMoving = false;
  ball.y = monkey.y;
  // Increase score
  score++;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMonkey();
  drawHoop();
  drawBall();
  drawScore(); // Add this line
  updateBall();
  requestAnimationFrame(gameLoop);
}

function updateBall() {
  if (ball.isMoving) {
    ball.y -= ball.speed;

    if (ball.y <= 0) {
      ball.isMoving = false;
      ball.y = monkey.y;
    }

    // Check if the ball is within the hoop's horizontal boundaries
    const ballInHoopHorizontally = ball.x > hoop.x && ball.x < hoop.x + hoop.width;
    // Check if the ball is entering the hoop from the top
    const ballEnteringHoop = ball.y - ball.radius <= hoop.y + hoop.height && ball.y - ball.radius >= hoop.y;

    if (ballInHoopHorizontally && ballEnteringHoop) {
      ball.isMoving = false;
      ball.y = monkey.y;
      // Increase score
      score++;
    }
  }
}

function updateHoop() {
  hoop.x += hoop.speed * hoop.direction;

  if (hoop.x <= 0 || hoop.x + hoop.width >= canvas.width) {
    hoop.direction *= -1;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMonkey();
  drawHoop();
  drawBall();
  drawScore();
  updateBall();
  updateHoop(); // Add this line
  requestAnimationFrame(gameLoop);
}
