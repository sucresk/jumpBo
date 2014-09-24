var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        _super.call(this);
        this._radio = Circle.SIZE;
        //this._txt = new egret.TextField();
        //this.addChild(this._txt);
    }
    Circle.create = function () {
        if (Circle.allCircles.length > 0) {
            return Circle.allCircles.pop();
        } else {
            return new Circle();
        }
    };

    Object.defineProperty(Circle.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (i) {
            this._index = i;
            this._bmp.texture = RES.getRes("number" + i);
            //this._txt.text = i.toString();
            /*
            this.graphics.beginFill(0xff0000);
            this.graphics.drawCircle(0,0,this._radio);
            this.graphics.endFill();
            */
        },
        enumerable: true,
        configurable: true
    });
    Circle.prototype.init = function () {
        this._bmp = new egret.Bitmap();
        this._bmp.width = Circle.SIZE * 2;
        this._bmp.height = Circle.SIZE * 2;
        this._bmp.x = -Circle.SIZE;
        this._bmp.y = -Circle.SIZE;
        this.addChild(this._bmp);
    };
    Circle.prototype.destroy = function () {
        this.visible = true;

        //this.graphics.clear();
        Circle.allCircles.push(this);
    };
    Circle.SIZE = 30;

    Circle.allCircles = [];
    return Circle;
})(egret.Sprite);
Circle.prototype.__class__ = "Circle";
