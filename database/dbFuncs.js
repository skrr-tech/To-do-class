const fs = require('fs');
function AllOccurIndex(string, char) {
    const indices = [];
    let idx = string.indexOf(char);
    while (idx !== -1) {
        indices.push(idx);
        idx = string.indexOf(char, idx + 1);
    }
    return indices;
}

function write(data, path) {
    fs.appendFileSync(path, `\n#${JSON.stringify(data)}`, (err) => {
        if (err) throw err;
    });
}

function readDb(path) {
    let res = [];
    const content = fs.readFileSync(path).toString();
    const indices = AllOccurIndex(content, '#');
    console.log(indices);
    for (let i = 0; i < indices.length; i += 1) {
        if (i === 0) {
            res.push(JSON.parse(content.slice(indices[i] + 1, indices[i + 1])));
        } else if (i === indices.length - 1) {
            res.push(JSON.parse(content.slice(indices[i] + 1)));
        } else {
            res.push(JSON.parse(content.slice(indices[i] + 1, indices[i + 1])));
        }
    }
    // console.log(res);
    return res;
}

module.exports.readDb = readDb;
module.exports.write = write;
