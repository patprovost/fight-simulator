const hRatio = 16;
const vRatio = 9;
const nativeWidth = 1920;
const nativeHeight = 1080;
let canvasWidth, canvasHeight, renderScale, scaledWidth, scaledHeight;

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

const context = canvas.getContext("2d");
if (context === null) { throw new Error(); }

resizeCanvas();
const resizeObserver = new ResizeObserver(resizeCanvas);
resizeObserver.observe(container);

function resizeCanvas() {
    let width = container.clientWidth;
    let height = container.clientHeight;

    if (height * (hRatio / vRatio) >= width) {
        width -= width % hRatio;
        height = width * (vRatio / hRatio);
    }
    else {
        height -= height % vRatio;
        width = height * (hRatio / vRatio);
    }

    canvas.width = width;
    canvas.height = height;
    canvasWidth = width;
    canvasHeight = height;
    renderScale = width / nativeWidth;
}

export { canvasWidth, canvasHeight, renderScale, context };
