var gui = new dat.GUI();
var params = {
    RANDOM_SEED: 0,
    PERLIN_SEED: 0,
    NBLONGUEUR: 18,
    NBHAUTEUR: 18,
    MULTIPLE: 5,
    multTransfo: 5,
    mouseMoving: false,
    Perlin: false,
    DarkMode: false,
    Download_Image: function () { return save(); },
};
gui.add(params, "RANDOM_SEED", 0, 1000, 1);
gui.add(params, "PERLIN_SEED", 0, 1000, 1);
gui.add(params, "NBLONGUEUR", 0, 100, 1);
gui.add(params, "NBHAUTEUR", 0, 100, 1);
gui.add(params, "MULTIPLE", 1, 20, 1);
gui.add(params, "multTransfo", 0, 1000, 1);
gui.add(params, "mouseMoving");
gui.add(params, "Perlin");
gui.add(params, "DarkMode");
gui.add(params, "Download_Image");
var shiftBRXover;
var shiftTRXover;
var shiftBLYover;
var shiftBRYover;
function draw() {
    randomSeed(params.RANDOM_SEED);
    noiseSeed(params.PERLIN_SEED);
    var beginPathX = random(1, 5) * params.MULTIPLE;
    var beginPathY = random(1, 5) * params.MULTIPLE;
    var shiftBRX = random(1, 3) * params.MULTIPLE;
    shiftBRXover = shiftBRX;
    var shiftBRY = random(1, 3) * params.MULTIPLE;
    shiftBRYover = shiftBRY;
    var shiftTRX = random(5, 10) * params.MULTIPLE;
    shiftTRXover = shiftTRX;
    var shiftBLY = random(1, 5) * params.MULTIPLE;
    shiftBLYover = shiftBLY;
    var coordonateX = [];
    var coordonateY = [];
    if (params.DarkMode == true) {
        background('black');
        stroke('white');
    }
    else {
        background('#FFFFFF');
        stroke('black');
    }
    for (var h = 0; h < params.NBHAUTEUR; h++) {
        for (var i = 0; i < params.NBLONGUEUR; i += 2) {
            lineCustom(beginPathX, beginPathY, beginPathX + shiftBRX, beginPathY + shiftBRY);
            lineCustom(beginPathX + shiftBRX, beginPathY + shiftBRY, beginPathX + shiftBRX + shiftTRX, +beginPathY);
            coordonateX[i] = beginPathX + shiftBRX;
            coordonateY[i] = beginPathY + shiftBRY;
            coordonateX[i + 1] = beginPathX + shiftBRX + shiftTRX;
            coordonateY[i + 1] = beginPathY;
            beginPathX = beginPathX + shiftBRX + shiftTRX;
        }
        coordonateX.forEach(function (x, i) {
            lineCustom(x, coordonateY[i], x - shiftBRX, coordonateY[i] + shiftBLY);
            coordonateX[i] = x - shiftBRX;
            coordonateY[i] = coordonateY[i] + shiftBLY;
        });
        for (var i = 0; i < coordonateX.length; i++) {
            lineCustom(coordonateX[i], coordonateY[i], coordonateX[i + 1], coordonateY[i + 1]);
        }
        var lastX = coordonateX[coordonateX.length - 1];
        var lastY = coordonateY[coordonateY.length - 1];
        lineCustom(lastX, lastY, lastX + shiftBRX, lastY + shiftBRY);
        beginPathX = coordonateX[0];
        beginPathY = coordonateY[0];
    }
}
function lineCustom(x1, y1, x2, y2) {
    var vector = shifterPro(x1, y1);
    var vector2 = shifterPro(x2, y2);
    line(vector.x + x1, vector.y + y1, vector2.x + x2, vector2.y + y2);
}
function shifterPro(coordX, coordY) {
    var distanceX = (shiftBRXover + shiftTRXover) * params.NBLONGUEUR;
    var middleX = distanceX / 4;
    var distanceY = (shiftBRXover + shiftBLYover) * params.NBHAUTEUR;
    var middleY = distanceY / 2;
    var centerDistX = abs(middleX - coordX) / middleX;
    var centerDistY = abs(middleY - coordY) / middleY;
    var mult = params.mouseMoving ? mouseX / 500 : 1;
    if (params.Perlin) {
        var vector = p5.Vector.fromAngle(noise(coordX, coordY) * mult);
    }
    else {
        var vector = p5.Vector.fromAngle(((sin(coordX * 12.9898 + coordY * 78.233) * 43758.5453) % 1) * TWO_PI * mult);
    }
    var vectorX = vector.mult((1 - centerDistY) * (1 - centerDistX) * params.multTransfo);
    return vectorX;
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map