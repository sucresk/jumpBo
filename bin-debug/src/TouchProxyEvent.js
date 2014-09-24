var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TouchProxyEvent = (function (_super) {
    __extends(TouchProxyEvent, _super);
    function TouchProxyEvent(type, bubbles, cancelable) {
        if (typeof bubbles === "undefined") { bubbles = false; }
        if (typeof cancelable === "undefined") { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    TouchProxyEvent.UP = "UP";
    TouchProxyEvent.DOWN = "DOWN";
    TouchProxyEvent.LEFT = "LEFT";
    TouchProxyEvent.RIGHT = "RIGHT";
    TouchProxyEvent.RIGHT_UP = "RIGHT_UP";
    TouchProxyEvent.RIGHT_DOWN = "RIGHT_DOWN";
    TouchProxyEvent.LEFT_UP = "LEFT_UP";
    TouchProxyEvent.LEFT_DOWN = "LEFT_DOWN";
    TouchProxyEvent.TAB = "TAB";
    TouchProxyEvent.POINT_THREE = "POINT_THREE";
    TouchProxyEvent.POINT_TWO = "POINT_TWO";
    TouchProxyEvent.POINT_FOUR = "POINT_FOUR";
    return TouchProxyEvent;
})(egret.Event);
TouchProxyEvent.prototype.__class__ = "TouchProxyEvent";
