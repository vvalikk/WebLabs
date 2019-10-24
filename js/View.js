var View = function () {
    this.platform = document.querySelector('.platform');
    this.ball = document.querySelector('.ball');
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
View.prototype.init = function () {
    document.addEventListener('keydown', this.onKeyDownEvent);
};
var view = new View();