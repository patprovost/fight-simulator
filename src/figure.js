import { context } from "./canvas.js";
import { activateAnim } from "./animation.js";

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

        this.activeAnims = [];
    }

    update() {
        for (let i = 0; i < this.activeAnims.length; i++) {
            const anim = this.activeAnims[i];

            if (!anim.frame) {
                anim.frame = 0;
                anim.stepX = anim.translationX / anim.duration;
                anim.stepY = anim.translationY / anim.duration;
                anim.stepLB = (anim.angleLB - this.lowerBody.angle) / anim.duration;
                anim.stepUB = (anim.angleUB - this.upperBody.angle) / anim.duration;
                anim.stepN = (anim.angleN - this.neck.angle) / anim.duration;
                anim.stepH = (anim.angleH - this.head.angle) / anim.duration;
                anim.stepLUA = (anim.angleLUA - this.leftUpperArm.angle) / anim.duration;
                anim.stepLLA = (anim.angleLLA - this.leftLowerArm.angle) / anim.duration;
                anim.stepRUA = (anim.angleRUA - this.rightUpperArm.angle) / anim.duration;
                anim.stepRLA = (anim.angleRLA - this.rightLowerArm.angle) / anim.duration;
                anim.stepLUL = (anim.angleLUL - this.leftUpperLeg.angle) / anim.duration;
                anim.stepLLL = (anim.angleLLL - this.leftLowerLeg.angle) / anim.duration;
                anim.stepRUL = (anim.angleRUL - this.rightUpperLeg.angle) / anim.duration;
                anim.stepRLL = (anim.angleRLL - this.rightLowerLeg.angle) / anim.duration;
                this.changeZ(anim.changeZ);
            }

            anim.frame += 1;
            this.translate(anim.stepX, anim.stepY);
            this.lowerBody.rotate(anim.stepLB);
            this.upperBody.rotate(anim.stepUB);
            this.neck.rotate(anim.stepN);
            this.head.rotate(anim.stepH);
            this.leftUpperArm.rotate(anim.stepLUA);
            this.leftLowerArm.rotate(anim.stepLLA);
            this.rightUpperArm.rotate(anim.stepRUA);
            this.rightLowerArm.rotate(anim.stepRLA);
            this.leftUpperLeg.rotate(anim.stepLUL);
            this.leftLowerLeg.rotate(anim.stepLLL);
            this.rightUpperLeg.rotate(anim.stepRUL);
            this.rightLowerLeg.rotate(anim.stepRLL);

            if (anim.frame === anim.duration) {
                this.activeAnims.splice(i, 1);
            }
        }
    }

    draw() {
        context.save();
        this.render();
        context.fillStyle = this.fillStyle;

        const drawTable = [[], [], [], []];
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
        const newAngle = this.angle + degree;
        const maxAngle = Math.PI * 2;

        if (newAngle < 0) {
            this.angle = newAngle + maxAngle;
        }
        else if (newAngle > maxAngle) {
            this.angle = newAngle - maxAngle;
        }
        else {
            this.angle = newAngle;
        }
    }

    scale(scale) {
        this.scale *= scale;
    }

    changeZ(z) {
        const newZ = this.z += z;
        if (newZ <= 0) {
            this.z = 0;
        }
        else if (newZ >= 3) {
            this.z = 3;
        }
        else {
           this.z = newZ;
        }
    }

    animate(animName) {
        const anim = activateAnim(animName);

        if (anim !== null) {
            this.activeAnims.push(anim);
        }
        else {
            console.warn("Invalid animation: " + animName);
        }
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
        const newAngle = this.angle + degree;

        if (this.minAngle === 0 && this.maxAngle === 360) {
            if (newAngle < 0) {
                this.angle = newAngle + this.maxAngle;
            }
            else if (newAngle > this.maxAngle) {
                this.angle = newAngle - this.maxAngle;
            }
            else {
                this.angle = newAngle;
            }
        }
        else {
            if (newAngle <= this.minAngle) {
                this.angle = this.minAngle;
            }
            else if (newAngle >= this.maxAngle) {
                this.angle = this.maxAngle;
            }
            else {
                this.angle = newAngle;
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
