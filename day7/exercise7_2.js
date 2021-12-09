const {data} = require('./load_file');

const fuelCost = (init, end) => {
    const range  = Math.abs(init - end);
    return ( range * (range+1) ) / 2;
}

let minimum = -1;
let minDistance = Number.MAX_SAFE_INTEGER;
for(let pointA of data){
    let distance = 0;
    for(let pointB of data){
        distance += fuelCost(pointA, pointB);
    }

    if (distance < minDistance){
        minimum = pointA;
        minDistance = distance;
    }
}

console.log(minDistance);