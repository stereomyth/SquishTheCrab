import device, animate;

import ui.View;
import ui.TextView;
import ui.ScrollView;
import ui.ViewPool;
import ui.widget.ButtonView;
import src.Entities.Noise as Noise;

exports = Class(ui.View, function (supr) {

	this.init = function (opts) {

		this.bHeight = GLOBAL.baseHeight;
		this.bWidth = GLOBAL.baseWidth;

		this.isSerious = opts.seriousness;
		this.outcomes = opts.outcomes;
		this.hesTime = Math.round(opts.hesTime);
		this.seriousCount = 0;
		this.lines = [];
		this.lineHeight = 60, this.xOffset = 50, this.shouldHesitate, this.shouldGoSerious;

		opts = merge(opts, { backgroundColor: 'black'});

		supr(this, 'init', [opts]);

		this.build();

	};

	this.build = function () {

		this.homeTimer = setTimeout(bind(this, function() {

			this.emit('done');

		}), 60000 );

		this.runChecks();

		this.noise = new Noise({
			superview: this,
			opacity: 0.03,
			zIndex: 10,
			canHandleEvents: false,
		})

		this.scroll = new ui.ScrollView({

			superview: this,
			scrollX: false,

		})

		this.bottomPadding = 30;

		this.done = new ui.widget.ButtonView({
			superview: this,
			title: 'Return',
			text: {
				color:'white',
				size: 30,
			},
			backgroundColor: 'green',
			width:200,
			height:75,
			x: this.bWidth - 200 - 25,
			y: 25,

		});
 
		this.hesitate = new ui.TextView({

			superview: this,
			text: this.hesText,
			color:'white',
			size: 20,
			backgroundColor: 'gray',
			width:this.bWidth - 50,
			height:60,
			y: this.bHeight ,
			x: 25

		});

		this.buildLines();

		this.on('ViewDidAppear', bind(this, function () {
			
			this.animLines();

		}));

		this.done.on('InputSelect', bind(this, function () {
			
			this.emit('done');

			clearTimeout(this.homeTimer);

		}));

	}

	this.runChecks = function () {

		var serious, silly;

		if (this.outcomes.length < 1) {

			this.outcomes.push('You failed everything?');
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

				this.hesText = 'You did not complete any negative tasks';

			} else if (serious && silly) {

				if (this.hesTime > 0) {

					this.hesText = 'You hesitated ~ ' + this.hesTime + 'ms longer for these tasks';

				} else {

					this.hesTime = Math.abs(this.hesTime);

					this.hesText = 'You hesitated ~ ' + this.hesTime + 'ms less for these tasks';
				}

				this.shouldGoSerious = true;

			} else if (serious && !silly) {

				this.hesText = 'You only completed negative tasks'

			}

			this.shouldHesitate = true;

		}

	}

	this.buildLines = function () { 

		this.lines[0] = new Line({
			superview: this.scroll,
			text:'Results',
			size: 100,
			height: 120,
		});

		for (var i = 1; i < this.outcomes.length + 1; i++) {

			this.lines[i] = new Line({
				superview: this.scroll,
				text: this.outcomes[i-1],
				y: i * this.lineHeight + 60,
				isSerious: this.isSerious[i-1],
				seriousCount: this.seriousCount,
			});

			if (this.isSerious[i-1]){
				this.seriousCount++;
			}

		};

		this.scroll.setScrollBounds({ maxY: this.lineHeight * this.lines.length + 60, minY: 0 });

	}

	this.goSerious = function () {

		for (var i = 1; i < this.lines.length; i++) {

			this.lines[i].goSerious(i);

		}

		this.scroll.setScrollBounds({ maxY: this.lineHeight * this.seriousCount + 100 + this.hesitate.getPosition().height, minY: 0 });


	}

	this.animLines = function () {

		for (var i = 0; i < this.lines.length; i++) {

			this.lines[i].anim(i);

		}

		var hesWait = 1000;

		if(this.shouldGoSerious) {

			animate(this).wait(4000).then(function(){ this.goSerious() });

			hesWait = 5500;
			
		}

		if(this.shouldHesitate) {

			animate(this.hesitate).wait(hesWait).then({ y: this.bHeight - 60}, 500);

		}

	}

});

var Line = Class(ui.TextView, function (supr) {

	this.init = function (opts) {

		this.lineHeight = 60

		opts = merge(opts, {

			layout: 'box',
			color: 'white',
			horizontalAlign:'left',
			height: this.lineHeight,
			x: 80,
			canHandleEvents: false,
			autoFontSize: false,
			clip: true,
			size: 35,
			text:'TextView',
			opacity: 0,

		});

		supr(this, 'init', [opts]);

		this.isSerious = opts.isSerious;
		this.sNth = opts.seriousCount;

	};

	this.anim = function(nth) {

		if (this.style.x < GLOBAL.baseHeight) {

			animate(this).wait(nth * 100).then({ opacity: 1, x: 30}, 1000);

		} else {

			this.style.opacity = 1
			this.style.x = 30;

		}

	}

	this.goSerious = function (nth) {

		if (!this.isSerious) {

			animate(this).wait( nth * 100 ).then({ opacity: 0, x: 80 }, 1000);

		} else if (this.isSerious){

			animate(this).wait(1000 + nth * 100).then({ y: this.lineHeight * this.sNth + 120 }, 1000);

		}

	}

});

