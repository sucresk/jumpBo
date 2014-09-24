var physics;
(function (physics) {
    var SimplePhysicsScene = (function () {
        function SimplePhysicsScene() {
            this._len = 0;
            this._gravity = 0.01;
            this._solver = new physics.SimplePhysicsSolver(this);
            this._objs = new Array();
            this.collide(physics.DynamicPhysicsObject, physics.StaticPhysicsObject);
        }
        Object.defineProperty(SimplePhysicsScene.prototype, "gravity", {
            get: function () {
                return this._gravity;
            },
            set: function (value) {
                this._gravity = value;
            },
            enumerable: true,
            configurable: true
        });


        SimplePhysicsScene.prototype.add = function (obj) {
            this._objs.push(obj);
            this._len++;
            if (this._debugShow) {
                obj.debugContainer = this._debugContainer;
                obj.showDebug = true;
            }
        };

        SimplePhysicsScene.prototype.remove = function (obj) {
            var index = this._objs.indexOf(obj);
            if (index != -1) {
                this._objs.splice(index, 1);
                this._len--;
            }
            if (this._debugShow) {
                obj.showDebug = false;
            }
        };

        SimplePhysicsScene.prototype.collide = function (dynamicObjectType, staticObjectType) {
            this._solver.collide(dynamicObjectType, staticObjectType);
        };

        SimplePhysicsScene.prototype.overlap = function (typeA, typeB) {
            this._solver.overlap(typeA, typeB);
        };

        SimplePhysicsScene.prototype.getObjectsByType = function (type) {
            var r = new Array();
            for (var i = 0; i < this._len; i++) {
                if (this._objs[i] instanceof type) {
                    r.push(this._objs[i]);
                }
            }
            return r;
        };

        Object.defineProperty(SimplePhysicsScene.prototype, "tickEnable", {
            /* INTERFACE gemini.component.ITick */
            set: function (value) {
                this._tickEnable = value;
            },
            enumerable: true,
            configurable: true
        });

        SimplePhysicsScene.prototype.tick = function (intervalTime) {
            if (typeof intervalTime === "undefined") { intervalTime = 0; }
            var temp;

            for (var i = 0; i < this._len; i++) {
                temp = this._objs[i];
                if (temp.mass > 0) {
                    temp.velocity.y += this._gravity;
                }

                temp.x += temp.velocity.x * intervalTime;
                temp.y += temp.velocity.y * intervalTime;
            }

            this._solver.tick(intervalTime);
        };

        SimplePhysicsScene.prototype.showDebug = function (parent) {
            this._debugContainer = parent;
            this._debugShow = true;
        };
        return SimplePhysicsScene;
    })();
    physics.SimplePhysicsScene = SimplePhysicsScene;
    SimplePhysicsScene.prototype.__class__ = "physics.SimplePhysicsScene";
})(physics || (physics = {}));
