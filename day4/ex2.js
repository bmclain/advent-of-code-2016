#!/usr/bin/node
var fs = require('fs');
var rows = fs.readFileSync(process.argv[2]).toString().split("\n");
var arr = [];

function compare(a,b) {
  if (a.count < b.count){
    return 1;
  } else if (a.count > b.count) {
    return -1;
  } else {
    if (a.val > b.val) {
        return 1;
    } else if (a.val < b.val) {
        return -1;
    }
  }
  return 0;
}
var sector_total = 0;
for (var i = 0; i < rows.length-1; i++) {
    var row = rows[i].split('[');
    var numPattern = /\d+/g;
    var checksumPattern = /\[(.*)\]/g;
    var id = parseInt(rows[i].match(numPattern)[0]);
    var val = row[0].replace(/\d/g, "");
    var newString = '';
    for (var j = 0; j < val.length; j++) {
        if (val[j] == '-') {
            newString = newString.concat(' ');
            continue;
        }
        var remainder = id % 26;
        var tmp = remainder + val[j].charCodeAt(0);
        if (tmp > 122) {
            tmp = tmp - 26;
        }
        var v = String.fromCharCode(tmp);
        newString = newString.concat(v);
    }
    console.log(val + '|' + newString + "|" + id);
}
console.log(sector_total);

function srt(desc) {
  return function(a,b){
   return desc ? ~~(a.count < b.count) : ~~(a.count > b.count);
  };
}
