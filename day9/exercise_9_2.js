const {data} = require("./load_file");
const { Grid } = require('./lib/grid');
const { getBasins } = require('./lib/grid');


let gridObject = new Grid({
	defaultFactory: () => 9,
	load: data,
});

let basins = getBasins(gridObject);

let [x,y,z] = basins

console.log(x.size * y.size * z.size);