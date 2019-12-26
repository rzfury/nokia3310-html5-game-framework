let playerUpdateWorker;

function Initialize() {

    playerUpdateWorker = new Worker('src/workers/playerUpdater/worker.js')

    // playerUpdateWorker = CreateWorker('src/workers/playerUpdater.js');

    playerUpdateWorker.onmessage = (event) => {
        xTest = event.data[0];
        console.log('Message');
    }
    playerUpdateWorker.onerror = (event) => {
        console.log('Error', event);
    }
}

function Update() {
    // Run on setInterval with timeout set to 1
    // For any update method

    // playerUpdateWorker.postMessage('80');

    TestMethod2();
}

function Renderer() {
    // Run on requestAnimationFrame
    // For DrawPixel, DrawMap, etc

    TestMethod1();
}

// Custom Block

let xTest = 0;
let xTest2 = 0;

function TestMethod1() {
    DrawPixel(xTest2, 1, 0);
    DrawMap(numbers_map[0], 1 + xTest, 5);
    DrawMap(numbers_map[1], 1 + xTest, 11);
}

function TestMethod2() {
    // xTest = xTest > 80 ? 0 : xTest + 0.025;
    xTest2 = xTest2 > 80 ? 0 : xTest2 + 0.1;
}

// Handle Worker Message


