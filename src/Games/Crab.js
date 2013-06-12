
import device, math.util as math, animate;

import ui.View;
import ui.ImageView;
import ui.TextView;
import AudioManager
import src.Entities.Game as Game;

import ui.resource.Image as Image;

exports = Class(Game, function (supr) {

	this.mission = 'Squish the crab';
	this.hint = 'Pinch';
	this.outcome = 'You harassed a crustacean';
	this.serious = false;

	this.init = function (opts) {

		opts = merge(opts, {

			backgroundColor:'purple',

		});

		supr(this, 'init', [opts]);

	};

	this.build = function () {

		this.image = new Image({url: 'resources/images/crab.png'});

		supr(this, 'build');

		this.crab = new ui.ImageView ({

			superview: this,
			width: this.image.getWidth(),
			height: this.image.getHeight(),
			y: this.bHeight / 2 - this.image.getHeight() / 2,
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

		this.crab.on("InputStart", bind(this, function (evt, pt) {

			if (evt.id === 1) {

				this.startEvent = pt;
				this.getFirstTouch();

			} else if (evt.id === -1) {

				this.audio.play('squeak');
				this.succeed();

			}



		  }));

		this.crab.on("InputMove", bind(this, function (evt2, pt2) {

			if(evt2.id === 1) {

				var pt = this.startEvent;
				
				var dx = pt2.x - pt.x;

				if (dx > 20 || dx < -20) {

					this.audio.play('squeak');
					this.succeed();

				}
			}

		}));

	};

});
