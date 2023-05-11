import { enemyController } from "./EnemyController.js";

export default class Score {
  constructor(score = 0) {
    this.score = score;
  }

  draw(ctx) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${this.score}`, 20, 30);
  }

  incrementScore() {
    this.score += 10;

    if (this.score === 560) {
      isGameOver = true;
      didWin = true;
    }
  }

  updateHighScore() {
    let highScore = localStorage.getItem("highScore");
    if (highScore === null) {
      highScore = 0;
    }
    if (this.score > highScore) {
      localStorage.setItem("highScore", this.score);
    }
  }

  displayHighScore() {
    let highScore = localStorage.getItem("highScore");
    if (highScore === null) {
      highScore = 0;
    }
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`High Score: ${highScore}`, 20, 60);
  }

  displayNewHighScore() {
    let highScore = localStorage.getItem("highScore");
    if (highScore === null) {
      highScore = 0;
    }
    if (this.score > highScore) {
      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(`New High Score: ${this.score}`, 20, 90);
    }
  }
}
