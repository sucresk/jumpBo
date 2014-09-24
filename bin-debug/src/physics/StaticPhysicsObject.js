var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var physics;
(function (physics) {
    var StaticPhysicsObject = (function (_super) {
        __extends(StaticPhysicsObject, _super);
        function StaticPhysicsObject(width, height) {
            _super.call(this, width, height);
        }
        return StaticPhysicsObject;
    })(physics.SimplePhysicsObject);
    physics.StaticPhysicsObject = StaticPhysicsObject;
    StaticPhysicsObject.prototype.__class__ = "physics.StaticPhysicsObject";
})(physics || (physics = {}));
