class Circle extends egret.Sprite
{
	public static SIZE:number = 30;
	private _radio:number;
	private _index:number;
	private _txt:egret.TextField;
	private _bmp:egret.Bitmap;

	public static allCircles:Circle[] = [];

	public static create():Circle
	{
		if(Circle.allCircles.length > 0)
		{
			return Circle.allCircles.pop();
		}
		else
		{
			return new Circle();
		}
	}

	public constructor()
	{
		super();
		this._radio = Circle.SIZE;
		//this._txt = new egret.TextField();
		//this.addChild(this._txt);
		
	}
	public set index(i:number)
	{
		this._index = i;
		this._bmp.texture = RES.getRes("number" + i);
		//this._txt.text = i.toString();
		/*
		this.graphics.beginFill(0xff0000);
		this.graphics.drawCircle(0,0,this._radio);
		this.graphics.endFill();
		*/
	}
	public get index():number
	{
		return this._index;
	}
	public init()
	{
		this._bmp = new egret.Bitmap();
		this._bmp.width = Circle.SIZE * 2;
		this._bmp.height = Circle.SIZE * 2;
		this._bmp.x = -Circle.SIZE;
		this._bmp.y = -Circle.SIZE;
		this.addChild(this._bmp)
	}
	public destroy()
	{
		this.visible = true;
		//this.graphics.clear();
		Circle.allCircles.push(this);
	}
}