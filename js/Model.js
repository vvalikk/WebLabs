const STEP = 20;
const workplace = (window.innerWidth / 4) + 3;
var Model = function () {
    this.objs = {
        'platform': {
            width: 100,
            height: 15,
            x: (window.innerWidth / 2) / 2 - 30,
            y: window.innerHeight - 100,
            hide: false
        },
        'ball': {
            x: (window.innerWidth / 2) / 2 - 15,
            y: window.innerHeight / 2,
            width: 16,
            height: 16,
            fly: false,
            dx: 2,
            dy: 2
        },
        'block': {
            x: 0,
            y: 0,
            width: window.innerWidth / 10,
            height: 20,
            hit: false,
            hide: false
        }
    };
};
Model.prototype.init = function (renderFunction) {
    this.needRendering = renderFunction;
    this.initBlocks();
    // this.flyingBall();
};
Model.prototype.setCoords = function (obj, x, y) {
    x = x == (undefined || null) ? obj.x : x;
    y = y == (undefined || null) ? obj.y : y;

    checkScreenBorders.call(this, obj, x, y);
    this.needRendering();
};
Model.prototype.getCoords = function (obj) {
    return {x: obj.x, y: obj.y};
};

function generateColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

Model.prototype.initBlocks = function () {
    var count = Math.round(document.querySelector('.mainScene').clientWidth / 70);
    var lines = 5;
    var blocks = [];
    var tmp = this.objs.block;
    for (var i = 0; i < lines; i++) {
        for (var j = 0; j < count; j++) {
            tmp.x = j * 70;
            tmp.y = i * 25;
            var element = document.createElement("div");
            element.classList.add("block");
            element.style.left = workplace + tmp.x + 'px';
            element.style.top = 100 + tmp.y + 'px';
            element.style.background = generateColor();
            if (j === count - 1) {
                element.style.width = 47 + 'px';
            }
            document.body.append(element);

            blocks.push(tmp);
        }
    }
};

Model.prototype.Move = function (e) {
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
        case 32: {
            model.objs.ball.fly = true;
            setInterval(model.flyingBall, 10);
        }
    }
};

Model.prototype.flyingBall = function () {
    var x = model.getCoords(model.objs.ball).x;
    var y = model.getCoords(model.objs.ball).y;

    if (model.checkCollision(view.ball, view.platform) === 'strike') {
        model.objs.ball.dy = -model.objs.ball.dy;
    }
    model.setCoords(model.objs.ball, x + model.objs.ball.dx, y + model.objs.ball.dy);
};

Model.prototype.checkCollision = function (ball, platform) {
    var platformLeft = platform.getBoundingClientRect().left;
    var platformRight = platform.getBoundingClientRect().right;
    var platformY = this.objs.platform.y;
    var ballLeft = ball.getBoundingClientRect().left;
    var ballRight = ball.getBoundingClientRect().right;
    var ballY = this.objs.ball.y;
    console.log();
    if (ballY >= platformY - model.objs.platform.height && ballLeft >= platformLeft && ballRight <= platformRight)
        return 'strike';
    else
        return false;
};


function checkScreenBorders(obj, x, y) {
    if (obj.hasOwnProperty('dy')) {
        if (!(y + obj.height * 2 >= window.innerHeight || y <= 0))
            obj.y = y;
        else
            obj.dy = -obj.dy;
    }
    if (obj.hasOwnProperty('dx')) {
        if (!(x <= 0 || x + obj.width * 2 >= (window.innerWidth / 2)))
            obj.x = x;
        else
            obj.dx = -obj.dx;
    }
    if (obj.hasOwnProperty('hide')) {
        if (!(x <= 0 || x + obj.width >= (window.innerWidth / 2)))
            obj.x = x;
    }
}


var model = new Model();