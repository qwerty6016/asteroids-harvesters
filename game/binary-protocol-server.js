'use strict';

exports.dynamicDataToBinary = function(room) {
  let binaryData = new ArrayBuffer(
    room.gameData.arrayBufferInitSize
    + 12 // two ships data
    + 1 // num of projectiles
    + room.gameData.projectiles.length * 4
  );

  let view = new DataView(binaryData);
  let offset = 0;
  let i = null;

  for (i = 0; i < room.gameData.numOfYellowStars; i++) {
    view.setInt16(offset, room.gameData.starsYellow[i].x);
    view.setInt16(offset + 2, room.gameData.starsYellow[i].y);
    offset += 4;
  };
  for (i = 0; i < room.gameData.numOfWhiteStars; i++) {
    view.setInt16(offset, room.gameData.starsWhite[i].x);
    view.setInt16(offset + 2, room.gameData.starsWhite[i].y);
    offset += 4;
  };
  for (i = 0; i < room.gameData.numOfAsteroids1; i++) {
    view.setInt16(offset, room.gameData.asteroids1[i].x);
    view.setInt16(offset + 2, room.gameData.asteroids1[i].y);
    offset += 4;
  };
  for (i = 0; i < room.gameData.numOfAsteroids2; i++) {
    view.setInt16(offset, room.gameData.asteroids2[i].x);
    view.setInt16(offset + 2, room.gameData.asteroids2[i].y);
    offset += 4;
  };
  for (i = 0; i < room.gameData.numOfAsteroids3; i++) {
    view.setInt16(offset, room.gameData.asteroids3[i].x);
    view.setInt16(offset + 2, room.gameData.asteroids3[i].y);
    offset += 4;
  };

  if (room.ships["1"]) {
    view.setInt16(offset, room.ships["1"].currentPosition.x);
    view.setInt16(offset + 2, room.ships["1"].score);
    view.setUint8(offset + 4, room.ships["1"].platformColorNum);
    view.setUint8(offset + 5, room.ships["1"].platformCargoFilledSpace);
  }
  offset += 6;
  if (room.ships["2"]) {
    view.setInt16(offset, room.ships["2"].currentPosition.x);
    view.setInt16(offset + 2, room.ships["2"].score);
    view.setUint8(offset + 4, room.ships["2"].platformColorNum);
    view.setUint8(offset + 5, room.ships["2"].platformCargoFilledSpace);
  }
  offset += 6;

  view.setUint8(offset, room.gameData.projectiles.length);
  offset++;

  for (i = 0; i < room.gameData.projectiles.length; i++) {
    view.setInt16(offset, room.gameData.projectiles[i].x);
    view.setInt16(offset + 2, room.gameData.projectiles[i].y);
    offset += 4;
  }

  return binaryData;
};
