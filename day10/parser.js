const openCharacters = new Set(['(', '[', '{','<']);
const closedCharacters = new Set([')',']','}','>']);

const corruptedPoints = {
    ')' : 3,
    ']' : 57,
    '}' : 1197,
    '>' : 25137,
};

const incompletedPoints = {
    ')' : 1,
    ']' : 2,
    '}' : 3,
    '>' : 4,
};

const chars = {
    '(': ')',
	'[': ']',
	'{': '}',
	'<': '>',
};

const checkLine = (line) => {
    const iterator = [...line];
    const stack = [iterator.shift()];

    while(iterator.length > 0){
        const nextCharacter = iterator.shift();
        const head =  stack[stack.length - 1];

        if(chars[head] == nextCharacter){
            stack.pop();
        }
        else if (openCharacters.has(nextCharacter)){
            stack.push(nextCharacter);
        }
        else{
            return{
                error : true,
                code : "Error founded",
                char : nextCharacter,
            };
        }

    }

    if(stack.length > 0){
        return{
            incomplete : true,
            stack,
        };
    }

    return {
        complete : true,
    }

};


module.exports = {
    checkLine,
    corruptedPoints,
    incompletedPoints,
    openCharacters,
    closedCharacters,
    chars,
};


