const statCanvas = document.getElementById('staticCanvas');
const statCtx    = statCanvas.getContext("2d");
const statWidth  = statCanvas.width;
const statHeight = statCanvas.height;
const dynCanvas  = document.getElementById('dynamicCanvas');
const dynCtx     = dynCanvas.getContext("2d");
const dynWidth   = dynCanvas.width;
const dynHeight  = dynCanvas.height;

let data  = null;
let ships = null;

// display alert if size of staticCanvas not equal to size of dynamicCanvas
if (statWidth != dynWidth || statHeight != dynHeight) alert("Different width/height of canvases!    statWidth = " + statWidth + ", dynWidth = " + dynWidth + ";    statHeight = " + statHeight + ", dynHeight = " + dynHeight);

// draw staticCanvas background
statCtx.fillStyle = "#000d23";
statCtx.fillRect(0, 0, statWidth, statHeight);

function animFrame(){
  requestAnimationFrame(animFrame, dynCanvas);
  gameLoop();
};

function gameLoop() {
  dynCtx.clearRect(0, 0, dynWidth, dynHeight);
  drawStarsAndAsteroids(data.starsYellow, "yellow", data.starsSize);
  drawStarsAndAsteroids(data.starsWhite, "white", data.starsSize);
  drawStarsAndAsteroids(data.asteroids1, data.asteroids1[0].color, data.asteroidsSize);
  drawStarsAndAsteroids(data.asteroids2, data.asteroids2[0].color, data.asteroidsSize);
  drawStarsAndAsteroids(data.asteroids3, data.asteroids3[0].color, data.asteroidsSize);
  drawProjectiles();

  for (let k in ships) {
    if (!ships[k].disconnected) {
      drawPlayerShip(ships[k]);
    } else {
      delete ships[k];
    }
  };
};

function drawStarsAndAsteroids(starsOrAsteroids, color, size) {
  dynCtx.fillStyle = color;
  for(let i = 0; i < starsOrAsteroids.length; i++) {
    dynCtx.beginPath();
    dynCtx.arc(starsOrAsteroids[i].x, starsOrAsteroids[i].y, size, 0, Math.PI*2, true);
    dynCtx.fill();
  };
};

function drawPlayerShip(playerShip) {
  dynCtx.fillStyle = "#a8a8a8";
  dynCtx.fillRect(playerShip.currentPosition.x, playerShip.currentPosition.y, playerShip.weaponSize.x, playerShip.weaponSize.y);
  dynCtx.fillRect(playerShip.currentPosition.x + playerShip.size.x - playerShip.weaponSize.x, playerShip.currentPosition.y, playerShip.weaponSize.x, playerShip.weaponSize.y);
  dynCtx.fillStyle = data.colors[playerShip.platformColorNum];
  dynCtx.fillRect(playerShip.currentPosition.x + playerShip.weaponSize.x, playerShip.currentPosition.y + playerShip.platformSize.y, playerShip.platformSize.x, playerShip.platformSize.y);
  dynCtx.font = "15px Comic Sans MS";
  dynCtx.textAlign = "center";
  dynCtx.fillStyle = "black";
  dynCtx.fillText(playerShip.playerNumber, playerShip.currentPosition.x + playerShip.weaponXCenter, playerShip.currentPosition.y + playerShip.weaponYCenter);
  dynCtx.fillStyle = "white";
  dynCtx.fillText(playerShip.score, playerShip.currentPosition.x + playerShip.shipXCenter, playerShip.currentPosition.y + playerShip.size.y - 10);
  dynCtx.fillStyle = data.colors[playerShip.platformColorNum];
  for(let i = 0; i < playerShip.platformCargoFilledSpace; i++) {
    dynCtx.fillRect(playerShip.currentPosition.x + playerShip.weaponSize.x + playerShip.platformCargoUnitSize.x * i, playerShip.currentPosition.y, playerShip.platformCargoUnitSize.x, playerShip.platformCargoUnitSize.y);
  };
};

function drawProjectiles() {
  dynCtx.fillStyle = data.projectileColor;
  for(let i = 0; i < data.projectiles.length; i++) {
    dynCtx.fillRect(data.projectiles[i].x, data.projectiles[i].y, data.projectileSize.x, data.projectileSize.y);
  };
};
