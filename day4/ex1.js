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
    var id = rows[i].match(numPattern)[0];
    var checksum = rows[i].match(checksumPattern)[0];
    checksum = checksum.substring(1, checksum.length-1);
    var counter = [];
    var c_arr = [];
    var val = row[0].replace(/\W/g, "");
    val = val.replace(/\d/g, "");
    for (var j = 0; j < val.length; j++) {
        if (counter[val[j]]) {
            counter[val[j]].count = counter[val[j]].count + 1;    
        } else {    
            counter[val[j]] = { val: val[j], count: 1 };
        }
    }
    for (key in counter) {
        c_arr.push(counter[key]);
    }
    c_arr.sort(compare);
    console.log(c_arr);
    var res = c_arr[0].val + '' + c_arr[1].val + '' + c_arr[2].val + '' + c_arr[3].val + '' + c_arr[4].val;
    console.log(res);
    if (checksum == res) { 
        console.log("Matched: " + checksum + "|" + res);
        sector_total = sector_total + parseInt(id);
    } else {
        console.log("No match: " + checksum + "|" + res);
    }
}
console.log(sector_total);

function srt(desc) {
  return function(a,b){
   return desc ? ~~(a.count < b.count) : ~~(a.count > b.count);
  };
}
