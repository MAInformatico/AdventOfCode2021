const { data } = require("./load_file");

const days = Array(9).fill(0);
for (let i of data) {
	days[i]++;
}

for (let i = 0; i < 256; i++) {
	let sixFish = 0;
	let eightFish = 0;
	for (let j = 0; j < days.length; j++) {
		let count = days[j];
		if (j === 0) {
			sixFish = count;
			eightFish = count;
		}
        else {
			days[j - 1] = count;
		}
	}

	days[6] += sixFish;
	days[8] = eightFish;
    
}

const result = days.reduce((x, y) => x + y);
console.log(result);