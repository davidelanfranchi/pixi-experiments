export default function(app, sprite, map) {
  let displacementSprite, filter;

  PIXI.loader.add(map).load(() => {
    displacementSprite = new PIXI.Sprite(PIXI.loader.resources[map].texture);
    displacementSprite.width = 800;
    displacementSprite.height = 800;
    app.stage.addChild(displacementSprite);
    filter = new PIXI.filters.DisplacementFilter(displacementSprite);
    filter.scale.x = 50;
    filter.scale.y = 50;

    sprite.filters = [filter];

    sprite.on('pointermove', onPointerMove);
  });

  function destroyFilter() {
    sprite.filters = null;
  }

  function onPointerMove(event) {
    requestAnimationFrame(() => {
      displacementSprite.x = event.data.global.x - displacementSprite.width / 2;
      displacementSprite.y =
        event.data.global.y - displacementSprite.height / 2;
    });
  }
}
