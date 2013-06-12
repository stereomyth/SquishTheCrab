import device, animate, math.util as math, math.array as array;

import ui.StackView as StackView;

import src.Entities.Timer as Timer;
import src.Entities.Backdrop as Backdrop;
import src.Entities.Success, src.Entities.Fail;
import src.Screens.Start as Start;
import src.Screens.Tutorial as Tutorial;
import src.Screens.Results as Results;
import AudioManager;

import src.Games.Sushi as Sushi;
import src.Games.Sausage as Sausage;
import src.Games.Hostage as Hostage;
import src.Games.Towers as Towers;
import src.Games.Orphans as Orphans;
import src.Games.Crab as Crab;
import src.Games.HiFour as Hands;
import src.Games.Balloons as Balloons;
import src.Games.Bannana as Bannana;

exports = Class(GC.Application, function () {

	var gameList = [Hands, Sausage, Sushi, Balloons, Bannana], stack, gameCount = 0, played = [];
	// var gameOrder = [Crab, Crab, Crab, Crab, Crab, Crab, Crab, Crab, Crab];
	var gameOrder = [Crab, false, Orphans, false, false, Hostage, false, false, Towers];

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
		// 				 'You caught a bannana',
		// 				 'You murdered a defensless hostage',
		// 				 'You stroked a cat',
		// 				 'You did something else',
		// 				 'You clossed down an orphanage',
		// 				 'You harrased a crab',
		// 				 'outcome8',
		// 				 'serious',
		// 				 'not serious'];
		// this.isSerious = [false,false,true,false,false,true,false,false,true,false];
		// this.isSerious = [false,true,false];
		// this.seriousTouches = [1000];
		// this.touches = [3000, 2000];

		this.audio = new AudioManager({
			path: "resources/sounds/",
			files: {
				loop: {
					volume: 0.1,
					loop: true,
			        background: true
				},
			}
		});

		start = new Start();
		tutorial = new Tutorial();
		
		stack.push(start);

		this.timer = new Timer({ superview: this });

		start.on('start', bind(this, function () { 



			animate(squish.timer).now({x:baseWidth - 150}, 200);
			this.timer.reset();
			stack.push(tutorial);

			this.audio.play('loop');
			// squish.selectGame();
			// squish.showResults();

		}));

		tutorial.on('squished', function () {

			squish.selectGame();

		});



	};
	
	this.selectGame = function () {

		if (gameCount === gameOrder.length) {

			animate(squish.timer).now({x:baseWidth}, 200);

			this.audio.pause('loop');

			squish.showResults();

		} else if (!gameOrder[gameCount]) {

			var r = math.random(0, gameList.length);

			while (played[r]) {

				r = math.random(0, gameList.length);

			}

			played[r] = true;

			this.loadGame(gameList[r]);

		} else {

			this.loadGame(gameOrder[gameCount]);

		}

		gameCount++;

	};

	this.loadGame = function (theGame) {

		this.timer.reset();

		this.newGame = new theGame;

		this.newGame.once('start', function(){
			squish.timer.start();
		});

		this.newGame.once('success', function (firstTouch, winTime, serious, outcome) {
			squish.winGame(firstTouch, winTime, serious, outcome);
		});	
		this.newGame.once('fail', bind(this, squish.failGame));
		this.newGame.once('next', bind(this, squish.selectGame));

		stack.push(this.newGame);

	}

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
