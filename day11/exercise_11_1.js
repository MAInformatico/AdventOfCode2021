const { data } = require('./load_file');
const { Grid } = require('./lib/grid');

let grid = new Grid({
	load: data,
	parseAs: Number,
});

function flashing(flashedPoints) {
	let newFlashes = [];
	for (let id of flashedPoints) {
		let neighbors = grid.neighbors(...Grid.parseCoords(id), true);

		for (let { coord, value } of neighbors.values()) {
			let [x, y] = coord;
			let newValue = value + 1;

			if (newValue === 10) {
				newFlashes.push(Grid.toId(x, y));
			}

			grid.set(x, y, newValue);
		}
	}

	return newFlashes;
}

let result = 0;
for (let i = 0; i < 100; i++) {
	let flashed = [];
	
	for (let [id, value] of grid) {
		let newValue = value + 1;
		grid.grid.set(id, newValue);
		if (newValue === 10) {
			flashed.push(id);
		}
	}

	result += flashed.length;
	
	while (flashed.length > 0) {
		flashed = flashing(flashed);
		result += flashed.length;
	}

	for (let [id, value] of grid) {
		if (value > 9) {
			grid.grid.set(id, 0);
		}
	}
}

console.log(result);
