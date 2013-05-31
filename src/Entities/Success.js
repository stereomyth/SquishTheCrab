import device, animate;

import ui.TextView;

exports = Class(ui.TextView, function (supr) {

	// var boundsWidth = 1024;
	// var boundsHeight = 576;

	// var baseWidth = device.screen.width * (boundsHeight / device.screen.height); //864
	// var baseHeight = boundsHeight; //576
	// var scale = device.screen.height / baseHeight; //1

	var baseWidth = device.width;
	var baseHeight = device.height;

	this.init = function (opts) {

		opts = merge(opts, {

			layout: "box",
			color: "white",
			backgroundColor: "black",
			text: "Success!",
			size:100,
			width:baseWidth / 2,
			height:baseHeight / 2,
			x: (baseWidth / 2) - (baseWidth / 4),
			y: (baseHeight / 2) - (baseHeight / 4)

		});

		supr(this, 'init', [opts]);

		// animate(this).wait(1000).then(function(){

		// 	this.destroy();

		// });

	};

	this.destroy = function () {

		this.removeFromSuperview();

		GC.app.selectGame();

	}

});
