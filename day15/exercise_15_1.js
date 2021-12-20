const { data } = require('./load_file');
const { Grid } = require('./lib/grid')

const grid = new Grid({
    load: data,
    parseAs: Number,
});

const path = grid.getShortestWeightedPath(0, 0, grid.maxX, grid.maxY, { includeFrom: false });
const result = path.reduce((sum, cellId) => sum + grid.grid.get(cellId), 0);

console.log(result);