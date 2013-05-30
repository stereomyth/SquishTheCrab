import device;

import ui.TextView;

import src.Entities.Timer as Timer

exports = Class(ui.TextView, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			layout: "box",
			text: "Game 1",
			color: "white",
			backgroundColor: "red",
			size:100

		});

		supr(this, 'init', [opts]);
		this.build();

	};

	this.build = function() {

		this.timer = new Timer();

		this.addSubview( this.timer );


	}

	// this.time = function (dt) {

	// 	this.setText(this.text);

	// };

});
