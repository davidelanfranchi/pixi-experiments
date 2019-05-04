import cover from "../helpers/cover.js";

class DisplacementSwap {
	constructor(options) {
		// Default options
		const defaults = {
			className: "DisplacementSwap",
			container: null,
			sprite1Url: null,
			sprite2Url: null,
			displacementMapUrl: null
		};

		// Assign passed options to class
		let opts = Object.assign({}, defaults, options);
		Object.keys(defaults).forEach(prop => {
			this[prop] = opts[prop];
		});

		if (
			!this.container ||
			!this.sprite1Url ||
			!this.sprite2Url ||
			!this.displacementMapUrl
		) {
			console.warn(`${this.className}: missing options`);
			return;
		}

		// Start
		this.init();
	}
	init() {
		this.containerWidth = this.container.offsetWidth;
		this.containerHeight = this.container.offsetHeight;

		this.app = new PIXI.Application({
			width: this.containerWidth,
			height: this.containerHeight,
			transparent: true
		});

		PIXI.Loader.shared
			.add(this.sprite1Url)
			.add(this.sprite2Url)
			.add(this.displacementMapUrl)
			.load(() => {
				this.setUp();
			});
	}

	setUp() {
		// add sprites

		this.sprite1 = new PIXI.Sprite(
			PIXI.Loader.shared.resources[this.sprite1Url].texture
		);
		this.sprite2 = new PIXI.Sprite(
			PIXI.Loader.shared.resources[this.sprite2Url].texture
		);

		this.addSpriteAsCoverImage(this.sprite1);
		this.addSpriteAsCoverImage(this.sprite2);

		// add displacement map

		this.displacementMapSprite = new PIXI.Sprite(
			PIXI.Loader.shared.resources[this.displacementMapUrl].texture
		);

		this.addSpriteAsCoverImage(this.displacementMapSprite);
		this.displacementMapSprite.x = 2;
		this.displacementMapSprite.y = 2;

		this.filter = new PIXI.filters.DisplacementFilter(
			this.displacementMapSprite
		);
		this.filter.scale.x = 50;
		this.filter.scale.y = 50;

		this.sprite2.filters = [this.filter];

		// append view

		this.container.appendChild(this.app.view);

		this.addEffect();
	}

	addSpriteAsCoverImage(sprite) {
		const sizeAndPosition = cover(
			this.containerWidth,
			this.containerHeight,
			sprite.width,
			sprite.height
		);

		sprite.width = sizeAndPosition.width;
		sprite.height = sizeAndPosition.height;
		sprite.x = sizeAndPosition.x;
		sprite.y = sizeAndPosition.y;

		sprite.interactive = true;

		this.app.stage.addChild(sprite);
	}

	addEffect() {
		this.sprite2.alpha = 0;

		this.tl = new TimelineLite({ paused: true })
			.addLabel("start")
			.to(this.sprite2, 1, { alpha: 1 }, "start")
			.to(this.sprite1, 0.5, { alpha: 0 }, "start")
			.to(
				this.displacementMapSprite,
				0.5,
				{ y: this.displacementMapSprite.y - 200 },
				"start"
			)
			.to(this.filter.scale, 1, { x: 0, y: 0 }, "start")
			.addLabel("end");

		this.bindedOnMouseEnter = this.onMouseEnter.bind(this);
		this.bindedOnMouseLeave = this.onMouseLeave.bind(this);
		this.container.addEventListener("mouseenter", this.bindedOnMouseEnter);
		this.container.addEventListener("mouseleave", this.bindedOnMouseLeave);
	}

	onMouseEnter() {
		this.tl.play();
	}
	onMouseLeave() {
		this.tl.reverse();
	}

	destroy() {
		this.app.destroy();
		this.container.removeEventListener("mouseenter", this.bindedOnMouseEnter);
		this.container.removeEventListener("mouseleave", this.bindedOnMouseLeave);
	}
}

// Effects: glitch, displacement
const swap = new DisplacementSwap({
	container: document.querySelector(".canvas-container"),
	sprite1Url: "truetopia-team-01-640.jpg",
	sprite2Url: "truetopia-team-02-640.jpg",
	displacementMapUrl: "displacement/15.jpg"
});
