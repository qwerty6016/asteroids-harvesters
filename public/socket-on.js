socket.on('rooms', function(msg) {
  console.log(msg);
});

socket.on('player-disconnected', function(msg) {
  ships[msg].disconnected = true;
  console.log("player " + msg + " disconnected");
});

socket.on('binary-data', function(msg) {
  decodeBinary(msg);
});

socket.on('init-data', function(msg) {
  data = msg;

  // start game
  animFrame();
});

socket.on('new-ship-in-room', function(msg) {
  ships = msg;
});
