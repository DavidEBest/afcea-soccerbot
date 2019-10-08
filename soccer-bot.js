'use strict';

// Import our board, and start it up!
var five = require('johnny-five');
var board = new five.Board();

// Import our controller, configure it, and connect it!
var GamePad = require('node-gamepad');
var controller = new GamePad('snes/retrolink');
controller.connect();

// Const values are constant, you can't change them while running.
const FAST_SPEED = 230;
const NORMAL_SPEED = 200;
const SLOW_SPEED = 150;

// When our board is ready, do this!
board.on('ready', function() {
  var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;
  // Try forward, reverse, start, or stop
  // http://johnny-five.io/examples/motor/ and http://johnny-five.io/examples/motor-directional/
  var motors = new five.Motors([
    configs.M1,
    configs.M2
  ]);
  // Try on, off, blink, strobe, or stop, more here: http://johnny-five.io/examples/led/
  var led = five.Led(13);

  console.log('Welcome to the SoccerBot!');

  // utility functions for making something happen for a period of time.
  const setAsyncTimeout = (cb, timeout = 0) => new Promise(resolve => {
    setTimeout(() => {
      cb();
      resolve();
    }, timeout);
  });

  // async means we won't wait for the results, unless we 'await' them.
  async function doFor(func, ms) {
    func();
    await setAsyncTimeout(() => {
      stop();
    }, ms);
  }

  // Our dance function. How do we call it and what should it do?
  async function dance() {
    console.log('Dancing');
    // these are a little weird syntax-wise
    // await doFor(thingToDo, 2500);
  }

  // From node-gamepad, https://github.com/carldanley/node-gamepad
  // Buttons
  // {name}:press - No data is attached to this callback but it serves the purpose of notifying the developer that a button has been pressed.
  // {name}:release - No data is attached to this callback but it serves the purpose of notifying the developer that a button (that was previously pressed) has been released.
  // What other buttons should we try?
  controller.on( 'start:press', function() {
    console.log( 'start' );
    dance();
  } );

});
