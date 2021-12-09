const {data} = require("./load_file");

let result = [...data];

for(let i = 0; i< 80; i++){
    let new_fish = [];
    for (let j = 0; j < result.length; j++){
        result[j]--;
        if(result[j] < 0){
            new_fish.push(8);
            result[j] = 6;
        }
    }

    result.push(...new_fish);
}
console.log(result.length);