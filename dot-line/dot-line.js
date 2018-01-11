/**
 * Created by JianJia.Zhou<jianjia.zhou@longmaster.com.cn> on 2018/1/8.
 */
var DotEffects = (function () {
    var DotEffects = function (option) {
        return new DotEffects.fn.init(option);
    };
    DotEffects.fn = DotEffects.prototype = {
        init:function (option) {
            // canvas 宽度 & 高度
            this.cW = option.width || window.innerWidth;
            this.cH = option.height || window.innerHeight;
            this.oCanavas = document.querySelector("#dot_line");
            this.oCanavas.width = this.cW;
            this.oCanavas.height = this.cH;
            // canvas 对象
            this.oCtx = this.oCanavas.getContext("2d");
            // 设置小球数量
            this.dotNum = this.cH > 200 ? Math.ceil(this.cH / 3.8) : 200;
            // 小球最大间隔
            this.disMax = window.innerWidth / 10 * window.innerHeight / 8;
            // 鼠标移动小球
            this.mouseDot = {x: null, y: null, label: 'mouse'};
            // 小球数组
            this.dots = [];

            var RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame
                || window.mozRequestAnimationFrame || window.oRequestAnimationFrame
                || window.msRequestAnimationFrame || function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };

            this.start = function () {
                this.addDots();
                this.bindMouseMoveEvent();
                this.bindMouseOutEvent();
                setTimeout(function () {
                    this.animate();
                }.bind(this), 100);
            };
            // 动画
            this.animate = function () {
                // 重置高度实现清空画布
                this.oCanavas.height = this.cH;
                this.drawLine([this.mouseDot].concat(this.dots));
                RAF(this.animate);
            }.bind(this);
        },


        bindMouseMoveEvent:function () {
            if(!this.oCanavas) throw ("oCtx is undefined");
            this.oCanavas.onmousemove = function (event) {
                event = event || window.event;
                this.mouseDot.x = event.clientX || event.screenX;
                this.mouseDot.y = event.clientY || event.screenY;
            }.bind(this);

        },
        bindMouseOutEvent:function () {
            this.oCanavas.onmouseout = function (event) {
                this.mouseDot.x = null;
                this.mouseDot.y = null;
            }.bind(this);

        },
        random: function (min, max) {
            return Math.random() * (max - min) + min;
        },
        addDots: function () {
            var dot;
            for (var i = 0; i < this.dotNum; i++) {//参数
                dot = {
                    x: this.random(0, this.cW),
                    y: this.random(0, this.cH),
                    r: 1,
                    color: "#333",
                    mx: this.random(-1.5, 1.5),
                    my: this.random(-1.5, 1.5)
                };
                this.dots.push(dot);
            }
        },
        move:function(dot){
            dot.x += dot.mx;
            dot.y += dot.my;
            if(dot.x + dot.r > this.cW || dot.x - dot.r < 0){
                dot.mx = -dot.mx;
            }
            if(dot.y + dot.r > this.cH || dot.y - dot.r < 0){
                dot.my = -dot.my;
            }
            //绘制点
            this.oCtx.beginPath();
            this.oCtx.arc(dot.x, dot.y, dot.r, 0, Math.PI*2, true);
            this.oCtx.fillStyle = dot.color;
            this.oCtx.fill();
        },
        drawLine:function(dots){
            var nowDot;
            // 遍历两次所有的点，比较点之间的距离，函数的触发放在animate里
            this.dots.forEach(function(dot){
                this.move(dot);
                for(var j=0; j<dots.length; j++){
                    nowDot = dots[j];
                    if(nowDot===dot||nowDot.x===null||nowDot.y===null) continue;//continue跳出当前循环开始新的循环
                    var dx = dot.x - nowDot.x,//别的点坐标减当前点坐标
                        dy = dot.y - nowDot.y;
                    var dc = dx*dx + dy*dy;
                    if(Math.sqrt(dc)>Math.sqrt(this.disMax)) continue;
                    // 如果是鼠标，则让粒子向鼠标的位置移动
                    if (nowDot.label && Math.sqrt(dc) >Math.sqrt(this.disMax)/2) {
                        dot.x -= dx * 0.02;
                        dot.y -= dy * 0.02;
                    }
                    var ratio;
                    ratio = (this.disMax - dc) / this.disMax;

                    this.oCtx.beginPath();
                    this.oCtx.lineWidth = ratio / 2;
                    var rgb = ["255, 153, 0","255, 102, 102","0, 153, 204","255, 102, 102","0, 153, 204","204, 0, 102","255, 102, 102"
                        ,"102, 102, 51"];
                    var color = rgb[Math.floor(this.random(0,rgb.length))];
                    color = "0,0,0";
                    this.oCtx.strokeStyle = 'rgba('+ color +','+ (ratio + 0.2) + ')';
                    this.oCtx.moveTo(dot.x, dot.y);
                    this.oCtx.lineTo(nowDot.x, nowDot.y);
                    this.oCtx.stroke();//不描边看不出效果

                    //dots.splice(dots.indexOf(dot), 1);
                }
            }.bind(this));
        }
    };

    DotEffects.fn.init.prototype = DotEffects.fn;
    return DotEffects;
})();