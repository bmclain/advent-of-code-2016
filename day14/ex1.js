#!/usr/bin/node
var crypto = require("crypto");
var arr = [];
var salt = 'qzyelonm';
//var salt = 'ahsbgdzn';
//var salt = 'abc';
var counter = -1;
var arr = [];
var result;
while (arr.length < 66) {
    counter++;
    result = crypto.createHash('md5').update(salt.concat(counter)).digest('hex').toString('hex');
    if (/(.)\1\1/.test(result)) {
        var triplets = result.match(/(.)\1\1/g);
        var ret = checkHex(triplets[0], counter);
        if (ret) {
            arr.push({three: result, five: ret});
        }
    }
}
console.log(counter);

function checkHex(val, count) {
    for (var i = 1; i <= 1000; i++) {
        var num = i + count;
        var res = crypto.createHash('md5').update(salt.concat(num)).digest('hex').toString('hex');
        var quad = res.match(/(.)\1\1\1\1/g);
        if (quad && quad[0][0] == val[0]) {
            console.log(arr.length + ' @ ' + counter + ' ' + val + ' ' + result + ' ' + num + ' ' + quad + ' ' + res);
            return res;
        }
    }
    return false;
}
