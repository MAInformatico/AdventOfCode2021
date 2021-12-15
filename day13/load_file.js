const path = require('path');
const fs = require('fs');

const [inputData, inputFolds] = fs
	.readFileSync(path.join(__dirname, 'input_exercise13.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n');

const data = inputData.split('\n').map((line) => {
	// @example '1071,582'
	return line.split(',').map((v) => parseInt(v, 10));
});

const folds = inputFolds.split('\n').map((fold) => {
	// @example 'fold along x=655'
	let [axis, line] = fold.replace('fold along ', '').split('=');
	line = parseInt(line, 10);
	return { axis, line };
});

module.exports = {
	data,
	folds,
};