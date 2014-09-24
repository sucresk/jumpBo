var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(width, height) {
        _super.call(this, width, height);
        this._act = 0;
        this._state = Hero.STATE_NORMAL;
        this._skin = new egret.Bitmap();
        this._skin.texture = RES.getRes("heroDown");
        var sh = 480 / 640;
        this._skin.scaleX = sh;
        this._skin.scaleY = sh;
        this._skin.x = 165;
        this._speakContainer = new egret.Sprite();
        this._txtSpeak = new egret.TextField;
        this._txtSpeak.textColor = 0x000000;
        this._txtSpeak.textAlign = egret.HorizontalAlign.CENTER;
        this._txtSpeak.size = 18;
        this._speakContainer.addChild(this._txtSpeak);
        this._txtSpeak.y = 1;
        this._speakContainer.x = 200;
        this._skin.touchEnabled = false;
        this._skin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
    }
    Hero.prototype.tapHandler = function (e) {
        this.sayDirty();
    };

    Hero.prototype.sayDirty = function () {
        this._txtSpeak.text = "臭流氓";
        var w = this._txtSpeak.text.length * 18;
        var h = 20;
        this._txtSpeak.width = w;

        this._speakContainer.graphics.clear();
        this._speakContainer.graphics.beginFill(0xffffff);
        this._speakContainer.graphics.drawRoundRect(0, 0, w, h, 20, 20);
        this._speakContainer.graphics.endFill();
        if (this._container) {
            this._speakContainer.x = (this._container.stage.stageWidth - w) / 2;
            this._container.addChild(this._speakContainer);
        }
    };
    Hero.prototype.say = function () {
        this._txtSpeak.text = this.getSay();
        var w = this._txtSpeak.text.length * 18;
        var h = 20;
        this._txtSpeak.width = w;

        this._speakContainer.graphics.clear();
        this._speakContainer.graphics.beginFill(0xffffff);
        this._speakContainer.graphics.drawRoundRect(0, 0, w, h, 20, 20);
        this._speakContainer.graphics.endFill();
        if (this._container) {
            this._speakContainer.x = (this._container.stage.stageWidth - w) / 2;
            this._container.addChild(this._speakContainer);
        }
    };

    Hero.prototype.hideSay = function () {
        if (this._speakContainer.parent) {
            this._speakContainer.parent.removeChild(this._speakContainer);
        }
    };
    Hero.prototype.getSay = function () {
        var a = [
            "我是一只小小小肥鸟",
            "让我达到HIGH点，我就嫁给你",
            "讨厌啦，不要看人家的小内内",
            "啊～偶的节操被弹掉了",
            "好爽哦，根本停不下来有没有",
            "左边的亲们，看偶的姿势美不美"
        ];
        var index = Math.floor(Math.random() * a.length);
        return a[index];
    };

    Hero.prototype.addTo = function (scene, container) {
        this._scene = scene;
        this._container = container;
        scene.add(this);
        container.addChild(this._skin);
        //this.say();
    };
    Object.defineProperty(Hero.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (s) {
            if (this._state != s) {
                this._state = s;
            }
        },
        enumerable: true,
        configurable: true
    });

    Hero.prototype.up = function () {
        //return;
        if (this._act != Hero.ACT_UP && this._act != Hero.ACT_SUCCESS) {
            this._skin.texture = RES.getRes("heroUp");
            this._act = Hero.ACT_UP;
            this._skin.touchEnabled = false;
        }
    };
    Hero.prototype.down = function () {
        //return;
        if (this._act != Hero.ACT_DOWN) {
            this._skin.texture = RES.getRes("heroDown");
            this._act = Hero.ACT_DOWN;
            this.hideSay();
            this._skin.touchEnabled = true;
        }
    };
    Hero.prototype.success = function () {
        //return;
        if (this._act != Hero.ACT_SUCCESS) {
            this._act = Hero.ACT_SUCCESS;
            var r = Math.random();
            var sk = "heroUp";
            if (r > 0.8) {
                sk = "heroAct0";
            } else if (r > 0.6) {
                sk = "heroAct1";
            } else if (r > 0.4) {
                sk = "heroAct2";
            } else if (r > 0.2) {
                sk = "heroAct3";
            } else {
                sk = "heroPre";
            }
            this._skin.texture = RES.getRes(sk);
            this.say();
            this._skin.touchEnabled = false;
        }
    };
    Object.defineProperty(Hero.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;

            if (this._showDebug) {
                this._debugShape.y = this._y;
            }

             {
                this._skin.y = this._y - 50;
                this._speakContainer.y = this._y - 80;
            }
        },
        enumerable: true,
        configurable: true
    });
    Hero.STATE_NORMAL = 0;
    Hero.STATE_GROUND = 1;
    Hero.STATE_JUMP = 2;

    Hero.ACT_DOWN = 0;
    Hero.ACT_UP = 1;
    Hero.ACT_SUCCESS = 2;
    return Hero;
})(physics.DynamicPhysicsObject);
Hero.prototype.__class__ = "Hero";
