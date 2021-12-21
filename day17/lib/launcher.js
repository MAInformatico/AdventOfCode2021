function launch(initialXv, initialYv, data) {
	let xv = initialXv;
	let yv = initialYv;

	let x = 0;
	let y = 0;

	const lowestY = Math.min(...data.y);
	let maxY = y;

	while (y > lowestY) {
		x += xv;
		y += yv;

		if (y > maxY) {
			maxY = y;
		}

		xv += xv === 0 ? 0 : xv > 0 ? -1 : 1;
		yv--;

		if (x >= data.x[0] && x <= data.x[1] && y >= data.y[0] && y <= data.y[1]) {
			return {
				maxY: maxY,
				xv: initialXv,
				yv: initialYv,
			};
		}
	}
}

function Trajectories(data) {
	const lowestY = Math.min(...data.y);
	const farthestX = Math.max(...data.x);

	let solutions = [];
	for (let x = 0; x <= farthestX + 1; x++) {
		for (let y = lowestY; y <= 1000; y++) {
			let valid = launch(x, y, data);

			if (valid) {
				solutions.push(valid);
			}
		}
	}

	return solutions;
}

module.exports = {
	Trajectories,
};