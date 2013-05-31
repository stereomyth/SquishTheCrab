import device, animate;

import ui.TextView;
import src.Entities.Intro as Intro;
import src.Entities.Success as Success;
import src.Entities.Fail as Fail;

exports = Class(ui.TextView, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {

			layout: "box",
			text: "Game template",
			color: "white",
			backgroundColor: "gray",
			size:100

		});

		supr(this, 'init', [opts]);

		this.build();

	};

	this.build = function() {

		this.intro = new Intro();
		this.addSubview( this.intro );

		animate(this.intro).wait(1000).then(bind(this, function () {
			this.removeSubview(this.intro);
			this.emit('start');
			setTimeout(bind(this, function() {

				this.fail();

			}), 5000 );
		}));

		this.on('InputSelect', bind(this, function () {

			this.succeed();

		}));

	};

	this.succeed = function() {

		this.emit('success');

		this.success = new Success();
		this.addSubview( this.success );

		this.nextGame();

	};

	this.fail = function() {

		this.emit('fail');

		this.fail = new Fail();
		this.addSubview( this.fail );

		this.nextGame();

	};

	this.nextGame = function () {

		animate(this).wait(1000).then(bind(this, function () {
			this.emit('next');
		}));

	}

	// this.time = function (dt) {

	// 	this.setText(this.text);

	// };

});
