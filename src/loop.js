const updatesPerSec = 60;
const msPerUpdate = 1000 / updatesPerSec;
let updateGame, drawFrame, gameIsRunning, lagTime, previousTime, frameId;

function loopOnce() {
    if (gameIsRunning) {
        frameId = requestAnimationFrame(loopOnce);
        drawFrame();

        const currentTime = performance.now();
        const elapsedTime = currentTime - previousTime;
        previousTime = currentTime;
        lagTime += elapsedTime;

        while ((lagTime >= msPerUpdate) && gameIsRunning) {
            updateGame();
            lagTime -= msPerUpdate;
        }
    }
}

function startGame(init, update, draw) {
    init();
    updateGame = update;
    drawFrame = draw;
    gameIsRunning = true;
    lagTime = 0;
    previousTime = performance.now();
    frameId = requestAnimationFrame(loopOnce);
}

function stopGame() {
    gameIsRunning = false;
    cancelAnimationFrame(frameId);
}

export { startGame, stopGame };
