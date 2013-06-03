import device, animate;

import ui.View;
import ui.TextView;
import ui.ImageView;

exports = Class(ui.View, function (supr) {

	var timeTaken = 0, gameLength = 5, timeLeft;
	var timer = this;

	this.init = function (opts) {

		opts = merge(opts, {

			width: 150,
			height: GLOBAL.baseHeight,
			x: GLOBAL.baseWidth,
			canHandleEvents: false,

		});

		supr(this, 'init', [opts]);

		this.scale = new ui.ImageView({

			superview: this,
			// backgroundColor: 'white',
			height: GLOBAL.baseHeight,
			width: 40,
			x: 112,
			canHandleEvents: false,
			image: 'resources/images/ruler.png',

		});

		this.pointer = new ui.View({

			superview: this,
			color: 'white',
			clip: true,
			size: 100,
			width: 114,
			height: 80,
			x:30,
			canHandleEvents: false,

		});

		this.poinerLayer1 = new ui.ImageView({
			superview: this.pointer,
			width: 114,
			height: 80,
			image: 'resources/images/pointer1.png',

		});

		this.numClip = new ui.View({
			superview: this.pointer,
			y:10,
			x:15,
			width:66,
			height: 55,
			// backgroundColor:'purple',
			clip: true,
		})

		this.numbers = new ui.ImageView({

			superview: this.numClip,
			image: 'resources/images/timer.png',
			autoSize: true,
			width: 77,
			height: 336,
			x: -5,
			y:-5, 
			canHandleEvents: false,

		});

		this.poinerLayer2 = new ui.ImageView({
			superview: this.pointer,
			width: 114,
			height: 80,
			image: 'resources/images/pointer2.png',

		});
		// console.log(this);

	};

	this.reset = function () {
		
		this.pointerAnim = animate(this.pointer).now({y: 0}, 200, animate.linear);
		this.nunmberAnim = animate(this.numbers).now({y: -4}, 200, animate.linear);

	}

	this.start = function () {

		this.pointerAnim = animate(this.pointer).now({y: GLOBAL.baseHeight - 78}, 5000, animate.linear);
		this.nunmberAnim = animate(this.numbers).now({y: -325 + 50}, 5000, animate.linear);

	}

	this.stop = function () {

		this.pointerAnim.clear();
		this.nunmberAnim.clear();

	}

});
