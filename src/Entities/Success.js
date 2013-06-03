import device, animate;

import ui.View;
import ui.ImageView;
import ui.TextView;

import ui.resource.Image as Image;

exports = Class(ui.View, function (supr) {

	this.image = new Image({url: "resources/images/success.png"});

	this.init = function (opts) {

		this.bHeight = GLOBAL.baseHeight;
		this.bWidth = GLOBAL.baseWidth;

		opts = merge(opts, {

			layout: "box",
			width:this.bWidth,
			height:this.bHeight,
			zIndex: 10,

		});


		supr(this, 'init', [opts]);

		this.thumbs = new ui.ImageView ({

			superview: this,
			width: this.image.getWidth(),
			height: this.image.getHeight(),
			image: this.image,
			x: this.bWidth / 2 - this.image.getWidth() / 2,
			y: this.bHeight / 2 - this.image.getHeight() / 2,

		})
	};

});
