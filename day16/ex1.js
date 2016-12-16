var input = "00101000101111010";
var diskSize = 272;
while (input.length <= diskSize) {
    input = input.concat('0').concat(flipBits(input.split("").reverse().join("")));
}
console.log(checkSum(input.substring(0, diskSize)));
function flipBits(str) {
    return str.replace(/[01]/g, function(n) {return 1-n;});
}
function checkSum(str) {
    var newStr = '';
    for (var i = 0; i < str.length-1; i = i+2) {
        newStr = newStr.concat(str[i] == str[i+1] ? '1': '0');
    }
    return newStr.length % 2 > 0 ? newStr : checkSum(newStr);
}
