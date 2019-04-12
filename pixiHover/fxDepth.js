import cover from "./../helpers/cover.js";

export default function(app, sprite, map) {
	let displacementSprite, filter;
	
	console.log(app.stage.width)

  PIXI.loader.add(map).load(() => {
		displacementSprite = new PIXI.Sprite(PIXI.loader.resources[map].texture);
		const sizeAndPosition = cover(
			app.stage.width,
			app.stage.height,
			displacementSprite.width,
			displacementSprite.height
		);

		displacementSprite.width = sizeAndPosition.width;
		displacementSprite.height = sizeAndPosition.height;
		displacementSprite.x = sizeAndPosition.x;
		displacementSprite.y = sizeAndPosition.y;

		app.stage.addChild(displacementSprite);
		filter = new PIXI.filters.DisplacementFilter(displacementSprite,0);
		// filter.scale.x = 50;
		// filter.scale.y = 50;

		sprite.filters = [filter];
		
		sprite.on('pointermove', onPointerMove);
  });

  function destroyFilter() {
    sprite.filters = null;
  }

  function onPointerMove(event) {
    requestAnimationFrame(() => {
			console.log('a')
      filter.scale.x =  (window.innerWidth/2 - event.data.global.x) / 100;
      filter.scale.y = (window.innerHeight/2 - event.data.global.y ) / 100;
    });
  }
}
