var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PhysicsTest = (function (_super) {
    __extends(PhysicsTest, _super);
    function PhysicsTest() {
        _super.call(this);
        this._speeds = [-0.15, -0.2, -0.35];

        //this.init();
        if (this.stage) {
            this.init();
        } else {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
    }
    PhysicsTest.prototype.onAddToStage = function (event) {
        //设置加载进度界面
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };

    PhysicsTest.prototype.initUI = function () {
        this._ui = new MainUI();

        //this._ui.x = 200;
        this.addChild(this._ui);
    };
    PhysicsTest.prototype.init = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;

        /*
        this._bg = new egret.Bitmap();
        this._bg.texture = RES.getRes("bg");
        this._bg.width = stageW;
        this._bg.height = stageH;
        this.addChild(this._bg);
        */
        this._txtScore = new egret.TextField();
        this._txtScore.x = (stageW - this._txtScore.width) / 2;
        this._txtScore.y = 200;
        this._txtScore.text = "开始";

        //this.addChild(this._txtScore);
        //console.log("aaaa",stageW,stageH)
        this._txtAdd = new egret.TextField();
        this._txtAdd.textColor = 0xffff00;

        //this.graphics.beginFill(0x999999);
        ///this.graphics.drawRect(0,0,stageW,stageH);
        //this.graphics.endFill();
        this._scene = new physics.SimplePhysicsScene();
        this._debugContainer = new egret.Sprite();

        //this.addChild(this._debugContainer);
        //this._scene.showDebug(this._debugContainer);
        this._ground = new physics.StaticPhysicsObject(stageW, 100);

        //this._scene.add(this._ground);
        this._ground.y = stageH - 100;
        this._ground.x = stageW / 2;
        this._bed = new egret.Bitmap();
        this._bed.texture = RES.getRes("bed0");
        var sBed = 480 / 640;
        this._bed.scaleX = sBed;
        this._bed.scaleY = sBed;
        this._bed.y = this._ground.y - 100;
        this._bed.x = 90;

        this._bedIn = new egret.Bitmap();
        this._bedIn.texture = RES.getRes("bedIn");

        //var sBed:number = 480/640;
        this._bedIn.scaleX = sBed;
        this._bedIn.scaleY = sBed;
        this._bedIn.y = this._ground.y - 15 + 20;
        this._bedIn.x = 138;
        this._bedIn.height = 1;

        this.addChild(this._bed);

        //console.log(this._ground.y + "  " + this._ground.x);
        //console.log("touch");
        this._opered = true;
        this._hero = new Hero(50, 50);

        //this._scene.add(this._hero);
        this._hero.addTo(this._scene, this);
        this._scene.gravity = PhysicsTest.NORMAL_G;
        this._hero.x = stageW / 2;
        this._hero.y = 400;
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this._hero.onCollide = this.onCollide;

        this.addChild(this._bedIn);

        this._bedHalf = new egret.Bitmap();
        this._bedHalf.texture = RES.getRes("bedHalf");

        //var sBed:number = 480/640;
        this._bedHalf.scaleX = sBed;
        this._bedHalf.scaleY = sBed;
        this._bedHalf.y = this._ground.y - 100;
        this._bedHalf.x = 90;
        this.addChild(this._bedHalf);

        this._touchProxy = new TouchProxy();
        this._touchProxy.addEventListener(TouchProxyEvent.DOWN, this.onTouchDown, this);
        this._touchProxy.addEventListener(TouchProxyEvent.UP, this.onTouchDown, this);
        this._touchProxy.addEventListener(TouchProxyEvent.LEFT, this.onTouchDown, this);
        this._touchProxy.addEventListener(TouchProxyEvent.RIGHT, this.onTouchDown, this);
        this._touchProxy.addEventListener(TouchProxyEvent.RIGHT_UP, this.onTouchDown, this);
        this._touchProxy.addEventListener(TouchProxyEvent.RIGHT_DOWN, this.onTouchDown, this);
        this._touchProxy.addEventListener(TouchProxyEvent.LEFT_UP, this.onTouchDown, this);
        this._touchProxy.addEventListener(TouchProxyEvent.LEFT_DOWN, this.onTouchDown, this);
        this._touchProxy.addEventListener(TouchProxyEvent.POINT_THREE, this.onTouchDown, this);
        this._touchProxy.addEventListener(TouchProxyEvent.POINT_TWO, this.onTouchDown, this);
        this._touchProxy.addEventListener(TouchProxyEvent.POINT_FOUR, this.onTouchDown, this);
        this._touchProxy.addEventListener(TouchProxyEvent.TAB, this.onTouchDown, this);
        this.addChild(this._touchProxy);
        this._curSpeedIndex = 0;
        this._lastTime = egret.getTimer();

        this._groundY = stageH - 200;
        this._lowOperY = this._groundY - 50;
        this._highOperY = 150;

        //this.graphics.lineStyle( 10, 0x00ff00 );
        //this.graphics.moveTo(0, this._groundY);
        //this.graphics.lineTo(stageW, this._groundY);
        this._curLevel = 0;
        this._curJump = 0;
        this._comboo = 0;
        this.initUI();
        this.addChild(this._debugContainer);
    };

    PhysicsTest.prototype.addScore = function (s, co) {
        if (co > 1) {
            this._txtAdd.text = "+" + s.toString() + " x" + co.toString() + " Comboo";
        } else {
            this._txtAdd.text = "+" + s.toString();
        }
        this._txtAdd.alpha = 1;
        this.addChild(this._txtAdd);
        var tw = egret.Tween.get(this._txtAdd);
        this._txtAdd.y = this.stage.stageHeight / 2;
        this._txtAdd.x = this.stage.stageWidth / 2 - 50;
        tw.to({ y: this.stage.stageHeight / 2 - 100, alpha: 0 }, 3000);
    };
    PhysicsTest.prototype.onTouchDown = function (e) {
        console.log("e: ", e.type, "t:", this._touchProxy.type, ", state: ", this._hero.state);
        if (this._hero.state == Hero.STATE_GROUND && e.type == TouchProxyEvent.TAB) {
            this._curSpeedIndex += 2;
            console.log(this._curSpeedIndex);
        } else if (this._state == PhysicsTest.STATE_OPER && !this._opered) {
            if (e.type == TouchProxyEvent.TAB)
                return;
            this._opered = true;

            if (e.type == this._touchProxy.type) {
                this.success();
                this._hero.success();
            } else {
                this.fail();
            }
            this._touchProxy.hide();
        }
    };
    PhysicsTest.prototype.success = function () {
        this._successed = true;
        this._txtScore.text = "Success" + "x" + this._comboo.toString() + " jump:" + this._curJump.toString();
        this._curLevel++;
        this._comboo++;
        this._ui.score = this.getScore();
    };
    PhysicsTest.prototype.fail = function () {
        this._successed = false;
        this._txtScore.text = "Fail" + " jump:" + this._curJump.toString();
        ;
        this._comboo = 0;
    };
    PhysicsTest.prototype.gameOver = function () {
        this._txtScore.text = "gameOver";
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.dispatchEvent(new egret.Event("GameOver"));
    };
    PhysicsTest.prototype.onEnterFrame = function (e) {
        this._curTime = egret.getTimer();
        this._intervalTime = this._curTime - this._lastTime;
        this._lastTime = this._curTime;

        //console.log(this._intervalTime);
        //this._scene.tick(this._intervalTime);
        this._scene.tick(18);

        switch (this._hero.state) {
            case Hero.STATE_NORMAL:
                if (this._hero.velocity.y < 0) {
                    //console.log("aaa",this._hero.y, this._lowOperY);
                    this._hero.up();
                    this._scene.gravity = PhysicsTest.NORMAL_G;
                    if (this._hero.y <= this._lowOperY) {
                        if (!this._opered && this._curSpeedIndex >= 2) {
                            this._touchProxy.show();
                            this._state = PhysicsTest.STATE_OPER;
                        }
                        //console.log("bbb");
                    }
                    if (this._hero.y <= this._highOperY) {
                        this._touchProxy.hide();
                        this._state = PhysicsTest.STATE_NOOPER;
                        if (!this._opered) {
                            if (!this._successed && this._curSpeedIndex >= 2) {
                                this.fail();
                            }
                        }
                        //console.log("ccc");
                    }
                } else {
                    this._hero.down();
                    this._scene.gravity = PhysicsTest.DOWN_G;
                }
                if (this._hero.y >= this._groundY) {
                    this._scene.gravity = PhysicsTest.GROUND_G;
                    this._hero.state = Hero.STATE_GROUND;
                    this._hero.hideSay();
                    //this._touchProxy.hide();
                }
                break;
            case Hero.STATE_GROUND:
                //console.log("aaaaaa", this._hero.y - this._groundY)
                this._bedIn.height = this._hero.y - this._groundY + 20;
                if (this._hero.velocity.y <= 0) {
                    console.log("jump", this._curSpeedIndex);
                    this._scene.gravity = PhysicsTest.NORMAL_G;
                    this._hero.state = Hero.STATE_JUMP;
                    this._curSpeedIndex -= 1;
                    if (this._curSpeedIndex > 2)
                        this._curSpeedIndex = 2;
                    else if (this._curSpeedIndex < 0)
                        this._curSpeedIndex = 0;
                    this._hero.velocity.y = this._speeds[this._curSpeedIndex];
                    if (this._curSpeedIndex >= 2) {
                        this._opered = false;
                    } else {
                        this._comboo = 0;
                    }
                    this._curJump++;
                    this._ui.jump = PhysicsTest.MAX_JUMP - this._curJump;
                    if (this._curJump >= PhysicsTest.MAX_JUMP) {
                        this.gameOver();
                    }
                }
                break;
            case Hero.STATE_JUMP:
                if (this._hero.y < this._groundY) {
                    this._hero.state = Hero.STATE_NORMAL;
                } else {
                    //console.log("bbbb", this._hero.y - this._groundY)
                    this._bedIn.height = this._hero.y - this._groundY + 20;
                }
                this._touchProxy.type = this.getTouchType(this._curLevel);
                this._successed = false;

                break;
        }
    };
    PhysicsTest.prototype.getScore = function () {
        var a = this._curLevel * 10;
        a += Math.ceil(Math.random() * 3);
        this.addScore(a, this._comboo);
        return a * this._comboo;
    };

    PhysicsTest.prototype.getTouchType = function (level) {
        //return TouchProxy.RIGHT_UP;
        if (level < 3) {
            var r = Math.random();
            if (r > 0.9) {
                return TouchProxy.UP;
            } else if (r > 0.8) {
                return TouchProxy.DOWN;
            } else if (r > 0.7) {
                return TouchProxy.LEFT;
            } else if (r > 0.6) {
                return TouchProxy.RIGHT;
            } else if (r > 0.45) {
                return TouchProxy.LEFT_UP;
            } else if (r > 0.3) {
                return TouchProxy.LEFT_DOWN;
            } else if (r > 0.15) {
                return TouchProxy.RIGHT_UP;
            } else {
                return TouchProxy.RIGHT_DOWN;
            }
        } else if (level == 3) {
            return TouchProxy.POINT_TWO;
        } else if (level == 4) {
            return TouchProxy.POINT_THREE;
        } else {
            return TouchProxy.POINT_FOUR;
        }
    };

    PhysicsTest.prototype.onCollide = function (self, other, normal, impact) {
        self.velocity.y = -0.2;
    };
    PhysicsTest.STATE_OPER = 1;
    PhysicsTest.STATE_NOOPER = 2;
    PhysicsTest.NORMAL_G = 0.002;
    PhysicsTest.DOWN_G = 0.006;
    PhysicsTest.GROUND_G = -0.04;
    PhysicsTest.MAX_JUMP = 10;
    return PhysicsTest;
})(egret.Sprite);
PhysicsTest.prototype.__class__ = "PhysicsTest";
