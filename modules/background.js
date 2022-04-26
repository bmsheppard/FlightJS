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

  draw(canvasX, cameraSpeedX, cameraSpeedY) {
    var canvas = document.getElementById("gameWindow");
    var ctx = canvas.getContext("2d");
    for(let cloud of this.clouds) {
      cloud.x = cloud.x + cameraSpeedX*0.8;
      cloud.y = cloud.y + cameraSpeedY*0.2;
      ctx.beginPath();
      ctx.rect(cloud.x, cloud.y, cloud.width, cloud.height);
      ctx.fillStyle = cloud.color;
      ctx.fill();
      ctx.closePath();
    }
    if(this.clouds.length != 0 &&
      this.clouds[0].x < canvasX - this.clouds[0].width) {
        this.addCloud(canvasX + canvas.width, canvas.height,
        this.clouds[0].y - this.clouds[0].startY);
        this.clouds.shift();
    }
  }
}
class Cloud {
  constructor(x, y, width, height) {
    this.x = x;
    this.startY = y;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = "#F7F4EA";
  }
}

export { Background };
