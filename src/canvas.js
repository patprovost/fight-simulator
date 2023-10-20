document.body.style.margin = "0";

const container = document.createElement("div");
container.id = "container";
container.style.display = "flex";
container.style.alignItems = "center";
container.style.justifyContent = "center";
container.style.width = "100vw";
container.style.height = "100vh";
document.body.appendChild(container);

const canvas = document.createElement("canvas");
canvas.id = "canvas";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.display = "block";
container.appendChild(canvas);

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

export default canvas;
