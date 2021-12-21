const path = require('path');
const fs = require('fs');

const parseFile = (file) => {
	const data = fs
		.readFileSync(path.join(__dirname, file), 'utf8')
		.toString()
		.trim();

	let [, x1, x2, y1, y2] = /target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/.exec(
		data
	);
	[x1, x2, y1, y2] = [x1, x2, y1, y2].map((v) => parseInt(v, 10));

	if (x1 > x2) {
		[x1, x2] = [x2, x1];
	}

	if (y1 > y2) {
		[y1, y2] = [y2, y1];
	}

	return { x: [x1, x2], y: [y1, y2] };
};

const data = parseFile('input_exercise17.txt');

module.exports = {
	data,
};