
import device, math.util as math, animate;

import ui.View;
import ui.ImageView;
import ui.ScrollView;
import ui.widget.GridView;
import AudioManager;
import src.Entities.Game as Game;
import src.Entities.Backdrop as Backdrop;


exports = Class(Game, function (supr) {

	this.mission = 'Shoot the hostage';
	this.hint = 'Double-Tap';
	this.outcome = 'You shot a defenceless person';
	this.serious = true;

	this.init = function (opts) {

		opts = merge(opts, {

			backgroundColor:'red',

		});

		supr(this, 'init', [opts]);

	};

	this.build = function () {

		supr(this, 'build');

		this.audio = new AudioManager({
			path: "resources/sounds/",
			files: {
				gunshot: {
					volume: 0.8
				},
				gunload: {
					volume: 0.8
				}
			}
		});

		this.hostage = new ui.ImageView ({

			superview: this,
			width: this.bWidth,
			height: this.bHeight,
			image: 'resources/images/hostage.png'

		});

		this.gun = new ui.ImageView ({

			superview: this,
			width: 476,
			height: 478,
			x: this.bWidth / 2,
			y: this.bHeight - 478,
			image: 'resources/images/gun.png'

		});

		// this.reticule = new ui.ImageView ({

		// 	superview: this,
		// 	width: 200,
		// 	height: 200,
		// 	backgroundColor: 'red',

		// });

		// this.reticule.hide();

		// this.hostage.on('InputSelect', bind(this, function(evt, pt) {

		// 	this.reticule.style.x = pt.x - 100
		// 	this.reticule.style.y = pt.y - 100
		// 	this.reticule.show();

		// 	//gun load noise

		// }));

		this.clicked = false;

		this.on('InputSelect', bind(this, function() {

			if (this.clicked) {

				// this.noise.show();

				this.succeed();

				//gunshot
				//static noise
				
			} else {

				//loading noise,
				this.audio.play(gunload);

				this.clicked = true;

			}




		}));

	};

});
