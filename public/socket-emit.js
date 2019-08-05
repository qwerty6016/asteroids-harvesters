function socketEmitMouseMoved(clientX) {
  socket.emit("ship moved", clientXToBinary(clientX));
};

function socketEmitFireLeftWeapon() {
  socket.emit("fire left weapon");
};

function socketEmitFireRightWeapon() {
  socket.emit("fire right weapon");
};
