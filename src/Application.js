import device

import ui.StackView as StackView;
import ui.TextView as TextView;

import src.Games.Game1 as Game1;

exports = Class(GC.Application, function () {

	this.initUI = function () {

		var game1 = new Game1();

		var stackView = new StackView({

			superview: this.view,
			height: device.height,
			width: device.width,
			

		});

		stackView.push(game1);


	};
	
	this.launchUI = function () {};

});
