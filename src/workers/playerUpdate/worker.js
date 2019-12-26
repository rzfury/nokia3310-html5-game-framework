let xPos = 0;

setInterval(() => {
    xPos = xPos > 80 ? 0 : xPos + 0.025;

    postMessage([xPos]);
}, 500);

onmessage = (event) => {
    xPos = event.data[0].toString();
};
