var input = 'qzthpkfp';
var crypto = require("crypto");
var sizeX = 4;
var sizeY = 4;
var bestPath = '';
moveDeeper(md5(input), '', 0, 0);
console.log(bestPath);
console.log(bestPath.length);
function md5(str) {
     return crypto.createHash('md5').update(str).digest('hex').toString('hex');
}
function moveDeeper(str, moves, x, y) {
    if (x == 3 && y == 3) {
        if (moves.length > bestPath.length) {
            bestPath = moves;
        }
        return;
    }
    if (y < sizeY-1 && /[bcdef]/.test(str[1])) {
        moveDeeper(md5(input.concat(moves).concat('D')), moves.concat('D'), x, y+1);
    }
    if (x < sizeX-1 && /[bcdef]/.test(str[3])) {
        moveDeeper(md5(input.concat(moves).concat('R')), moves.concat('R'), x+1, y);
    }
    if (y > 0 && /[bcdef]/.test(str[0])) {
        moveDeeper(md5(input.concat(moves).concat('U')), moves.concat('U'), x, y-1);
    }
    if (x > 0 && /[bcdef]/.test(str[2])) {
        moveDeeper(md5(input.concat(moves).concat('L')), moves.concat('L'), x-1, y);
    }
}
