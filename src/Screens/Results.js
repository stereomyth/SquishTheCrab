import device, animate;

import ui.View;
import ui.TextView;
import ui.ScrollView;
import ui.ViewPool;
import ui.widget.ButtonView;
import src.Entities.Backdrop as Backdrop;

exports = Class(ui.ScrollView, function (supr) {

	this.init = function (opts) {

		this.isSerious = opts.seriousness;
		this.outcomes = opts.outcomes;
		this.hesTime = opts.hesTime
		this.lines = [];
		this.lineHeight = 60, this.xOffset = 50, this.shouldHesitate, this.shouldGoSerious;

		opts = merge(opts, {

			scrollX: false,
			// offsetX: 30,
			backgroundColor: 'gray',

		});

		supr(this, 'init', [opts]);

		this.build();

	};

	this.build = function () {

		this.runChecks();

		this.done = new ui.widget.ButtonView({
			superview: this,
			title: 'done',
			text: {
				color:'white',
				size: 50,
			},
			backgroundColor: 'red',
			width:200,
			height:100,
			x: GLOBAL.baseWidth - 200,
			y: GLOBAL.baseHeight - 100,

		});
 
		this.hesitate = new ui.TextView({

			superview: this,
			text: this.hesText,
			color:'white',
			size: 50,
			backgroundColor: 'red',
			width:GLOBAL.baseWidth - 200,
			height:100,
			y: GLOBAL.baseHeight,
			padding: 20,

		});

		this.addFixedView(this.done);
		this.addFixedView(this.hesitate);

		this.buildLines();

		this.on('ViewDidAppear', bind(this, function () {
			
			this.animLines();

		}));

		var that = this

		this.done.on('InputSelect', bind(this, function () {
			
			this.emit('done');

		}));

	}

	this.runChecks = function () {

		var serious, silly;

		if (this.outcomes.length < 1) {

			this.outcomes.push("You failed everything?");
			this.isSerious.push(true);

		} else {

			for (var i = 0; i < this.isSerious.length; i++){

				if (this.isSerious[i]) { 
					serious = true;
				} else { 
					silly = true;
				}

			}

			if (!serious && silly) {

				this.hesText = "You did not complete any negative tasks";

			} else if (serious && silly) {

				if (this.hesTime > 0) {

					this.hesText = 'You hesitated ~' + this.hesTime + 'ms longer for these tasks';

				} else {

					this.hesTime = Math.abs(this.hesTime);

					this.hesText = 'You hesitated ~' + this.hesTime + 'ms less for these tasks';
				}

				this.shouldGoSerious = true;

			} else if (serious && !silly) {

				this.hesText = "You only completed negative tasks"

			}

			this.shouldHesitate = true;

		}

	}

	this.buildLines = function () {

		this.linePool = new ui.ViewPool({
			ctor: ui.TextView,
			initCount: this.outcomes.length,
			initOpts: {
				parent: this,
				layout: 'box',
				color: 'white',
				horizontalAlign:'left',
				height: this.lineHeight,
				x: this.xOffset + 30,
				canHandleEvents: false,
				autoFontSize: false,
				clip: true,
				opacity: 0,
				size: 35,
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

		this.setScrollBounds({ maxY: this.lineHeight * this.lines.length, minY: 0 });

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

		this.setScrollBounds({ maxY: this.lineHeight * seriousCount + 100, minY: 0 });


	}

	this.animLines = function () {

		for (var i = 0; i < this.lines.length; i++) {

			if (i < GLOBAL.baseHeight / this.lineHeight) {

				animate(this.lines[i]).wait(i * 100).then({ opacity: 1, x: 0 + 30}, 1000);

			} else {

				animate(this.lines[i]).now({ opacity: 1, x: 0 + 30}, 0);

			}


		}

		var hesWait = 1000;

		if(this.shouldGoSerious) {

			animate(this).wait(4000).then(function(){ this.goSerious() });

			hesWait = 5500;
			
		}

		if(this.shouldHesitate) {

			animate(this.hesitate).wait(hesWait).then({ y: GLOBAL.baseHeight - 100 }, 500);

		}
	}

});
