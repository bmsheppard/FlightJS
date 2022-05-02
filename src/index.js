import { Items, xBoostItem, yBoostItem, fullBounceItem, halfBounceItem, fullEnergyItem, lastChanceItem } from "../modules/items.js";
import { Player } from "../modules/player.js";
import { Ground } from "../modules/ground.js";
import { Background } from "../modules/background.js";
import { getRandomInt } from "../modules/helpers.js";

// canvas stuff
var canvas = document.getElementById("gameWindow");
var ctx = canvas.getContext("2d");

// constants
const PLAYER_START_Y = canvas.height - 30;
const PLAYER_START_X = canvas.width / 8;
const HORIZONTAL_MARKERS_DISTANCE = canvas.width / 2;
const MAX_ITEM_HEIGHT_Y = -10*canvas.height;
const GROUND_POS_Y = canvas.height - 60;
const BUTTON_WIDTH = 300;
const BUTTON_HEIGHT = 100;

var player = new Player(PLAYER_START_X, PLAYER_START_Y, GROUND_POS_Y);
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

function showMenu(canvasX, canvasY) {
  let center =
  ctx.beginPath();
  ctx.rect(canvasX, canvasY, canvas.width, canvas.height);
  ctx.fillStyle = "#B8F3FF";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect((canvas.width - BUTTON_WIDTH) / 2, (canvas.height - BUTTON_HEIGHT - 30) / 2, BUTTON_WIDTH, BUTTON_HEIGHT);
  ctx.fillStyle = "#FF9505";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.font = "40px Roboto";
  ctx.textAlign = "center";
  ctx.fillStyle = "#4A5899";
  ctx.fillText("Play", canvas.width / 2, canvas.height / 2);
  ctx.closePath();
}

function endGame() {
  player.reset(PLAYER_START_X, PLAYER_START_Y);
  alert("Game over!");
  gameStarted = false;
  items.items = [];
  ground.groundObjs = [0, canvas.width, canvas.width*2];
  background.resetClouds();
}

function run() {
  // current camera positions
  var canvasX = player.x - PLAYER_START_X;
  var canvasY = player.y - canvas.height / 2;
  if(gameStarted) {
    ctx.clearRect(canvasX, canvasY - canvas.height, canvas.width + 100, canvas.height*2);

    let p = getRandomInt(0, 100 + 500/player.vx);
    let itemX = canvasX + canvas.width;
    let itemMaxY = Math.max(canvasY - canvas.height*2, MAX_ITEM_HEIGHT_Y);
    let itemMinY = Math.min(canvasY + canvas.height*2, GROUND_POS_Y - 100);
    let itemY = getRandomInt(itemMinY, itemMaxY);
    if(p < 3) {
      items.items.push(new xBoostItem(itemX, itemY));
    } else if(p < 4) {
      items.items.push(new fullBounceItem(itemX, itemY));
    } else if(p < 6) {
      items.items.push(new halfBounceItem(itemX, itemY));
    } else if(p < 8) {
      items.items.push(new fullEnergyItem(itemX, itemY));
    } else if(p < 18) {
      items.items.push(new yBoostItem(itemX, itemY));
    } else if(p < 19) {
      items.items.push(new lastChanceItem(itemX, GROUND_POS_Y));
    }
    ground.draw(canvasX);
    drawDebug(canvasX);
    let touchedItem = items.drawItems(canvasX, player.x, player.y);
    if(touchedItem !== "") {
      player.applyItem(touchedItem);
    }
    player.draw();
    player.y >= canvas.height / 2 ? background.draw(canvasX, player.vx, 0) : background.draw(canvasX, player.vx, player.vy);
    if(player.lost) {
      ctx.clearRect(canvasX, canvasY - canvas.height, canvas.width + 100, canvas.height*2);
      endGame();
    }
  } else {
    ctx.clearRect(0, canvasY - canvas.height, canvas.width + 100, canvas.height*2);
    //showMenu(canvasX, canvasY);
    ground.draw(canvasX);
    player.draw(true);
    background.draw(canvasX, -1, 0);
  }
  requestAnimationFrame(run);
}
run();

document.addEventListener("keydown", function(e){
  if(e.keyCode === 32) {
    player.flap();
    gameStarted = true;
  } else if(e.keyCode === 27 || e.keyCode === 80) {
    pauseGame();
  } else if(e.keyCode === 65) { player.giveLastChance(); }
  else if(e.keyCode === 83) { player.giveBoost(); } // xboost
});
