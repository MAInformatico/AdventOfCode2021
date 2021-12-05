const { data } = require('./load_file');
const { Bingo } = require('./Bingo');

let match = new Bingo(data.numbers, data.boards);

let winning_boards;
let restBoards = data.boards.length;

while (restBoards > 0) {
	winning_boards = match.pickNext();
    if (winning_boards){
        restBoards -= winning_boards.length;
    }
}

let [winning_board, ...rest] = winning_boards;


console.log(winning_board.getScore(match.called));