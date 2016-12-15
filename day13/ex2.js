var input = 1352;
var xSize = 100;
var ySize = 100;
var maze = [];
var xGoal = 39;
var yGoal = 31;
var coords = [];

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

function isWall(y, x) {
        var val = dec2bin((x*x + 3*x + 2*x*y + y + y*y) + input);
        var numOnes = val.split('1').length-1;
        if (numOnes % 2) {
            return true;
        } else {
            return false;
        }

}

function printMaze(theMaze) {
    for (var x = 0; x < xSize; x++) {
        for (var y = 0; y < ySize; y++) {
            if (x == 1 && y == 1) {
                process.stdout.write('X');
            } else if (x == xGoal && y == yGoal) {
                process.stdout.write('T');
            } else {
                process.stdout.write(theMaze[x][y]);
            }
        }
        console.log('');
    }
}

function main() {
    for (var x = 0; x < xSize; x++) {
        maze[x] = [];
        for (var y = 0; y < ySize; y++) {
            maze[x][y] = isWall(x, y) ? '#' : '.';
        }
    }
    printMaze(maze);
    solveMaze(1, 1, maze, 0);
    var count = 0;
    for (var i in coords) {
        count++;
    }
    console.log('Num Coords: ' + count);
}

function solveMaze(xCur, yCur, theMaze, steps) {
    var arr = JSON.parse(JSON.stringify(theMaze));
    var xNew = xCur;
    var yNew = yCur;
    //console.log('-----------------------');
    //printMaze(arr);
    if (!coords[xCur + ' ' + yCur]) {
        coords[xCur + ' ' + yCur] = true;
    }
    if (steps == 50) {
        return;
    }
    var newSteps = steps+1;
    if ((xCur+1) < xSize && arr[xCur+1][yCur] != '#' && arr[xCur+1][yCur] != 'X') {
        arr[xCur+1][yCur] = 'X';
        xNew++;
        solveMaze(xNew, yNew, arr, newSteps);
        xNew--;
        arr[xCur+1][yCur] = '.';
    }
    if ((yCur+1) < ySize && arr[xCur][yCur+1] != '#' && arr[xCur][yCur+1] != 'X') {
        arr[xCur][yCur+1] = 'X';    
        yNew++;
        solveMaze(xNew, yNew, arr, newSteps);
        yNew--;
        arr[xCur][yCur+1] = '.';    
    }
    if ((xCur-1) >= 0 && arr[xCur-1][yCur] != '#' && arr[xCur-1][yCur] != 'X') {
        arr[xCur-1][yCur] = 'X';
        xNew--;
        solveMaze(xNew, yNew, arr, newSteps);
        xNew++;
        arr[xCur-1][yCur] = '.';
    }
    if ((yCur-1) >= 0 && arr[xCur][yCur-1] != '#' && arr[xCur][yCur-1] != 'X') {
        arr[xCur][yCur-1] = 'X';
        yNew--;
        solveMaze(xNew, yNew, arr, newSteps);
        yNew++;
        arr[xCur][yCur-1] = '.';
    }
}

main();
