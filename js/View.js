var View = function () {
    this.platform = document.querySelector('.platform');
    this.ball = document.querySelector('.ball');
    this.blocks = null;
    this.score = null;
    this.onKeyDownEvent = null;
};
View.prototype.render = function (objs) {
    if (objs.platform.hide) {
        this.platform.style.visibility = "hidden";
    }
    this.platform.style.left = objs.platform.x + 'px';
    this.platform.style.top = objs.platform.y + 'px';
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
    var count = Math.round((document.querySelector('.mainScene').clientWidth) / 100);
    var workspace = Math.round((window.innerWidth + 4) / 4);
    var lines = 5;
    var block = {
        x: 0,
        y: 0,
        width: (document.querySelector('.mainScene').clientWidth / count),
        height: 50,
        hit: false,
        hide: false
    };

    for (var i = 0; i < lines-1; i++) {
        for (var j = 0; j < count; j++) {
            block.x = j * block.width;
            block.y = i * block.height;
            var element = document.createElement("div");
            element.className = "block";
            element.style.left = workspace + (block.x) + 'px';
            element.style.top = block.y + 'px';
            element.style.width = block.width + 'px';
            element.style.height = block.height + 'px';
            element.style.background = colors[Math.round(Math.random() * 4)];
            element.style.boxSizing = "border-box";
            element.style.border = "solid 1px black";
            document.body.append(element);
        }
    }
};
View.prototype.init = function () {
    let element = document.createElement("div");
    element.id = "score";
    element.textContent = "Счет: 0";
    element.style.position = "absolute";
    element.style.left = "50px";
    element.style.top = "100px";
    element.style.fontSize = "40px";
    document.body.append(element);
    let el = document.querySelector('.mainScene');
    var sceneWidth = (document.querySelector('.mainScene').clientWidth);
    el.setAttribute("style", "width:" + (sceneWidth - (sceneWidth % 10)).toString() + "px");
    document.addEventListener('keydown', this.onKeyDownEvent);
    view.initBlocks();
    this.blocks = document.querySelectorAll('.block');
};
var view = new View();