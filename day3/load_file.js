const path = require('path');
const fs = require('fs');

const data = fs
	.readFileSync(path.join(__dirname, 'input_exercise3.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	

module.exports = {
	data,
};
