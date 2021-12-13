const path = require('path');
const fs = require('fs');

const data = fs
	.readFileSync(path.join(__dirname, 'input_exercise9.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')	
	.map((line) =>{
		return line.split('').map((v) => parseInt(v,10));
	 });

module.exports = {
	data,
};
