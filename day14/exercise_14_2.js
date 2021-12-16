
const { root, rules } = require('./load_file');

let pairs = new Map();
for (let i = 0; i < root.length - 1; i++) {
	const x = root[i];
	const y = root[i + 1];
	const pair = x + y;
	pairs.set(pair, (pairs.get(pair) || 0) + 1);
}

for (let i = 1; i <= 40; i++) {
	let updatedPairs = new Map();

	for (let [key, value] of pairs) {
		const rule = rules.get(key);
		if (rule) {

			let a = key[0] + rule;
			let b = rule + key[1];

			updatedPairs.set(a, value + (updatedPairs.get(a) || 0));
			updatedPairs.set(b, value + (updatedPairs.get(b) || 0));
		} else {			
			updatedPairs.set(key, value);
		}
	}

	pairs = updatedPairs;
}


const totals = {};
for (let [key, value] of pairs) {
	let x = key[0];
	let y = key[1];

	if (!totals[x]) totals[x] = 0;
	if (!totals[y]) totals[y] = 0;

	totals[x] += value;
	totals[y] += value;
}

totals[root[0]]++;
totals[root[root.length - 1]]++;


const result = Object.entries(totals)
	.map(([key, value]) => [key, value / 2])
	.sort((x, y) => x[1] - y[1]);

let min = result[0];
let max = result[result.length - 1];

console.log(max[1] - min[1]);