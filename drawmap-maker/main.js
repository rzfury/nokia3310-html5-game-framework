let canvas, context;
let optColor, optName;

let crosshairPos = { x: 0, y: 0 };

let drawBorder = false;
let borderRects = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
};

let drawCoords = [];
let coordsColor = [];

let color = {
    dark: '#43523d',
    light: '#c7f0d8',
}

let option = {
    color: color.dark,
    autoFillColor: color.light,
    autoFillColorId: 1
}

let mouseState = {
    click: false,
}

function GenerateDrawMap() {
    const drawWidth = borderRects.right - borderRects.left + 1;
    const drawHeight = borderRects.bottom - borderRects.top + 1;

    let drawArrays = new Array(drawHeight);
    for (let h = 0; h < drawArrays.length; h++) {
        const drawRow = new Array(drawWidth);
        for (let i = 0; i < drawRow.length; i++) {
            const stringPos = JSON.stringify({
                x: borderRects.left + i,
                y: borderRects.top + h,
            });
            const pixelIndex = drawCoords.indexOf(stringPos);

            drawRow[i] = pixelIndex >= 0 ? coordsColor[pixelIndex] : option.autoFillColor;
        }
        drawArrays[h] = drawRow;
    }

    console.log(drawArrays);

    const texts = JSON.stringify(drawArrays).replace(/\"/g, '');
    const additional = `\n\n// X Axis Offset = ${borderRects.left}\n// Y Axis Offset = ${borderRects.top}\n`;

    const textFileAsBlob = new Blob([`const ${optName.value} = ${texts};${additional}`], { type: 'text/plain' });
    const downloadLink = document.createElement("a");
    downloadLink.download = optName.value + '.js';
    if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = () => downloadLink.parentNode.removeChild(downloadLink);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

function ShowDrawBorder(self) {
    drawBorder = self.checked;
}

function SwitchDrawingColor() {
    option.color = (option.color === color.dark ? color.light : color.dark);
    option.autoFillColor = (option.autoFillColor === color.dark ? color.light : color.dark);
    option.autoFillColorId = (option.color === color.dark ? 1 : 0);
}

function ManualKeyDownHandler(e) {
    if (e.key.toLowerCase() === 'x') {
        SwitchDrawingColor();
    }
}

function EditName(self) {
    document.getElementById('opt-filename').innerHTML = self.value;
}

function _Init() {
    canvas = document.getElementById('drawmap-canvas');
    context = canvas.getContext('2d');
    optColor = document.getElementById('opt-color-draw');
    optAutoFill = document.getElementById('opt-color-autofill');
    optName = document.getElementById('opt-name');

    canvas.addEventListener('mousemove', ControlMouseCrossHair, false);
    canvas.addEventListener('mousedown', (e) => { mouseState = { click: true } }, false);
    canvas.addEventListener('mouseup', (e) => { mouseState = { click: false } }, false);
    canvas.addEventListener('contextmenu', (e) => { e.preventDefault() }, false);
    canvas.oncontextmenu = RemovePixel;

    _InitKeyHandler(ManualKeyDownHandler);

    _Renderer();
    _UpdateOption();
}

function _Renderer() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    DrawDrawingCoords();
    DrawBorderRectangle();
    DrawMouseCrossHair();

    requestAnimationFrame(_Renderer);
}

function _UpdateOption() {
    optColor.style.backgroundColor = option.color;
    optAutoFill.style.backgroundColor = option.autoFillColor;

    setTimeout(_UpdateOption, 1);
}
