function BootUp() {
    InitAll(
        TestMethod1,
        TestMethod2
    );
}

let xTest = 0;

function TestMethod1() {
    setInterval(() => {
        ClearCanvas();
        FillCanvas(1);
        DrawMap(numbers_map[0], 1 + xTest, 5);
        DrawMap(numbers_map[1], 1 + xTest, 11);
    }, 1);
}

function TestMethod2() {
    setInterval(() => {
        xTest = xTest > 80 ? 0 : xTest + 1;
    }, 500);
}
