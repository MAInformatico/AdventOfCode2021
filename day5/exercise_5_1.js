const { data } = require('./load_file');
const { Grid } = require('./Grid');

const grid = new Grid();

function* range(beginInterval, endInterval) {
	let step = endInterval > beginInterval ? 1 : -1;
	let steps = Math.abs(beginInterval - endInterval) + 1;

	let value = from;
	while (steps--) {
		yield value;
		value += step;
	}
}

for (let { beginInterval, endInterval } of data) {
	let [beginX, beginY] = beginInterval;
	let [endX, endY] = endInterval;

	if (!(beginX === endX || beginY === endY)) {
		continue;
	}

	if (beginX === endX) {
		let x = beginX;
		for (let y of range(beginY, endY)) {
			let count = grid.get(x, y);
			grid.set(x, y, count + 1);
		}
	}

	if (beginY === endY) {
		let y = beginY;
		for (let x of range(beginX, endX)) {
			let count = grid.get(x, y);
			grid.set(x, y, count + 1);
		}
	}
}

let result = 0;
for (let [id, value] of grid) {
	if (value >= 2) {
		result++;
	}
}
console.log(result);