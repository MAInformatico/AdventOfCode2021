const red = (s) => require('util').format('\x1b[31m%s\x1b[0m', s);
const green = (s) => require('util').format('\x1b[32m%s\x1b[0m', s);

const OPN = '[';
const CLS = ']';
const SEP = ',';

function add(...pairs) {
	let newPair = [OPN];

	for (let i = 0; i < pairs.length; i++) {
		if (i !== 0) {
			newPair.push(SEP);
		}

		newPair.push(...pairs[i]);
	}
	newPair.push(CLS);

	return newPair;
}

function lastIndexOfDigit(pair, fromIndex) {
	for (let i = fromIndex - 1; i >= 0; i--) {
		let token = pair[i];

		if (typeof token === 'number') {
			return i;
		}
	}

	return -1;
}

function nextIndexOfDigit(pair, fromIndex) {
	for (let i = fromIndex + 1; i < pair.length; i++) {
		let token = pair[i];

		if (typeof token === 'number') {
			return i;
		}
	}

	return -1;
}

function reduce(pair) {
	let depth;
	let didReduce;
	let explodeIndex;
	let splitIndex;

	do {
		depth = 0;
		didReduce = false;
		explodeIndex = null;
		splitIndex = null;

		for (let index = 0; index < pair.length; index++) {
			let token = pair[index];

			if (token === OPN) {
				depth++;
			} else if (token === CLS) {
				depth--;
			}

			if (depth === 5) {
				explodeIndex = index;
				break;
			}
			if (splitIndex === null && typeof token === 'number' && token >= 10) {
				splitIndex = index;
			}
		}

		if (explodeIndex !== null || splitIndex !== null) {
			didReduce = true;

			if (explodeIndex !== null) {

				let x = pair[explodeIndex + 1];
				let y = pair[explodeIndex + 3];

				if (typeof x !== 'number' || typeof y !== 'number') {
					process.exit(1);
				}

				let xLeftDigit = lastIndexOfDigit(pair, explodeIndex);
				let yRightDigit = nextIndexOfDigit(pair, explodeIndex + 3);

				if (xLeftDigit > -1) {
					pair[xLeftDigit] += x;
				}
				if (yRightDigit > -1) {
					pair[yRightDigit] += y;
				}

				pair.splice(explodeIndex, 5, 0);
			} else {
				// Split
				const digitToExplode = pair[splitIndex];
				let x = Math.floor(digitToExplode / 2);
				let y = Math.ceil(digitToExplode / 2);

				pair.splice(splitIndex, 1, OPN, x, SEP, y, CLS);
			}
		}
	} while (didReduce);

	return pair;
}

function magnitude(tokens) {
	while (tokens.includes(CLS)) {
		let closeIndex = tokens.indexOf(CLS);
		let openIndex = tokens.lastIndexOf(OPN, closeIndex);

		let x = tokens[openIndex + 1];
		let y = tokens[closeIndex - 1];

		const innerMagnitude = 3 * x + 2 * y;

		tokens.splice(openIndex, 5, innerMagnitude);
	}

	return tokens[0];
}

module.exports = {
	add,
	reduce,
	magnitude,
};