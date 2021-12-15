const { data, folds } = require('./load_file');
const { Grid } = require('./lib/grid');

let matrix = new Grid({
	defaultFactory: () => 0,
	string_map: {
		0: ' ',
		1: '#',
	},
});

for (let [x, y] of data) {
	matrix.set(x, y, 1);
}

for (let { axis, line } of folds) {
	let pointsFoldAcross = [];
	for (let [id, cell] of matrix) {
		if (cell === 0) {
			continue;
		}

		let [x, y] = Grid.parseCoords(id);
		const compare = axis === 'x' ? x : y;

		if (compare < line) {
			continue;
		}

		pointsFoldAcross.push([x, y]);
	}

	for (let [x, y] of pointsFoldAcross) {
		if (axis === 'x') {
			let newX = line - Math.abs(x - line);
			matrix.set(newX, y, 1);
		} else {
			let newY = line - Math.abs(y - line);
			matrix.set(x, newY, 1);
		}

		matrix.grid.delete(Grid.toId(x, y));
	}
}

matrix.resize();

console.log(matrix.toString());