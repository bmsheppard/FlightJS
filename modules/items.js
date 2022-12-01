class xBoostItem {
  constructor(x, y) {
    this.name = "xBoost";
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 20;
    this.color = "#8AC926";
    this.image = new Image();
  }
}

class yBoostItem {
  constructor(x, y) {
    this.name = "yBoost";
    this.x = x;
    this.y = y - 100;
    this.width = 40;
    this.height = 120;
    this.color = "#CDE7B0";
    this.image = new Image();
  }
}

class fullBounceItem {
  constructor(x, y) {
    this.name = "fullBounce";
    this.x = x;
    this.y = y;
    this.width = 45;
    this.height = 45;
    this.color = "#FCF300";
    this.image = new Image();
    this.image.src = "../images/fullBounce.png";
  }
}

class halfBounceItem {
  constructor(x, y) {
    this.name = "halfBounce";
    this.x = x;
    this.y = y;
    this.width = 45;
    this.height = 45;
    this.color = "#F9627D";
    this.image = new Image();
    this.image.src = "../images/halfBounce.png";
  }
}

class fullEnergyItem {
  constructor(x, y) {
    this.name = "fullEnergy";
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.color = "purple";
    this.image = new Image();
  }
}

class lastChanceItem {
  constructor(x, y) {
    this.name = "lastChance";
    this.x = x;
    this.y = y - 20;
    this.startY = this.y;
    this.dir = 0;
    this.width = 120;
    this.height = 60;
    this.color = "#FFBA08";
    this.image = new Image();
    this.image.src = "../images/lifesaver.png";
    this.moves = true;
  }

  shift() {
    if(this.dir) {
      this.y > this.startY + 5 ? this.dir = 0 : this.y += 0.2;
    } else {
      this.y < this.startY - 5 ? this.dir = 1 : this.y -= 0.2;
    }
  }
}

class Items {
  constructor() {
    this.items = [];
    this.notSpecialItem = this.notSpecialItem.bind(this);
  }

  drawItems(canvasX, playerPosX, playerPosY) {
    var touchedItem = "";
    var ctx = document.getElementById("gameWindow").getContext("2d");
    // remove oldest off-screen item
    if(this.items.length > 0 &&
      this.items[0].width + this.items[0].x < canvasX) {
      this.items.shift();
    }
    for(let item of this.items) {
      // collision detection
      let addedHitBox = 10;
      let minX = item.x - addedHitBox;
      let maxX = item.x + item.width + addedHitBox;
      let minY = item.y - addedHitBox;
      let maxY = item.y + item.height + addedHitBox;

      if(playerPosX < maxX && playerPosX > minX
        && playerPosY < maxY && playerPosY > minY) {
          touchedItem = item.name;
          if(this.notSpecialItem(item.name)) { item.x = canvasX - item.width; }
      }

      // draw item
      ctx.beginPath();
      ctx.drawImage(item.image, item.x, item.y, item.width, item.height);
      ctx.closePath();

      if(item.moves) {
        item.shift();
      }
    }
    return touchedItem;
  }

  notSpecialItem(itemName) {
    return itemName !== "yBoost";
  }
}



export { Items, xBoostItem, yBoostItem, fullBounceItem, halfBounceItem, fullEnergyItem, lastChanceItem };
