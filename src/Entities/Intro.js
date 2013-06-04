import device, animate;

import ui.View, ui.TextView;

import src.Entities.Noise as Noise;

exports = Class(ui.View, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			layout: 'box',
			color: 'white',
			backgroundColor: 'green',
			size:100,
			zIndex: 10,

		});

		this.bWidth = GLOBAL.baseWidth;
		this.bHeight = GLOBAL.baseHeight;

		supr(this, 'init', [opts]);

		this.noise = new Noise({

			superview: this,
			opacity: 0.1,

		})

		this.objctive = new ui.TextView({

			superview: this,
			text: opts.objective,
			layout: 'box',
			width: this.bWidth - 200,
			height: 200,
			// backgroundColor: 'yellow',
			color: 'white',
			autoFontSize: true, 
			wrap: true, 
			autoSize: false,
			strokeColor: 'black',
			strokeWidth: 10,
			size: 70,
			y: 100,
			x: 100,

		})

		this.hint = new ui.TextView({

			superview: this,
			text: 'Hint: ' + opts.hint,
			layout: 'box',
			width: this.bWidth,
			height: 50,
			// backgroundColor: 'yellow',
			color: 'black',
			strokeColor: 'white',
			strokeWidth: 5,
			size: 50,
			y:350,

		})

	};

});
