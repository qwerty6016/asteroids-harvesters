'use strict';

exports.asteroidsPlayersShipsCollisionDetection = function (room) {
  for (let k in room.ships) {
    asteroidsPlayerShipCollisionDetection(room.gameData, room.ships[k]);
  }
};

function asteroidsPlayerShipCollisionDetection(gameData, playerShip) {
  for (let i = 0; i < gameData.asteroids1.length; i++) {
    if (asteroidColidingPlayerShip(gameData.asteroids1[i], playerShip)) {
      if (gameData.asteroids1[i].color == playerShip.platformColor) {
        gameData.asteroids1[i].x = Math.floor(Math.random() * gameData.canvasWidth);
        gameData.asteroids1[i].y = 0;
        asteroidPlayerShipPlatformSameColor(gameData.asteroids1[i], playerShip, gameData.colors)
      } else {
        playerShip.score = 0;
      };
    };
  };
  for (let i = 0; i < gameData.asteroids2.length; i++) {
    if (asteroidColidingPlayerShip(gameData.asteroids2[i], playerShip)) {
      if (gameData.asteroids2[i].color == playerShip.platformColor) {
        gameData.asteroids2[i].x = Math.floor(Math.random() * gameData.canvasWidth);
        gameData.asteroids2[i].y = 0;
        asteroidPlayerShipPlatformSameColor(gameData.asteroids2[i], playerShip, gameData.colors)
      } else {
        playerShip.score = 0;
      };
    };
  };
  for (let i = 0; i < gameData.asteroids3.length; i++) {
    if (asteroidColidingPlayerShip(gameData.asteroids3[i], playerShip)) {
      if (gameData.asteroids3[i].color == playerShip.platformColor) {
        gameData.asteroids3[i].x = Math.floor(Math.random() * gameData.canvasWidth);
        gameData.asteroids3[i].y = 0;
        asteroidPlayerShipPlatformSameColor(gameData.asteroids3[i], playerShip, gameData.colors)
      } else {
        playerShip.score = 0;
      };
    };
  };
};

exports.asteroidsProjectilesCollisionDetection = function(gameData) {
  for (let i = 0; i < gameData.asteroids1.length; i++) {
    for (let j = gameData.projectiles.length - 1; j >= 0; j--) {
      if (asteroidColidingProjectile(gameData.asteroids1[i], gameData.projectiles[j], gameData.asteroidsSize)) {
        gameData.asteroids1[i].x = Math.floor(Math.random() * gameData.canvasWidth);
        gameData.asteroids1[i].y = 0 - gameData.asteroids1[i].y;
        gameData.projectiles.splice(j, 1);
      };
    };
  };
  for (let i = 0; i < gameData.asteroids2.length; i++) {
    for (let j = gameData.projectiles.length - 1; j >= 0; j--) {
      if (asteroidColidingProjectile(gameData.asteroids2[i], gameData.projectiles[j], gameData.asteroidsSize)) {
        gameData.asteroids2[i].x = Math.floor(Math.random() * gameData.canvasWidth);
        gameData.asteroids2[i].y = 0 - gameData.asteroids2[i].y;
        gameData.projectiles.splice(j, 1);
      };
    };
  };
  for (let i = 0; i < gameData.asteroids3.length; i++) {
    for (let j = gameData.projectiles.length - 1; j >= 0; j--) {
      if (asteroidColidingProjectile(gameData.asteroids3[i], gameData.projectiles[j], gameData.asteroidsSize)) {
        gameData.asteroids3[i].x = Math.floor(Math.random() * gameData.canvasWidth);
        gameData.asteroids3[i].y = 0 - gameData.asteroids3[i].y;
        gameData.projectiles.splice(j, 1);
      };
    };
  };
};

function asteroidColidingProjectile(asteroid, projectile, asteroidsSize) {
  if (
    (asteroid.y + asteroidsSize) >= projectile.y
    && (asteroid.y - asteroidsSize) <= projectile.y
    && (asteroid.x + asteroidsSize) >= projectile.x
    && (asteroid.x - asteroidsSize) <= projectile.x
  ) {
    return true;
  } else {
    return false;
  };
};

function asteroidColidingPlayerShip (asteroid, playerShip) {
  if (
    asteroid.y >= playerShip.currentPosition.y
    && asteroid.y <= playerShip.currentPosition.y + playerShip.size.y
    && asteroid.x >= playerShip.currentPosition.x
    && asteroid.x <= playerShip.currentPosition.x + playerShip.size.x
  ) {
    return true;
  } else {
    return false;
  };
};

function asteroidPlayerShipPlatformSameColor(asteroid, playerShip, colors) {
  let j = 0;
  while (playerShip.platformCargoSpace[j]) {
    j++;
  };
  playerShip.platformCargoSpace[j] = true;
  if (playerShip.platformCargoSpace[playerShip.platformCargoSpace.length - 1]) {
    playerShip.score++;
    for (let m = 0; m < playerShip.platformCargoSpace.length; m++) {
      playerShip.platformCargoSpace[m] = false;
    };
    do {
      playerShip.platformColor = changePlayerShipPlatformColor(Math.floor(Math.random() * 3), colors);
    } while (playerShip.platformColor == asteroid.color);
  };
};

function changePlayerShipPlatformColor(number, colors) {
  switch (number) {
    case 0 : return colors[0];
    case 1 : return colors[1];
    case 2 : return colors[2];
  };
};
