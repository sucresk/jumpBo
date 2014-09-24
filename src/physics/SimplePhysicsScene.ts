module physics
{
	export class SimplePhysicsScene {
		private _solver:SimplePhysicsSolver;
		private _objs:Array<SimplePhysicsObject>;
		private _len:number = 0;
		private _tickEnable:boolean;
		
		private _gravity:number = 0.01;
		
		private _debugShow:boolean;
		private _debugContainer:egret.DisplayObjectContainer;
		
		public userObject:any;
		
		public constructor() {
			this._solver = new SimplePhysicsSolver(this);
			this._objs = new Array<SimplePhysicsObject>();
			this.collide(DynamicPhysicsObject, StaticPhysicsObject);
		}
		
		public get gravity():number {
			return this._gravity;
		}
		
		public set gravity(value:number) {
			this._gravity = value;
		}
		
		public add(obj:SimplePhysicsObject):void{
			this._objs.push(obj);
			this._len++;
			if (this._debugShow){
				obj.debugContainer = this._debugContainer;
				obj.showDebug = true;
			}
		}
		
		public remove(obj:SimplePhysicsObject):void{
			var index:number = this._objs.indexOf(obj);
			if (index != -1){
				this._objs.splice(index, 1);
				this._len--;
			}
			if (this._debugShow){
				obj.showDebug = false;
			}
		}
		
		public collide(dynamicObjectType:any, staticObjectType:any):void {
			
			this._solver.collide(dynamicObjectType, staticObjectType);
		}
		
		public overlap(typeA:any, typeB:any):void {
			
			this._solver.overlap(typeA, typeB);
		}
		
		public getObjectsByType(type:any):Array<SimplePhysicsObject>{
			var r:Array<SimplePhysicsObject> = new Array<SimplePhysicsObject>();
			for (var i:number = 0; i < this._len; i++){
				if (this._objs[i] instanceof type){
					r.push(this._objs[i]);
				}
			}
			return r;
		}
		
		/* INTERFACE gemini.component.ITick */
		
		public set tickEnable(value:boolean) {
			this._tickEnable = value;
		}
		
		public tick(intervalTime:number = 0):void {
			
			var temp:SimplePhysicsObject;
			
			for (var i:number = 0; i < this._len; i++){
				temp = this._objs[i];
				if (temp.mass > 0){
					temp.velocity.y += this._gravity;
				}
				
				temp.x += temp.velocity.x * intervalTime;
				temp.y += temp.velocity.y * intervalTime;
			}
			
			this._solver.tick(intervalTime);
		}
		
		public showDebug(parent:egret.DisplayObjectContainer):void{
			this._debugContainer = parent;
			this._debugShow = true;
		}
	}
}




