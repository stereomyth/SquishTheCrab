// import device;

import ui.View;
import src.Entities.Game as Game;


exports = Class(Game, function (supr) {

	this.mission = "Eat the bad sushi";
	this.outcome = "You ate some suspicious sushi";
	this.serious = false;

	this.init = function (opts) {

		opts = merge(opts, {

			backgroundColor: "red",

		});

		supr(this, 'init', [opts]);

	};

	// this.build = function () {

		// supr(this, 'build');

		// this.plate = new ui.View ({

		// 	superview: this,
		// 	width: 300,
		// 	height: 200,
		// 	backgroundColor: 'white',

		// });

		// this.sushi = [];

		// this.sushiRow = new ui.View ({

		// 	superview: this.plate,
		// 	layout: 'linear',
		// 	direction: 'horizontal',
		// 	padding:30,
		// 	margin:30,

		// });

		// for (var i = 0; i < 4; i++) {

		// 	var sushi = new Sushi({superview:this.sushiRow});
		// 	this.sushi.push(sushi);
		// 	this.addSubview( this.sushi[i] );

		// }


		// var platePos = this.plate.getPosition();

		// for (var i = 0; i < 4; i++) {

		// 	this.sushis = new Sushi({
		// 		y: platePos.height / 4,
		// 		x: platePos.width / 4 * i + platePos.width / 8,
				
		// 	});
		// 	this.sushi.push(this.sushis);
		// 	this.addSubview( this.sushi[i] );

		// }

		// for (var i = 0; i < 4; i++) {

		// 	this.sushis = new Sushi({
		// 		y: platePos.height / 2 + platePos.height / 4,
		// 		x: platePos.width / 4 * i + platePos.width / 8,
				
		// 	});
		// 	this.sushi.push(this.sushis);
		// 	this.addSubview( this.sushi[i] );

		// }

// 	};

});

// var Sushi = Class(ui.View, function (supr) {

// 	this.init = function (opts) {

// 		opts = merge(opts, {

// 			height: 30,
// 			width: 30,
// 			backgroundColor: 'green'

// 		});

// 		supr(this, 'init', [opts]);

// 		// this.style.offsetX = - this.style.width / 2;
// 		// this.style.offsetY = - this.style.height / 2;

// 	};

// });
