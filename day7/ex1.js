var fs = require('fs');
var rows = fs.readFileSync(process.argv[2]).toString().split('\n');
var count = 0;
for (var i = 0; i < rows.length-1; i++) {
    var firstChar = '';
    var secondChar = '';
    var thirdChar = '';
    var fourthChar = '';
    var inBrackets = false;
    var tmpCount = 0;
    for (var j = 0; j < rows[i].length-3; j++) {
        firstChar = rows[i][j];
        secondChar = rows[i][j+1];
        thirdChar = rows[i][j+2];
        fourthChar = rows[i][j+3];
        if (firstChar == "[" || secondChar == "[" || thirdChar == "[" || fourthChar == "[") {
            inBrackets = true;
        }
        if (firstChar == fourthChar && secondChar == thirdChar && firstChar != secondChar) {
            if (!inBrackets) {
                console.log('GOOD');
                tmpCount = 1;
            }
            console.log(rows[i]);
            console.log(firstChar);
            console.log(secondChar);
            console.log(thirdChar);
            console.log(fourthChar);
            console.log('-----');
            if (inBrackets) {
                tmpCount = 0;
                break;
            }
        }
        if (firstChar == "]") {
            inBrackets = false;
        }

    }
    count = count + tmpCount;
}
console.log(count);
