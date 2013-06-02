import device, animate;

import ui.View;
import src.Entities.Intro as Intro;
import src.Entities.Success as Success;
import src.Entities.Fail as Fail;

exports = Class(ui.View, function (supr) {

	this.introTime = 3000;
	this.endScreenTime = 2000;
	this.mission = "Squish the Crab"
	this.outcome = "You harrased a crab";
	this.serious = false;

	this.init = function (opts) {

		opts = merge(opts, {backgroundColor:'red'});

		supr(this, 'init', [opts]);

		this.build();

	};

	this.build = function () {

		this.intro = new Intro({text: this.mission});
		this.addSubview( this.intro );

		animate(this.intro).wait(this.introTime).then(bind(this, this.start));

	}

	this.start = function() {

		this.removeSubview(this.intro);
		this.emit('start');

		this.on('InputSelect', bind(this, function () {

			this.getFirstTouch()
			this.succeed();

		}));

		this.d = new Date();
		this.startMillis = this.d.getTime();

		// this.failTimer = setTimeout(bind(this, this.fail), 5000 );
	}

	this.succeed = function() {

		this.winTime = this.getTime();
		this.emit('success', this.firstTouch, this.winTime, this.serious, this.outcome);
		
		clearTimeout(this.failTimer); 

		this.success = new Success();
		this.addSubview( this.success );

		this.nextGame();

	};

	this.fail = function() {

		this.removeListener('InputSelect');

		this.emit('fail', this.firstTouch, this.serious);

		this.fail = new Fail();
		this.addSubview( this.fail );

		this.nextGame();

	};

	this.nextGame = function () {

		animate(this).wait(this.endScreenTime).then(bind(this, function () {
			this.emit('next');
		}));

	}

	this.getTime = function () {
		var d, newMillis, timeTaken
		d = new Date();
		newMillis = d.getTime();
		timeTaken = newMillis - this.startMillis;

		return timeTaken;
	}

	this.getFirstTouch = function () {

		if (!this.firstTouch) {

			this.firstTouch = this.getTime();

		};

	}

});
