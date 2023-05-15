import Bullet from "./Bullet.js";

export default class BulletController {
  bullets = [];
  timeTillNextBulletAllowed = 0;

  constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled) {
    this.canvas = canvas;
    this.maxBulletsAtATime = maxBulletsAtATime;
    this.bulletColor = bulletColor;
    this.soundEnabled = soundEnabled;

    this.shootSound = new Audio("sounds/shoot.wav");
    this.shootSound.volume = 0.1;
  }

  setScoreObject(scoreObject) {
    this.scoreObject = scoreObject;
  }

  draw(ctx) {
    this.bullets = this.bullets.filter(
      (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
    );

    this.bullets.forEach((bullet) => bullet.draw(ctx));
    if (this.timeTillNextBulletAllowed > 0) {
      this.timeTillNextBulletAllowed--;
    }
  }

  incrementScore() {
    if (this.scoreObject) {
      this.scoreObject.incrementScore();

      if (this.scoreObject.getScore() % 100 === 0) {
        this.maxBulletsAtATime++;
      }

      if (this.scoreObject.getScore() % 200 === 0) {
        this.bulletColor = "red";
      }

      if (this.scoreObject.getScore() % 300 === 0) {
        this.bulletColor = "yellow";
      }

      if (this.scoreObject.getScore() % 400 === 0) {
        this.bulletColor = "green";
      }
    }
  }

  collideWith(sprite) {
    const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) =>
      bullet.collideWith(sprite)
    );

    if (bulletThatHitSpriteIndex > -1) {
      this.bullets.splice(bulletThatHitSpriteIndex, 1);
      this.incrementScore();
      return true;
    }

    return false;
  }

  shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
    if (
      this.timeTillNextBulletAllowed <= 0 &&
      this.bullets.length < this.maxBulletsAtATime
    ) {
      const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
      this.bullets.push(bullet);
      if (this.soundEnabled) {
        this.shootSound.currentTime = 0;
        this.shootSound.play();
      }
      this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
    }
  }
}
