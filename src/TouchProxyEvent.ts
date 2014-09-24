class TouchProxyEvent extends egret.Event
{
	public static UP:string = "UP";
	public static DOWN:string = "DOWN";
	public static LEFT:string = "LEFT";
	public static RIGHT:string = "RIGHT";
	public static RIGHT_UP:string = "RIGHT_UP";
	public static RIGHT_DOWN:string = "RIGHT_DOWN";
	public static LEFT_UP:string = "LEFT_UP";
	public static LEFT_DOWN:string = "LEFT_DOWN";
	public static TAB:string = "TAB";
	public static POINT_THREE:string = "POINT_THREE";
	public static POINT_TWO:string = "POINT_TWO";
	public static POINT_FOUR:string = "POINT_FOUR";

	public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false)
	{
		super(type, bubbles, cancelable);
	}
}