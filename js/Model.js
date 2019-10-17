const INITIAL_PLATFORM_X = 0;
const INITIAL_PLATFORM_Y = 0;
const INITIAL_BLOCK_X = -100;
const INITIAL_BLOCK_Y = 200;
const LEFT_BORDER = -400;
const RIGHT_BORDER = 370;
const STEP = 10;
var Model = function () {
    this.objs = {'platform': {x: INITIAL_PLATFORM_X, y: INITIAL_PLATFORM_Y}};
};
Model.prototype.init = function (renderFunction) {
    this.needRendering = renderFunction;
};
Model.prototype.setCoords = function (obj, x, y) {
    x = x == (undefined || null) ? obj.x : x;
    y = y == (undefined || null) ? obj.y : y;
    checkScreenBorders.call(this, obj, x);
    this.needRendering();
};
Model.prototype.getCoords = function (obj) {
    return {x: obj.x, y: obj.y}
};
Model.prototype.platformMove = function (e) {
    var keyCode = e.keyCode;
    var x = model.getCoords(model.objs.platform).x;
    switch (keyCode) {
        case 39: {
            model.setCoords(model.objs.platform, x + STEP);
            break;
        }
        case 37: {
            model.setCoords(model.objs.platform, x - STEP);
            break;
        }
    }
};

function checkScreenBorders(obj, x) {
    if (!(x <= LEFT_BORDER || x >= RIGHT_BORDER)) {
        obj.x = x;
    } else {
        if (obj.hasOwnProperty('direction')) {
            obj.direction = obj.direction === 'right' ? 'left' : 'right';
        }
    }
}

var model = new Model();