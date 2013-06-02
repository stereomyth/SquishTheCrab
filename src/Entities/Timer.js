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
			height: device.height,
			x: device.width,
			canHandleEvents: false,

		});

		supr(this, 'init', [opts]);

		this.scale = new ui.View({

			superview: this,
			backgroundColor: 'white',
			height: device.height,
			width: 50,
			x: 100,
			canHandleEvents: false,

		});

		this.pointer = new ui.View({

			superview: this,
			color: 'white',
			backgroundColor: 'purple',
			clip: true,
			size: 100,
			width: 120,
			height: 50,
			canHandleEvents: false,

		});

		this.numbers = new ui.ImageView({

			superview: this.pointer,
			backgroundColor: 'black',
			image: 'resources/images/timer.png',
			autoSize: true,
			canHandleEvents: false,

		});

		// console.log(this);

	};

	this.reset = function () {
		
		this.pointerAnim = animate(this.pointer).now({y: 0}, 200, animate.linear);
		this.nunmberAnim = animate(this.numbers).now({y: 0}, 200, animate.linear);

	}

	this.start = function () {

		this.pointerAnim = animate(this.pointer).now({y: device.height - 45}, 5000, animate.linear);
		this.nunmberAnim = animate(this.numbers).now({y: -300 + 50}, 5000, animate.linear);

	}

	this.stop = function () {

		this.pointerAnim.clear();
		this.nunmberAnim.clear();

	}

});
