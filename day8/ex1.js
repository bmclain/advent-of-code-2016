var fs = require('fs');
var rows = fs.readFileSync(process.argv[2]).toString().split('\n');
var screen1 = '............................................................';
var screen2 = [];
var mCount = 0;
for (var i = 0; i < 6; i++) {
    screen2[i] = [];
    for (var j = 0; j < 50; j++) {
        screen2[i][j] = '.';
    }
}
for (var i = 0; i < rows.length-1; i++) {
    if (rows[i].indexOf('rect') > -1) {
        var reg = /(\d+)x(\d+)/;
        var x = parseInt(rows[i].match(reg)[1]);
        var y = parseInt(rows[i].match(reg)[2]);
        mCount = mCount + x * y;
        for (var j = 0; j < x; j++) {
            for (var k = 0; k < y; k++) {
                screen2[k][j] = '#';
            }
        }
    } else if (rows[i].indexOf('rotate') > -1) {
        var reg = /(x|y)=(\d+) by (\d+)/;
        if (rows[i].match(reg)[1] == 'y') {
            rotateRow(rows[i]);
        } else {
            rotateColumn(rows[i]);
        }
    }
    printMatrix();
}

function rotateColumn(theRow) {
        var reg = /=(\d+) by (\d+)/;
        var col = parseInt(theRow.match(reg)[1]);
        var num = parseInt(theRow.match(reg)[2]);
        var screen3 = JSON.parse(JSON.stringify(screen2));
        for (var j = 5; j >= 0; j--) {
            if (screen2[j][col] == '#') {
                screen3[j][col] = '.';
                screen3[(j+num)%6][col] = '#';
            }
        }
        screen2 = screen3;

}

function rotateRow(theRow) {
        var reg = /=(\d+) by (\d+)/;
        var row = parseInt(theRow.match(reg)[1]);
        var num = parseInt(theRow.match(reg)[2]);
        var screen3 = JSON.parse(JSON.stringify(screen2));
        for (var j = 59; j >= 0; j--) {
            if (screen2[row][j] == '#') {
                screen3[row][j] = '.';
                screen3[row][(j+num)%50] = '#';
            }
        }
        screen2 = screen3;
}

function printMatrix() {
    var count = 0;
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 50; j++) {
            if (screen2[i][j] == '#') {
                count++;
            }
            process.stdout.write(screen2[i][j]);
        }
        console.log('');
    }
    console.log(count);
}
console.log(mCount);
