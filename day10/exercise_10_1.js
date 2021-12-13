const { data } = require('./load_file');
const { corruptedPoints, checkLine} = require('./parser');

const result = data.reduce((result, line) => {
    const status = checkLine(line);
    if (status.error){
        return result + corruptedPoints[status.char];
    }
    else{
        return result;
    }
},0);

console.log(result);