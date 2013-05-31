// import device;

import src.Entities.Game as Game;


exports = Class(Game, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			text: "Game 2",
			backgroundColor: "green",

		});

		supr(this, 'init', [opts]);

	};

});
