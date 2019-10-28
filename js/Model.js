const STEP = 20;
var colors = [];
colors.push("red", "blue", "green", "aqua", "yellow");

var Model = function () {
    this.objs = {
        'platform': {
            width: 100,
            height: 15,
            x: (window.innerWidth / 2) / 2 - 30,
            // y: window.innerHeight - 100,
            y: 500,
            hide: false
        },
        'ball': {
            x: (window.innerWidth / 2) / 2 - 15,
            y: window.innerHeight / 2,
            width: 16,
            height: 16,
            fly: false,
            dx: 2,
            dy: -2
        }
    };
};
Model.prototype.init = function (renderFunction) {
    this.needRendering = renderFunction;
    // this.initBlocks();
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
    if (model.checkBlockCollision(view.ball, view.blocks) === 'hit')
        model.objs.ball.dy = -model.objs.ball.dy;
    else if (model.checkBlockCollision(view.ball, view.blocks) === 'side')
        model.objs.ball.dx = -model.objs.ball.dx;


    model.setCoords(model.objs.ball, x + model.objs.ball.dx, y + model.objs.ball.dy);
};

Model.prototype.checkCollision = function (ball, platform) {
    var platformLeft = platform.getBoundingClientRect().left;
    var platformRight = platform.getBoundingClientRect().right;
    var platformY = this.objs.platform.y;
    var ballLeft = ball.getBoundingClientRect().left;
    var ballRight = ball.getBoundingClientRect().right;
    var ballY = this.objs.ball.y;
    if (ballY >= platformY - model.objs.platform.height && ballLeft >= platformLeft && ballRight <= platformRight)
        return 'strike';
    else
        return false;
};

Model.prototype.checkBlockCollision = function (ball, blocks) {
    var ballLeft = ball.getBoundingClientRect().left;
    var ballRight = ball.getBoundingClientRect().right;
    var ballTop = ball.getBoundingClientRect().top;
    var ballBottom = ball.getBoundingClientRect().bottom;

    for (var i = 0; i < blocks.length; i++) {
        var blockLeft = blocks[i].getBoundingClientRect().left;
        var blockRight = blocks[i].getBoundingClientRect().right;
        var blockTop = blocks[i].getBoundingClientRect().top;
        var blockBottom = blocks[i].getBoundingClientRect().bottom;

        if (ball.dy > 0)
            console.log("Вниз");
        else
            console.log("Вверх");

        // если шариктоп выше блок боттом
        if (ballTop <= blockBottom && ballBottom >= blockTop && this.objs.ball.dy < 0) {
            if (ballLeft >= blockLeft && ballRight <= blockRight) {
                blocks[i].style.display = "none";
                return 'hit';
            }
        } else if (ballBottom >= blockTop && ballBottom <= blockBottom && this.objs.ball.dy > 0) {
            if (ballLeft >= blockLeft && ballRight <= blockRight) {
                blocks[i].style.display = "none";
                return 'hit';
            }
        }
    }
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