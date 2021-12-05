const {data} = require('./load_file.js');


let counter = {};

for (let line of data) {
	for (let i = 0; i < line.length; i++) {
		if (!counter[i]) {
			counter[i] = [0, 0];
		}

		let aux = +line[i];
		counter[i][aux]++;
	}
}

let minimus = [];
let maximus = [];
for (let iter of Object.values(counter)) {
	if (iter[0] > iter[1]) {
		maximus.push(0);
		minimus.push(1);
	} else {
		maximus.push(1);
		minimus.push(0);
	}
}

let min = parseInt(minimus.join(''), 2);
let max = parseInt(maximus.join(''), 2);

console.log(min * max);


