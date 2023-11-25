import { canvas, context } from "./canvas.js";
import { startGame, stopGame } from "./loop.js";
import Figure from "./figure.js";

let figure1, figure2;

startGame(init, update, draw);

function init() {
    document.body.style.backgroundColor = "black";

    figure1 = new Figure(canvas.width / 3, canvas.height / 2, "blue");
    figure1.leftUpperLeg.rotate(0.15);
    figure1.rightUpperLeg.rotate(-0.15);
    figure1.leftUpperArm.rotate(0.15);
    figure1.rightUpperArm.rotate(-0.15);

    figure2 = new Figure(canvas.width / 1.5, canvas.height / 2, "red");
    figure2.leftUpperLeg.rotate(0.15);
    figure2.rightUpperLeg.rotate(-0.15);
    figure2.leftUpperArm.rotate(0.15);
    figure2.rightUpperArm.rotate(-0.15);
}

function update() {

}

function draw() {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    figure1.draw();
    figure2.draw();
}
