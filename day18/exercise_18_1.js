const { data } = require('./load_file');
const { add, reduce, magnitude } = require('./lib/fish');

let accumulator = data.shift();
while (data.length > 0) {
	let next = data.shift();

	accumulator = add(accumulator, next);
	reduce(accumulator);
}

const result = magnitude(accumulator);

console.log(result);
