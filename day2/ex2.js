#!/usr/bin/node
var fs = require('fs');
var rows = fs.readFileSync(process.argv[2]).toString().split("\n");
var x = 0;
var y = 2;
var keypad = [
    [0, 0, 1, 0, 0],
    [0, 2, 3, 4, 0],
    [5, 6, 7, 8, 9],
    [0, 'A', 'B', 'C', 0],
    [0, 0, 'D', 0, 0]
];
var code = [];
for (var i = 0; i < rows.length-1; i++) {
    for (var j = 0; j < rows[i].length; j++) {
        if (rows[i][j] == 'U' && y > 0 && keypad[y-1][x] != 0) {
            y--;
        } else if (rows[i][j] == 'D' && y < 4 && keypad[y+1][x] != 0) {
            y++;
        } else if (rows[i][j] == 'L' && x > 0 && keypad[y][x-1] != 0) {
            x--;
        } else if (rows[i][j] == 'R' && x < 4 && keypad[y][x+1] != 0) {
            x++;
        }
    }
    code.push(keypad[y][x]);
}
console.log(code);
