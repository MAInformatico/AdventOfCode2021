
class Grid {

	constructor({ defaultFactory = (x, y) => 0, string_map = {}, load, parseAs } = {}) {
		this.defaultFactory = defaultFactory.bind(this);
		this.stringMap = string_map;
		this.grid = new Map();
		this.maxX = -Infinity;
		this.minX = Infinity;
		this.maxY = -Infinity;
		this.minY = Infinity;

		if (load) {
			this.load(load, parseAs);
		}
	}

	static toId(x, y) {
		return `${x},${y}`;
	}

	static parseCoords(id, returnAsObject = false) {
		let [x, y] = id.split(',');
		x = parseInt(x, 10);
		y = parseInt(y, 10);
		return returnAsObject ? { x, y } : [x, y];
	}

	static split(TwoDimensionalString) {
		return TwoDimensionalString.split('\n').map((row) => row.split(''));
	}

	reset() {
		this.grid = new Map();
		this.maxX = -Infinity;
		this.minX = Infinity;
		this.maxY = -Infinity;
		this.minY = Infinity;
		return this;
	}

	load(input, parseAs = String) {
		this.reset();
		let grid = input;
		if (typeof input === 'string') {
			grid = Grid.split(input);
		}

		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				this.set(x, y, parseAs(grid[y][x]));
			}
		}
	}

	neighbors(x, y, diagonals = false) {
		const neighboringCells = new Map();
		if (!this.inBounds(x, y)) {
			return neighboringCells;
		}

		const neighborsLookup = [
			['N', [x, y - 1]],
			['W', [x - 1, y]],
			['E', [x + 1, y]],
			['S', [x, y + 1]],
			...(diagonals && [
				['NW', [x - 1, y - 1]],
				['NE', [x + 1, y - 1]],
				['SW', [x - 1, y + 1]],
				['SE', [x + 1, y + 1]],
			]),
		];

		for (let [key, coord] of neighborsLookup) {
			let [cx, cy] = coord;
			if (this.inBounds(cx, cy)) {
				neighboringCells.set(key, { coord, value: this.get(cx, cy) });
			}
		}

		return neighboringCells;
	}

	set(x, y, value) {
		if (typeof x !== 'number' || typeof y !== 'number') {
			throw new Error(`x and y must be numbers, got (${typeof x})${x} and (${typeof y})${y}`);
		}
		if (x < this.minX) this.minX = x;
		if (x > this.maxX) this.maxX = x;
		if (y < this.minY) this.minY = y;
		if (y > this.maxY) this.maxY = y;
		const id = Grid.toId(x, y);
		this.grid.set(id, value);
	}

	get(x, y) {
		const id = Grid.toId(x, y);
		if (!this.grid.has(id)) {
			this.set(x, y, this.defaultFactory(x, y));
		}
		return this.grid.get(id);
	}

	findAll(value, as_coords = true) {
		const found = [];
		for (let [id, cell] of this.grid) {
			const check = value instanceof RegExp ? value.test(cell) : value === cell;
			if (check) {
				found.push([cell, as_coords ? Grid.toCoords(id) : id]);
			}
		}

		return found;
	}

	inBounds(x, y) {
		return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
	}

	clone() {
		const gridClone = new Grid();
		const newMap = new Map();
		for (let [key, val] of this.grid) {
			newMap.set(key, typeof val === 'object' ? JSON.parse(JSON.stringify(val)) : val);
		}
		gridClone.defaultFactory = this.defaultFactory.bind(this);
		gridClone.stringMap = JSON.parse(JSON.stringify(this.stringMap));
		gridClone.grid = newMap;
		gridClone.maxX = this.maxX;
		gridClone.minX = this.minX;
		gridClone.maxY = this.maxY;
		gridClone.minY = this.minY;

		return gridClone;
	}

	toGrid() {
		let grid = [];
		for (let y = this.minY; y <= this.maxY; y++) {
			let row = [];
			for (let x = this.minX; x <= this.maxX; x++) {
				let cell = this.get(x, y);
				row.push(cell);
			}
			grid.push(row);
		}

		return grid;
	}

	sum() {
		let sum = 0;
		for (let value of this.grid.values()) {
			sum += value;
		}

		return sum;
	}

	resize() {
		this.maxX = -Infinity;
		this.minX = Infinity;
		this.maxY = -Infinity;
		this.minY = Infinity;

		for (let [id, value] of this.grid) {
			let [x, y] = Grid.parseCoords(id);
			if (x < this.minX) this.minX = x;
			if (x > this.maxX) this.maxX = x;
			if (y < this.minY) this.minY = y;
			if (y > this.maxY) this.maxY = y;
		}
	}


	toString() {
		let grid = this.toGrid();
		let rows = '';
		for (let y = 0; y < grid.length; y++) {
			let row = '';
			for (let x = 0; x < grid[y].length; x++) {
				let cell = grid[y][x];
				let cellString = cell in this.stringMap ? this.stringMap[cell] : String(cell);
				row += cellString;
			}
			rows += rows.length ? '\n' + row : row;
		}

		return rows;
	}

	*[Symbol.iterator]() {
		yield* this.grid.entries();
	}
}

module.exports = {
	Grid: Grid,
};