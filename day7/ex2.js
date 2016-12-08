var fs = require('fs');
var rows = fs.readFileSync(process.argv[2]).toString().split('\n');
var count = 0;

for (var i = 0; i < rows.length-1; i++) {
    var firstChar = '';
    var secondChar = '';
    var thirdChar = '';
    var fourthChar = '';
    var inBrackets = false;
    var inArr = [];
    var outArr = [];
    for (var j = 0; j < rows[i].length-1; j++) {
        firstChar = rows[i][j];
        secondChar = rows[i][j+1];
        thirdChar = rows[i][j+2];
        if (firstChar == "[" || secondChar == "[" || thirdChar == "[") {
            inBrackets = true;
            continue;
        }
        if (firstChar == "]" || secondChar == "]" || thirdChar == "]") {
            inBrackets = false;
            continue;
        }
        if (firstChar == thirdChar && secondChar != firstChar && thirdChar != secondChar) {
            if (!inBrackets) {
                outArr.push(firstChar.concat(secondChar).concat(thirdChar));
            }
            if (inBrackets) {
                inArr.push(firstChar.concat(secondChar).concat(thirdChar));
            }
        }
    }
    for (var j = 0; j < outArr.length; j++) {
        var escapeLoop = false;
        for (var k = 0; k < inArr.length; k++) {
            if (outArr[j][0] == inArr[k][1] && outArr[j][1] == inArr[k][0] && outArr[j][1] == inArr[k][2] && outArr[j][2] == inArr[k][1]) {
                count++;
                console.log(rows[i]);
                console.log(outArr);
                console.log(inArr);
                console.log('----');
                escapeLoop = true;
                break;
            }
        }
        if (escapeLoop) {
            break;
        }
    }
}

console.log(count);
