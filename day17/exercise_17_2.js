const { data } = require('./load_file');
const { Trajectories } = require('./lib/launcher');

const solutions = Trajectories(data);

console.log(solutions.length);