import animate, ui.View, ui.TextView;

exports = Class(ui.View, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			layout: 'box',
			backgroundColor: 'white',
			
		});

		supr(this, 'init', [opts]);

		this.introLine = 'Tutorial';

		this.text1 = new ui.TextView({

			superview: this,
			layout: 'box',
			color: 'white',
			text: this.introLine,
			autoFontSize: false,
			backgroundColor: 'black',
			wrap:true,
			size:50,

		});

		this.loopTime = 3000;
		// this.animLoop();

		this.on('InputSelect', bind(this, function () {

			this.emit('squished');

		}));


	};

	this.animLoop = function () {

		animate(this.text2)
			.now({ opacity: 0 }, 3000)
			.wait(1000).then({ opacity: 1 }, 2000)
			.wait(1500).then(this.animLoop.bind(this));

	}

});
