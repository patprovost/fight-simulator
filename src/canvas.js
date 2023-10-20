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
canvas.style.display = "block";
container.appendChild(canvas);

resizeCanvas();
const resizeObserver = new ResizeObserver(resizeCanvas);
resizeObserver.observe(container);

function resizeCanvas() {
    let width = container.clientWidth;
    let height = container.clientHeight;

    if (height * (16 / 9) >= width) {
        width -= width % 16;
        height = width * (9 / 16);
    }
    else {
        height -= height % 9;
        width = height * (16 / 9);
    }

    canvas.width = width;
    canvas.height = height;
}

export default canvas;
