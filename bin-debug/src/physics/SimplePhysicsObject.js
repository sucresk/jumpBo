var physics;
(function (physics) {
    var SimplePhysicsObject = (function () {
        function SimplePhysicsObject(width, height) {
            this.collisions = new Array();
            this.velocity = new egret.Point();
            this._x = 0;
            this._y = 0;
            this.width = 0;
            this.height = 0;
            this.mass = 0;
            this.debugColor = 0;
            this.width = width;
            this.height = height;
        }
        SimplePhysicsObject.prototype.onCollideDispatch = function (self, other, normal, impact) {
            if (this.onCollide != null) {
                this.onCollide(self, other, normal, impact);
            }
        };

        SimplePhysicsObject.prototype.onPersistDispatch = function (self, other, normal) {
            if (this.onPersist != null) {
                this.onPersist(self, other, normal);
            }
        };

        SimplePhysicsObject.prototype.onSeparateDispatch = function (self, other) {
            if (this.onSeparate != null) {
                this.onSeparate(self, other);
            }
        };

        Object.defineProperty(SimplePhysicsObject.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                if (this._showDebug) {
                    this._debugShape.x = this._x;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(SimplePhysicsObject.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                if (this._showDebug) {
                    this._debugShape.y = this._y;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(SimplePhysicsObject.prototype, "showDebug", {
            get: function () {
                return this._showDebug;
            },
            set: function (value) {
                if (this._showDebug != value) {
                    this._showDebug = value;
                    if (this._showDebug) {
                        if (this._debugShape == null) {
                            this._debugShape = new egret.Sprite();
                            this._debugShape.graphics.beginFill(this.debugColor, 0.5);
                            this._debugShape.graphics.drawRect(-this.width / 2, -this.height / 2, this.width, this.height);
                            this._debugShape.graphics.endFill();
                            if (this.debugContainer != null) {
                                this.debugContainer.addChild(this._debugShape);
                            }
                        }
                    } else {
                        if (this._debugShape) {
                            if (this.debugContainer != null) {
                                this.debugContainer.removeChild(this._debugShape);
                            }
                            this._debugShape.graphics.clear();
                            this._debugShape = null;
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });

        return SimplePhysicsObject;
    })();
    physics.SimplePhysicsObject = SimplePhysicsObject;
    SimplePhysicsObject.prototype.__class__ = "physics.SimplePhysicsObject";
})(physics || (physics = {}));
