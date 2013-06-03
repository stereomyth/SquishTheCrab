
import device, math.util as math;

import ui.View;
import ui.ImageView;
import ui.widget.GridView;
import src.Entities.Game as Game;

import ui.resource.Image as Image;


exports = Class(Game, function (supr) {

	this.mission = "Eat the bad sushi";
	this.outcome = "You ate some suspicious sushi";
	this.serious = false;

	this.init = function (opts) {

		opts = merge(opts, {

			backgroundColor:'red',

		});

		supr(this, 'init', [opts]);

	};

	this.build = function () {

		supr(this, 'build');

		this.gridview = new ui.widget.GridView({
			superview: this,
			cols:4,
			rows:2,
			// backgroundColor: 'purple',
			width: 800,
			height: 400,
			y: this.bHeight / 2 - 200,
			autoCellSize: false,
			x: this.bWidth / 2 - 400 - 30,

		}); 

		this.sushi = [];
		this.theSushi = math.random(0, 8);
		this.eaten = false;

		for (var i = 0; i < 8; i++) {
			var theRow = 0, theCol = i;

			if (i > 3) {

				theRow = 1;
				theCol = i - 4;

			}

			var isBad = (i === this.theSushi) ? true : false ;

			this.sushi[i] = new Sushi({
				superview: this.gridview,
				col: theCol,
				row: theRow,
				isBad: isBad,
			});


			this.sushi[i].on('eaten', bind(this, function () {
			
					this.getFirstTouch();

			}));

			this.sushi[i].on('eatenBad', bind(this, function () {
			
				this.succeed();

			}));

		};

	};

});

var Sushi = Class(ui.View, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			// backgroundColor: 'green',
			width: 200,
			height: 200,

		});

		this.isBad = opts.isBad;

		supr(this, 'init', [opts]);


		if (this.isBad){
			this.image = new Image({url: "resources/images/sushi2.png"});
			// this.style.backgroundColor = 'purple';
		} else {
			this.image = new Image({url: "resources/images/sushi1.png"});

		}

		this.imageView = new ui.ImageView ({

			superview: this,
			width: this.image.getWidth(),
			height: this.image.getHeight(),
			image: this.image,
			x: this.getPosition().width / 2 - this.image.getWidth() / 2,
			y: this.getPosition().height / 2 - this.image.getHeight() / 2,

		})

		this.on('InputSelect', function () {

			this.emit('eaten');

			if (this.isBad){
				this.emit('eatenBad');
			}

			this.removeFromSuperview();

		});

	};

});
