
import device, math.util as math, animate;

import ui.View;
import ui.ImageView;
import ui.TextView;
import AudioManager
import src.Entities.Game as Game;

import ui.resource.Image as Image;

exports = Class(Game, function (supr) {

	this.mission = 'Catch the banana';
	this.hint = 'Drag';
	this.outcome = 'You caught a banana';
	this.serious = false;

	this.init = function (opts) {

		opts = merge(opts, {

			backgroundColor:'red',

		});

		supr(this, 'init', [opts]);

	};

	this.build = function () {

		this.image = new Image({url: 'resources/images/basket.png'});

		supr(this, 'build');

		this.apples = [];
		this.applesAnim = [];

		for (var i = 0; i < 3; i++) {

			var r = math.random(20, GLOBAL.baseWidth - 170);
			
			this.apples[i] = new ui.ImageView({
				superview:this,
				width:159,
				height:156,
				y: -200,
				x: r,
				image: 'resources/images/apple.png'

			})	

			r = math.random(500, 900);

			this.applesAnim[i] = animate(this.apples[i]).wait(3500 + r).then({y:GLOBAL.baseHeight},3000, animate.linear);
		};

		var r = math.random(20, GLOBAL.baseWidth - 170);

		this.bannana = new ui.ImageView({
			superview:this,
			width:243,
			height:202,
			y: -200,
			x: r,
			image: 'resources/images/bannana.png'

		})	

		animate(this.bannana).wait(3500).then({y:GLOBAL.baseHeight},3000, animate.linear);

		this.basket = new ui.ImageView ({

			superview: this,
			width: this.image.getWidth(),
			height: this.image.getHeight(),
			y: this.bHeight - this.image.getHeight() + 40,
			x: this.bWidth / 2 - this.image.getWidth() / 2,
			image: this.image,

		});

		this.startEvent;

		this.audio = new AudioManager({
			path: "resources/sounds/",
			files: {
				squeak: {
					volume: 0.8
				}
			}
		});

		this.clicked = false;

		this.on("InputStart", bind(this, function (evt, pt) {

				this.clicked = true;

				this.basket.style.x = pt.x - this.image.getWidth() / 2;

		  }));

		this.on("InputMove", bind(this, function (evt2, pt2) {

			if(this.clicked) {

				this.basket.style.x = pt2.x - this.image.getWidth() / 2;

			}

		}));

		this.on("InputSelect", bind(this, function (evt2, pt2) {

			this.clicked = false;

		}));

		this.hasWon = false;

	};

	this.tick = function () {

		if(!this.hasWon){

			if(this.bannana.style.x > this.basket.style.x && this.bannana.style.x + 243 < this.basket.style.x + this.image.getWidth()) {

				if (this.bannana.style.y > this.basket.style.y) {

					this.hasWon = true;

					this.succeed();

				}

			}
			
		}


	}

});
