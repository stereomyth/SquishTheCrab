
import device, math.util as math, animate;

import ui.View;
import ui.ImageView;
import ui.TextView;
import src.Entities.Game as Game;

import ui.resource.Image as Image;

exports = Class(Game, function (supr) {

	this.mission = 'Squish the crab';
	this.hint = 'Tap';
	this.outcome = 'You harassed a crustacean';
	this.serious = false;

	this.init = function (opts) {

		opts = merge(opts, {

			backgroundColor:'purple',

		});

		supr(this, 'init', [opts]);

	};

	this.build = function () {

		this.image = new Image({url: 'resources/images/crab.png'});

		supr(this, 'build');

		this.crab = new ui.ImageView ({

			superview: this,
			width: this.image.getWidth(),
			height: this.image.getHeight(),
			y: this.bHeight / 2 - this.image.getHeight() / 2,
			x: this.bWidth / 2 - this.image.getWidth() / 2,
			image: this.image,

		});
		// this.fingers = [];

		// this.fingers[0] = new ui.TextView({
		// 	superview:this,
		// 	backgroundColor: 'yellow',
		// 	width:100,
		// 	height:100,
		// })

		// this.fingers[1] = new ui.TextView({
		// 	superview:this,
		// 	backgroundColor: 'green',
		// 	width:100,
		// 	height:100,
		// })

		this.lastFinger = 0;

		this.changes = [];

		this.starts = [];

		this.crab.on("InputStart", bind(this, function (evt, pt) {

			// console.log(evt);
			// if (evt.id != this.lastFinger) {
			// 	this.succeed();
			// } else {
			// 	this.lastFinger = evt.id
			// }

			// this.fingers[evt.id].show();

			// this.fingers[evt.id].style.x = pt.x
			// this.fingers[evt.id].style.y = pt.y

			this.starts[evt.id] = pt;

			// this.changes[evt.id] = {x: pt.x, y: pt.y, dx: pt.x, dy: pt.y}
			// this.fingers[evt.id].setText(evt.id)

		  }));

		this.crab.on("InputMove", bind(this, function (evt2, pt2) {
			if(evt2.id === 1) {

				var pt = this.starts[1]
				
				var dx = pt2.x - pt.x;

				if (dx > 20 || dx < -20) {

					this.succeed();
				}
			}

			// this.fingers[evt2.id].style.x = pt2.x
			// this.fingers[evt2.id].style.y = pt2.y

			// this.changes[evt2.id] = {dx: pt2.x - pt.x, dy: pt2.y - pt.y}
			// this.fingers[evt2.id].setText(pt2.x - pt.x);


		}));

		// this.crab.on("InputSelect", bind(this, function (evt, pt) {

		// 	this.fingers[evt.id].hide();


		// }));

		// this.crab.on("DragStart", function (dragEvt) {
		// 	console.log('drag?')
		// 	this.dragOffset = {
		// 		x: dragEvt.srcPt.x - this.style.x,
		// 		y: dragEvt.srcPt.y - this.style.y
		// 	};
		// })


		// this.crab.on('InputSelect', bind(this, function() {

			// if (this.clicked) {

			// 	this.succeed();

			// 	//gunshot
			// 	//static noise
				
			// } else {

			// 	//loading noise,
			// 	this.stamp.show();


			// }




		// }));

	};

});
