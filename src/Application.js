import device, animate, math.util as math;

import ui.StackView as StackView;

import src.Entities.Timer as Timer
import src.Entities.Success, src.Entities.Fail;
import src.Games.Game1 as Game1;
import src.Games.Game2 as Game2;
import src.Games.Game3 as Game3;
import src.Screens.Start as Start;
import src.Screens.Results as Results;

exports = Class(GC.Application, function () {

	var gameList = [ Game1, Game2, Game3 ], stack;

	// var boundsWidth = 1024;
	// var boundsHeight = 576;

	// var baseWidth = device.screen.width * (boundsHeight / device.screen.height); //864
	// var baseHeight = boundsHeight; //576
	// var scale = device.screen.height / baseHeight; //1

	var squish

	this.initUI = function () {
		
		squish = this;

		stack = new StackView({

			superview: this.view,
			// height: baseHeight,
			// width: baseWidth,
			
		});

		// GC.app.view.style.scale = scale;

		start = new Start();
		results = new Results();
		stack.push(start);

		start.on('start', function () {
			animate(squish.timer).now({x:device.width - 150}, 200);
			squish.selectGame();
		});

		results.on('done', function () {
			stack.push(start);
		});

		this.timer = new Timer();
		this.addSubview( this.timer );

	};
	
	this.selectGame = function () {

		this.timer.reset();

		var r = math.random(0, gameList.length);

		this.newGame = new gameList[r];

		this.newGame.once('start', function(){
			squish.timer.start();
		});
		this.newGame.once('success', bind(this, squish.winGame));	
		this.newGame.once('fail', bind(this, squish.failGame));
		this.newGame.once('next', bind(this, squish.selectGame));

		stack.push(this.newGame);
	};

	this.winGame = function () {

		this.timer.stop();

	};

	this.failGame = function () {

		this.timer.stop();

	};

	this.launchUI = function () {};

});
