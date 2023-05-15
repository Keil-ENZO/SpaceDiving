import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
import Score from "./Score.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const background = new Image();
background.src = "images/space.png";

const scoreObject = new Score();
const playerBulletController = new BulletController(canvas, 10, "orange", true);
const enemyBulletController = new BulletController(canvas, 4, "red", false);

const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController,
  scoreObject
);
const player = new Player(canvas, 3, playerBulletController);

playerBulletController.setScoreObject(scoreObject);
enemyBulletController.setScoreObject(scoreObject);
enemyController.setScoreObject(scoreObject);

let isGameOver = false;
let didWin = false;

function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();
  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);

    // score en haut à gauche
    ctx.fillStyle = "white";
    ctx.font = "20px Bruno Ace SC";
    let scoreText = "Score: " + scoreObject.score;
    ctx.fillText(scoreText, 10, 30);
  }
}

function displayGameOver() {
  if (isGameOver) {
    // Message fin de partie
    let text = didWin ? "You Win" : "Game Over";
    let textOffset = didWin ? 4 : 6;

    ctx.fillStyle = "white";
    ctx.font = "40px Bruno Ace SC";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);

    // Bouton restart
    let restart = document.getElementById("restart-btn");
    if (!restart) {
      restart = document.createElement("button");
      restart.id = "restart-btn";
      restart.innerText = "Restart";
      restart.style.position = "absolute";
      restart.style.top = canvas.height / 2 + 50 + "px";
      restart.style.left = canvas.width / 2 - 50 + "px";
      document.body.appendChild(restart);
    }

    restart.addEventListener("click", () => {
      enemyController.enemyRows = [];
      enemyController.createEnemies();
      playerBulletController.bullets = [];
      enemyBulletController.bullets = [];
      scoreObject.score = 0;

      isGameOver = false;
      didWin = false;

      if (restart.parentNode) {
        restart.parentNode.removeChild(restart);
      }
    });

    // Score au milue de l'écran
    ctx.fillStyle = "white";
    ctx.font = "20px Bruno Ace SC";
    let scoreText = "Score: " + scoreObject.score;
    ctx.fillText(scoreText, canvas.width / 2 - 50, canvas.height / 2 + 200);
  }
}

function checkGameOver() {
  if (isGameOver) {
    return;
  }

  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
  }
}

//Lancer le compte à rebours avant le début de la partie
function lanceur() {
  // Sound comptes à rebours
  let audio = new Audio("./sounds/comptesARebours.wav");
  audio.volume = 0.5;
  audio.play();

  //compte à rebours
  let count = 3;

  let interval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "50px Bruno Ace SC";
    ctx.fillText(count, canvas.width / 2, canvas.height / 2);
    count--;
    if (count < 0) {
      clearInterval(interval);
      setInterval(game, 900 / 60);
    }
  }, 1000);
}

//Lancer le jeu
function startGame() {
  // Message de début de partie
  ctx.fillStyle = "white";
  ctx.font = "38px Bruno Ace SC";
  ctx.fillText("SpaceDiving", canvas.width / 6, canvas.height / 2);

  // Bouton start
  let start = document.getElementById("start-btn");
  if (!start) {
    start = document.createElement("button");
    start.id = "start-btn";
    start.innerText = "Start";
    start.style.position = "absolute";
    start.style.top = canvas.height / 2 + 50 + "px";
    start.style.left = canvas.width / 2 - 50 + "px";
    document.body.appendChild(start);
  }

  // Lancer le compte à rebours au click
  start.addEventListener("click", () => {
    lanceur();
    start.parentNode.removeChild(start);
  });
}

startGame();

