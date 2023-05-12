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
  }

  resetScore() {
    this.score = 0;
  }

  getScore() {
    return this.score;
  }

  setScore(score) {
    this.score = score;
  }
}
