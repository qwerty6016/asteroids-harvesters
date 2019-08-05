'use strict';

const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const io      = require('socket.io')(http);
const fs      = require('fs');
const path    = require('path');
const gid     = require('./game/game-init-data');
const cd      = require('./game/collision-detection');
const bps     = require('./game/binary-protocol-server');
const ms      = require('./game/movements');
const PORT    = process.env.PORT || 3000;

const playersPerRoomLimit = 2;
const gameLoopTimeOut     = 20;

// game variables, to be used with something like Redis
let rooms = {};
let notFullRoomsStack = [];

http.listen(PORT, function() {
  console.log('listening on port: ' + PORT);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
  if (notFullRoomsStack.length > 0) {
    // add player to existing room
    let roomName = notFullRoomsStack[notFullRoomsStack.length-1];
    socket.join(roomName);
    for (let i = 0; i < rooms[roomName].sockets.length; i++) {
      if (rooms[roomName].sockets[i].gamePlayerNumber != i + 1) {
        socket.gamePlayerNumber = i + 1;
      };
    };
    if (!socket.gamePlayerNumber) socket.gamePlayerNumber = rooms[roomName].sockets.length + 1;
    rooms[roomName].sockets.push({
      "socket_id"        : socket.id,
      "gamePlayerNumber" : socket.gamePlayerNumber
    });
    socket.gameRoomName = roomName;
    rooms[roomName].ships[socket.gamePlayerNumber] = gid.getPlayerShip(rooms[roomName].gameData);
    rooms[roomName].ships[socket.gamePlayerNumber].playerNumber = socket.gamePlayerNumber;

    // send data
    io.sockets.to(socket.id).emit('init-data', rooms[roomName].gameData);
    io.to(roomName).emit("new-ship-in-room", rooms[roomName].ships);

    // if the room became full - remove it from notFullRoomsStack
    if (rooms[roomName].sockets.length >= playersPerRoomLimit) {
      notFullRoomsStack.pop();
    };
    console.log(socket.gamePlayerNumber + " joined room " + roomName);
  } else {
    // create new room and add player to it
    let roomName = socket.id;
    socket.gameRoomName = roomName;
    socket.gamePlayerNumber = 1;
    rooms[roomName] = {
      "roomName"  : roomName,
      "sockets"   : [{
        "socket_id"      : socket.id,
        "gamePlayerNumber" : socket.gamePlayerNumber
      }],
      "ships"     : {},
      "gameData"  : gid.getInitData(),
      "gameLoop " : null
    };
    rooms[roomName].ships[socket.gamePlayerNumber] = gid.getPlayerShip(rooms[roomName].gameData);
    rooms[roomName].ships[socket.gamePlayerNumber].playerNumber = socket.gamePlayerNumber;

    // add new room to notFullRoomsStack
    notFullRoomsStack.unshift(roomName);

    // send data
    io.sockets.to(socket.id).emit('init-data', rooms[roomName].gameData);
    io.to(roomName).emit("new-ship-in-room", rooms[roomName].ships);

    // start game in room
    rooms[roomName].gameLoop = setTimeout(gameLoopNextIteration, gameLoopTimeOut, roomName);
    console.log("new room created: ", roomName);
    console.log(socket.gamePlayerNumber + " joined room " + roomName);
  };

  socket.on('disconnect', function() {
    // remove player from room
    for (let i = 0; i < rooms[socket.gameRoomName].sockets.length; i++) {
      if (rooms[socket.gameRoomName].sockets[i].socket_id == socket.id) {
        rooms[socket.gameRoomName].sockets.splice(i, 1);
      };
    };
    console.log(socket.gamePlayerNumber + " left room " + socket.gameRoomName);

    // if the room became empty - delete it
    if (rooms[socket.gameRoomName].sockets.length < 1) {
      delete rooms[socket.gameRoomName];
      notFullRoomsStack.splice(notFullRoomsStack.indexOf(socket.gameRoomName), 1);
      console.log("room deleted: ", socket.gameRoomName);

    // else inform others in the room that this player disconnected
    } else {
      delete rooms[socket.gameRoomName].ships[socket.gamePlayerNumber];
      io.to(socket.gameRoomName).emit("player-disconnected", socket.gamePlayerNumber);
      notFullRoomsStack.unshift(socket.gameRoomName);
    };
  });

  socket.on('ship moved', function(clientX) {
    ms.moveShip(rooms[socket.gameRoomName].ships[socket.gamePlayerNumber], new Buffer(clientX).readInt16BE());
  });

  socket.on('fire left weapon', function() {
    ms.fireLeftWeapon(rooms[socket.gameRoomName].gameData, rooms[socket.gameRoomName].ships[socket.gamePlayerNumber]);
  });

  socket.on('fire right weapon', function() {
    ms.fireRightWeapon(rooms[socket.gameRoomName].gameData, rooms[socket.gameRoomName].ships[socket.gamePlayerNumber]);
  });
});

function gameLoopNextIteration(roomName) {
  if (rooms[roomName]) {
    let room = rooms[roomName];
    ms.moveStarsAndAsteroids(room.gameData.starsYellow, room.gameData.starsSpeed, room.gameData.canvasWidth, room.gameData.canvasHeight);
    ms.moveStarsAndAsteroids(room.gameData.starsWhite, room.gameData.starsSpeed, room.gameData.canvasWidth, room.gameData.canvasHeight);
    ms.moveProjectiles(room.gameData.projectiles, room.gameData.projectilesSpeed);
    cd.asteroidsProjectilesCollisionDetection(room.gameData);
    ms.moveStarsAndAsteroids(room.gameData.asteroids1, room.gameData.asteroidsSpeed, room.gameData.canvasWidth, room.gameData.canvasHeight);
    ms.moveStarsAndAsteroids(room.gameData.asteroids2, room.gameData.asteroidsSpeed, room.gameData.canvasWidth, room.gameData.canvasHeight);
    ms.moveStarsAndAsteroids(room.gameData.asteroids3, room.gameData.asteroidsSpeed, room.gameData.canvasWidth, room.gameData.canvasHeight);
    cd.asteroidsPlayersShipsCollisionDetection(room);

    io.to(roomName).emit("binary-data", bps.dynamicDataToBinary(room));
    room.gameLoop = setTimeout(gameLoopNextIteration, gameLoopTimeOut, roomName);
  };
};
