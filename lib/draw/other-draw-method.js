/**
 * Draw a Drawing Map to Canvas
 * 
 * @param {Array.<Array.<number>>} map Drawing Map
 * @param {number} x X Coord
 * @param {number} y Y Coord
 * @param {number} offsetX X Coord Offset
 * @param {number} offsetY Y Coord Offset
 */
function DrawMap(map, x, y, offsetX = 0, offsetY = 0) {
    map.forEach((row, yI) => {
        row.forEach((v, xI) => {
            DrawPixel(x + xI + offsetX, y + yI + offsetY, v);
        });
    });
}

function DrawNumbers(x, y, number) {
    let numIndexex = number.split('').map((v) => parseInt(v));
    let numLength = numIndexex.length;
    
    numIndexex.forEach((num, a) => {
        DrawMap(numbers[`num${num}`], x + (a * 4) - (numLength * 4), y);
    });
}
