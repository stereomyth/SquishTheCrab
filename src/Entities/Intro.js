import device, animate;

import ui.TextView;

exports = Class(ui.TextView, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			layout: "box",
			color: "white",
			backgroundColor: "rgba(0,0,0,0.6)",
			text: "Objective and hint icons",
			size:100,
			zIndex: 10,

		});

		supr(this, 'init', [opts]);

	};

});
