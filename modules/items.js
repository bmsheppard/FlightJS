class xBoostItem {
  constructor(x, y) {
    this.name = "xBoost";
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 20;
    this.color = "#8AC926";
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
  }
}

class fullBounceItem {
  constructor(x, y) {
    this.name = "fullBounce";
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.color = "#FCF300";
  }
}

class halfBounceItem {
  constructor(x, y) {
    this.name = "halfBounce";
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.color = "#F9627D";
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
  }
}

class lastChanceItem {
  constructor(x, y) {
    this.name = "lastChance";
    this.x = x;
    this.y = y - 40;
    this.width = 80;
    this.height = 40;
    this.color = "#FFBA08";
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
      ctx.rect(item.x, item.y, item.width, item.height);
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.closePath();
    }
    return touchedItem;
  }

  notSpecialItem(itemName) {
    return itemName !== "yBoost";
  }
}



export { Items, xBoostItem, yBoostItem, fullBounceItem, halfBounceItem, fullEnergyItem, lastChanceItem };
