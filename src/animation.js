class RaiseArms {
    constructor() {
        this.peak = {
            duration: 60,
            frame: 0,
            translationX: 0,
            translationY: 0,
            changeZ: 0,
            angleLB: 0,
            angleUB: 0,
            angleN: 0,
            angleH: 0,
            angleLUA: 245,
            angleLLA: 0,
            angleRUA: 115,
            angleRLA: 0,
            angleLUL: 340,
            angleLLL: 0,
            angleRUL: 20,
            angleRLL: 0,
        };

        this.initial = {
            duration: 60,
            frame: 0,
            translationX: 0,
            translationY: 0,
            changeZ: 0,
            angleLB: 0,
            angleUB: 0,
            angleN: 0,
            angleH: 0,
            angleLUA: 315,
            angleLLA: 0,
            angleRUA: 45,
            angleRLA: 0,
            angleLUL: 340,
            angleLLL: 0,
            angleRUL: 20,
            angleRLL: 0,
        };

        this.poses = [this.peak, this.initial];
        this.poseIndex = 0;
    }
}

class Squat {
    constructor() {
        this.peak = {
            duration: 60,
            frame: 0,
            translationX: 0,
            translationY: 45,
            changeZ: 0,
            angleLB: 0,
            angleUB: 0,
            angleN: 0,
            angleH: 0,
            angleLUA: 320,
            angleLLA: 170,
            angleRUA: 40,
            angleRLA: -170,
            angleLUL: 270,
            angleLLL: 90,
            angleRUL: 90,
            angleRLL: -90,
        };

        this.initial = {
            duration: 60,
            frame: 0,
            translationX: 0,
            translationY: -45,
            changeZ: 0,
            angleLB: 0,
            angleUB: 0,
            angleN: 0,
            angleH: 0,
            angleLUA: 345,
            angleLLA: 0,
            angleRUA: 15,
            angleRLA: 360,
            angleLUL: 340,
            angleLLL: 0,
            angleRUL: 20,
            angleRLL: 360,
        };

        this.poses = [this.peak, this.initial];
        this.poseIndex = 0;
    }
}

class AnimationList {
    constructor() {
        this.RaiseArms = new RaiseArms();
        this.Squat = new Squat();
    }
}

export { AnimationList };
