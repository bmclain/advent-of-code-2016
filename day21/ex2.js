var fs = require('fs');
var rows = fs.readFileSync(process.argv[2]).toString().split('\n');
var output = 'fbgdceah';
var startLen = 0;

var perms = permutation('', output);
for (var i = 0; i < perms.length; i++) {
    var res = solve(perms[i]);
    if (res == output) {
        console.log('Result: ');
        console.log(perms[i]);
    }
}

function solve(pass) {
    for (var i = 0; i < rows.length-1; i++) {
        if (pass.length != startLen) {
        }
        startLen = pass.length;
        var swap = /swap position (\d+) with position (\d+)/;
        var swapRes = rows[i].match(swap);
        if (swapRes) {
            var first = swapRes[1] < swapRes[2] ? parseInt(swapRes[1]) : parseInt(swapRes[2]);
            var firstChar = pass.charAt(first);
            var second = swapRes[1] < swapRes[2] ? parseInt(swapRes[2]) : parseInt(swapRes[1]);
            var secondChar = pass.charAt(second);
            pass = replaceChar(first, secondChar, pass);
            pass = replaceChar(second, firstChar, pass);
        }
        var swapL = /swap letter ([a-z]) with letter ([a-z])/;
        var swapLRes = rows[i].match(swapL);
        if (swapLRes) {
            for (var j = 0; j < pass.length; j++) {
                if (pass[j] == swapLRes[1]) {
                    pass = pass.substring(0, j) + swapLRes[2] + pass.substring(j+1);
                } else if (pass[j] == swapLRes[2]) {
                    pass = pass.substring(0, j) + swapLRes[1] + pass.substring(j+1);
                }
            }
        }
        var rotate = /rotate (left|right) (\d+) step/;
        var rotateRes = rows[i].match(rotate);
        if (rotateRes) {
            var magnitude = parseInt(rotateRes[2]) % pass.length;
            if (rotateRes[1] == 'right') {
                pass = pass.substring(pass.length-magnitude) + pass.substring(0,pass.length-magnitude);
            } else {
                pass = pass.substring(magnitude) + pass.substring(0,magnitude);
            }
        }
        var rotateL = /rotate based on position of letter ([a-z])/;
        var rotateLRes = rows[i].match(rotateL);
        if (rotateLRes) {
            var index = pass.indexOf(rotateLRes[1]);
            var magnitude = index >= 4 ? index+2 : index+1;
            for (var j = 0; j < magnitude; j++) {
                pass = pass.substring(pass.length-1) + pass.substring(0,pass.length-1);
            }
        }
        var reverse = /reverse positions (\d+) through (\d+)/;
        var reverseRes = rows[i].match(reverse);
        if (reverseRes) {
            var start = parseInt(reverseRes[1]);
            var end = parseInt(reverseRes[2]) + 1;
            pass = pass.substring(0, start) + reverseStr(pass.substring(start, end)) + pass.substring(end);
        }
        var move = /move position (\d+) to position (\d+)/;
        var moveRes = rows[i].match(move);
        if (moveRes) {
            var first = parseInt(moveRes[1]);
            var firstChar = pass.charAt(first);
            var second = parseInt(moveRes[2]);
            pass = pass.substring(0, first) + pass.substring(first+1);
            pass = pass.substring(0, second) + firstChar + pass.substring(second);
        }
    }
    return pass;
}

function replaceChar(index, character, str) {
    return str.substr(0, index) + character + str.substr(index+1);
}

function reverseStr(s){
    return s.split("").reverse().join("");
}

function permutation(start, string) {
    //base case
    if ( string.length == 1 ) {
        return [ start + string ];
    } else {
        var returnResult = [];
        for (var i=0; i < string.length; i++) {
            var result = permutation (string[i], string.substr(0, i) + string.substr(i+1));
            for (var j=0; j<result.length; j++) {
                returnResult.push(start + result[j]);
            }
        }
        return returnResult;
    }
}
