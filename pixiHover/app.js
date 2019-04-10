class pixiHover {
  constructor(options) {
    // Default options
    const defaults = {
      className: 'pixiHover',
      container: null,
      imageUrl: null
    };

    // Assign passed options to class
    let opts = Object.assign({}, defaults, options);
    Object.keys(defaults).forEach(prop => {
      this[prop] = opts[prop];
    });

    if (!this.container || !this.imageUrl) {
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
      height: this.containerHeight
    });

    PIXI.loader.add(this.imageUrl).load(() => {
      this.sprite = new PIXI.Sprite(
        PIXI.loader.resources[this.imageUrl].texture
      );
      const sizeAndPosition = this.getCoverProperties(this.sprite);
      this.sprite.width = sizeAndPosition.width;
      this.sprite.height = sizeAndPosition.height;
      this.sprite.x = sizeAndPosition.x;
      this.sprite.y = sizeAndPosition.y;
      this.app.stage.addChild(this.sprite);
      this.container.appendChild(this.app.view);

      this.addEventListener();
    });
  }

  addEventListener() {
    this.sprite.interactive = true;
    this.sprite.on('pointermove', this.animate);
  }

  animate(event) {
    console.log(event);
  }

  getCoverProperties(sprite) {
    // https://www.reddit.com/r/pixijs/comments/5nkr3t/background_image_cover/
    const imageRatio = sprite.width / sprite.height;
    const containerRatio = this.containerWidth / this.containerHeight;

    if (containerRatio > imageRatio) {
      return {
        height: sprite.height / (sprite.width / this.containerWidth),
        width: this.containerWidth,
        x: 0,
        y:
          (this.containerHeight -
            sprite.height / (sprite.width / this.containerWidth)) /
          2
      };
    } else {
      return {
        width: sprite.width / (sprite.height / this.containerHeight),
        height: this.containerHeight,
        y: 0,
        x:
          (this.containerWidth -
            sprite.width / (sprite.height / this.containerHeight)) /
          2
      };
    }
  }
}

new pixiHover({
  container: document.querySelector('.canvas-container'),
  imageUrl: './../assets/img/fashion01.jpg'
});
