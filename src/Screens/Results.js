import device, animate;

import ui.View;
import ui.TextView;
import ui.ScrollView;
import ui.ViewPool;
import ui.ButtonView;

exports = Class(ui.ScrollView, function (supr) {

	this.init = function (opts) {

		this.isSerious = opts.seriousness;
		this.outcomes = opts.outcomes;
		this.hesTime = opts.hesTime
		this.lines = [];
		this.lineHeight = 80, this.xOffset = 50;

		opts = merge(opts, {

			scrollX: false,
			// offsetX: 30,
			backgroundColor: 'gray',

		});

		supr(this, 'init', [opts]);

		this.build();

	};

	this.build = function () {

		this.done = new ui.ButtonView({
			superview: this,
			title: 'done',
			text: {
				color:'white',
				size: 70,
			},
			backgroundColor: 'red',
			width:200,
			height:100,
			x: device.width - 200,
			y: device.height - 100,

		});


		if (this.hesTime > 0) {
			this.hesText = 'At least you hesitated ' + this.hesTime + 'ms longer on average';
		} else {
			this.hesText = 'you shit';
		}
 
		this.hesitate = new ui.TextView({

			superview: this,
			text: this.hesText,
			color:'white',
			size: 50,
			backgroundColor: 'red',
			width:device.width - 200,
			height:100,
			y: device.height,
			padding: 20,

		});

		this.addFixedView(this.done);
		this.addFixedView(this.hesitate);

		this.linePool = new ui.ViewPool({
			ctor: ui.TextView,
			initCount: this.outcomes.length,
			initOpts: {
				parent: this,
				color: 'white',
				horizontalAlign:'left',
				height: this.lineHeight,
				width: device.width,
				x: this.xOffset + 30,
				canHandleEvents: false,
				autoFontSize: false,
				clip: true,
				opacity: 0,
				size: 50,
				text:'TextView'
			}
		});

		for (var i = 0; i < this.outcomes.length; i++) {

			this.lines[i] = this.linePool.obtainView();
			this.lines[i].updateOpts({
				text:this.outcomes[i],
				y: this.lineHeight * i,
				visible: true,
			});

		}

		this.setScrollBounds({ maxY: this.lineHeight * this.outcomes.length, minY: 0 });

		this.on('ViewDidAppear', bind(this, function () {
			
			this.animLines();

		}));


		// this.on('Scrolled', bind(this, function (delta) {
			
		// 	// this.goSerious();
		// 	// console.log(delta);

		// }));

		var that = this

		this.done.on('InputSelect', bind(this, function () {
			
			this.emit('done');
			// console.log(this.getSubviews())
			// this.removeAllSubviews();

		}));

	}

	this.goSerious = function () {
		var seriousCount = 0;

		for (var i = 0; i < this.lines.length; i++) {
			var line = this.lines[i];

			if (!this.isSerious[i]) {

				animate(line).wait( i * 100 ).then({ opacity: 0, x: this.xOffset + 30 }, 1000)
					.then(bind(this, function () {

						this.linePool.releaseView(line);
						
					}));


			} else if (this.isSerious[i]){

				animate(line).wait(1000 + i * 100).then({ y: this.lineHeight * seriousCount }, 1000);

				seriousCount++;

			}

		}

		// this.killLines();

		this.setScrollBounds({ maxY: this.lineHeight * seriousCount + 100, minY: 0 });
	}

	this.animLines = function () {

		for (var i = 0; i < this.lines.length; i++) {

			if (i < device.height / this.lineHeight) {

				animate(this.lines[i]).wait(i * 100).then({ opacity: 1, x: 0 + 30}, 1000);

			} else {

				animate(this.lines[i]).now({ opacity: 1, x: 0 + 30}, 0);

			}


		}

		animate(this).wait(4000).then(function(){this.goSerious()});
		animate(this.hesitate).wait(5500).then({ y: device.height - 100 }, 500);
	}

	this.killLines = function () {

		for (var i = 0; i < this.lines.length; i++) {

			if (!this.isSerious[i]) {

				console.log('removing ' + i);
				this.removeSubview(this.lines[i]);

			}

		}
	}

});
