class Grid{
    constructor({ defaultFactory = (x,y) => 0, stringMap = {}, load } = {}){
        this.defaultFactory = defaultFactory.bind(this);
        this.stringMap = stringMap;
        this.grid = new Map();
        this.maxX = -Infinity;
        this.minX = Infinity;
        this.maxY = -Infinity;
        this.minY = Infinity;

        if(load) {
            this.load(load);
        }
    }

    static toId(x,y){
        return `${x},${y}`;
    }

    static parseCoords(id, return_as_object = false){
        let [x,y] = id.split(',');
        x = parseInt(x,10);
        y = parseInt(y,10);
        return return_as_object ? {x,y} : [x,y];
    }

    static split(TwoDString){
        return TwoDString.split('\n').map((row) => row.split(''));
    }


    reset(){
        this.grid = new Map();
		this.maxX = -Infinity;
		this.minX = Infinity;
		this.maxY = -Infinity;
		this.minY = Infinity;
		return this;
    }

load(input) {
		this.reset();
		let grid = input;
		if (typeof input === 'string') {
			grid = Grid.split(input);
		}

		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				this.set(x, y, grid[y][x]);
			}
		}
	}

	neighbors(x, y) {
		const neighboringCells = new Map();
		if (!this.inBounds(x, y)) {
			return neighboringCells;
		}

		const neighbors_lookup = [
			['N', [x, y - 1]],
			['W', [x - 1, y]],
			['E', [x + 1, y]],
			['S', [x, y + 1]],
		];

		for (let [key, coord] of neighbors_lookup) {
			let [cx, cy] = coord;
			if (this.inBounds(cx, cy)) {
				neighboringCells.set(key, { coord, value: this.get(cx, cy) });
			}
		}

		return neighboringCells;
	}

	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @param {any} value
	 */
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
				found.push([cell, as_coords ? Grid.parseCoords(id) : id]);
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

	toString() {
		let grid = this.toGrid();
		let rows = '';
		for (let y = 0; y < grid.length; y++) {
			let row = '';
			for (let x = 0; x < grid[y].length; x++) {
				let cell = grid[y][x];
				let cell_string = cell in this.stringMap ? this.stringMap[cell] : String(cell);
				row += cell_string;
			}
			rows += rows.length ? '\n' + row : row;
		}

		return rows;
	}

	*[Symbol.iterator]() {
		yield* this.grid.entries();
	}

}


const getLowPoints = (grid) => {
	const lows = [];
	for (let [id, cell] of grid) {
		const [x, y] = Grid.parseCoords(id);
		const neighbors = grid.neighbors(x, y);

		if ([...neighbors.values()].every(({ value }) => value > cell)) {
			lows.push({ x, y, cell });
		}
	}

	return lows;
};

const getBasins = (grid) => {
	const lows = getLowPoints(grid);
	const basins = [];
	for (let point of lows) {
		let queue = [point];
		let visited = new Set();
		visited.add(Grid.toId(point.x, point.y));

		do {
			let cell = queue.shift();
			let n = grid.neighbors(cell.x, cell.y);
			for (let { coord, value } of n.values()) {
				let id = Grid.toId(...coord);
				if (value < 9 && !visited.has(id)) {
					let [x, y] = coord;
					queue.push(id, { x, y, value });
					visited.add(id);
				}
			}
		} while (queue.length > 0);

		basins.push(visited);
	}
	
	basins.sort((a, b) => b.size - a.size);

	return basins;
};


module.exports = {
    Grid,
	getLowPoints,
	getBasins
}