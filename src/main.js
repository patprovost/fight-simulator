import { canvasWidth, canvasHeight, renderScale, context } from "./canvas.js";
import { startGame, stopGame } from "./loop.js";
import Figure from "./figure.js";

let drawList = [];
let figure1, figure2;

startGame(init, update, draw);

function init() {
    document.body.style.backgroundColor = "black";

    figure1 = new Figure(16 * 40, 9 * 60, "blue");
    figure1.leftUpperLeg.rotate(45);
    figure1.rightUpperLeg.rotate(-45);
    figure1.leftUpperArm.rotate(45);
    figure1.rightUpperArm.rotate(-45);

    figure2 = new Figure(16 * 80, 9 * 60, "red");
    figure2.leftUpperLeg.rotate(45);
    figure2.rightUpperLeg.rotate(-45);
    figure2.leftUpperArm.rotate(45);
    figure2.rightUpperArm.rotate(-45);

    drawList.push(figure1, figure2);
}

function update() {

}

function draw() {
    context.save();

    context.fillStyle = "white";
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    context.translate(canvasWidth / 2 * renderScale, canvasHeight / 2 * renderScale);
    context.scale(renderScale, renderScale);
    context.translate(-canvasWidth / 2, -canvasHeight / 2);

    const drawTable = [[], [], []];
    for (let i = 0; i < drawList.length; i++) {
        drawTable[drawList[i].z].push(drawList[i]);
    }
    for (let i = drawTable.length - 1; i >= 0; i--) {
        for (let j = 0; j < drawTable[i].length; j++) {
            drawTable[i][j].draw();
        }
    }

    context.restore();
}
