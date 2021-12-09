const {data} = require('./load_file');

//Dinamy memory
const fuelCost = (() => {
    const cost = new Map();

    return (position) => {
        if (!cost.has(position)){
            let distance = 0;
            for (let point of data){
                distance +=Math.abs(position - point);
            }
            cost.set(position, distance);
        }

        return cost.get(position);
    };
})();

let minimum = -1;
let minDistance = Number.MAX_SAFE_INTEGER;
for(let point of data){
    let distance = fuelCost(point);
    if (distance < minDistance){
        minimum = point;
        minDistance = distance;
    }
}

console.log(minDistance);