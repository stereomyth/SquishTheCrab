// import device;

import src.Entities.Game as Game;


exports = Class(Game, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			text: "Game 1",
			backgroundColor: "red",

		});

		supr(this, 'init', [opts]);

	};

});
