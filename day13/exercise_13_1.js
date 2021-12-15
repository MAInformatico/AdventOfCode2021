const { data, folds } = require('./load_file');
const { Grid } = require('./lib/grid');

let matrix = new Grid({
    defaultFactory: () => 0,
    stringMap: {
        0: '',
        1: '#',
    },
});

for(let [x, y] of data){
    matrix.set(x, y, 1);
}

let { axis, line } = folds[0];

let pointsFoldAcross = [];
for(let [id, cell] of matrix){
    if(cell === 0){
        continue;
    }

    let [x, y] = Grid.parseCoords(id);
    const evaluate = axis === 'x' ? x : y;

    if(evaluate < line){
         continue;
    }

    pointsFoldAcross.push([x,y]);
}

for(let [x, y] of pointsFoldAcross){
    if(axis === 'x'){
        let newX = line - Math.abs(x - line);
        matrix.set(newX, y, 1);
    }
    else{
        let newY = line - Math.abs(y - line);
        matrix.set(x, newY, 1);
    }
    matrix.grid.delete(Grid.toId(x,y));

}

matrix.resize();

console.log(matrix.sum());
