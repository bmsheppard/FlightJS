const MAX_WAVE_HEIGHT = 8;
const MIN_WAVE_HEIGHT = -10;

class Ground {
  constructor(canvasWidth, y) {
    this.groundObjs = [0, canvasWidth, canvasWidth * 2];
    this.y = y;
    this.heigth = 100;
    this.canvas = document.getElementById("gameWindow");

    this.wave1 = new Image();
    this.w1Height = 5;
    this.w1Dir = 0;

    this.wave2 = new Image();
    this.w2Height = 0;
    this.w2Dir = 0;

    this.wave3 = new Image();
    this.w3Height = -5;
    this.w3Dir = 1;
  }

  draw(canvasX) {
    var ctx = this.canvas.getContext("2d");
    if(this.groundObjs[0] + this.canvas.width < canvasX) {
      this.groundObjs.shift();
      this.groundObjs.push(this.groundObjs[this.groundObjs.length - 1] + this.canvas.width);
    }
    for(const gPos of this.groundObjs) {
      ctx.beginPath();
      //ctx.rect(gPos, this.y, this.canvas.width, 50);
      //ctx.fillStyle = "#4A5899";
      //ctx.fill();
      this.wave1.src = '../images/wave3.png';
      if(this.w1Dir) {
        this.w1Height > MAX_WAVE_HEIGHT ? this.w1Dir = 0 : this.w1Height += 0.05;
      } else {
        this.w1Height < MIN_WAVE_HEIGHT ? this.w1Dir = 1 : this.w1Height -= 0.05;
      }

      this.wave2.src = '../images/wave2.png';
      if(this.w2Dir) {
        this.w2Height > MAX_WAVE_HEIGHT ? this.w2Dir = 0 : this.w2Height += 0.03;
      } else {
        this.w2Height < MIN_WAVE_HEIGHT ? this.w2Dir = 1 : this.w2Height -= 0.03;
      }

      this.wave3.src = '../images/wave1.png';
      if(this.w3Dir) {
        this.w3Height > MAX_WAVE_HEIGHT ? this.w3Dir = 0 : this.w3Height += 0.05;
      } else {
        this.w3Height < MIN_WAVE_HEIGHT ? this.w3Dir = 1 : this.w3Height -= 0.05;
      }
      ctx.drawImage(
        this.wave3,
        gPos,
        this.y + this.w3Height - 15,
        this.canvas.width,
        80
      );

      ctx.drawImage(
        this.wave2,
        gPos,
        this.y + this.w2Height  - 10,
        this.canvas.width,
        80
      );

      ctx.drawImage(
        this.wave1,
        gPos,
        this.y + this.w1Height - 5,
        this.canvas.width,
        80
      );
      ctx.closePath();
    }
  }

  addHorizontalMarkers(canvasX, markerDistance, playerPosY) {
    var ctx = this.canvas.getContext("2d");
    for(let i=1; i < 50; ++i) {
      let markerPos = this.canvas.height - i*markerDistance;
      let vGameDistance = 5*i;
      if(Math.abs(playerPosY - markerPos) < this.canvas.height) {
        ctx.beginPath();
        ctx.rect(canvasX, markerPos, this.canvas.width, 2);
        ctx.fillStyle = "#090809";
        ctx.font = "16px Pusab";
        ctx.fillText(vGameDistance + "m", canvasX, markerPos - 2);
        ctx.fill();
        ctx.closePath();
      }
    }
  }

  addObj(position) {
    this.groundObjs.push(position);
  }
}

export { Ground };
