/**
 * It just Invert 0 and 1
 * 
 * @param {0 | 1} v Value (0 or 1)
 */
function Invert(v = 0) {
    if(invertColor) return v;
    else return Math.abs(v - 1);
}

/**
 * Get the canvas size
 * 
 * @returns {{w: number, h: number}} Canvas Size
 */
function GetCanvasSize() {
    return {
        w: canvas.clientWidth,
        h: canvas.clientHeight,
    }
}


/**
 * Get the single pixel size in canvas
 * 
 * @returns {{w: number, h: number}} Pixel Size
 */
function GetPixelSize() {
    let dim = GetCanvasSize();
    return {
        w: dim.w / gameDimension.w,
        h: dim.h / gameDimension.h,
    }
}
