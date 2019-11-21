var bodySize = document.body.getBoundingClientRect();
var colors = [];
colors.push("red", "blue", "green", "aqua", "yellow");
var View = function () {
    var canvasBlock = document.querySelector('canvas');
    canvasBlock.setAttribute('width', (bodySize.width * 0.995).toString() + 'px');
    canvasBlock.setAttribute('height', (window.innerHeight * 0.995).toString() + 'px');
    canvasBlock.setAttribute('margin-left', (bodySize.width * 0.25).toString() + 'px');
    var count = Math.round((document.querySelector('canvas').width) / 100);
    var lines = 5;
    var width = (document.querySelector('canvas').clientWidth / count);

    this.ctx = canvasBlock.getContext('2d');
    const ball = function () {
        return {
            x: 0,
            y: 0,
            rad: 7,
            render: function (ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
                ctx.fillStyle = '#FF0000';
                ctx.fill();
            }
        }
    };
    const platform = function () {
        return {
            x: 0,
            y: 500,
            w: 120,
            h: 15,
            color: 0,
            render: function (ctx) {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(this.x, this.y, this.w, this.h);
            }
        }
    };
    const Score = function () {
        return {
            x: 0,
            y: 500,
            scoreText: "",
            render: function (ctx) {
                ctx.fillStyle = '#ffffff';
                ctx.font = "100px Arial";
                ctx.fillText(this.scoreText, this.x, this.y);
            }
        }
    };
    const Block = function () {
        return {
            x: 0,
            y: 0,
            w: 0,
            h: 50,
            visible: true,
            render: function (ctx, color) {
                if (color == null)
                    color = '#fff';
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.w, this.h);
            }
        }
    };

    this.ball = new ball();
    this.platform = new platform();
    this.score = new Score();
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
    this.onKeyDownEvent = null;
};

View.prototype.render = function (objs) {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, bodySize.width, window.innerHeight);

    this.platform.x = objs.platform.x;
    if (objs.ball.fly) {
        this.ball.x = objs.ball.x;
        this.ball.y = objs.ball.y;
    } else {
        this.ball.x = this.platform.x + 60;
        this.ball.y = this.platform.y - 10;
        objs.ball.x = this.ball.x;
        objs.ball.y = this.ball.y;
    }
    this.score.scoreText = objs.score.value;


    this.platform.render(this.ctx);
    this.ball.render(this.ctx);
    this.score.render(this.ctx);

    for (let i = 0; i < this.blocks.length; i++) {
        if (this.blocks[i].visible)
            this.blocks[i].render(this.ctx, this.blocks[i].color);
    }
};

View.prototype.init = function () {
    document.addEventListener('keydown', this.onKeyDownEvent);
};
var view = new View();