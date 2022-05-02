import { createArrow } from "./helpers.js";
const ENERGY_Y_POS = 20;
const ENERGY_X_POS = 196;
const ENERGY_PER_FLAP = 25;
const MAX_VELOCITY_X = 35;


class Player {
  constructor(x, y, groundHeight) {
    this.size = 20;
    this.x = x;
    this.vx = 0;
    this.ax = 0;
    this.y = y;
    this.vy = 0;
    this.ay = 0;
    this.arrowEndX = x + 30;
    this.arrowEndY = y - 30;
    this.maxVelY = 40;
    this.lost = false;
    this.dt = 0.5;
    this.dir = 'grow';
    this.groundHeight = groundHeight;
    this.bounceType = 0;
    this.energyY = ENERGY_Y_POS;
    this.energyX = ENERGY_X_POS;
    this.color = "#FF9505";
    this.drawEnergy = this.drawEnergy.bind(this);
    this.shouldSkip = this.shouldSkip.bind(this);
    this.giveLastChance = this.giveLastChance.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  draw(stalling=false) {
    var canvas = document.getElementById("gameWindow");
    var ctx = canvas.getContext("2d");
    let playerStartY = canvas.height / 2;
    let playerStartX = canvas.width / 8;

    if(stalling) {
      ctx.beginPath();
      // x, y, radius, start angle, end angle,
      ctx.arc(this.x, canvas.height - this.size - 10, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
      let arrowStartX = this.x;
      let arrowStartY = canvas.height - 10 - this.size;
      if(this.dir === 'shrink') {
        this.arrowEndY += 1;
        this.arrowEndX -= 1;
        if(this.arrowEndY > canvas.height - this.size - 30) { this.dir = 'grow'; }
      } else if(this.dir === 'grow') {
        this.arrowEndY -= 1;
        this.arrowEndX += 1;
        if(this.arrowEndY < canvas.height - this.size - 90) { this.dir = 'shrink'; }
      }
      createArrow(ctx, arrowStartX, arrowStartY, this.arrowEndX, this.arrowEndY);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      return
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
      this.drawEnergy(canvas);
    }

    // get new x pos
    if(this.vx > 0) {
      this.vx -= this.ax * this.dt;
    } else {
      this.vx = 0;
    }
    this.x += this.vx;
    ctx.translate(-this.vx, 0);

    // get new y pos
    if(this.vy !== this.maxVelY) {
      this.vy += this.ay * this.dt;
    }
    if(this.y < this.groundHeight || this.vy < 0) {
      this.y += this.vy * this.dt;
      if(this.y < playerStartY) {
        ctx.translate(0, -this.vy * this.dt);
        this.energyY += this.vy * this.dt;
      }
      else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.translate(playerStartX - this.x, 0);
        this.energyY = ENERGY_Y_POS;
      }
    } else {
      if(this.bounceType !== 0) {
        this.vy = -this.bounceType * this.vy;
        this.bounceType = 0;
        this.color = "#FF9505";
      } else if(this.shouldSkip()){
        this.vy = -1 * Math.abs(this.vy);
      } else {
        this.vy = 0;
        this.x = 0;
        this.lost = true;
      }
    }
  }

  drawEnergy(canvas) {
    if(!this.lost) {
      this.energyX = Math.min(ENERGY_X_POS, this.energyX + 0.40);
    }

    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(
      this.x + canvas.width - 350,
      this.energyY,
      200,
      20
    );
    ctx.fillStyle = "#090809";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(
      this.x + canvas.width - 348,
      this.energyY + 2,
      this.energyX,
      16
    );
    ctx.fillStyle = "#D7263D";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(
      this.x + canvas.width - 348 + ENERGY_PER_FLAP,
      this.energyY - 2,
      2,
      20
    )
    ctx.fillStyle = "#FF9505";
    ctx.fill();
    ctx.closePath();
  }

  shouldSkip() {
    // approx 30 degrees
    console.log(this.vx, Math.atan(this.vy / this.vx));
    return Math.atan(this.vy / this.vx) < 0.52 && this.vx > 10;
  }

  reset(x, y) {
    this.x = x;
    this.vx = 0;
    this.ax = 0;
    this.y = y;
    this.vy = 0;
    this.ay = 0;
    this.lost = false;
    this.energyX = ENERGY_X_POS;
  }

  flap() {
    if(this.vx === 0 && this.vy === 0) {
      this.startGame();
      return
    }
    if(this.energyX >= ENERGY_PER_FLAP) {
      this.energyX = Math.max(this.energyX - ENERGY_PER_FLAP, 0);
      this.vy = Math.max(this.vy - 15, -20);
      this.vx = Math.min(this.vx + 3, MAX_VELOCITY_X);
    }
  }

  startGame() {
    this.energyX = ENERGY_X_POS;
    this.ax = 0.2;
    this.vx = (this.arrowEndX - this.x)*0.5;
    this.vy = Math.min(this.arrowEndY - this.y + 20, -15);
    this.ay = 1;
  }

  // powerups
  applyItem(itemName) {
    if(itemName === "xBoost") {
      this.giveBoost();
    } else if(itemName === "fullBounce") {
      this.giveBounce(1.5);
      this.color = "#FCF300";
    } else if(itemName === "halfBounce") {
      this.giveBounce(0.75);
      this.color = "#F9627D";
    } else if(itemName === "fullEnergy") {
      this.energyX = ENERGY_X_POS;
    } else if(itemName == "yBoost") {
      this.vy -= 5;
      this.vx = Math.max(this.vx, 5);
    } else if(itemName == "lastChance") {
      this.giveLastChance();
    }
  }

  giveBounce(bounceType) {
    this.bounceType = bounceType;
  }

  giveBoost() {
    this.vx = Math.min(this.vx + 20, MAX_VELOCITY_X);
  }

  giveLastChance() {
    this.vx = Math.max(30, this.vx + 10);
    this.vy = -35;
  }
};

export { Player };
