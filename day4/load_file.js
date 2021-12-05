const path = require('path');
const fs = require('fs');
const { Board } = require('./Bingo');

const data = fs
	.readFileSync(path.join(__dirname, 'input_exercise4.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n')
	.reduce(
		(accumulator,block,iter) =>{
			if (iter === 0){
				accumulator.numbers = block.split(',').map((value) => parseInt(value,10));
			}
			else{
				accumulator.boards.push(new Board(block, iter -1));
			}
			return accumulator
		},
		{numbers: undefined, boards: []}
	);
	

module.exports = {
	data,
};
