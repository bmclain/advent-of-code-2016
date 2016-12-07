#!/usr/bin/node
var fs = require('fs');
var crypto = require("crypto");
var rows = fs.readFileSync(process.argv[2]).toString().split("\n");
var arr = [];
var counter = 300000;
var password = '';
while (password.length < 8) {
    var word = rows[0].concat(counter.toString());
    var result = crypto.createHash('md5').update(word).digest('hex').toString('hex');
    if (result.substring(0, 5).indexOf("00000") >= 0) {
        console.log(result);
        console.log('Found it!' + result.substring(5,6));
        console.log(counter);
        password = password.concat(result.substring(5,6));
    }
    counter++;
}
console.log(password);
