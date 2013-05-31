import ui.TextView;

exports = Class(ui.TextView, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			layout: "box",
			color: "white",
			text: "Start",
			backgroundColor: "black",
			size:100,

		});

		supr(this, 'init', [opts]);

		// this.start();

		this.on('InputSelect', bind(this, function () {

			this.emit('start');

		}));

	};

});
