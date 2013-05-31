import device;

import src.Entities.Success as Success;

exports = Class(Success, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			text: "Fail!",

		});

		supr(this, 'init', [opts]);

	};


});
