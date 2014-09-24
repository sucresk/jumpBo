var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var physics;
(function (physics) {
    var DynamicPhysicsObject = (function (_super) {
        __extends(DynamicPhysicsObject, _super);
        function DynamicPhysicsObject(width, height) {
            _super.call(this, width, height);
            this.mass = 1;
        }
        return DynamicPhysicsObject;
    })(physics.SimplePhysicsObject);
    physics.DynamicPhysicsObject = DynamicPhysicsObject;
    DynamicPhysicsObject.prototype.__class__ = "physics.DynamicPhysicsObject";
})(physics || (physics = {}));
