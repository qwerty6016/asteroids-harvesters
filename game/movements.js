'use strict';

exports.moveProjectiles = function(projectiles, projectilesSpeed) {
  for(let i = projectiles.length - 1; i >= 0; i--) {
    projectiles[i].y -= projectilesSpeed;
    if (projectiles[i].y < 0) {
      projectiles.splice(i, 1);
    };
  };
};

exports.moveStarsAndAsteroids = function(starsOrAsteroids, speed, dynWidth, dynHeight) {
  for(let i = 0; i < starsOrAsteroids.length; i++) {
    starsOrAsteroids[i].y += speed;
    if (starsOrAsteroids[i].y > dynHeight) {
      starsOrAsteroids[i].y = 0;
      starsOrAsteroids[i].x = Math.floor(Math.random() * dynWidth);
    };
  };
};

exports.moveShip = function(playerShip, clientX) {
  playerShip.currentPosition.x = Math.floor(clientX - playerShip.shipXCenter);
};

exports.fireLeftWeapon = function(gameData, playerShip) {
  gameData.projectiles.push({"x" : playerShip.currentPosition.x + playerShip.weaponXCenter, "y" : playerShip.currentPosition.y});
};

exports.fireRightWeapon = function(gameData, playerShip) {
  gameData.projectiles.push({"x" : playerShip.currentPosition.x + playerShip.size.x - playerShip.weaponXCenter, "y" : playerShip.currentPosition.y});
};
