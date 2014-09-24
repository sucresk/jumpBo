var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StateIntro = (function (_super) {
    __extends(StateIntro, _super);
    function StateIntro() {
        _super.call(this);
        if (this.stage) {
            this.init();
        } else {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
    }
    StateIntro.prototype.onAddToStage = function (event) {
        //设置加载进度界面
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };

    StateIntro.prototype.init = function () {
        this._btnStart = new egret.Sprite();
        this._btnStart.graphics.beginFill(0xffff00);
        this._btnStart.graphics.drawRect(0, 0, 200, 100);
        this._btnStart.graphics.endFill();
        this._btnStart.width = 200;
        this._btnStart.height = 100;
        this._btnStart.touchEnabled = true;
        this._btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        this._btnStart.x = (this.stage.stageWidth - 200) / 2;
        this._btnStart.y = (this.stage.stageHeight - 100) / 2;

        //this.addChild(this._btnStart);
        this._bg = new egret.Bitmap();
        this._bg.texture = RES.getRes("startPage");
        this._bg.width = this.stage.stageWidth;
        this._bg.height = this.stage.stageHeight;
        this._bg.touchEnabled = true;
        this._bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        this.addChild(this._bg);
    };
    StateIntro.prototype.tapHandler = function (e) {
        this.dispatchEvent(new egret.Event("GameStart"));
    };
    return StateIntro;
})(egret.DisplayObjectContainer);
StateIntro.prototype.__class__ = "StateIntro";
