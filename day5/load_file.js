const path = require('path');
const fs = require('fs');

const data = fs
	.readFileSync(path.join(__dirname, 'input_exercise5.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		let [beginInterval, endInterval] = line.split(' -> ');
		let [beginX, beginY] = beginInterval.split(',').map((value) => parseInt(value,10));
		let [endX, endY] = endInterval.split(',').map((value) => parseInt(value,10));

		return {
			beginInterval: [beginX, beginY],
			endInterval: [endX, endY],
		}

	});
	

module.exports = {
	data,
};
