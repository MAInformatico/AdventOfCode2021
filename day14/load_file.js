const path = require('path');
const fs = require('fs');

const [root, inputRules] = fs
	.readFileSync(path.join(__dirname, 'input_exercise14.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n');

const rules = inputRules.split('\n').reduce((map, rule) => {
	// FC -> F
	let [from, to] = rule.split(' -> ').map((s) => s.trim());

	if (map.has(from)) {
		throw new Error(`Duplicate rule: ${from}`);
	}
	map.set(from, to);

	return map;
}, new Map());

module.exports = {
	root,
	rules,
};
