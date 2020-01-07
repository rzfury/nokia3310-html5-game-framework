/**
 * This initialize `canvas` and it's `context` and also
 * execute all given methods.
 * 
 * @param  {...Function} methods 
 */
function _InitAll(...methods) {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');

    methods.forEach((method) => {
        method();
    });
}

function _Initialize() {
    Initialize();
}

function _InitUpdate() {
    setInterval(() => {
        Update();
    }, 1);
}

function _InitRenderer() {
    ClearCanvas();
    FillCanvas(1);

    Renderer();
    
    requestAnimationFrame(_InitRenderer);
}
