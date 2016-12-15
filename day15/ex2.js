var discs = [2, 7, 10, 2, 9, 0, 0];
var max = [5, 13, 17, 3, 19, 7, 11];
var seconds = 0;
while (1) {
    var fail = false;
    for (var i = 0; i < discs.length; i++) {
        if ((seconds + i + 1 + discs[i]) % max[i] != 0) {
            fail = true;
            break;
        }
    }
    if (fail) {
        seconds++;
    } else {
        console.log(seconds);
        break;
    }
}
