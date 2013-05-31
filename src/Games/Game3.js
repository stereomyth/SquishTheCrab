// import device;

import src.Entities.Game as Game;


exports = Class(Game, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			text: "Game 3",
			backgroundColor: "blue",

		});

		supr(this, 'init', [opts]);

	};

});
