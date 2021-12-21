const { data } = require('./load_file');
const { Trajectories } = require('./lib/launcher');

const solutions = Trajectories(data);
const { maxY } = solutions.sort((a, b) => b.maxY - a.maxY)[0];

console.log(maxY);