var View = function () {
    this.platform = document.querySelector('.platform');
    this.block = document.querySelector('.block');
    this.onKeyDownEvent = null;
};
View.prototype.render = function (objs) {
    this.platform.style.left = 'calc(50% + ' + objs.platform.x + 'px)';
    this.platform.style.top = 'calc(68.5% + ' + objs.platform.y + 'px)';
};
View.prototype.init = function () {
    document.addEventListener('keydown', this.onKeyDownEvent);
};
var view = new View();