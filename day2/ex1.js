#!/usr/bin/node
var fs = require('fs');
var rows = fs.readFileSync(process.argv[2]).toString().split("\n");
var x = 1;
var y = 1;
var keypad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
var code = [];
for (var i = 0; i < rows.length-1; i++) {
    for (var j = 0; j < rows[i].length; j++) {
        if (rows[i][j] == 'U' && y > 0) {
            y--;
        } else if (rows[i][j] == 'D' && y < 2) {
            y++;
        } else if (rows[i][j] == 'L' && x > 0) {
            x--;
        } else if (rows[i][j] == 'R' && x < 2) {
            x++;
        }
    }
    code.push(keypad[y][x]);
}
console.log(code);
