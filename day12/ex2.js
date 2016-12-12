var fs = require('fs');
var rows = fs.readFileSync(process.argv[2]).toString().split('\n');
var arr = [];
arr['a'] = 0;
arr['b'] = 0;
arr['c'] = 1;
arr['d'] = 0;

for (var i = 0; i < rows.length-1; i++) {
    var cpy = /cpy ([a-d0-9]+) (\w)/;
    var inc = /inc (\w)/;
    var dec = /dec (\w)/;
    var jnz = /jnz (\w) ([-a-d0-9]+)/;
    var cpyres = rows[i].match(cpy);
    var incres = rows[i].match(inc);
    var decres = rows[i].match(dec);
    var jnzres = rows[i].match(jnz);
    if (cpyres) {
        arr[cpyres[2]] = isLetter(cpyres[1]) ? arr[cpyres[1]] : parseInt(cpyres[1]);
    } else if (incres) {
        arr[incres[1]]++;
    } else if (decres) {
        arr[decres[1]]--;
    } else if (jnzres && ((isLetter(jnzres[1]) && arr[jnzres[1]] != 0) ||  (!isLetter(jnzres[1]) && parseInt(jnzres[1]) != 0))) {
        i = i + (jnzres[2]-1);
    }
}
console.log(arr['a']);

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
