// import device;

import src.Entities.Game as Game;


exports = Class(Game, function (supr) {

	this.mission = "maybe here?"
	this.outcome = "You found the end of the sausage"
	this.serious = false

	this.init = function (opts) {

		opts = merge(opts, {

			backgroundColor: "blue",

		});

		supr(this, 'init', [opts]);

	};

});
