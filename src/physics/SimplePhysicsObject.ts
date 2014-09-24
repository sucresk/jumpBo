module physics
{
	export class SimplePhysicsObject{
		public collisions:any = new Array();
		
		public velocity:egret.Point = new egret.Point();
		public acceleration:egret.Point;
		public _x:number = 0;
		public _y:number = 0;
		public width:number = 0;
		public height:number = 0;
		public mass:number = 0;
		/**
		 * self:SimplePhysicsObject, other:SimplePhysicsObject, normal:Point, impact:Number
		 */
		public onCollide:Function;
		/**
		 * self:SimplePhysicsObject, other:SimplePhysicsObject, normal:Point
		 */
		public onPersist:Function;
		/**
		 * self:SimplePhysicsObject, other:SimplePhysicsObject
		 */
		public onSeparate:Function;
		
		public _showDebug:boolean;
		public _debugShape:egret.Sprite;
		public debugColor:number = 0;
		public debugContainer:egret.DisplayObjectContainer;
		
		public userObject:any;
		
		public constructor(width:number, height:number) {
			this.width = width;
			this.height = height;
		}
		
		public onCollideDispatch(self:SimplePhysicsObject, other:SimplePhysicsObject, normal:egret.Point, impact:number):void{
			if (this.onCollide != null){
				this.onCollide(self, other, normal, impact);
			}
		}
		
		public onPersistDispatch(self:SimplePhysicsObject, other:SimplePhysicsObject, normal:egret.Point):void{
			if (this.onPersist != null){
				this.onPersist(self, other, normal);
			}
		}
		
		public onSeparateDispatch(self:SimplePhysicsObject, other:SimplePhysicsObject):void{
			if (this.onSeparate != null){
				this.onSeparate(self, other);
			}
		}
		
		public get x():number {
			return this._x;
		}
		
		public set x(value:number) {
			this._x = value;
			if (this._showDebug){
				this._debugShape.x = this._x;
			}
		}
		
		public get y():number {
			return this._y;
		}
		
		public set y(value:number) {
			this._y = value;
			if (this._showDebug){
				this._debugShape.y = this._y;
			}
		}
		
		public get showDebug():boolean {
			return this._showDebug;
		}
		
		public set showDebug(value:boolean) {
			if (this._showDebug != value){
				this._showDebug = value;
				if (this._showDebug){
					if (this._debugShape == null){
						this._debugShape = new egret.Sprite();
						this._debugShape.graphics.beginFill(this.debugColor, 0.5);
						this._debugShape.graphics.drawRect(-this.width / 2, -this.height / 2, this.width, this.height);
						this._debugShape.graphics.endFill();
						if (this.debugContainer != null){
							this.debugContainer.addChild(this._debugShape);
						}
						
					}
				}
				else{
					if (this._debugShape){
						if (this.debugContainer != null){
							this.debugContainer.removeChild(this._debugShape);
						}
						this._debugShape.graphics.clear();
						this._debugShape = null;
					}
				}
			}
			
		}
	}
}




