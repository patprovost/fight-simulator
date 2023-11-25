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
        this.trs = { tx: 0, ty: 0, r: 0, sx: 1, sy: 1 };
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

        context.translate(this.x + this.trs.tx, this.y + this.trs.ty);
        context.rotate(Math.PI * this.trs.r);
        context.scale(this.trs.sx, this.trs.sy);
        context.translate(-this.x, -this.y);
        context.fillStyle = this.fillStyle;

        context.save();
        this.lowerBody.draw(this.x, this.y);
        this.upperBody.draw(this.lowerBody.joint.x, this.lowerBody.joint.y);
        context.fillStyle = this.fillStyle;
        context.save();
        this.neck.draw(this.upperBody.joint.x, this.upperBody.joint.y);
        this.head.draw(this.neck.joint.x, this.neck.joint.y);
        context.restore();
        context.save();
        this.leftUpperArm.draw(this.upperBody.joint.x, this.upperBody.joint.y);
        this.leftLowerArm.draw(this.leftUpperArm.joint.x, this.leftUpperArm.joint.y);
        context.restore();
        this.rightUpperArm.draw(this.upperBody.joint.x, this.upperBody.joint.y);
        this.rightLowerArm.draw(this.rightUpperArm.joint.x, this.rightUpperArm.joint.y);
        context.restore();
        context.save();
        this.leftUpperLeg.draw(this.x, this.y);
        this.leftLowerLeg.draw(this.leftUpperLeg.joint.x, this.leftUpperLeg.joint.y);
        context.restore();
        this.rightUpperLeg.draw(this.x, this.y);
        this.rightLowerLeg.draw(this.rightUpperLeg.joint.x, this.rightUpperLeg.joint.y);

        context.restore();
    }

    translate(x, y) {
        this.trs.tx = x;
        this.trs.ty = y;
    }

    rotate(radian) {
        this.trs.r = radian;
    }

    scale(x, y) {
        this.trs.sx = x;
        this.trs.sy = y;
    }
}

class LowerBody {
    constructor() {
        this.fillStyle = "";
        this.joint = {};
        this.rotation = 0;
    }

    draw(px, py) {
        const path = new Path2D();
        const x = px - radius;
        const y = py + radius;
        path.roundRect(x, y, thickness, -lowerBodyLength, radius);

        if (this.fillStyle) {
            context.fillStyle = this.fillStyle;
        }
        context.translate(px, py);
        context.rotate(Math.PI * this.rotation);
        context.translate(-px, -py);
        context.fill(path);

        this.joint.x = px;
        this.joint.y = py - lowerBodyLength + thickness;
    }

    rotate(radian) {
        this.rotation = radian;
    }
}

class UpperBody {
    constructor() {
        this.fillStyle = "";
        this.joint = {};
        this.rotation = 0;
    }

    draw(px, py) {
        const path = new Path2D();
        const x = px - radius;
        const y = py + radius;
        path.roundRect(x, y, thickness, -upperBodyLength, radius);

        if (this.fillStyle) {
            context.fillStyle = this.fillStyle;
        }
        context.translate(px, py);
        context.rotate(Math.PI * this.rotation);
        context.translate(-px, -py);
        context.fill(path);

        this.joint.x = px;
        this.joint.y = py - upperBodyLength + thickness;
    }

    rotate(radian) {
        this.rotation = radian;
    }
}

class Neck {
    constructor() {
        this.fillStyle = "";
        this.joint = {};
        this.rotation = 0;
    }

    draw(px, py) {
        const path = new Path2D();
        const x = px - radius;
        const y = py + radius;
        path.roundRect(x, y, thickness, -neckLength, radius);

        if (this.fillStyle) {
            context.fillStyle = this.fillStyle;
        }
        context.translate(px, py);
        context.rotate(Math.PI * this.rotation);
        context.translate(-px, -py);
        context.fill(path);

        this.joint.x = px;
        this.joint.y = py - neckLength + thickness + radius;
    }

    rotate(radian) {
        this.rotation = radian;
    }
}

class Head {
    constructor() {
        this.fillStyle = "";
        this.joint = {};
        this.rotation = 0;
    }

    draw(px, py) {
        const path = new Path2D();
        path.arc(px, py, headRadius, 0, Math.PI * 2);

        if (this.fillStyle) {
            context.fillStyle = this.fillStyle;
        }
        context.fill(path);
    }
}

class UpperArm {
    constructor() {
        this.fillStyle = "";
        this.joint = {};
        this.rotation = 0;
    }

    draw(px, py) {
        const path = new Path2D();
        const x = px - radius;
        const y = py - radius;
        path.roundRect(x, y, thickness, upperArmLength, radius);

        if (this.fillStyle) {
            context.fillStyle = this.fillStyle;
        }
        context.translate(px, py);
        context.rotate(Math.PI * this.rotation);
        context.translate(-px, -py);
        context.fill(path);

        this.joint.x = px;
        this.joint.y = py + upperArmLength - thickness;
    }

    rotate(radian) {
        this.rotation = radian;
    }
}

class LowerArm {
    constructor() {
        this.fillStyle = "";
        this.rotation = 0;
    }

    draw(px, py) {
        const path = new Path2D();
        const x = px - radius;
        const y = py - radius;
        path.roundRect(x, y, thickness, lowerArmLength, radius);

        if (this.fillStyle) {
            context.fillStyle = this.fillStyle;
        }
        context.translate(px, py);
        context.rotate(Math.PI * this.rotation);
        context.translate(-px, -py);
        context.fill(path);
    }

    rotate(radian) {
        this.rotation = radian;
    }
}

class UpperLeg {
    constructor() {
        this.fillStyle = "";
        this.joint = {};
        this.rotation = 0;
    }

    draw(px, py) {
        const path = new Path2D();
        const x = px - radius;
        const y = py - radius;
        path.roundRect(x, y, thickness, upperLegLength, radius);

        if (this.fillStyle) {
            context.fillStyle = this.fillStyle;
        }
        context.translate(px, py);
        context.rotate(Math.PI * this.rotation);
        context.translate(-px, -py);
        context.fill(path);

        this.joint.x = px;
        this.joint.y = py + upperLegLength - thickness;
    }

    rotate(radian) {
        this.rotation = radian;
    }
}

class LowerLeg {
    constructor() {
        this.fillStyle = "";
        this.rotation = 0;
    }

    draw(px, py) {
        const path = new Path2D();
        const x = px - radius;
        const y = py - radius;
        path.roundRect(x, y, thickness, lowerLegLength, radius);

        if (this.fillStyle) {
            context.fillStyle = this.fillStyle;
        }
        context.translate(px, py);
        context.rotate(Math.PI * this.rotation);
        context.translate(-px, -py);
        context.fill(path);
    }

    rotate(radian) {
        this.rotation = radian;
    }
}

export default Figure;
