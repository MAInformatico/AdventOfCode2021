const path = require('path');
const fs = require('fs');

const splitLines = (line) => line.split('').map((v) => /\d/.test(v) ? parseInt(v,10) : v);

const data = fs.readFileSync(path.join(__dirname, 'input_exercise18.txt'),'utf8')
			.toString()
			.trim()
			.split('\n')
			.map((line) => splitLines(line));


module.exports = {
	data,
	splitLines,
};