const path = require('path');
const fs = require('fs');

const data = fs
	.readFileSync(path.join(__dirname, 'input_exercise2.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		let [movement, value] = line.split(' ');
		value = parseInt(value, 10);

		return {
			movement,
			value,
		};
	});

module.exports = {
	data,
};
