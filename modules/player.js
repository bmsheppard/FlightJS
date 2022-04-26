const ENERGY_Y_POS = 20;
const ENERGY_X_POS = 196;
const ENERGY_PER_FLAP = 55;

class Player {
  constructor(x, y) {
    this.size = 20;
    this.x = x;
    this.vx = 0;
    this.ax = 0;
    this.y = y;
    this.vy = 0;
    this.ay = 0;
    this.maxVelY = 40;
    this.lost = false;
    this.dt = 0.5;
    this.energyY = ENERGY_Y_POS;
    this.energyX = ENERGY_X_POS;
    this.drawEnergy = this.drawEnergy.bind(this);
    this.color = "#FF9505";
  }

  draw() {
    var canvas = document.getElementById("gameWindow");
    var ctx = canvas.getContext("2d");
    let playerStartY = canvas.height / 2;
    let playerStartX = canvas.width / 8;

    this.drawEnergy(canvas);

    ctx.beginPath();
    // x, y, radius, start angle, end angle,
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();

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
    if(this.y < canvas.height - this.size || this.vy < 0) {
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
      } else {
        this.vy = 0;
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

  reset(x, y) {
    this.x = x;
    this.vx = 0;
    this.ax = 0;
    this.y = y;
    this.vy = 0;
    this.ay = 0;
    this.lost = false;
  }

  flap() {
    if(this.vx === 0 && this.vy === 0) {
      this.energyX = Math.max(this.energyX - ENERGY_PER_FLAP, 0);
      this.vx = 25;
      this.ax = 0.10;
      this.vy = -20;
      this.ay = 1;
      return
    }
    if(this.energyX >= ENERGY_PER_FLAP) {
      this.energyX = Math.max(this.energyX - ENERGY_PER_FLAP, 0);
      this.vy = -15;
      this.vx += 2;
    }
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
    }
  }

  giveBounce(bounceType) {
    this.bounceType = bounceType;
  }

  giveBoost() {
    this.vx += 20;
  }

  giveLastChance() {
    console.log('Does nothing right now');
  }
};

export { Player };
