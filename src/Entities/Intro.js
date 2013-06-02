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
			backgroundColor: "rgba(0,0,0,0.6)",
			text: "Objective and hint icons",
			size:100,
			width:baseWidth,
			height:baseHeight,

		});

		supr(this, 'init', [opts]);

	};

});
