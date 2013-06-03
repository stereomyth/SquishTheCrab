import device;

import src.Entities.Success as Success;

exports = Class(Success, function (supr) {

	this.image = new Image({url: "resources/images/fail.png"});

	this.init = function (opts) {

		opts = merge(opts, {

		});

		supr(this, 'init', [opts]);

	};


});
