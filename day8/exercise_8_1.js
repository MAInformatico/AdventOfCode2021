let {data} = require("./load_file");


const result = data.reduce((p, c) => p + c.split(" | ")[1].split(" ").filter(({ length: l }) => ([2, 3, 4, 7].includes(l))).length, 0);

console.log("Total: " + result);
