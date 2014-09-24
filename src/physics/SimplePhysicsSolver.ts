module physics
{
	export class SimplePhysicsSolver {

		private _collideChecks:Array<any> = [];
		private _overlapChecks:Array<any> = [];

		private _scene:SimplePhysicsScene;
		private _tickEnable:boolean;
		
		public constructor(scene:SimplePhysicsScene) {
			this._scene = scene;
		}

		/**
		 * Call this method once after the CitrusSolver constructor to tell the solver to report (and solve) collisions between the two specified objects.
		 * The CitrusSolver will then automatically test collisions between any game object of the specified type once per frame.
		 * You can only test collisions between a dynamic (movable) object and a static (non-movable) object.
		 * @param	dynamicObjectType The object that will be moved away from overlapping during a collision (probably your hero or something else that moves).
		 * @param	staticObjectType The object that does not move (probably your platform or wall, etc).
		 */
		public collide(dynamicObjectType:any, staticObjectType:any):void {
			
			this._collideChecks.push({a:dynamicObjectType, b:staticObjectType});
		}

		/**
		 * Call this method once after the CitrusSolver constructor to tell the solver to report overlaps between the two specified objects.
		 *  The CitrusSolver will then automatically test overlaps between any game object of the specified type once per frame.
		 * With overlaps, you ARE allowed to test between two dynamic (moving) objects.
		 * @param	typeA The first type of object you want to test for collisions against the second object type.
		 * @param	typeB The second type of object you want to test for collisions against the first object type.
		 */
		public overlap(typeA:any, typeB:any):void {
			
			this._overlapChecks.push({a:typeA, b:typeB});
		}

		public tick(intervalTime:number = 0):void {
			
			var length1:number = this._collideChecks.length;
			for(var i1:number = 0;i1 < length1;i1++){
				var pair:any = this._collideChecks[i1];
				
				if (pair.a == pair.b) {
					throw new Error("CitrusSolver does not test collisions against objects of the same type.");
				} else {
					// compare A's to B's
					var groupA:Array<SimplePhysicsObject> = this._scene.getObjectsByType(pair.a);
					
					for (var i:number = 0; i < groupA.length; ++i) {
						
						var itemA:SimplePhysicsObject = groupA[i];
						var groupB:Array<SimplePhysicsObject> = this._scene.getObjectsByType(pair.b);
						
						for (var j:number = 0; j < groupB.length; ++j) {
							
							var itemB:SimplePhysicsObject = groupB[j];
							this.collideOnce(itemA, itemB);
						}
					}
				}
			}

			var length2:number = this._overlapChecks.length;
			for(var i2:number = 0;i2 < length2;i2++){
				pair = this._overlapChecks[i2];
				
				if (pair.a == pair.b) {
					// compare A's to each other
					var group:Array<SimplePhysicsObject> = this._scene.getObjectsByType(pair.a);
					
					for (i = 0; i < group.length; ++i) {
						
						itemA = group[i];
						
						for (j = i + 1; j < group.length; ++j) {
							
							itemB = group[j];
							this.overlapOnce(itemA, itemB);
						}
					}
					
				} else {
					// compare A's to B's
					groupA = this._scene.getObjectsByType(pair.a);
					
					for (i = 0; i < groupA.length; ++i) {
						
						itemA = groupA[i];
						groupB = this._scene.getObjectsByType(pair.b);
						
						for (j = 0; j < groupB.length; ++j) {
							
							itemB = groupB[j];
							this.overlapOnce(itemA, itemB);
						}
					}
				}
			}
		}

		private collideOnce(a:SimplePhysicsObject, b:SimplePhysicsObject):boolean {
			
			var diffX:number = (a.width / 2 + b.width / 2) - Math.abs(a.x - b.x);
			if (diffX >= 0) {
				
				var diffY:number = (a.height / 2 + b.height / 2) - Math.abs(a.y - b.y);
				if (diffY >= 0) {
					
					var collisionType:number = 0;
					var impact:number;
					var normal:number;
					
					if (diffX < diffY) {
						// horizontal collision
						
						if (a.x < b.x) {
							a.x -= diffX;
							normal = 1;

							if (a.velocity.x > 0)
								a.velocity.x = 0;
								
						} else {
							a.x += diffX;
							normal = -1;

							if (a.velocity.x < 0)
								a.velocity.x = 0;
						}

						impact = Math.abs(b.velocity.x - a.velocity.x);

						if (!a.collisions[b]) {
							
							a.collisions[b] = new SimpleCollision(a, b, new egret.Point(normal, 0), -impact, SimpleCollision.BEGIN);
							a.onCollideDispatch(a, b, new egret.Point(normal, 0), -impact);
							
							b.collisions[a] = new SimpleCollision(b, a, new egret.Point(-normal, 0), impact, SimpleCollision.BEGIN);
							b.onCollideDispatch(b, a, new egret.Point(-normal, 0), impact);
							
						} else {
							
							a.collisions[b].type = SimpleCollision.PERSIST;
							a.collisions[b].impact = impact;
							a.collisions[b].normal.x = normal;
							a.collisions[b].normal.y = 0;
							a.onPersistDispatch(a, b, a.collisions[b].normal);
							
							b.collisions[a].type = SimpleCollision.PERSIST;
							b.collisions[a].impact = -impact;
							b.collisions[a].normal.x = -normal;
							b.collisions[a].normal.y = 0;
							b.onPersistDispatch(b, a, b.collisions[a].normal);
						}

					} else {
						// vertical collision
						
						if (a.y < b.y) {
							a.y -= diffY;
							normal = 1;

							if (a.velocity.y > 0)
								a.velocity.y = 0;
								
						} else {
							a.y += diffY;
							normal = -1;

							if (a.velocity.y < 0)
								a.velocity.y = 0;
						}

						impact = Math.abs(b.velocity.y - a.velocity.y);

						if (!a.collisions[b]) {
							
							a.collisions[b] = new SimpleCollision(a, b, new egret.Point(0, normal), -impact, SimpleCollision.BEGIN);
							a.onCollideDispatch(a, b, new egret.Point(0, normal), -impact);
							
							b.collisions[a] = new SimpleCollision(b, a, new egret.Point(0, -normal), impact, SimpleCollision.BEGIN);
							b.onCollideDispatch(b, a, new egret.Point(0, -normal), impact);
							
						} else {
							
							a.collisions[b].type = SimpleCollision.PERSIST;
							a.collisions[b].impact = impact;
							a.collisions[b].normal.x = 0;
							a.collisions[b].normal.y = normal;
							a.onPersistDispatch(a, b, a.collisions[b].normal);
							
							b.collisions[a].type = SimpleCollision.PERSIST;
							b.collisions[a].impact = -impact;
							b.collisions[a].normal.x = 0;
							b.collisions[a].normal.y = -normal;
							b.onPersistDispatch(b, a, b.collisions[a].normal);
						}
					}
					
					return true;
				}
			}

			if (a.collisions[b]) {
				
				a.onSeparateDispatch(a, b);
				delete a.collisions[b];
				
				b.onSeparateDispatch(b, a);
				delete b.collisions[a];
			}
			
			return false;
		}

		private overlapOnce(a:SimplePhysicsObject, b:SimplePhysicsObject):boolean {
			
			var overlap:boolean = (a.x + a.width / 2 >= b.x - b.width / 2 && a.x - a.width / 2 <= b.x + b.width / 2 && // x axis overlaps 
								a.y + a.height / 2 >= b.y - b.height / 2 && a.y - a.height / 2 <= b.y + b.height / 2); // y axis overlaps
								
			if (overlap) {
				a.onCollideDispatch(a, b, null, 0);
				b.onCollideDispatch(b, a, null, 0);
			}
			
			return overlap;
		}
		
		/* INTERFACE gemini.component.ITick */
		
		public set tickEnable(value:boolean) {
			this._tickEnable = value;
		}
	}
}



