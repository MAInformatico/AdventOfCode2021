const { data } = require('./load_file');

let y = 0; //depth
let x = 0; //horizontal movement

for(let {movement, value} of data){
    if (movement === "forward")  x += value;
    
    if (movement === "up") y -= value;

    if(movement === "down") y += value;        
}

console.log(x*y);