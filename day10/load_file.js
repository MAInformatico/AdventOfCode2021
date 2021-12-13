const path = require('path');
const fs = require('fs');

const data = fs
	.readFileSync(path.join(__dirname, 'input_exercise10.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')	
	.map((line) => line.split(''));

module.exports = {
	data,
};
