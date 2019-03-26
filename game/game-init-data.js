'use strict';

exports.getInitData = function() {
  let data = {
    "canvasWidth"      : 800,
    "canvasHeight"     : 600,
    "colors"           : ["#a30404", "#63534b", "#1e4701"],
    "starsSize"        : 1,
    "asteroidsSize"    : 12,
    "starsSpeed"       : 2,
    "asteroidsSpeed"   : 3,
    "projectilesSpeed" : 10,
    "numOfYellowStars" : 20,
    "starsYellow"      : [],
    "numOfWhiteStars"  : 20,
    "starsWhite"       : [],
    "numOfAsteroids1"  : 5,
    "asteroids1"       : [],
    "numOfAsteroids2"  : 5,
    "asteroids2"       : [],
    "numOfAsteroids3"  : 5,
    "asteroids3"       : [],
    "projectileColor"  : "#60d60c",
    "projectiles"      : []
  };

  // fill arrays of stars
  for (let i = 0; i < data.numOfYellowStars; i++) {
  	data.starsYellow.push({"x" : Math.floor(Math.random() * data.canvasWidth), "y" : Math.floor(Math.random() * data.canvasHeight)});
  };
  for (let i = 0; i < data.numOfWhiteStars; i++) {
  	data.starsWhite.push({"x" : Math.floor(Math.random() * data.canvasWidth), "y" : Math.floor(Math.random() * data.canvasHeight)});
  };

  // fill arrays of asteroids
  for (let i = 0; i < data.numOfAsteroids1; i++) {
    data.asteroids1.push({"x" : Math.floor(Math.random() * data.canvasWidth), "y" : Math.floor(Math.random() * (data.canvasHeight * 0.5)), "color" : data.colors[0]});
  };
  for (let i = 0; i < data.numOfAsteroids2; i++) {
    data.asteroids2.push({"x" : Math.floor(Math.random() * data.canvasWidth), "y" : Math.floor(Math.random() * (data.canvasHeight * 0.5)), "color" : data.colors[1]});
  };
  for (let i = 0; i < data.numOfAsteroids3; i++) {
    data.asteroids3.push({"x" : Math.floor(Math.random() * data.canvasWidth), "y" : Math.floor(Math.random() * (data.canvasHeight * 0.5)), "color" : data.colors[2]});
  };

  return data;
};

exports.getPlayerShip = function(data) {
  let ship = {
    "size"                  : {"x" : 125, "y" : 50},
    "weaponSize"            : {"x" : 25,  "y" : 50},
    "weaponXCenter"         : 12,
    "weaponYCenter"         : 25,
    "shipXCenter"           : 64,
    "shipYCenter"           : 25,
    "projectileSize"        : {"x" : 1,   "y" : 12},
    "platformSize"          : {"x" : 75,  "y" : 25},
    "platformCargoUnitSize" : {"x" : 25,  "y" : 25},
    "platformCargoSpace"    : [false, false, false],
    "playerNumber"          : null,
    "score"                 : 0,
    "platformColor"         : Math.floor(Math.random() * 3)
  };

  ship.currentPosition = {"x" : Math.floor(data.canvasWidth * 0.5 - ship.size.x * 0.5), "y" : data.canvasHeight - ship.size.y};
  ship.platformColor   = data.colors[ship.platformColor];

  return ship;
};
