/**
 * This initialize `canvas` and it's `context` and also
 * execute all given methods.
 * 
 * @param  {...Function} methods 
 */
function InitAll(...methods) {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');

    methods.forEach((method) => {
        method();
    });
}