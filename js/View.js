var colors = [];
colors.push("red", "blue", "green", "aqua", "yellow");
var bodySize = document.body.getBoundingClientRect();
var View = function () {
    var count = Math.round(bodySize.width / 100);
    var lines = 5;
    var width = (bodySize.width / count);

    this.platform = null;
    this.ball = null;
    const Block = function () {
        return {
            x: 0,
            y: 0,
            w: 0,
            h: 50,
            visible: true,
            color: 0
        };
    };
    this.blocks = [];

    for (let i = 0; i < lines - 1; i++) {
        for (let j = 0; j < count; j++) {
            let block = new Block();
            block.w = width;
            block.y = i * block.h + i;
            block.x = j * block.w + j;
            block.visible = true;
            block.color = colors[Math.round(Math.random() * 4)];
            this.blocks.push(block);
        }
    }

    this.score = null;
    this.onKeyDownEvent = null;
};
View.prototype.render = function (objs) {
    if (objs.platform.hide) {
        this.platform.style.visibility = "hidden";
    }
    this.platform.style.left = objs.platform.x + 'px';
    this.platform.style.top = objs.platform.y + 'px';
    console.log(objs.platform);
    if (objs.ball.fly) {
        this.ball.style.left = objs.ball.x + 'px';
        this.ball.style.top = objs.ball.y + 'px';
    } else {
        objs.ball.x = objs.platform.x + objs.platform.width / 2 - objs.ball.width / 2;
        objs.ball.y = objs.platform.y - objs.ball.height;
        this.ball.style.left = objs.ball.x + 'px';
        this.ball.style.top = objs.ball.y + 'px';
    }
};


View.prototype.initBlocks = function () {
    var lines = 5;
    for (var i = 0; i < lines - 1; i++) {
        for (var j = 0; j < this.blocks.length; j++) {
            var element = document.createElement("div");
            element.className = "block";
            element.style.left = this.blocks[j].x + 'px';
            element.style.top = this.blocks[j].y + 'px';
            element.style.width = this.blocks[j].w + 'px';
            element.style.height = this.blocks[j].h + 'px';
            element.style.background = this.blocks[j].color;
            element.style.boxSizing = "border-box";
            element.style.border = "solid 1px black";
            document.body.append(element);
        }
    }
};
View.prototype.init = function () {
    let el = document.createElement("div");
    el.className = "platform";
    el.style.width = '120px';
    el.style.height = '20px';
    el.style.left = '0';
    el.style.top = '500px';
    el.style.position = "absolute";
    el.style.background = '#000';
    document.body.append(el);
    this.platform = document.querySelector(".platform");
    el = document.createElement("div");
    el.className = "ball";
    document.body.append(el);
    this.ball = document.querySelector(".ball");
    let element = document.createElement("div");
    element.id = "score";
    element.textContent = "0";
    element.style.position = "absolute";
    element.style.left = "0x";
    element.style.top = "400px";
    element.style.fontSize = "40px";
    document.body.append(element);
    // el = document.querySelector('body');
    // var sceneWidth = (document.querySelector('body').clientWidth);
    // el.setAttribute("style", "width:" + (sceneWidth - (sceneWidth % 10)).toString() + "px");
    document.addEventListener('keydown', this.onKeyDownEvent);
    view.initBlocks();
    // this.blocks = document.querySelectorAll('.block');
};
var view = new View();