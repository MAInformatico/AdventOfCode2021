const path = require('path');
const fs = require('fs');

const data = fs
	.readFileSync(path.join(__dirname, 'input_exercise15.txt'), 'utf8')
	.toString()
	.trim()

module.exports = {
	data,
};
