export default function(app, sprite, container) {
	let filter;

	function createFilter(x = 0, y = 0) {
		filter = new PIXI.filters.BulgePinchFilter(new PIXI.Point (x, y), 200);
		sprite.filters = [filter];
	}

	function destroyFilter() {
		if (!filter) {
			return;
		}
		sprite.filters = null;
	}

	container.addEventListener("mousemove", onMouseMove);

	function onMouseMove(event) {
		const relX = event.clientX - container.offsetLeft;
		const relY = event.clientY - container.offsetTop;
		const x = Math.abs(relX / sprite.width);
		const y = Math.abs(relY / sprite.height);
		console.log(x, y)
		// destroyFilter();
		createFilter(x, y);
	}
}
