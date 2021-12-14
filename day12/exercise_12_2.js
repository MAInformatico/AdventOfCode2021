const { data } = require('./load_file');
const { Graph } = require('./lib/graph')

let graph = new Graph(data);
let result = graph.getPaths('start','end', { visitSmallCaveAgain : true});

console.log(result.length);