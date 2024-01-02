export class RaiseArms {
    constructor() {
        this.poses = [];
        this.duration = 30;
        this.translationX = 0;
        this.translationY = 0;
        this.angleLB = 0;
        this.angleUB = 0;
        this.angleN = 0;
        this.angleH = 0;
        this.angleLUA = 245;
        this.angleLLA = 0;
        this.angleRUA = 115;
        this.angleRLA = 0;
        this.angleLUL = 340;
        this.angleLLL = 0;
        this.angleRUL = 20;
        this.angleRLL = 0;
        this.changeZ = 0;
    }
}

export class Squat {
    constructor() {
        this.poses = [];
        this.duration = 30;
        this.translationX = 0;
        this.translationY = 44;
        this.angleLB = 0;
        this.angleUB = 0;
        this.angleN = 0;
        this.angleH = 0;
        this.angleLUA = 320;
        this.angleLLA = 170;
        this.angleRUA = 40;
        this.angleRLA = -170;
        this.angleLUL = 270;
        this.angleLLL = 90;
        this.angleRUL = 90;
        this.angleRLL = -90;
        this.changeZ = 0;
    }
}

const animList = {
    RaiseArms: new RaiseArms(),
    Squat: new Squat(),
}

function activateAnim(animName, parameters) {
    let anim = animList[animName];

    if (anim) {
        return Object.create(anim, parameters);
    }
    else {
        return null;
    }
}

export { activateAnim };
