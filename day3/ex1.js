#!/usr/bin/node
var fs = require('fs');
var triangles = fs.readFileSync(process.argv[2]).toString().split("\n");
var numValid = 0;

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < triangles.length-1; j = j + 3) {
        var side1 = parseInt(triangles[j].trim().split(" ").clean('')[i]);
        var side2 = parseInt(triangles[j+1].trim().split(" ").clean('')[i]);
        var side3 = parseInt(triangles[j+2].trim().split(" ").clean('')[i]);
        if ((side1 + side2 > side3) && 
            (side1 + side3 > side2) &&
            (side2 + side3 > side1)) {
            numValid++;
            console.log(side1 + " " + side2 + " " + side3);
        } else {
            console.log("---- NOT:");
            console.log(side1 + " " + side2 + " " + side3);
            console.log("---------");
        }
    }
}
console.log(numValid);


