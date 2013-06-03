
import device, math.util as math, animate;

import ui.View;
import ui.ImageView;
import ui.ScrollView;
import ui.widget.GridView;
import src.Entities.Game as Game;


exports = Class(Game, function (supr) {

	this.mission = "Find the end of the sausage";
	this.outcome = "You found the end of a sausage";
	this.serious = false;

	this.init = function (opts) {

		opts = merge(opts, {

			backgroundColor:'red',

		});

		supr(this, 'init', [opts]);

	};

	this.build = function () {

		supr(this, 'build');

		this.scollview = new ui.ScrollView ({

			superview: this,
			width:this.bWidth,
			height:this.bHeight,
			backgroundColor: 'orange',
			scrollY: false,
			scrollBounds: {
				minX: - this.bWidth - 500,
				maxX: this.bWidth * 2 + 500,
			},

		});

		this.sausage = new ui.View ({

			superview: this.scollview,
			width: this.bWidth * 3,
			height: 100,
			backgroundColor: 'purple',
			x: - this.bWidth,
			y: this.bHeight / 2 - 50,
		})

		this.circle1 = new EndCircle({
			superview: this.scollview,
			x: this.sausage.style.x - 90,
			y: this.sausage.style.y - 50,

		});

		this.circle1.on('circled', bind(this, function() {

			this.succeed();

		}));

		this.circle2 = new EndCircle({
			superview: this.scollview,
			y: this.sausage.style.y - 50,
			x: this.sausage.style.x + this.bWidth * 3 - 90,
		});

		this.circle2.on('circled', bind(this, function() {

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
