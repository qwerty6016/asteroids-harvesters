socket.on('rooms', function(msg) {
  console.log(msg);
});

socket.on('player-disconnected', function(msg) {
  console.log(msg);
});

socket.on('dynamic-data', function(msg) {
  data = msg.data;
  ships = msg.ships;
});

socket.on('init-data', function(msg) {
  data = msg.data;
  ships = msg.ships;

  // start game
  animFrame();
});
