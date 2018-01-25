/**
 * Created by JianJia.Zhou<jianjia.zhou@longmaster.com.cn> on 2018/1/12.
 */
var Time = (function () {
    var Time = function () {
        return Time.fn.init();
    };
    
    Time.fn.prototype = {
        init:function () {
            var RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame || window.oRequestAnimationFrame
            || window.msRequestAnimationFrame || function (callback) {
                window.setTimeout(callback,100/60);
            };
            
            this.start = function () {

            };
        },
        impactTest:function () {

        }

    };

    Time.fn.init.prototype = Time.fn;

    return Time;
})();