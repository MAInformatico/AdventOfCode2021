const { data } = require('./load_file');

let counter = 0;
for (let i = 0; i < data.length - 1; i++){

    let prev = data[i];
    
    if (data[i+1] > prev){
        counter ++;
    }
}
console.log(counter);