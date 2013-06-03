import device, animate, math.util as math, math.array as array;

import ui.StackView as StackView;

import src.Entities.Timer as Timer;
import src.Entities.Backdrop as Backdrop;
import src.Entities.Success, src.Entities.Fail;
import src.Screens.Start as Start;
import src.Screens.Tutorial as Tutorial;
import src.Screens.Results as Results;

import src.Games.Sushi as Sushi;
import src.Games.Sausage as Sausage;
import src.Games.Hostage as Hostage;
import src.Games.Towers as Towers;
import src.Games.Game2 as Game2;
import src.Games.Game3 as Game3;

exports = Class(GC.Application, function () {

	var gameList = [ Towers, Hostage, Sausage, Sushi], stack, gameCount = 0, played = [];

	var boundsWidth = 1024;
	var boundsHeight = 576;

	var baseWidth = device.screen.width * (boundsHeight / device.screen.height); //864
	var baseHeight = boundsHeight; //576
	var scale = device.screen.height / baseHeight; //1

	GLOBAL.baseHeight = baseHeight;
	GLOBAL.baseWidth = baseWidth;

	var squish

	this.initUI = function () {
		
		squish = this;
		
		this.outcomes = [], this.isSerious = [], this.seriousTouches = [], this.touches = [];

		stack = new StackView({

			superview: this.view,
			
		});

		GC.app.view.style.scale = scale;

		// this.outcomes = ['You ate some suspicious sushi',
						 // 'You caught a bannana',
						 // 'You murdered a defensless hostage',
						 // 'You stroked a cat',
						 // 'You did something else',
						 // 'You clossed down an orphanage',
						 // 'You harrased a crab',
						 // 'outcome8',
						 // 'serious',
						 // 'not serious'];
		// // // this.isSerious = [false,false,true,false,false,true,false,false,true,false];
		// this.isSerious = [false,true,false];
		// this.seriousTouches = [1000];
		// this.touches = [3000, 2000];

		start = new Start();
		tutorial = new Tutorial();
		
		stack.push(start);

		start.on('start', function () {

			animate(squish.timer).now({x:baseWidth - 150}, 200);
			// stack.push(tutorial);
			squish.selectGame();
			// squish.showResults();

		});

		tutorial.on('squished', function () {

			squish.selectGame();

		});


		this.timer = new Timer();
		this.addSubview( this.timer );

	};
	
	this.selectGame = function () {

		if (gameCount === gameList.length) {

			animate(squish.timer).now({x:baseWidth}, 200);

			squish.showResults();

		} else {

			this.timer.reset();

			var r = math.random(0, gameList.length);

			while (played[r]) {

				r = math.random(0, gameList.length);

			}

			played[r] = true;

			this.newGame = new gameList[3];

			this.newGame.once('start', function(){
				squish.timer.start();
			});

			this.newGame.once('success', function (firstTouch, winTime, serious, outcome) {
				squish.winGame(firstTouch, winTime, serious, outcome);
			});	
			this.newGame.once('fail', bind(this, squish.failGame));
			this.newGame.once('next', bind(this, squish.selectGame));

			stack.push(this.newGame);

			gameCount++;

		}


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

		var hesitated = array.average(this.seriousTouches) - array.average(this.touches);

		squish.results = new Results({ outcomes: squish.outcomes, seriousness: squish.isSerious, hesTime: hesitated });

		stack.push(squish.results);
		
		squish.results.on('done', function () {

			stack.popAll();
			played = [];
			gameCount = 0;
			squish.outcomes = [], squish.isSerious = [], squish.seriousTouches = [], squish.touches = [];

			// console.log(this.outcomes);

		});
	}

	this.launchUI = function () {};

});
