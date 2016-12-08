var fs = require('fs');
console.log(process.argv[2]);
var rows = fs.readFileSync(process.argv[2]).toString().split('\n');
var code = '';
for (var j = 0; j < rows[0].length; j++) {
    var res = [];
    for (var i = 0; i < rows.length-1; i++) {
        if (res[rows[i][j]]) {
            res[rows[i][j]] = res[rows[i][j]] + 1;
        } else {
            res[rows[i][j]] = 1;
        }
    }
    var highest = 999999;
    var val = '';
    for (var k in res) {
        if (highest > res[k]) {
            highest = res[k];
            val = k;
        }
    }
    code = code.concat(val);
}
console.log(code);
