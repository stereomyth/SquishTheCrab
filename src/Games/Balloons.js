
import device, math.util as math, animate;

import ui.View;
import ui.ImageView;
import src.Entities.Game as Game;

import AudioManager;

exports = Class(Game, function (supr) {

	this.mission = 'Pop all of the balloons';
	this.hint = 'Tap';
	this.outcome = 'You burst some balloons';
	this.serious = false;

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
				pop: {
					volume: 0.8
				}
			}
		});

		this.balloon1 = new ui.ImageView ({

			superview: this,
			width: 350,
			height: 460,
			y: 50,
			x: 100,
			image: 'resources/images/balloon1.png'

		});

		this.balloon2 = new ui.ImageView ({

			superview: this,
			width: 350,
			height: 460,
			y: 50,
			x: 250,
			image: 'resources/images/balloon2.png'

		});

		this.balloon3 = new ui.ImageView ({

			superview: this,
			width: 350,
			height: 460,
			y: 50,
			x: 500,
			image: 'resources/images/balloon3.png'

		});

		this.popped = 0;

		this.balloon1.on('InputSelect', bind(this, function() {

			this.balloon1.hide();
			
			this.audio.play('pop');

			this.popped++;

			if(this.popped === 3){

				this.succeed();

			}

		}));

		this.balloon2.on('InputSelect', bind(this, function() {

			this.balloon2.hide();
			
			this.audio.play('pop');

			this.popped++;

			if(this.popped === 3){

				this.succeed();

			}

		}));

		this.balloon3.on('InputSelect', bind(this, function() {

			this.balloon3.hide();
			
			this.audio.play('pop');

			this.popped++;

			if(this.popped === 3){

				this.succeed();

			}

		}));

	};

});
