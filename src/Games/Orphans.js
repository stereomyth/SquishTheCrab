
import device, math.util as math, animate;

import ui.View;
import ui.ImageView;
import src.Entities.Game as Game;


exports = Class(Game, function (supr) {

	this.mission = 'Deny the orphanage funding';
	this.hint = 'Double-Tap';
	this.outcome = 'You closed down an orphanage';
	this.serious = true;

	this.init = function (opts) {

		opts = merge(opts, {

			backgroundColor:'orange',

		});

		supr(this, 'init', [opts]);

	};

	this.build = function () {

		supr(this, 'build');

		this.page = new ui.ImageView ({

			superview: this,
			width: 767,
			height: 565,
			y: 50,
			x: 70,
			image: 'resources/images/document.png'

		});

		this.stamp = new ui.ImageView ({

			superview: this.page,
			width: 428,
			height: 294,
			x: 150,
			y: 100,
			image: 'resources/images/denied.png'

		});

		this.stamp.hide();

		this.clicked = false;

		this.on('InputSelect', bind(this, function() {

			if (this.clicked) {

				this.succeed();

				//gunshot
				//static noise
				
			} else {

				//loading noise,
				this.stamp.show();

				this.clicked = true;

			}




		}));

	};

});
