var physics;
(function (physics) {
    var SimpleCollision = (function () {
        function SimpleCollision(self, other, normal, impact, type) {
            if (typeof type === "undefined") { type = 0; }
            this.type = 0;
            this.self = self;
            this.other = other;
            this.normal = normal;
            this.impact = impact;
            this.type = type;
        }
        SimpleCollision.BEGIN = 0;
        SimpleCollision.PERSIST = 1;
        return SimpleCollision;
    })();
    physics.SimpleCollision = SimpleCollision;
    SimpleCollision.prototype.__class__ = "physics.SimpleCollision";
})(physics || (physics = {}));
