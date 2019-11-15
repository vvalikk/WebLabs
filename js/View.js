var colors = [];
colors.push("red", "blue", "green", "aqua", "yellow");
var bodySize = document.body.getBoundingClientRect();
var View = function () {
    var count = Math.round(bodySize.width / 100);
    var lines = 5;
    var width = ((bodySize.width * 0.99) / count);

    this.htmlBall = null;
    this.htmlPlatform = null;
    this.htmlScore = null;
    this.htmlBlocks = [];
    let el = document.createElement("div");
    el.className = "platform";
    el.style.width = '120px';
    el.style.height = '20px';
    el.style.left = '0';
    el.style.top = '500px';
    el.style.position = "absolute";
    el.style.background = '#fff';
    document.body.append(el);
    this.htmlPlatform = document.querySelector(".platform");

    el = document.createElement("div");
    el.className = "ball";
    document.body.append(el);
    this.htmlBall = document.querySelector(".ball");

    el = document.createElement("div");
    el.id = "score";
    el.textContent = "0";
    el.style.position = "absolute";
    el.style.left = "0x";
    el.style.top = "400px";
    el.style.color = "#fff";
    el.style.fontSize = "60px";
    document.body.append(el);
    this.htmlScore = el;

    const Block = function () {
        return {
            x: 0,
            y: 0,
            w: 0,
            h: 50,
            visible: true,
            color: 0,
        };
    };
    const Score = function () {
        return {
            x: 0,
            y: 400,
            value: 0
        };
    };
    const Platform = function () {
        return {
            x: 0,
            y: 0,
            w: 120,
            h: 20,
            update: function (obj) {
                this.x = obj.x;
                this.y = obj.y;
            }
        };
    };
    const Ball = function () {
        return {
            x: 0,
            y: 0,
            r: 5,
            fly: false,
            update: function (obj) {
                this.x = obj.x;
                this.y = obj.y;
            }
        };
    };
    this.score = new Score();
    this.ball = new Ball();
    this.platform = new Platform();
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
        this.htmlPlatform.style.visibility = "hidden";
    }
    this.htmlPlatform.style.left = objs.platform.x + 'px';
    this.htmlPlatform.style.top = objs.platform.y + 'px';
    if (objs.ball.fly) {
        this.htmlScore.textContent = objs.score.value;
        this.ball.update(objs.ball);
        this.platform.update(objs.platform);
        this.htmlBall.style.left = this.ball.x + 'px';
        this.htmlBall.style.top = this.ball.y + 'px';
        var count = Math.round(bodySize.width / 100);

        for (let i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].visible === false) {
                this.htmlBlocks[i].style.visibility = "hidden";
            }


        }
    } else {
        this.platform.update(objs.platform);
        objs.ball.x = objs.platform.x + objs.platform.width / 2 - this.ball.r;
        objs.ball.y = objs.platform.y - objs.ball.height;
        this.ball.update(objs.ball);
        this.htmlBall.style.left = this.ball.x + 'px';
        this.htmlBall.style.top = this.ball.y + 'px';
    }
};
View.prototype.initBlocks = function () {
    var lines = 5;
    var count = Math.round(bodySize.width / 100);
    for (var i = 0; i < lines - 1; i++) {
        for (var j = 0; j < count; j++) {
            var element = document.createElement("div");
            element.className = "block";
            element.style.left = j * this.blocks[j].w + 'px';
            element.style.top = i * this.blocks[j].h + 'px';
            element.style.width = this.blocks[j].w + 'px';
            element.style.height = this.blocks[j].h + 'px';
            element.style.background = colors[Math.round(Math.random() * 4)];
            element.style.boxSizing = "border-box";
            element.style.border = "solid 1px black";
            this.htmlBlocks.push(element);
            document.body.append(element);
        }
    }
};
View.prototype.init = function () {

    document.addEventListener('keydown', this.onKeyDownEvent);
    view.initBlocks();

};
var view = new View();