import Bullet from "./Bullet.js";
import Score from "./Score.js";

const scoreObject = new Score();

export default class BulletController {
  bullets = [];
  timeTillNextBulletAllowed = 0;

  constructor(
    canvas,
    maxBulletsAtATime,
    bulletColor,
    soundEnabled,
    scoreObject
  ) {
    this.canvas = canvas;
    this.maxBulletsAtATime = maxBulletsAtATime;
    this.bulletColor = bulletColor;
    this.soundEnabled = soundEnabled;
    this.scoreObject = scoreObject;

    this.shootSound = new Audio("sounds/shoot.wav");
    this.shootSound.volume = 0.1;
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

  collideWith(sprite) {
    const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) =>
      bullet.collideWith(sprite)
    );

    if (bulletThatHitSpriteIndex >= 0) {
      this.bullets.splice(bulletThatHitSpriteIndex, 1);
      if (this.scoreObject) {
        this.scoreObject.incrementScore();
      }
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
