
class Board {
	constructor(newBlock, id) {
		this.id = id;
		this.block = newBlock;
		let rows = newBlock.split('\n');
		this.grid = rows.map((row) =>
			row
				.trim()
				.split(/\s+/)
				.map((value) => parseInt(value, 10))
		);

		this.boardSize = this.grid.length;

		this.cells = {};
		for (let iterRow = 0; iterRow < this.grid.length; iterRow++) {
			for (let iterCol = 0; iterCol < this.grid[iterRow].length; iterCol++) {
				let cell = this.grid[iterRow][iterCol];
				this.cells[cell] = [iterRow, iterCol];
			}
		}

		this.bingoRows = Array(this.boardSize).fill(0);

		this.bingoColumns = Array(this.boardSize).fill(0);
	}

	hasNumber(number) {
		return Boolean(this.cells[number]);
	}
	
	addNumber(number) {
		if (!this.hasNumber(number)) {
			return false;
		}

		let [row, column] = this.cells[number];
		this.bingoRows[row] += 1;
		this.bingoColumns[column] += 1;

		return this.bingoRows[row] === 5 || this.bingoColumns[column] === 5;
	}

	hasBingo() {
		return (
			this.bingoRows.some((row) => row === 5) ||
			this.bingoColumns.some((col) => col === 5)
		);
	}

	getUncalled(called) {
		let called_lookup = called.reduce(
			(obj, num) => ((obj[num] = true), obj),
			{}
		);
		let uncalled = [];
		for (let num_str of Object.keys(this.cells)) {
			if (!called_lookup[num_str]) {
				uncalled.push(parseInt(num_str, 10));
			}
		}

		return uncalled;
	}

	getScore(called) {
		let uncalled = this.getUncalled(called);
		let uncalled_sum = uncalled.reduce((a, b) => a + b, 0);
		return uncalled_sum * called[called.length - 1];
	}
}

class Bingo {

	constructor(numbers, boards) {
		this.picked = -1;
		this.numbers = numbers;
		this.boards = boards;

		this.called = [];
	}

	pickNext() {
		this.picked++;
		let number = this.numbers[this.picked];
		this.called.push(number);

		let bingos = [];
		for (let board of this.boards) {
			if (board.hasBingo()) {
				continue;
			}
			
			if (board.addNumber(number)) {
				bingos.push(board);
			}
		}

		if (bingos.length > 0) {
			return bingos;
		}

		return false;
	}
}

module.exports = { Board, Bingo };