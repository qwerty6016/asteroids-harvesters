function mouseMoved(event) {
  socketEmitMouseMoved(event.clientX)
};

function mouseDown(event) {
  if (event.button == 0) {
    socketEmitFireLeftWeapon();
  } else if (event.button == 2) {
    socketEmitFireRightWeapon();
  };
};
