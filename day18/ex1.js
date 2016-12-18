var arr = ['.^^.^.^^^^'];
for (var i = 1; i < 40; i++) {
    var newRow = '';
    for (var j = 0; j < arr[i-1].length; j++) {
        var left = j == 0 ? '.' : arr[i-1][j-1];
        var center = arr[i-1][j];
        var right = j == arr[i-1].length-1 ? '.' : arr[i-1][j+1];
        if (left == '^' && center == '^' && right == '.') {
            newRow = newRow.concat('^');
        } else if (center == '^' && right == '^' && left == '.') {
            newRow = newRow.concat('^');
        } else if (left == '^' && center == '.' && right == '.') {
            newRow = newRow.concat('^');
        } else if (right == '^' && center == '.' && left == '.') {
            newRow = newRow.concat('^');
        } else {
            newRow = newRow.concat('.');
        }
    }
    arr[i] = newRow;
}
var totalSafe = 0;
for (var i = 0; i < arr.length; i++) {
    totalSafe = totalSafe + (arr[i].match(/\./g) || []).length;
}
console.log(totalSafe);
