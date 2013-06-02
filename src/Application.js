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
		
		this.outcomes = [], this.isSerious = [], this.seriousTouches = [], this.touches = [];

		stack = new StackView({

			superview: this.view,
			// height: baseHeight,
			// width: baseWidth,
			
		});

		// GC.app.view.style.scale = scale;

		this.outcomes = ['You ate some suspicious suishi',
						 'You caught a bannana',
						 'You murdered a defensless hostage',
						 'You stroked a cat',
						 'You did something else',
						 'You clossed down an orphanage',
						 'You harrased a crab',
						 'outcome8',
						 'outcome9',
						 'outcome10'];
		this.isSerious = [false,false,true,false,false,true,false,false,true,false];

		start = new Start();
		
		stack.push(start);

		start.on('start', function () {

			// animate(squish.timer).now({x:device.width - 150}, 200);
			// squish.selectGame();
			squish.showResults();

		});


		this.timer = new Timer();
		this.addSubview( this.timer );

	};
	
	this.selectGame = function () {

		this.timer.reset();

		var r = math.random(0, gameList.length);

		this.newGame = new gameList[0];

		this.newGame.once('start', function(){
			squish.timer.start();
		});

		this.newGame.once('success', function (firstTouch, winTime, serious, outcome) {
			squish.winGame(firstTouch, winTime, serious, outcome);
		});	
		this.newGame.once('fail', bind(this, squish.failGame));
		this.newGame.once('next', bind(this, squish.selectGame));

		stack.push(this.newGame);
	};

	this.winGame = function (firstTouch, winTime, serious, outcome) {

		this.timer.stop();

		if (serious) {
			this.seriousTouches.push(firstTouch);
		} else {
			this.touches.push(firstTouch);
		}

		this.outcomes.push(outcome);
		this.isSerious.push(serious);
		// this.winTimes.push(winTime);

	};

	this.failGame = function (firstTouch, serious) {

		if (serious) {
			this.seriousTouches.push(firstTouch);
		} else {
			this.touches.push(firstTouch);
		}

		this.timer.stop();

	};

	this.showResults = function () {

		squish.results = new Results({ outcomes: squish.outcomes, seriousness: squish.isSerious, hesTime: 300 });

		stack.push(squish.results);
		
		squish.results.on('done', function () {

			stack.popAll();

		});
	}

	this.launchUI = function () {};

});
