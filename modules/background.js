import { getRandomInt } from "./helpers.js";

class Background {
  constructor() {
    this.clouds = [];
    this.addCloud = this.addCloud.bind(this);
  }

  addCloud(canvasX, windowHeight, dy) {
    dy = Math.min(dy, 0);
    let randomY = getRandomInt(dy, windowHeight - 300 + dy);
    let cloud = new Cloud(canvasX, randomY, 300, 100);
    this.clouds.push(cloud);
  }

  resetClouds() {
    this.clouds[0].x = getRandomInt(10, this.clouds[0].width);
    for(let i = 1; i < this.clouds.length; ++i) {
      this.clouds[i].x = this.clouds[i-1].x + getRandomInt(this.clouds[i-1].width + 100, this.clouds[i-1].width + 600);
    }
  }

  draw(canvasX, cameraSpeedX, cameraSpeedY) {
    var canvas = document.getElementById("gameWindow");
    var ctx = canvas.getContext("2d");
    ctx.save();
    ctx.globalAlpha = 0.8;
    for(let cloud of this.clouds) {
      cloud.x = cloud.x + cameraSpeedX*0.8;
      cloud.y = cloud.y + cameraSpeedY*0.2;
      ctx.beginPath();
      ctx.rect(cloud.x, cloud.y, cloud.width, cloud.height);
      ctx.fillStyle = cloud.color;
      ctx.fill();
      ctx.closePath();
    }
    ctx.restore();
    if(this.clouds.length != 0 &&
      this.clouds[0].x < canvasX - this.clouds[0].width) {
        let newPosX = getRandomInt(canvas.width, canvas.width + 100);
        this.addCloud(canvasX + newPosX, canvas.height,
          this.clouds[0].y - this.clouds[0].startY);
        this.clouds.shift();
    }
  }
}
class Cloud {
  constructor(x, y, width, height) {
    this.startY = y;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = "#F7F4EA";
  }
}

export { Background };
