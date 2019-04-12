import cover from "./../helpers/cover.js";
import fxGlitch from "./fxGlitch.js";
import fxDisplacement from "./fxDisplacement.js";
import fxBulge from "./fxBulgePinch.js";
import fxDepth from "./fxDepth.js";

//Aliases
let Application = PIXI.Application,
	loader = PIXI.loader,
	resources = PIXI.loader.resources,
	Sprite = PIXI.Sprite,
	filters = PIXI.filters;

class pixiHover {
	constructor(options) {
		// Default options
		const defaults = {
			className: "pixiHover",
			container: null,
			imageUrl: null,
			effect: null,
			map: null
		};

		// Assign passed options to class
		let opts = Object.assign({}, defaults, options);
		Object.keys(defaults).forEach(prop => {
			this[prop] = opts[prop];
		});

		if (
			!this.container ||
			!this.imageUrl ||
			!this.effect ||
			(this.effect === "displacement" && !this.map)
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

		this.app = new Application({
			width: this.containerWidth,
			height: this.containerHeight,
			transparent: true
		});

		loader.add(this.imageUrl).load(() => {
			this.sprite = new Sprite(loader.resources[this.imageUrl].texture);
			const sizeAndPosition = cover(
				this.containerWidth,
				this.containerHeight,
				this.sprite.width,
				this.sprite.height
			);

			this.sprite.width = sizeAndPosition.width;
			this.sprite.height = sizeAndPosition.height;
			this.sprite.x = sizeAndPosition.x;
			this.sprite.y = sizeAndPosition.y;

			this.sprite.interactive = true;

			this.app.stage.addChild(this.sprite);
			this.container.appendChild(this.app.view);

			this.addEffect();
		});
	}

	addEffect() {
		if (this.effect === "glitch") {
			fxGlitch(this.app, this.sprite);
		} else if (this.effect === "displacement") {
			fxDisplacement(this.app, this.sprite, this.map);
		} else if (this.effect === "bulge") {
			fxBulge(this.app, this.sprite, this.container);
		} else if (this.effect === "depth") {
			fxDepth(this.app, this.sprite, this.map);
		} else {
			console.warn("no filter found");
		}
	}

	destroy() {
		this.sprite.filters = null;
	}
}

// Effects: glitch, displacement
new pixiHover({
	container: document.querySelector(".canvas-container"),
	imageUrl: "fashion01.jpg",
	effect: "depth",
	map: "fashion01-depth.jpg"
});
