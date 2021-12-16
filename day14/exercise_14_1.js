const { root, rules } = require('./load_file');
const { Node } = require('./lib/node')

let rootList = root.split('').map((v) => new Node(v));

for( let i = 0; i< 10; i++ ){
    for( let j = 0; j < rootList.length - 1; j++ ){
        let x = rootList[j];
        let y = rootList[j+1];

        let pair = '' + x + y;

        if(rules.has(pair)){
            x.next = new Node(rules.get(pair));
        }        
    }

    let newList = [];
    for( let j = 0; j < rootList.length; j++){
        let x = rootList[j];
        newList.push(x);

        if(x.next){
            newList.push(x.next);
            x.reset();
        }

    }

    rootList = newList;

}

let obj = rootList.reduce((obj, value) => {
    obj[value.name] = (obj[value.name] || 0) + 1;
    return obj;
}, {});

let result = Object.entries(obj);
result.sort((x,y) => x[1] - y[1]);

let max = result[result.length - 1];
let min = result[0];

console.log(max[1] - min[1]);

