var GamePad = require('node-gamepad');
var controller = new GamePad('snes/retrolink');
controller.connect();

controller.on('start:press', function() {
  console.log('start button pressed');
} );

controller.on('start:release', function() {
  console.log('start button released');
} );