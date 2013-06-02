import animate, ui.TextView;

exports = Class(ui.TextView, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			layout: "box",
			color: "white",
			text: "Would you kindly pick up the tablet and tap to start",
			backgroundColor: "black",
			autoFontSize: false,
			wrap:true,
			size:100,

		});

		supr(this, 'init', [opts]);

		// this.start();

		// this.animLoop();

		this.on('InputSelect', bind(this, function () {

			this.emit('start');

		}));

	};

	this.animLoop = function () {

		animate(this).now({ backgroundColor: 'white' }, 1000).then(this.animLoop.bind(this));

	}

});
