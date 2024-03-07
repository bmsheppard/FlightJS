import { Items, xBoostItem, yBoostItem, fullBounceItem, halfBounceItem, fullEnergyItem, lastChanceItem } from "./items.js";
import { Player } from "./player.js";
import { Ground } from "./ground.js";
import { Background } from "./background.js";
import { getRandomInt } from "./helpers.js";
import { gsap } from  "gsap";

// canvas stuff
var canvas = document.getElementById("gameWindow");
var ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// constants
const PLAYER_START_Y = canvas.height + 30;
const PLAYER_START_X = canvas.width / 8;
const HORIZONTAL_MARKERS_DISTANCE = canvas.width / 2;
const MAX_ITEM_HEIGHT_Y = -10*canvas.height;
const GROUND_POS_Y = canvas.height - 60;

var player = new Player(PLAYER_START_X, PLAYER_START_Y, GROUND_POS_Y);
var items = new Items();
var ground = new Ground(canvas.width, GROUND_POS_Y);
var background = new Background();

background.addCloud(getRandomInt(0, canvas.width/4), canvas.height, 0);
background.addCloud(getRandomInt(canvas.width/2, canvas.width), canvas.height, 0);

var gameStarted = false;
var gameEnding = false;
var finalX = 0;

// framerate
const fps = 60;
const fpsInterval = 1000 / fps;
var then = Date.now();
var now = then;

function drawDebug(canvasX) {
  ground.addHorizontalMarkers(canvasX, HORIZONTAL_MARKERS_DISTANCE, player.y);
}

function endGame() {
  document.getElementById("finalScore").innerText = document.getElementById("score").innerText;
  document.getElementById("splash").style.display = "absolute";

  gameStarted = false;
  gameEnding = true;
  items.items = [];
  gsap.fromTo("#splash",
  {y: 20, opacity: 1, duration: 0, scale: 0},
  {y: -20, opacity: 0, duration: 1.5, scale: 2,
    onComplete: function() {
      document.body.style.background = "#F7F4EA";
      document.getElementById("score").innerText = "Press spacebar or tap to start!";
      document.getElementById("scoreMenu").style.display = "flex";
    }
  });
  return;
}

function run() {
  // current camera positions
  var canvasX = player.x - PLAYER_START_X;
  var canvasY = player.y - canvas.height / 2;
  let elapsed = now - then;
  if (elapsed > fpsInterval) { 
    then = now - (elapsed % fpsInterval);
    if(gameStarted) {
      document.getElementById("score").innerText = parseInt(canvasX / 10);
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
      } else if(p < 11) {
        items.items.push(new yBoostItem(itemX, itemY));
      } else if(p < 12) {
        items.items.push(new lastChanceItem(itemX, GROUND_POS_Y));
      }
      drawDebug(canvasX);

      player.draw();
      ground.draw(canvasX);

      let touchedItem = items.drawItems(canvasX, player.x, player.y);
      if(touchedItem !== "") {
        player.applyItem(touchedItem);
      }
      player.y >= canvas.height / 2 ? background.draw(canvasX, player.vx, 0) : background.draw(canvasX, player.vx, player.vy);
      if(player.lost) {
        finalX = canvasX;
        ctx.clearRect(canvasX, canvasY - canvas.height, canvas.width + 100, canvas.height*2);
        endGame();
      }
    } else if(gameEnding) {
      ctx.clearRect(finalX, 0, canvas.width + 100, canvas.height*2);
      background.draw(finalX, -1, 0);
      ground.draw(finalX);
    } else {
      ctx.clearRect(0, canvasY - canvas.height, canvas.width + 100, canvas.height*2);
      background.draw(canvasX, -1, 0);
      ground.draw(canvasX);
      player.draw(true);
    }
  }
  now = Date.now();
  requestAnimationFrame(run);
}

function showMenu() {
  let menu = `
    <div id="gameMenu">
        <button id="playButton">Play</button>
        <button id="instructionButton">How to Play</button>
        <img src="./images/cloud1.png" height=100% />
    </div>
  `;
  document.getElementById("score").style.display = "none";
  document.body.insertAdjacentHTML("afterbegin", menu);
}

if(showMenu) {
  showMenu();
} else {
  run();
}

let playButton = document.getElementById("playButton");
let instructionButton = document.getElementById("instructionButton");
let replayButton = document.getElementById("replayButton");
let menuButton = document.getElementById("menuButton");

playButton.addEventListener("click", () => {
  document.addEventListener("keydown", function(e) {
    if(e.key === " " && !gameEnding) {
      player.flap();
      gameStarted = true;
    } else if(e.key === "Escape" || e.key === "p") {
      pauseGame();
    } else if(e.key === "s") { player.giveBoost(); } // xboost
  });
  document.addEventListener('touchstart', function() {
    if (!gameEnding) { 
      player.flap();
      gameStarted = true;
    }
  }, false);
  run();
  document.getElementById("score").style.display = "flex";
  document.getElementById("gameMenu").outerHTML="";
});

instructionButton.addEventListener("click", () => {
  document.getElementById("gameInstructions").style.display = "flex";
  document.getElementById("gameMenu").style.display = "none";
  document.body.style.background = "#F7F4EA";
});

menuButton.addEventListener("click", () => {
  document.getElementById("gameInstructions").style.display = "none";
  document.getElementById("gameMenu").style.display = "flex";
  document.body.style.background = "#B8F3FF";
});

replayButton.addEventListener("click", () => {
  document.body.style.background = "#B8F3FF";
  document.getElementById("scoreMenu").style.display = "none";
  player = new Player(PLAYER_START_X, PLAYER_START_Y, GROUND_POS_Y);
  ground.groundObjs = [0, canvas.width, canvas.width*2];
  background.resetClouds();
  gameEnding = false;
});
