let canvas, context;
let optColor, optName, detailProps, optNormal, optMulti, optMultiCName;

let crosshairPos = { x: 0, y: 0 };

let drawBorder = false;
let borderRects = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
};

let isDrawingRect = false;
let drawRect = false;
let readyToDraw = false;
let point1 = {x: 0, y: 0};
let point2 = {x: 0, y: 0};

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
    clickEvent: false,
    moveEvent: null,
}

let multiMode = false;
let tempObjects = {};

function GenerateDrawArray() {
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

            drawRow[i] = pixelIndex >= 0 ? coordsColor[pixelIndex] : option.autoFillColor === color.dark ? 0 : 1;
        }
        drawArrays[h] = drawRow;
    }

    return drawArrays;
}

function GenerateDrawMap() {
    let texts = '', additional = '';

    if(multiMode) {
        texts = JSON.stringify(tempObjects).replace(/\"/g, '');
    } else {
        let drawArrays = GenerateDrawArray();
        texts = JSON.stringify(drawArrays).replace(/\"/g, '');
        additional = `\n\n// X Axis Offset = ${borderRects.left}\n// Y Axis Offset = ${borderRects.top}\n`;
    }

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

function AssignDrawMapToObject() {
    let keyName = optMultiCName.value;
    const drawMap = GenerateDrawArray();

    if(tempObjects.hasOwnProperty(keyName)) {
        let dupesCount = 1;
        while(tempObjects.hasOwnProperty(keyName)) {
            keyName = optMultiCName.value + dupesCount; 
            dupesCount++;
        }
    }

    Object.assign(tempObjects, { [keyName]: drawMap });

    drawCoords.length = 0;
    coordsColor.length = 0;

    ShowDrawMapObjDetail();
}

function DeleteDrawMapFromObject(keyName) {
    delete tempObjects[keyName];

    ShowDrawMapObjDetail();
}

function ShowDrawMapObjDetail() {
    const optDetailDrawmap = document.getElementById('multi-mode-detail');

    let html = '';
    for(let key in tempObjects) {
        html += `<div id="opt-detail-${key}">`;
        html += `${key} - <button class="btn-remove" onclick="DeleteDrawMapFromObject('${key}')">Remove</button>`;
        html += '</div>';
    }
    optDetailDrawmap.innerHTML = html;
    optDetailDrawmap.scrollTop = optDetailDrawmap.scrollHeight;
}

function ToggleDrawRect(self) {
    isDrawingRect = self.checked;
}

function ToggleMultiMode(self) {
    multiMode = self.checked;
    if(multiMode) {
        optNormal.style.display = 'none';
        optMulti.style.display = 'initial';
    } else {
        optNormal.style.display = 'initial';
        optMulti.style.display = 'none';
    }
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
    } else if (e.key.toLowerCase() === 'r') {
        isDrawingRect = !isDrawingRect;
        document.getElementById('draw-rect').checked = isDrawingRect;
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
    optNormal = document.getElementById('opt-normal-mode');
    optMulti = document.getElementById('opt-multi-mode');
    optMultiCName = document.getElementById('opt-drawmap-name');
    detailProps = document.getElementById('detail-props');

    canvas.addEventListener('mousemove', ControlMouseCrossHair, false);
    canvas.addEventListener('mousedown', (e) => {
        mouseState.click = true;
        mouseState.clickEvent = e;
        if(isDrawingRect) { 
            borderRects = { top: 0, left: 0, right: 0, bottom: 0 };
            drawRect = true;
            readyToDraw = true;
        } else {
            AddPixel(e);
            RemovePixel(e);
        }
    }, false);
    canvas.addEventListener('mouseup', (e) => {
        mouseState.click = false;
        mouseState.clickEvent = e;
        drawRect = false;
        FillDrawingRect();
    }, false);
    canvas.addEventListener('contextmenu', (e) => { e.preventDefault() }, false);
    canvas.oncontextmenu = RemovePixel;

    _InitKeyHandler(ManualKeyDownHandler);

    _Renderer();
    _Update();
}

function _Renderer() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    DrawDrawingCoords();
    DrawBorderRectangle();
    DrawMouseCrossHair();

    requestAnimationFrame(_Renderer);
}

function _Update() {
    optColor.style.backgroundColor = option.color;
    optAutoFill.style.backgroundColor = option.autoFillColor;

    const borderWidth = borderRects.right - borderRects.left + 1;
    const borderHeight = borderRects.bottom - borderRects.top + 1;
    const detailBorderRect = ` Rect:[ T:${borderRects.top} B:${borderRects.bottom} L:${borderRects.left} R:${borderRects.right} | W:${borderWidth} H:${borderHeight} ]`;
    const detailBorderAll = ` Draw:[ T:${borderRects.top} B:${borderRects.bottom} L:${borderRects.left} R:${borderRects.right} | W:${borderWidth} H:${borderHeight} ]`;
    detailProps.innerHTML = `X:${Math.floor(crosshairPos.x/10)} Y:${Math.floor(crosshairPos.y/10)} Mode:${isDrawingRect?'RECTANGLE':'BRUSH'}${(isDrawingRect&&drawRect?detailBorderRect:detailBorderAll)}`;

    AddPixel(mouseState.moveEvent);
    RemovePixel(mouseState.moveEvent);
    DrawRect(mouseState.clickEvent, mouseState.moveEvent);

    setTimeout(_Update, 1);
}
