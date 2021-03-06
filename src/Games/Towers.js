
import device, math.util as math, animate;

import ui.View;
import ui.ImageView;
import ui.ScrollView;
import src.Entities.Game as Game;
import AudioManager;
import ui.resource.Image as Image;


exports = Class(Game, function (supr) {

	this.mission = 'Crash the plane into the building';
	this.hint = 'Scroll';
	this.outcome = 'You crashed a plane into a building killing thousands';
	this.serious = true;

	this.towersImage1 = new Image({url: 'resources/images/towers1.png'});
	this.towersImage2 = new Image({url: 'resources/images/towers2.png'});

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
				explosion: {
					volume: 0.8
				},
				plane: {
					volume: 0.1
				},
			}
		});

		this.scollview = new ui.ScrollView ({

			superview: this,
			width: this.bWidth,
			height: this.bHeight,
			scrollY: false,
			bounce: false,
			scrollBounds: {
				minX: 0,
				maxX: this.towersImage1.getWidth() + this.towersImage2.getWidth() - 80,
			},

		});

		this.towers1 = new ui.ImageView ({

			superview: this.scollview,
			image: this.towersImage1,
			width: this.towersImage1.getWidth(),
			height: this.towersImage1.getHeight(),

		});

		this.towers2 = new ui.ImageView ({

			superview: this.scollview,
			image: this.towersImage2,
			width: this.towersImage2.getWidth(),
			height: this.towersImage2.getHeight(),
			x: this.towersImage1.getWidth(),

		});

		this.audio.play('plane');

		this.plane = new ui.ImageView ({

			superview: this.scollview,
			width: 176,
			height: 80,
			x: 150,
			y: 100,
			image: 'resources/images/plane.png',

		});

		this.scollview.addFixedView(this.plane);

		this.scollview.on('Scrolled', bind(this, function () {

			this.getFirstTouch();
		
			if (this.scollview.getOffset().x < -725) {

				this.scollview.removeListener('Scrolled');

				this.audio.stop('plane');
				this.audio.play('explosion');
				this.succeed();	

			}


		}));


	};

});

var EndCircle = Class(ui.View, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			backgroundColor: 'red',
			width: 200,
			height: 200,
			opacity: 0,

		});

		supr(this, 'init', [opts]);

	};

	this.circled = false;

	this.circle = function () {

		if (!this.circled) {

			this.circled = true;

			animate(this).now({opacity:1}, 50).wait(100).then({opacity:0}, 50).wait(100).then({opacity:1})
				.then(bind(this, function(){
					this.emit('circled');
				}));
			
		}


	}



});
