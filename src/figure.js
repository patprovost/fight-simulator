import { context } from "./canvas.js";

const thickness = 14;
const radius = thickness / 2;
const lowerBodyLength = 46;
const upperBodyLength = 46;
const neckLength = 47;
const headRadius = 20;
const upperArmLength = 52;
const lowerArmLength = 54;
const upperLegLength = 64;
const lowerLegLength = 64;

class Figure {
    constructor(x, y, fillStyle) {
        this.x = x;
        this.y = y;
        this.z = 1;
        this.angle = 0;
        this.scale = 1;
        this.transform = new DOMMatrix();
        this.fillStyle = fillStyle || "black";

        this.lowerBody = new LowerBody();
        this.upperBody = new UpperBody();
        this.neck = new Neck();
        this.head = new Head();
        this.leftUpperArm = new UpperArm();
        this.leftLowerArm = new LowerArm();
        this.rightUpperArm = new UpperArm();
        this.rightLowerArm = new LowerArm();
        this.leftUpperLeg = new UpperLeg();
        this.leftLowerLeg = new LowerLeg();
        this.rightUpperLeg = new UpperLeg();
        this.rightLowerLeg = new LowerLeg();
}

    draw() {
        context.save();
        this.render();
        context.fillStyle = this.fillStyle;

        const drawTable = [[], [], []];
        drawTable[this.lowerBody.z].push(this.lowerBody);
        drawTable[this.upperBody.z].push(this.upperBody);
        drawTable[this.neck.z].push(this.neck);
        drawTable[this.head.z].push(this.head);
        drawTable[this.leftUpperArm.z].push(this.leftUpperArm);
        drawTable[this.leftLowerArm.z].push(this.leftLowerArm);
        drawTable[this.rightUpperArm.z].push(this.rightUpperArm);
        drawTable[this.rightLowerArm.z].push(this.rightLowerArm);
        drawTable[this.leftUpperLeg.z].push(this.leftUpperLeg);
        drawTable[this.leftLowerLeg.z].push(this.leftLowerLeg);
        drawTable[this.rightUpperLeg.z].push(this.rightUpperLeg);
        drawTable[this.rightLowerLeg.z].push(this.rightLowerLeg);

        for (let i = drawTable.length - 1; i >= 0; i--) {
            for (let j = 0; j < drawTable[i].length; j++) {
                drawTable[i][j].draw();
            }
        }

        context.restore();
    }

    render() {
        const radian = this.angle * Math.PI / 180;
        context.translate(this.x, this.y);
        context.rotate(radian);
        context.scale(this.scale, this.scale);
        context.translate(-this.x, -this.y);
        this.transform = context.getTransform();

        const pivotLB = this.lowerBody.render(this.x, this.y);
        const pivotUB = this.upperBody.render(pivotLB.x, pivotLB.y);
        const pivotN = this.neck.render(pivotUB.x, pivotUB.y);
        this.head.render(pivotN.x, pivotN.y);

        context.setTransform(this.upperBody.transform);
        const pivotLUA = this.leftUpperArm.render(pivotUB.x, pivotUB.y);
        this.leftLowerArm.render(pivotLUA.x, pivotLUA.y);

        context.setTransform(this.upperBody.transform);
        const pivotRUA = this.rightUpperArm.render(pivotUB.x, pivotUB.y);
        this.rightLowerArm.render(pivotRUA.x, pivotRUA.y);

        context.setTransform(this.transform);
        const pivotLUL = this.leftUpperLeg.render(this.x, this.y);
        this.leftLowerLeg.render(pivotLUL.x, pivotLUL.y);

        context.setTransform(this.transform);
        const pivotRUL = this.rightUpperLeg.render(this.x, this.y);
        this.rightLowerLeg.render(pivotRUL.x, pivotRUL.y);
    }

    translate(x, y) {
        this.x += x;
        this.y += y;
    }

    rotate(degree) {
        const angle = this.angle + degree;
        const maxAngle = Math.PI * 2;

        if (angle < 0) {
            this.angle = angle + maxAngle;
        }
        else if (angle > maxAngle) {
            this.angle = angle - maxAngle;
        }
        else {
            this.angle = angle;
        }
    }

    scale(scale) {
        this.scale *= scale;
    }
}

class BodyPart {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 1;
        this.angle = 0;
        this.minAngle = 0;
        this.maxAngle = 360;
        this.path = new Path2D();
        this.transform = new DOMMatrix();
        this.fillStyle = "";
    }

    draw() {
        let contextFillStyle;
        if (this.fillStyle) {
            contextFillStyle = context.fillStyle;
            context.fillStyle = this.fillStyle;
        }

        context.setTransform(this.transform);
        context.fill(this.path);

        if (this.fillStyle) {
            context.fillStyle = contextFillStyle;
        }
    }

    rotate(degree) {
        const angle = this.angle + degree;

        if (this.minAngle === 0 && this.maxAngle === 360) {
            if (angle < 0) {
                this.angle = angle + this.maxAngle;
            }
            else if (angle > this.maxAngle) {
                this.angle = angle - this.maxAngle;
            }
            else {
                this.angle = angle;
            }
        }
        else {
            if (angle <= this.minAngle) {
                this.angle = this.minAngle;
            }
            else if (angle >= this.maxAngle) {
                this.angle = this.maxAngle;
            }
            else {
                this.angle = angle;
            }
        }
    }

    applyTransform() {
        const radian = this.angle * Math.PI / 180;
        context.translate(this.x, this.y);
        context.rotate(radian);
        context.translate(-this.x, -this.y);
        this.transform = context.getTransform();
    }
}

class LowerBody extends BodyPart {
    constructor() {
        super();
    }

    render(pivotX, pivotY) {
        this.x = pivotX;
        this.y = pivotY;
        this.applyTransform();

        const x = this.x - radius;
        const y = this.y + radius;
        this.path = new Path2D();
        this.path.roundRect(x, y, thickness, -lowerBodyLength, radius);

        const jointX = this.x;
        const jointY = this.y - lowerBodyLength + thickness;
        return { x: jointX, y: jointY };
    }
}

class UpperBody extends BodyPart {
    constructor() {
        super();
    }

    render(pivotX, pivotY) {
        this.x = pivotX;
        this.y = pivotY;
        this.applyTransform();

        const x = this.x - radius;
        const y = this.y + radius;
        this.path = new Path2D();
        this.path.roundRect(x, y, thickness, -upperBodyLength, radius);

        const jointX = this.x;
        const jointY = this.y - upperBodyLength + thickness;
        return { x: jointX, y: jointY };
    }
}

class Neck extends BodyPart {
    constructor() {
        super();
    }

    render(pivotX, pivotY) {
        this.x = pivotX;
        this.y = pivotY;
        this.applyTransform();

        const x = this.x - radius;
        const y = this.y + radius;
        this.path = new Path2D();
        this.path.roundRect(x, y, thickness, -neckLength, radius);

        const jointX = this.x;
        const jointY = this.y - neckLength + thickness + radius;
        return { x: jointX, y: jointY };
    }
}

class Head extends BodyPart {
    constructor() {
        super();
    }

    render(pivotX, pivotY) {
        this.x = pivotX;
        this.y = pivotY;
        this.applyTransform();

        this.path = new Path2D();
        this.path.arc(this.x, this.y, headRadius, 0, Math.PI * 2);
    }
}

class UpperArm extends BodyPart {
    constructor() {
        super();
    }

    render(pivotX, pivotY) {
        this.x = pivotX;
        this.y = pivotY;
        this.applyTransform();

        const x = this.x - radius;
        const y = this.y - radius;
        this.path = new Path2D();
        this.path.roundRect(x, y, thickness, upperArmLength, radius);

        const jointX = this.x;
        const jointY = this.y + upperArmLength - thickness;
        return { x: jointX, y: jointY };
    }
}

class LowerArm extends BodyPart {
    constructor() {
        super();
    }

    render(pivotX, pivotY) {
        this.x = pivotX;
        this.y = pivotY;
        this.applyTransform();

        const x = this.x - radius;
        const y = this.y - radius;
        this.path = new Path2D();
        this.path.roundRect(x, y, thickness, lowerArmLength, radius);
    }
}

class UpperLeg extends BodyPart {
    constructor() {
        super();
    }

    render(pivotX, pivotY) {
        this.x = pivotX;
        this.y = pivotY;
        this.applyTransform();

        const x = this.x - radius;
        const y = this.y - radius;
        this.path = new Path2D();
        this.path.roundRect(x, y, thickness, upperLegLength, radius);

        const jointX = this.x;
        const jointY = this.y + upperLegLength - thickness;
        return { x: jointX, y: jointY };
    }
}

class LowerLeg extends BodyPart {
    constructor() {
        super();
    }

    render(pivotX, pivotY) {
        this.x = pivotX;
        this.y = pivotY;
        this.applyTransform();

        const x = this.x - radius;
        const y = this.y - radius;
        this.path = new Path2D();
        this.path.roundRect(x, y, thickness, lowerLegLength, radius);
    }
}

export default Figure;
