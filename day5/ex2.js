#!/usr/bin/node
var fs = require('fs');
var crypto = require("crypto");
var rows = fs.readFileSync(process.argv[2]).toString().split("\n");
var arr = [];
var counter = 0;
var password = '!!!!!!!!';

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

while (password.indexOf('!') != -1) {
    var word = rows[0].concat(counter.toString());
    var result = crypto.createHash('md5').update(word).digest('hex').toString('hex');
    if (result.substring(0, 5).indexOf("00000") >= 0) {
        console.log(result);
        console.log(counter);
        var index = parseInt(result.substring(5,6));
        var val = result.substring(6,7);
        console.log('Found it! Position' + index + ' ' + val);
        if (index >= 0 && index <= 7 && password[index] == '!') {
            password = password.replaceAt(index, val);
        }
        console.log('Password: ' + password);
    }
    counter++;
}
console.log(password);
