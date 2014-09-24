module physics
{
	export class DynamicPhysicsObject extends SimplePhysicsObject{
		
		public constructor(width:number, height:number) {
			super(width, height);
			this.mass = 1;
		}
		
	}
}




