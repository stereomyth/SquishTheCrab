import device, animate;

import ui.View;
import ui.TextView;

exports = Class(ui.View, function (supr) {

	var timeTaken = 0, gameLength = 5, timeLeft;

	this.init = function (opts) {

		opts = merge(opts, {

			width: 150,
			height: device.height,
			x: device.width,

		});

		supr(this, 'init', [opts]);

		this.scale = new ui.View({

			superview: this,
			backgroundColor: 'white',
			height: device.height,
			width: 50,
			x: 100,


		});

		this.pointer = new ui.TextView({

			superview: this,
			color: "white",
			backgroundColor: "black",
			text:"x",
			size:100,
			width:120,
			height:50

		});

	};

	// this.time = function () {

	// 	timeTaken++;

	// 	timeLeft = gameLength - timeTaken;

	// 	this.pointer.setText(timeLeft);

	// 	if (timeTaken === gameLength){

	// 		// this.emit("TimeOut");

	// 		clearInterval(this.timer);

	// 	}

	// };

	this.reset = function () {

		// timeTaken = 0;
		
		this.pointerAnim = animate(this.pointer).now({y: 0}, 200, animate.linear);

		// clearInterval(this.timer);
	}

	this.start = function () {

		// this.pointer.setText(gameLength);
		// this.timer = setInterval(bind(this,this.time), 1000);

		this.pointerAnim = animate(this.pointer).now({y: device.height - 50}, 5000, animate.linear);

	}

	this.stop = function () {

		this.pointerAnim.clear();

		// clearInterval(this.timer);

	}

});
