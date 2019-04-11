export default function(app, sprite) {
  let filter;

  function createFilter() {
    const rand1 = Math.floor(Math.random() * 10) + 1;
    const rand2 = Math.floor(Math.random() * 10) + 1;
    filter = new PIXI.filters.GlitchFilter({
      offset: 20,
      direction: 0,
      blue: [rand1, rand2]
    });
    sprite.filters = [filter];
  }

  function destroyFilter() {
    if(!filter){ return;}
    filter.destroy();
  }

  sprite.on('pointermove', onPointerMove);

  const threshold = 10;
  let movement = 0;
  function onPointerMove(event) {
    if (event.target === sprite) {
      movement++;
      if (movement > threshold) {
        // filter.refresh();
        destroyFilter();
        createFilter();
        movement = 0;
      }
    }
  }
}
