module physics
{
	export class SimpleCollision {
		public static BEGIN:number = 0;
		public static PERSIST:number = 1;
		
		public self:SimplePhysicsObject;
		public other:SimplePhysicsObject;
		public normal:egret.Point;
		public impact:number;
		public type:number = 0;
		
		public constructor(self:SimplePhysicsObject, other:SimplePhysicsObject, normal:egret.Point, impact:number, type:number = 0) {
			this.self = self;
			this.other = other;
			this.normal = normal;
			this.impact = impact;
			this.type = type;
		}
	}
}




