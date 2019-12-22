var bodySize = document.body.getBoundingClientRect();
var colors = [];
colors.push("red", "blue", "green", "aqua", "yellow");
var svg = document.querySelector("svg");
var View = function () {
    const ball = function () {
        return {
            x: 0,
            y: 0,
            rad: 7,
        }
    };
    const platform = function () {
        return {
            x: 650,
            y: 500,
            w: 120,
            h: 15,
        }
    };
    const Score = function () {
        return {
            x: 0,
            y: 500,
            scoreText: "",
        }
    };
    const Block = function () {
        return {
            x: 0,
            y: 0,
            w: 0,
            h: 50,
            visible: true,
        }
    };

    this.ball = new ball();
    this.platform = new platform();
    this.score = new Score();

    // var svg = document.querySelector("svg");
    svg.setAttribute('width', (screen.width * 0.99).toString());
    svg.setAttribute('height', (window.innerHeight * 0.99).toString());
    this.platform.x = (screen.width / 2 - this.platform.w / 2);
    this.ball.x = (this.platform.x + this.platform.w / 2 - this.ball.rad);
    this.ball.y = (this.platform.y - this.ball.rad);
    svg.setAttribute('viewBox', '0 ' + '0 ' + screen.width + ' ' + document.body.offsetHeight);
    svg.innerHTML = '<rect x=\"' + this.platform.x + '\" y=\"' + this.platform.y + '\" width=\"' + this.platform.w + '\" height=\"' + this.platform.h + '\" fill= \"black\"  />';
    svg.innerHTML += '<circle cx=\"' + this.ball.x + '\" cy=\"' + this.ball.y + 10 + '\" r=\"' + this.ball.rad + '\" fill= \"red\"  />';
    document.body.append(svg);

    var count = Math.round((screen.width) / 100);
    var lines = 5;
    var width = (screen.width / count);

    // const Score = function () {
    //     return {
    //         x: 0,
    //         y: 500,
    //         scoreText: "",
    //         render: function (ctx) {
    //             ctx.fillStyle = '#ffffff';
    //             ctx.font = "100px Arial";
    //             ctx.fillText(this.scoreText, this.x, this.y);
    //         }
    //     }
    // };

    this.blocks = [];
    for (let i = 0; i < lines - 1; i++) {
        for (let j = 0; j < count; j++) {
            let block = new Block();
            block.w = width;
            block.y = i * block.h + i;
            block.x = j * block.w + j;
            block.visible = true;
            block.color = colors[Math.round(Math.random() * 4)];
            block.code = '<rect x=\"' + block.x + '\" y=\"' + block.y + '\" width=\"' + block.w + '\" height=\"' + 50 + '\" fill=\"' + block.color + '\" />';
            svg.innerHTML += block.code;
            this.blocks.push(block);
        }
    }
    this.onKeyDownEvent = null;
};

View.prototype.render = function (objs) {
    var r = document.querySelector("rect");
    var c = document.querySelector("circle");
    this.platform.x = objs.platform.x;
    r.setAttribute('x', this.platform.x);
    if (objs.ball.fly) {
        this.ball.x = objs.ball.x;
        this.ball.y = objs.ball.y;
        c.setAttribute('cx', this.ball.x);
        c.setAttribute('cy', this.ball.y);
    } else {
        this.ball.x = this.platform.x + this.platform.w / 2 - this.ball.rad;
        this.ball.y = this.platform.y - this.ball.rad - 3;
        objs.ball.x = this.ball.x;
        objs.ball.y = this.ball.y;
        c.setAttribute('cx', this.ball.x);
        c.setAttribute('cy', this.ball.y);
    }


    // this.score.scoreText = objs.score.value;
    //
    //
    // this.platform.render(this.ctx);
    // this.ball.render(this.ctx);
    // this.score.render(this.ctx);
    //
    // var old = svg.innerHTML;
    for (let i = 0; i < this.blocks.length; i++) {
        if (!this.blocks[i].visible) {
            var r = document.querySelectorAll("rect");
            r[i + 1].style.visibility = 'hidden';
        }
    }
};

View.prototype.init = function () {
    document.addEventListener('keydown', this.onKeyDownEvent);
};
var view = new View();