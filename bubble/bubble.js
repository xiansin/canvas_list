/**
 * Created by JianJia.Zhou<jianjia.zhou@longmaster.com.cn> on 2018/2/12.
 */
var Bubble = (function (window) {
    // 版本
    var version = "0.0.1";

    var Bubble = function (selector,bubble_num) {
        return new Bubble.fn.init(selector,bubble_num);
    };
    Bubble.fn = Bubble.prototype = {
        init: function (selector,bubble_num) {
            this.dom = selector;
            this.canvas = document.querySelector(this.dom);
            this.colors = ["#FFFFCC", "#99CCCC", "#FFCC99", "#FFCCCC", "#FF6666", "#99CCCC", "#99CC66"];
            this.myCanvas = this.canvas.getContext("2d");
            this.xR = 100;
            this.yR = 60;
            this.canvasWidth = 0;
            this.canvasHeight = 0;
            var _this = this;
            bubble_num = bubble_num || 500;
            // 绑定事件
            this.bindEvents();
            // 创建小球
            this.create(bubble_num);
            /**
             * 改变窗口 重置画布大小
             */
            ~~function setSize() {
                window.onresize = arguments.callee;
                _this.canvasWidth = window.innerWidth;
                _this.canvasHeight = window.innerHeight;
                _this.canvas.width = _this.canvasWidth;
                _this.canvas.height = _this.canvasHeight;
            }();

        },
        draw: function () {
            myCanvas.beginPath();
            myCanvas.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            myCanvas.fillStyle = this.color;
            myCanvas.fill();
        },
        move: function () {
            this.x += this.mx;
            this.y += this.my;
            // 如果移动到 最左/右 回弹
            if (this.x + this.r >= w || this.x - this.r < 0) {
                this.mx = -this.mx;
            }
            // 如果移动到 最上/下 回弹
            if (this.y + this.r >= h || this.y - this.r < 0) {
                this.my = -this.my;
            }
            var xr = this.x - x;
            var xr1 = x - this.x;
            var yr = this.y - y;
            var yr1 = y - this.y;
            if (xr > xR || xr1 > xR || yr > yR || yr1 > yR) {
                this.r = this.R;
            }
            // 重新绘制
            this.draw()
        },
        random: function (min, max) {
            return Math.random() * (max - min) + min;
        },
        bindEvents: function () {
            this.canvas.addEventListener("mousemove", function () {
                this.x = event.clientX || event.screenX;
                this.y = event.clientY || event.screenY;
                for (var item of this.items) {
                    var xr = item.x - this.x;
                    var xr1 = this.x - item.x;
                    var yr = item.y - this.y;
                    var yr1 = this.y - item.y;
                    if (((xr < this.xR && this.xr > 0) || (xr1 < this.xR && xr1 > 0))
                        && ((yr < this.yR && yr > 0) || (yr1 < this.yR && yr1 > 0))) {
                        item.r = item.R;
                        item.r *= 8;
                    } else {
                        item.r = item.R;
                    }
                }
            }.bind(this));

            this.canvas.addEventListener("onmouseout", function () {
                for (var item of this.items) {
                    item.r = item.R;
                }
            }.bind(this));
        },
        create:function (num){
            for(var  i = 0;i < num; i++){
                var  item = new Bubble(this.dom);
                item.init();
                item.draw();
                this.items.push(item);
            }
        }


    };
    Bubble.fn.init.prototype = Bubble.fn;

    return Bubble;
});