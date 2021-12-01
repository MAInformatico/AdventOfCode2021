const { data } = require('./load_file');

let counter = 0;
for (let i = 0; i < data.length - 3; i++) {
	let x = data[i];
	let y = data[i + 1];
	let z = data[i + 2];
	let t = data[i + 3];

	let current = x + y + z;
	let next = y + z + t;

	if (current < next) {
		counter++;
	}
}

console.log(counter);