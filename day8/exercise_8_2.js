let {data} = require("./load_file");

const diff = (x, y) => (new Set([...x].filter((z) => !y.has(z)))).size;

const result = (data.map(i => i.split(" | ").map(j => j.split(" "))).map(([patterns, digits]) => {
    
    const value0 = patterns.map(m => new Set(m.split("")));
    const value1 = [value0.find(v => v.size === 2), value0.find(v => v.size === 4), value0.find(v => v.size === 3), value0.find(v => v.size === 7), value0.filter(v => v.size === 6), value0.filter(v => v.size === 5)];
    const value2 = [value1[4].find(v => diff(value1[0], v) === 1)];
    const value3 = [value1[4].find(v => diff(v, value1[1]) === 2), value1[5].find(v => diff(v, value2[0]) === 0)];
    const value4 = [value1[4].find(v => diff(v, value3[1]) === 2), value1[5].find(v => diff(v, value3[0]) === 1), value1[5].find(v => diff(v, value3[1]) === 1)];

    return Number(digits.map(m => [value4[0], value1[0], value4[1], value4[2], value1[1], value3[1], value2[0], value1[2], value1[3], value3[0]]
        .map(v => [...v].sort().join(""))
        .findIndex(v => v === m.split("").sort().join(""))
        .toString()
    ).join(""));
}).flat()).reduce((a, b) => a + b, 0);


console.log("SUM OF VALUES: " + result);
