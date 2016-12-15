var fs = require('fs');
var rows = fs.readFileSync(process.argv[2]).toString().split('\n');
var count = 0;
for (var i = 0; i < rows.length-1; i++) {
    count = count + rows[i].length;
    var reg = /(\d+)x(\d+)/g;
    var res = rows[i].match(reg);
    for (var j = 0; j < res.length; j++) {
        var reg = /(\d+)x(\d+)/;
        count = count - (res[j].length+2);
        var res1 = res[j].match(reg);
        count = count + (parseInt(res1[1]) * parseInt(res1[2])) - parseInt(res1[1]);
        console.log(res1);
    }
    console.log(count);
}
console.log(count);
