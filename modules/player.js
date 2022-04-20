class Player {
  constructor(x, y) {
    this.size = 20;
    this.x = x;
    this.vx = 0;
    this.ax = 0;
    this.y = y;
    this.vy = 0;
    this.ay = 0;
    this.maxVel = 40;
    this.lost = false;
    this.dt = 0.5;
  }

  draw() {
    var canvas = document.getElementById("gameWindow");
    var ctx = canvas.getContext("2d");
    let playerStartY = canvas.height / 2;
    let playerStartX = canvas.width / 8;

    ctx.beginPath();
    // x, y, radius, start angle, end angle,
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "red";
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
    if(this.vy !== this.maxVel) {
      this.vy += this.ay * this.dt;
    }
    if(this.y < canvas.height - this.size || this.vy < 0) {
      this.y += this.vy * this.dt;
      if(this.y < playerStartY) {
        ctx.translate(0, -this.vy * this.dt);
      }
      else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.translate(playerStartX - this.x, 0);
      }
    } else {
      if(this.bounceType === 1) {
        this.vy = -this.vy;
        this.bounceType = 0;
      } else {
        this.vy = 0;
        this.lost = true;
      }
    }
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
      this.vx = 15;
      this.ax = 0.10;
      this.vy = -10;
      this.ay = 1;
      return
    }
    this.vy = -15;
    this.vx += 2;
  }

  // powerups
  applyItem(itemName) {
    if(itemName === "xBoost") {
      this.giveBoost();
    } else if(itemName === "fullBounce") {
      this.giveBounce();
    }
  }

  giveBounce() {
    this.bounceType = 1;
  }

  giveBoost() {
    this.vx += 10;
  }

  giveLastChance() {
    console.log('Does nothing right now');
  }
};

export { Player };
