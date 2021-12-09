const path = require('path');
const fs = require('fs');

const data = String(fs.readFileSync(path.join(__dirname, "input_exercise8.txt"))).trim().split(require("os").EOL);
	
module.exports = {
	data
};
