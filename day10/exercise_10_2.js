const { data } = require('./load_file');
const {checkLine, incompletedPoints, chars} = require('./parser');

const puntuation = data.reduce((result, line) => {
    const status = checkLine(line);
    if (status.incomplete){
        const completedString = status.stack.reverse().map((character) => chars[character]);
        const completionScore = completedString.reduce((result,char) =>{
            result *= 5;
            result += incompletedPoints[char];
            return result;
        },0);
        result.push(completionScore);
    }
    return result;
},[]).sort((x,y) => x - y);

const middleResult = puntuation[Math.floor(puntuation.length / 2)];

console.log(middleResult);