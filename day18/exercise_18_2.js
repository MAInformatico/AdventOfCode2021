const { data } = require('./load_file');
const { add, reduce, magnitude } = require('./lib/fish');
const O = require('generatorics'); //npm install generatorics

const magnitudes = [];
for (let [x, y] of O.permutation(data, 2)) {
	let newPair = add(x, y);
	const reduct = reduce(newPair);
	let magnitud = magnitude([...reduct]);
	magnitudes.push([magnitud, reduct]);
}

magnitudes.sort((x, y) => y[0] - x[0]);
const result = magnitudes[0];

console.log(result[0]);
