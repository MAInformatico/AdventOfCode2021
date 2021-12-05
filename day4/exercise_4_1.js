const { data } = require('./load_file');
const { Bingo } = require('./Bingo');

let game = new Bingo(data.numbers, data.boards);

let winning_boards;

while (!winning_boards) {
	winning_boards = game.pickNext();
}

let [winning_board, ...rest] = winning_boards;

console.log(winning_board.getScore(game.called));