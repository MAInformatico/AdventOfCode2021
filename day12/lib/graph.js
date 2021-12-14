function isLowerCase(str) {
	return str === str.toLowerCase();
}

class Node {
	constructor(id) {
		this.id = id;
		this.connections = new Set();
	}
}

class Graph {

	constructor(connections) {
		const nodeIds = new Set(connections.flat());

		this.nodes = new Map();
		for (let id of nodeIds) {
			this.nodes.set(id, new Node(id));
		}

		this.buildEdges(connections);
	}

	static addSmallCave(path, newPath) {
		let smallCaves = new Set();

		const length = newPath ? path.length - 1 : path.length;
		for (let i = 0; i < length; i++) {
			const cave = path[i];
			if (!isLowerCase(cave) || cave === 'start') {
				continue;
			}

			if (smallCaves.has(cave)) {
				return false;
			}

			smallCaves.add(cave);
		}

		return true;
	}

	buildEdges(connections) {
		for (let [a, b] of connections) {
			const nodeX = this.nodes.get(a);
			const nodeY = this.nodes.get(b);

			nodeX.connections.add(b);
			nodeY.connections.add(a);
		}
	}

	getPaths(start, end, { visitSmallCaveAgain = false } = {}) {
		const finished = [];
		const paths = [[start]];
		while (paths.length > 0) {
			let pending = [];
			for (let i = 0; i < paths.length; i++) {
				const path = paths[i];

				const tailId = path[path.length - 1];
				if (tailId === end) {
					finished.push(path);
					paths.splice(i, 1);
					i--;
					continue;
				}

				const tail = this.nodes.get(tailId);
				let deadEnd = true;
				for (let connection of tail.connections) {
					if (isLowerCase(connection) && path.includes(connection)) {
						if ( visitSmallCaveAgain && connection !== start && connection !== end && Graph.addSmallCave(path, !deadEnd)){

						}
                        else {

							continue;
						}
					}

					if (deadEnd) {
						deadEnd = false;
						path.push(connection);

					}
                    else {

						let newPath = path.slice(0, -1);

						newPath.push(connection);
						pending.push(newPath);
					}
				}

				if (deadEnd) {

					paths.splice(i, 1);
					i--;
				}
			}

			paths.push(...pending);
		}

		return finished;
	}
}

module.exports = { Node, Graph };