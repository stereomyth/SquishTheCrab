// import device;

import src.Entities.Game as Game;


exports = Class(Game, function (supr) {

	this.init = function (opts) {

		this.mission = "Catch the bannana";
		this.outcome = "You caught a bannana"
		this.serious = true;

		opts = merge(opts, {

			backgroundColor: "green",

		});

		supr(this, 'init', [opts]);

	};

});
