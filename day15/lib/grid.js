const Heap = require('heap');

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

	static split(twoDString) {
		return twoDString.split('\n').map((row) => row.split(''));
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
		const cells = new Map();
		if (!this.inBounds(x, y)) {
			return cells;
		}

		const neighborsLookup = [
			['N', [x, y - 1]],
			['W', [x - 1, y]],
			['E', [x + 1, y]],
			['S', [x, y + 1]],
		];

		if (diagonals) {
			neighborsLookup.push(
				['NW', [x - 1, y - 1]],
				['NE', [x + 1, y - 1]],
				['SW', [x - 1, y + 1]],
				['SE', [x + 1, y + 1]]
			);
		}

		for (let [key, coord] of neighborsLookup) {
			let [cx, cy] = coord;
			if (this.inBounds(cx, cy)) {
				cells.set(key, {
					id: Grid.toId(cx, cy),
					coord,
					value: this.get(cx, cy),
				});
			}
		}

		return cells;
	}

	set(x, y, value) {
		if (typeof x !== 'number' || typeof y !== 'number') {
			throw new Error(`x and y must be numbers`);
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

	clone({ empty = false } = {}) {
		const infinite_grid_clone = new Grid();
		const new_map = new Map();
		if (!empty) {
			for (let [key, val] of this.grid) {
				new_map.set(key, typeof val === 'object' ? JSON.parse(JSON.stringify(val)) : val);
			}
		}
		infinite_grid_clone.defaultFactory = this.defaultFactory.bind(this);
		infinite_grid_clone.stringMap = JSON.parse(JSON.stringify(this.stringMap));
		infinite_grid_clone.grid = new_map;
		infinite_grid_clone.maxX = this.maxX;
		infinite_grid_clone.minX = this.minX;
		infinite_grid_clone.maxY = this.maxY;
		infinite_grid_clone.minY = this.minY;

		return infinite_grid_clone;
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

		for (let id of this.grid.keys()) {
			let [x, y] = Grid.parseCoords(id);
			if (x < this.minX) this.minX = x;
			if (x > this.maxX) this.maxX = x;
			if (y < this.minY) this.minY = y;
			if (y > this.maxY) this.maxY = y;
		}
	}

	buildDijkstrasFrontier(from_x, from_y) {
		const fromId = Grid.toId(from_x, from_y);

		// Sort our frontier by its priority, so we pick nodes to visit that have the lowest cost.
		const frontier = new Heap((node_a, node_b) => node_a.priority - node_b.priority);
		frontier.push({ id: fromId, priority: 0 });

		const cameFrom = new Map([[fromId, null]]);
		const cost = new Map([[fromId, 0]]);
		while (!frontier.empty()) {
			const current = frontier.pop();

			const [currentX, currentY] = Grid.parseCoords(current.id);

			for (let iter of this.neighbors(currentX, currentY).values()) {
				const new_cost = cost.get(current.id) + iter.value;
				if (!cost.has(iter.id) || new_cost < cost.get(iter.id)) {
					cost.set(iter.id, new_cost);
					frontier.push({ id: iter.id, priority: new_cost });
					cameFrom.set(iter.id, current.id);
				}
			}
		}

		return cameFrom;
	}

	getShortestWeightedPath(fromX, fromY, toX, toY, { include_from: includeFrom = true } = {}) {
		const from_id = Grid.toId(fromX, fromY);
		const to_id = Grid.toId(toX, toY);
		const came_from = this.buildDijkstrasFrontier(fromX, fromY);
		let current = to_id;

		let path = [];
		while (current !== from_id) {
			path.push(current);
			current = came_from.get(current);
		}

		if (includeFrom) {
			path.push(from_id);
		}
		path.reverse();
		return path;
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
	Grid,
};
