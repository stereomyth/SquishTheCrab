import animate, ui.View, ui.TextView;

exports = Class(ui.View, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			layout: 'box',
			backgroundColor: 'white',
			
		});

		supr(this, 'init', [opts]);

		this.introLine = 'Would you kindly\npick me up and\ntap to begin';

		this.text1 = new ui.TextView({

			superview: this,
			layout: 'box',
			color: 'black',
			text: this.introLine,
			autoFontSize: false,
			backgroundColor: 'white',
			wrap:true,
			size:50,

		});

		this.text2 = new ui.TextView({

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

			this.emit('start');

		}));

		// this.on('ViewDidAppear', bind(this, function () {

			animate(this).wait(300).then(bind(this, function () {

				this.emit('start');

			}));
				

		// }));


	};

	this.animLoop = function () {

		animate(this.text2)
			.now({ opacity: 0 }, 3000)
			.wait(1000).then({ opacity: 1 }, 2000)
			.wait(1500).then(this.animLoop.bind(this));

	}

});
