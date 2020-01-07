function ControlMouseCrossHair(event) {
    const { left, top } = canvas.getBoundingClientRect();
    const mousePos = {
        x: event.clientX - left,
        y: event.clientY - top
    };

    crosshairPos = mousePos;

    AddPixel(event);
    RemovePixel(event);
}

function AddPixel(event) {
    if (!mouseState.click) { return; }

    if (event.which === 1) {
        const { left, top } = canvas.getBoundingClientRect();
        const mousePos = {
            x: Math.floor((event.clientX - left) / 10),
            y: Math.floor((event.clientY - top) / 10),
        };
        const stringPos = JSON.stringify(mousePos);
        const pixelIndex = drawCoords.indexOf(stringPos);

        if(pixelIndex < 0) {
            drawCoords.push(stringPos);
            coordsColor.push(option.color === color.dark ? 0 : 1);
        } else {
            if(coordsColor[pixelIndex] === option.autoFillColorId) {
                drawCoords[pixelIndex] = stringPos;
                coordsColor[pixelIndex] = option.color === color.dark ? 0 : 1;
            }
        }

        CalculateBorderRects();
    }
}

function RemovePixel(event) {
    if (!mouseState.click) { return; }

    if (event.which === 3) {
        const { left, top } = canvas.getBoundingClientRect();
        const mousePos = {
            x: Math.floor((event.clientX - left) / 10),
            y: Math.floor((event.clientY - top) / 10),
        };
        const stringPos = JSON.stringify(mousePos);

        const pixelIndex = drawCoords.indexOf(stringPos);

        if (pixelIndex >= 0) {
            drawCoords.splice(pixelIndex, 1);
            coordsColor.splice(pixelIndex, 1);
        }

        CalculateBorderRects();
    }
}

function CalculateBorderRects() {
    if (drawCoords.length === 0) return;
    const firstPixel = JSON.parse(drawCoords[0]);
    borderRects = {
        top: firstPixel.y,
        left: firstPixel.x,
        right: firstPixel.x,
        bottom: firstPixel.y,
    };

    drawCoords.forEach((pixel) => {
        const { x, y } = JSON.parse(pixel);
        borderRects = {
            top: y < borderRects.top ? y : borderRects.top,
            left: x < borderRects.left ? x : borderRects.left,
            right: x > borderRects.right ? x : borderRects.right,
            bottom: y > borderRects.bottom ? y : borderRects.bottom,
        };
    });
}

function DrawMouseCrossHair() {
    const { x, y } = crosshairPos;

    context.strokeStyle = '#000';
    context.strokeRect(Math.floor(x / 10) * 10, Math.floor(y / 10) * 10, 10, 10);
}

function DrawBorderRectangle() {
    if (drawCoords.length === 0 || !drawBorder) return;
    const { top, left, right, bottom } = borderRects;

    context.strokeStyle = '#000';
    context.strokeRect(Math.floor(left) * 10, Math.floor(top) * 10, Math.floor((right - left + 1)) * 10, Math.floor((bottom - top + 1)) * 10);
}

function DrawDrawingCoords() {
    drawCoords.forEach((pixel, i) => {
        const { x, y } = JSON.parse(pixel);
        DrawPixel(x, y, coordsColor[i]);
    });
}

function DrawPixel(x, y, colorType) {
    let color = (colorType === 0) ? ('#43523d') : ('#c7f0d8');
    let pixel = { w: 10, h: 10 };

    context.fillStyle = color;
    context.fillRect(pixel.w * x, pixel.h * y, pixel.w, pixel.h);
}
