import device;

import ui.TextView;

exports = Class(ui.TextView, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			layout: "box",
			text: "5",
			color: "white",
			backgroundColor: "black",
			size:100,
			width:150,
			height:150

		});

		supr(this, 'init', [opts]);

	};

	// this.time = function (dt) {

	// 	this.setText(this.text);

	// };

});
