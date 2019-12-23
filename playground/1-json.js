 let fs = require('fs');
 let file = fs.readFileSync('1-json.json');
 let json = JSON.parse(file)
// let json = JSON.parse(file.toString())
json.name = "ilik2";
fs.writeFileSync('1-json.json', JSON.stringify(json));