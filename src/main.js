import { canvasWidth, canvasHeight, renderScale, context } from "./canvas.js";
import { startGame, stopGame } from "./loop.js";
import Figure from "./figure.js";

let figure1, figure2;

startGame(init, update, draw);

function init() {
    document.body.style.backgroundColor = "black";

    figure1 = new Figure(16 * 40, 9 * 60, "blue");
    figure1.leftUpperLeg.rotate(0.15);
    figure1.rightUpperLeg.rotate(-0.15);
    figure1.leftUpperArm.rotate(0.15);
    figure1.rightUpperArm.rotate(-0.15);

    figure2 = new Figure(16 * 80, 9 * 60, "red");
    figure2.leftUpperLeg.rotate(0.15);
    figure2.rightUpperLeg.rotate(-0.15);
    figure2.leftUpperArm.rotate(0.15);
    figure2.rightUpperArm.rotate(-0.15);
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

    figure1.draw();
    figure2.draw();

    context.restore();
}
