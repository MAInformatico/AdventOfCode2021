const {data} = require("./load_file");
const { Grid } = require('./lib/grid');
const { getLowPoints } = require('./lib/grid');


let gridObject = new Grid({
	defaultFactory: () => 9,
	load: data,
});

let lows = getLowPoints(gridObject);

let riskLevel = lows.reduce((sum, { cell }) => sum + (cell + 1), 0);

console.log(riskLevel);