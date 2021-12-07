const { data } = require('./load_file');
const { Grid } = require('./Grid');

const grid = new Grid();

function* range([beginX, beginY], [endX, endY]) {
	let stepX = endX === beginX ? 0 : endX > beginX ? 1 : -1;
	let stepY = endY === beginY ? 0 : endY > beginY ? 1 : -1;
	let stepsX = Math.abs(beginX - endX) + 1;
	let stepsY = Math.abs(beginY - endY) + 1;

	let steps = Math.max(stepsX, stepsY);

	let valueX = beginX;
	let valueY = beginY;
	while (steps--) {
		yield [valueX, valueY];
		valueX += stepX;
		valueY += stepY;
	}
}

for (let { beginInterval, endInterval} of data) {
	for (let [x, y] of range(beginInterval, endInterval)) {
		let count = grid.get(x, y);
		grid.set(x, y, count + 1);
	}
}


let result = 0;
for (let [id, value] of grid) {
	if (value >= 2) {
		result++;
	}
}
console.log(result);