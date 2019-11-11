var Controller = function (View, Model) {
    this.View = View;
    this.Model = Model;
};
Controller.prototype.init = function () {
    this.View.onKeyDownEvent = this.moving.bind(this);
    this.View.init();
    this.Model.init(this.needRendering.bind(this));
    this.needRendering();
};
Controller.prototype.moving = function (e) {
    this.Model.Move(e);
};
Controller.prototype.needRendering = function () {
    this.View.render(model.objs);
};
var controller = new Controller(view, model);
controller.init();
