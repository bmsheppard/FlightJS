class Ground {
  constructor(canvasWidth, y) {
    this.groundObjs = [0, canvasWidth, canvasWidth * 2];
    this.y = y;
    this.heigth = 100;
    this.canvas = document.getElementById("gameWindow");
  }

  draw(canvasX) {
    var ctx = this.canvas.getContext("2d");
    if(this.groundObjs[0] + this.canvas.width < canvasX) {
      this.groundObjs.shift();
      this.groundObjs.push(this.groundObjs[this.groundObjs.length - 1] + this.canvas.width);
    }
    for(const gPos of this.groundObjs) {
      let hGameDistance = gPos*10/this.canvas.width;
      ctx.beginPath();
      ctx.rect(gPos, this.y, this.canvas.width, 100);
      ctx.rect(gPos, this.y - 20, 10, 60);
      ctx.font = "20px Roboto";
      ctx.fillStyle = "#4A5899";
      ctx.fillText(hGameDistance + "m", gPos, this.y - 40);
      ctx.fill();
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
        ctx.font = "20px Roboto";
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
