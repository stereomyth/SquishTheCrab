
import device, math.util as math, animate;

import ui.View;
import ui.ImageView;
import ui.ScrollView;
import ui.widget.GridView;
import AudioManager;
import src.Entities.Game as Game;

import ui.resource.Image as Image;

exports = Class(Game, function (supr) {

	this.mission = 'Find the end of the sausage';
	this.hint = 'Scroll';
	this.outcome = 'You found the end of a sausage';
	this.serious = false;

	this.init = function (opts) {

		opts = merge(opts, {

			backgroundColor:'#00a8ff',

		});

		supr(this, 'init', [opts]);

	};

	this.build = function () {

		supr(this, 'build');

		this.audio = new AudioManager({
			path: "resources/sounds/",
			files: {
				ping: {
					volume: 0.8
				}
			}
		});

		this.scollview = new ui.ScrollView ({

			superview: this,
			width:this.bWidth,
			height:this.bHeight,
			// backgroundColor: 'orange',
			scrollY: false,
			scrollBounds: {
				minX: - this.bWidth - 500,
				maxX: this.bWidth * 2 + 500,
			},

		});

		this.sausage = new ui.View ({

			superview: this.scollview,
			width: this.bWidth * 3,
			height: 200,
			// backgroundColor: 'purple',
			x: - this.bWidth,
			y: this.bHeight / 2 - 100,
		})

		this.image1 = new Image({url: 'resources/images/sausage1.png'});
		this.image2 = new Image({url: 'resources/images/sausage2.png'});
		this.image3 = new Image({url: 'resources/images/sausage3.png'});

		this.sos1 = new ui.ImageView({

			superview:this.sausage,
			height: this.image1.getHeight(),
			width: this.image1.getWidth(),
			image: this.image1,

		});
		this.sos2 = new ui.ImageView({

			superview:this.sausage,
			height: this.image2.getHeight(),
			width: this.image2.getWidth(),
			x: this.image1.getWidth(),
			image: this.image2,

		});
		this.sos3 = new ui.ImageView({

			superview:this.sausage,
			height: this.image3.getHeight(),
			width: this.image3.getWidth(),
			x: this.image1.getWidth() + this.image2.getWidth(),
			image: this.image3,

		});

		this.circle1 = new EndCircle({
			superview: this.scollview,
			x: this.sausage.style.x - 90,
			y: this.sausage.style.y - 50,

		});

		this.circle1.on('circled', bind(this, function() {

			this.audio.play('ping');
			this.succeed();

		}));

		this.circle2 = new EndCircle({
			superview: this.scollview,
			y: this.sausage.style.y - 50,
			x: this.sausage.style.x + this.bWidth * 3 ,
		});

		this.circle2.on('circled', bind(this, function() {

			this.audio.play('ping');
			this.succeed();

		}));

		// console.log(this.sausage.getPosition().length)

		this.scollview.on('Scrolled', bind(this, function () {

			this.getFirstTouch();
		
			if (this.scollview.getOffset().x > 1100) {

				this.circle1.circle();	

			} else if (this.scollview.getOffset().x < -1100) {

				this.circle2.circle();	

			}

		}));


	};

});

var EndCircle = Class(ui.ImageView, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			// backgroundColor: 'red',
			width: 300,
			height: 300,
			opacity: 0,
			image: 'resources/images/circle.png',

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
