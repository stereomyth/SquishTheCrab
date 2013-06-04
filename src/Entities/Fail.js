import device;

import src.Entities.Success as Success;
import ui.resource.Image as Image;

exports = Class(Success, function (supr) {


	this.init = function (opts) {

		opts = merge(opts, {

		});

		supr(this, 'init', [opts]);

	};

	this.loadImage = function () {
		
		this.image = new Image({url: "resources/images/fail.png"});

	};


});
