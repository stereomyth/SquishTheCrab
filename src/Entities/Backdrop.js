import animate, ui.View, ui.ImageView, ui.TextView;

exports = Class(ui.ImageView, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			layout: 'box',
			backgroundColor: 'green',
			image: 'resources/images/backdrops/noise2.png',
			width: GLOBAL.baseWidth,
			height: GLOBAL.baseHeight
			
		});

		supr(this, 'init', [opts]);

		// console.log(GLOBAL.baseHeight);
		// console.log(GLOBAL.baseWidth);

		this.animLoop();

	};

	this.animLoop = function () {

		animate(this).wait(100).then(bind(this, function(){

			this.style.update({ flipX: true });

		})).wait(100).then(bind(this, function(){

			this.style.update({ flipY: true });

		})).wait(100).then(bind(this, function(){

			this.style.update({ flipX: false });

		})).wait(100).then(bind(this, function(){

			this.style.update({ flipY: false });

		})).then(bind(this, this.animLoop));


	}

});
