/**
 * Draw a pixel to the canvas
 * 
 * @param {number} x X Coord
 * @param {number} y Y Coord
 * @param {0 | 1} colorType Color Type (0 = Dark, 1 = Light)
 */
function DrawPixel(x, y, colorType) {
    const fixedX = Math.floor(x);
    const fixedY = Math.floor(y);

    let color = (Invert(colorType) === 1) ? ('#43523d') : ('#c7f0d8');
    let pixel = GetPixelSize();

    context.fillStyle = color;
    context.fillRect(pixel.w * fixedX, pixel.h * fixedY, pixel.w, pixel.h);
}

/**
 * Fill the entire canvas with color type
 * 
 * @param {0 | 1} colorType Color Type (0 = Dark, 1 = Light)
 */
function FillCanvas(colorType) {
    let color = (Invert(colorType) === 1) ? ('#43523d') : ('#c7f0d8');
    let dim = GetCanvasSize();

    context.fillStyle = color;
    context.fillRect(0, 0, dim.w, dim.h);
}

/**
 * Clear the entire canvas
 */
function ClearCanvas() {
    const { w, h } = GetCanvasSize();
    context.clearRect(0, 0, w, h);
}
