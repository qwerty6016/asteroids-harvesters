function decodeBinary(msg) {
  let view = new DataView(msg);
  let offset = 0;
  let i = null;

  for (i = 0; i < data.numOfYellowStars; i++) {
    data.starsYellow[i].x = view.getInt16(offset);
    data.starsYellow[i].y = view.getInt16(offset + 2);
    offset += 4;
  };
  for (i = 0; i < data.numOfWhiteStars; i++) {
    data.starsWhite[i].x = view.getInt16(offset);
    data.starsWhite[i].y = view.getInt16(offset + 2);
    offset += 4;
  };
  for (i = 0; i < data.numOfAsteroids1; i++) {
    data.asteroids1[i].x = view.getInt16(offset);
    data.asteroids1[i].y = view.getInt16(offset + 2);
    offset += 4;
  };
  for (i = 0; i < data.numOfAsteroids2; i++) {
    data.asteroids2[i].x = view.getInt16(offset);
    data.asteroids2[i].y = view.getInt16(offset + 2);
    offset += 4;
  };
  for (i = 0; i < data.numOfAsteroids3; i++) {
    data.asteroids3[i].x = view.getInt16(offset);
    data.asteroids3[i].y = view.getInt16(offset + 2);
    offset += 4;
  };

  if (ships["1"]) {
    ships["1"].currentPosition.x = view.getInt16(offset);
    ships["1"].score = view.getInt16(offset + 2);
    ships["1"].platformColorNum = view.getUint8(offset + 4);
    ships["1"].platformCargoFilledSpace = view.getUint8(offset + 5);
  }
  offset += 6;

  if (ships["2"]) {
    ships["2"].currentPosition.x = view.getInt16(offset);
    ships["2"].score = view.getInt16(offset + 2);
    ships["2"].platformColorNum = view.getUint8(offset + 4);
    ships["2"].platformCargoFilledSpace = view.getUint8(offset + 5);
  }
  offset += 6;

  let projectilesLength = view.getUint8(offset);
  offset++;

  data.projectiles = [];
  for (i = 0; i < projectilesLength; i++) {
    data.projectiles.push({"x" : view.getInt16(offset), "y" : view.getInt16(offset + 2)});
    offset += 4;
  };
};

function clientXToBinary(clientX) {
  let binaryData = new ArrayBuffer(2);
  let view = new DataView(binaryData);
  view.setInt16(0, clientX);

  return binaryData;
}
