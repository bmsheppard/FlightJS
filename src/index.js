import { Items, xBoostItem, fullBounceItem, halfBounceItem } from "../modules/items.js";
import { Player } from "../modules/player.js";
import { Ground } from "../modules/ground.js";
import { Background } from "../modules/background.js";
import { getRandomInt } from "../modules/helpers.js";

// canvas stuff
var canvas = document.getElementById("gameWindow");
var ctx = canvas.getContext("2d");

// constants
const PLAYER_START_Y = canvas.height / 2;
const PLAYER_START_X = canvas.width / 8;
const HORIZONTAL_MARKERS_DISTANCE = canvas.width / 2;
const MAX_ITEM_HEIGHT_Y = -10*canvas.height;
const GROUND_POS_Y = canvas.height - 20;

var player = new Player(PLAYER_START_X, PLAYER_START_Y);
var items = new Items();
var ground = new Ground(canvas.width, GROUND_POS_Y);
var background = new Background();

background.addCloud(getRandomInt(0, canvas.width/4), canvas.height, 0);
background.addCloud(getRandomInt(canvas.width/2, canvas.width), canvas.height, 0);

var groundObjPos = [0, canvas.width, canvas.width*2];
var gameStarted = false;

function drawDebug(canvasX) {
  ground.addHorizontalMarkers(canvasX, HORIZONTAL_MARKERS_DISTANCE, player.y);
}

function endGame() {
  alert("Game over!");
  player.reset(PLAYER_START_X, PLAYER_START_Y);
  gameStarted = false;
  items.items = [];
  ground.groundObjs = [0, canvas.width, canvas.width*2];
}

function run() {
  // current camera positions
  var canvasX = player.x - PLAYER_START_X;
  var canvasY = player.y - PLAYER_START_Y;

  if(gameStarted) {
    //TODO: change p range dynamically
    let p = getRandomInt(0, 80 + 500/player.vx);
    let itemX = canvasX + canvas.width;
    let itemMaxY = Math.max(canvasY - canvas.height*2, MAX_ITEM_HEIGHT_Y);
    let itemMinY = Math.min(canvasY + canvas.height*2, GROUND_POS_Y - 100);
    let itemY = getRandomInt(itemMinY, itemMaxY);
    if(p < 3) {
      items.items.push(new xBoostItem(itemX, itemY));
    }
    else if(p < 6) {
      items.items.push(new fullBounceItem(itemX, itemY));
    }
    else if(p < 9) {
      items.items.push(new halfBounceItem(itemX, itemY));
    }
  }

  ctx.clearRect(canvasX, canvasY - canvas.height, canvas.width, canvas.height*2);
  ground.draw(canvasX);
  if(player.y >= canvas.height / 2) {
    background.draw(canvasX, player.vx, 0);
  } else {
    background.draw(canvasX, player.vx, player.vy);
  }
  drawDebug(canvasX);
  let touchedItem = items.drawItems(canvasX, player.x, player.y);
  if(touchedItem !== "") {
    player.applyItem(touchedItem);
  }
  player.draw();
  if(player.lost) {
    endGame();
  }
  requestAnimationFrame(run);
}
run();

document.addEventListener("keydown", function(e){
  if(e.keyCode === 32) {
    player.flap();
    gameStarted = true;
  }
});
document.addEventListener("keydown", function(e) {
  if(e.keyCode === 65) { player.giveBounce(); } // bounce
  else if(e.keyCode === 83) { player.giveBoost(); } // xboost
  else if(e.keyCode === 68) { player.giveBoost(); } // yboost
  else if(e.keyCode === 70) { player.giveLastChance(); } // last chance save
});
