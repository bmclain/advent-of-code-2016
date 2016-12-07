#!/usr/bin/node
var fs = require('fs');
var directions = fs.readFileSync(process.argv[2]).toString().split(", ");
var currentDirection = 'N';
var x = 0;
var y = 0;
var visited = [];
visited.push("0 0");
for (var i = 0; i < directions.length; i++) {
    direction = directions[i][0];
    magnitude = parseInt(directions[i].substring(1));
    if (direction == 'R') {
        if (currentDirection == 'N') {
            x = x + magnitude;
            currentDirection = 'E';
        } else if (currentDirection == 'E') {
            y = y - magnitude;
            currentDirection = 'S';
        } else if (currentDirection == 'S') {
            x = x - magnitude;
            currentDirection = 'W';
        } else if (currentDirection == 'W') {
            y = y + magnitude;
            currentDirection = 'N';
        }
    } else if (direction == 'L') {
        if (currentDirection == 'N') {
            x = x - magnitude;
            currentDirection = 'W';
        } else if (currentDirection == 'E') {
            y = y + magnitude;
            currentDirection = 'N';
        } else if (currentDirection == 'S') {
            x = x + magnitude;
            currentDirection = 'E';
        } else if (currentDirection == 'W') {
            y = y - magnitude;
            currentDirection = 'S';
        }
    }
    var idx = x.toString() + " " + y.toString();
    if (visited[idx]) {
        console.log('Visited twice: ' + x + ', ' + y);
        break;
    } else {
        visited[idx] = 1;
    }
    console.log('D: ' + direction + ' CD: ' + currentDirection + ' M: ' + magnitude + " " + x + ", " + y);
}
