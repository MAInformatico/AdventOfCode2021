const { data } = require('./load_file');
const { Grid } = require('./lib/grid');

let grid = new Grid({
	load: data,
	parseAs: Number,
});

function flashing(flashedPoints) {
	let newFlashes = [];
	for (let id of flashedPoints) {
		let neighbors = grid.neighbors(...Grid.parseCoords(id), true);

		for (let { coord, value } of neighbors.values()) {
			let [x, y] = coord;
			let newValue = value + 1;

			if (newValue === 10) {
				newFlashes.push(Grid.toId(x, y));
			}

			grid.set(x, y, newValue);
		}
	}

	return newFlashes;
}

let allFlashs = false;
let result = 0;

while(!allFlashs){
    let flashed = [];
    for(let [key, value] of grid){
        let newValue = value + 1;
        grid.grid.set(key, newValue);
        if(value <= 9 && newValue >9){
            flashed.push(key);
        }
    }

    while(flashed.length > 0){
        flashed = flashing(flashed);
    }

    let total = 0;
    for(let [key,value] of grid){
        if(value > 9){
            total++;
            grid.grid.set(key,0);
        }
    }

    result++;

    if(total === 100){
        allFlashs = true;
    }

}

console.log(result);
