'use strict';

var five = require('johnny-five');
var board = new five.Board();

var GamePad = require( 'node-gamepad' );
var controller = new GamePad( 'snes/retrolink' );
controller.connect();

var FAST_SPEED = 230;
var NORMAL_SPEED = 200;
var SLOW_SPEED = 150;

board.on('ready', function() {
  // Use your shield configuration from the list
  // http://johnny-five.io/api/motor/#pre-packaged-shield-configs
  var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;
  var motors = new five.Motors([
    configs.M1,
    configs.M2
  ]);

  this.repl.inject({
    motors: motors
  });

  console.log('Welcome to the Motorized SumoBot!');
  console.log('Control the bot with the arrow keys, and SPACE to stop.');

  const setAsyncTimeout = (cb, timeout = 0) => new Promise(resolve => {
    setTimeout(() => {
      cb();
      resolve();
    }, timeout);
  });

  async function doFor(func, ms) {
    func();
    await setAsyncTimeout(() => {
      stop();
    }, ms);
  }

  async function dance() {
    console.log('Dancing');
    await doFor(forward, 2500);
    await doFor(left, 2000);
    await doFor(right, 2000);
    await doFor(backward, 2500);
    //motors.fwd(NORMAL_SPEED);
    //setTimeout(() => {
    //  motors.rev(NORMAL_SPEED);
    //}, 200);
  }

  function forward() {
    console.log('Going forward');
    motors.fwd(NORMAL_SPEED);
  }

  function backward() {
    console.log('Going backward');
    motors.rev(NORMAL_SPEED);
  }

  function left() {
    console.log('Going left');
    motors[0].rev(NORMAL_SPEED);
    motors[1].fwd(NORMAL_SPEED);
  }

  function right() {
    console.log('Going right');
    motors[1].rev(NORMAL_SPEED);
    motors[0].fwd(NORMAL_SPEED);
  }

  function stop() {
    motors.stop();
  }

  function sweep() {
    console.log('Sweep the leg!!');
  }

  function turbo() {
    console.log('Turbo button engaged!');
    motors.fwd(FAST_SPEED);
  }

  controller.on( 'up:press', function() {
    console.log( 'up' );
    forward();
  } );

  controller.on( 'down:press', function() {
    console.log( 'down' );
    backward();
  } );

  controller.on( 'left:press', function() {
    console.log( 'left' );
    left();
  } );

  controller.on( 'right:press', function() {
    console.log( 'right' );
    right();
  } );

  controller.on( 'select:press', function() {
    console.log( 'select' );
    stop();
  } );

  controller.on( 'start:press', function() {
    console.log( 'start' );
    stop();
  } );

  controller.on( 'b:press', function() {
    console.log( 'b' );
    dance();
  } );

  controller.on( 'a:press', function() {
    console.log( 'a' );
    turbo();
  } );

  controller.on( 'x:press', function() {
    console.log( 'x' );
    dance();
  } );

  controller.on( 'y:press', function() {
    console.log( 'y' );
    turbo();
  } );
});
