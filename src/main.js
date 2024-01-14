import { canvasWidth, canvasHeight, renderScale, context } from "./canvas.js";
import { startGame, stopGame } from "./loop.js";
import Figure from "./figure.js";

let drawList = [];
let figure1, figure2;

startGame(init, update, draw);

function init() {
    document.body.style.backgroundColor = "black";

    figure1 = new Figure(16 * 40, 9 * 78.8, "blue");
    figure1.leftUpperArm.rotate(315);
    figure1.rightUpperArm.rotate(45);
    figure1.leftUpperLeg.rotate(340);
    figure1.rightUpperLeg.rotate(20);
    figure1.animate("RaiseArms");

    figure2 = new Figure(16 * 80, 9 * 78.8, "red");
    figure2.leftUpperArm.rotate(345);
    figure2.rightUpperArm.rotate(15);
    figure2.leftUpperLeg.rotate(340);
    figure2.rightUpperLeg.rotate(20);
    figure2.animate("Squat");

    drawList.push(figure1, figure2);
}

function update() {
    figure1.update();
    figure2.update();
}

function draw() {
    context.save();

    context.fillStyle = "white";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = "black";
    context.fillRect(0, canvasHeight * 0.75, canvasWidth, canvasHeight * 0.005);

    context.translate(canvasWidth / 2 * renderScale, canvasHeight / 2 * renderScale);
    context.scale(renderScale, renderScale);
    context.translate(-canvasWidth / 2, -canvasHeight / 2);

    const drawTable = [[], [], [], []];
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
