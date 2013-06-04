
import device, math.util as math, animate;

import ui.View;
import ui.ImageView;
import ui.TextView;
import src.Entities.Game as Game;

import ui.resource.Image as Image;

exports = Class(Game, function (supr) {

	this.mission = 'High-five all four hands at once';
	this.hint = 'Multi-touch';
	this.outcome = 'You simultaniously high-fived everyone';
	this.serious = false;

	this.init = function (opts) {

		opts = merge(opts, {

			backgroundColor:'yellow',

		});

		supr(this, 'init', [opts]);

	};

	this.build = function () {

		this.image = new Image({url: 'resources/images/hand.png'});

		supr(this, 'build');

		this.hands = [];

		for (var i = 0; i < 4; i++) {

			this.hands[i] = new ui.ImageView ({

				superview: this,
				width: this.image.getWidth(),
				height: this.image.getHeight(),
				image: this.image,

			});

			this.hands[i].on("InputStart", bind(this, function (evt, pt) {

				this.getFirstTouch();

				if (evt.id === 3) {

					this.succeed();

				} else if (evt.id === -1) {

					this.succeed();

				}

			}));
		};

		this.hands[0].updateOpts({
			flipY: true,
			x: 10,

		});

		this.hands[1].updateOpts({
			y: this.bHeight - this.image.getHeight(),
			x: (this.image.getWidth() - 40),
			
		});

		this.hands[2].updateOpts({
			flipY: true,
			x: (this.image.getWidth() - 40) * 2,
			
		});

		this.hands[3].updateOpts({
			y: this.bHeight - this.image.getHeight(),
			x: (this.image.getWidth() - 40) * 3,

			
		});

		


		

	};

});
