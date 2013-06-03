import animate, ui.View, ui.ImageView, ui.TextView;

exports = Class(ui.ImageView, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			layout: 'box',
			backgroundColor: 'green',
			image: 'resources/images/backdrops/noise2.png',
			width: GLOBAL.baseWidth,
			height: GLOBAL.baseHeight,
			
		});

		supr(this, 'init', [opts]);

	};

});
