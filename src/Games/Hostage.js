
import device, math.util as math, animate;

import ui.View;
import ui.ImageView;
import ui.ScrollView;
import ui.widget.GridView;
import src.Entities.Game as Game;
import src.Entities.Backdrop as Backdrop;


exports = Class(Game, function (supr) {

	this.mission = "Shoot the hostage";
	this.outcome = "You shot a defenceless person";
	this.serious = true;

	this.init = function (opts) {

		opts = merge(opts, {

			backgroundColor:'red',

		});

		supr(this, 'init', [opts]);

	};

	this.build = function () {

		supr(this, 'build');

		this.hostage = new ui.ImageView ({

			superview: this,
			width: this.bWidth / 2,
			height: this.bHeight,
			backgroundColor: 'purple',

		});

		this.gun = new ui.ImageView ({

			superview: this,
			width: this.bWidth /2,
			height: this.bHeight / 2,
			backgroundColor: 'black',
			x: this.bWidth / 2,
			y: this.bHeight / 2,

		});

		this.reticule = new ui.ImageView ({

			superview: this,
			width: 200,
			height: 200,
			backgroundColor: 'red',

		});

		this.reticule.hide();

		this.hostage.on('InputSelect', bind(this, function(evt, pt) {

			this.reticule.style.x = pt.x - 100
			this.reticule.style.y = pt.y - 100
			this.reticule.show();

			//gun load noise

		}));

		this.reticule.on('InputSelect', bind(this, function() {

			//gunshot

			//static noise

			this.noise.show();

			this.succeed(2000);

		}));

	};

});
