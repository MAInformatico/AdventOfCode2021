const { data } = require('./load_file');

let y = 0; //depth
let x = 0; //horizontal movement
let aim = 0;

for(let {movement, value} of data){
    if (movement === "forward"){ 
        x += value;
        y += aim * value;
    }
    
    if (movement === "up"){
        aim -= value;
    }

    if(movement === "down") {
        aim += value
    }
}

console.log(x*y);