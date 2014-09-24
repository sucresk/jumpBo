class TouchProxy extends egret.DisplayObjectContainer
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

	public static POINT_CONTAINER_SIZE:number = 250;

	private _startX:number;
	private _startY:number;
	private _endX:number;
	private _endY:number;

	private _startStageX:number;
	private _startStageY:number;
	private _endStageX:number;
	private _endStageY:number;

	private _type:string;
	private _view:egret.DisplayObject;
	private _arrow:egret.Sprite;
	private _circleContainer:egret.DisplayObjectContainer;
	private _viewW:number;
	private _viewH:number;
	private _pointCircles:Circle[];
	private _curTabIndex:number;

	public constructor()
	{
		super();
		if(this.stage)
		{
			this.init();
		}
		else
		{
			this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		
		
	}

	public show()
	{
		if(this._view && !this._view.parent)
		{
			if(this.stage)
			{
				this._view.x = (this.stage.stageWidth) / 2;
				this._view.y = (this.stage.stageHeight) / 2;
				//console.log("aaaa",this.stage.stageWidth, this._viewW)
			}
			this.addChild(this._view);
		}
	}
	public hide()
	{
		if(this._view && this._view.parent)
		{
			this.removeChild(this._view);
		}
		this.clear();
		this._type = "";
	}
	public set type(t:string)
	{
		if(this._type != t)
		{
			this._type = t;
			if(!this._arrow)
				this.createArrow();
			this._view = this._arrow;
			switch(this._type)
			{
				case TouchProxy.UP:
					this._arrow.rotation = -90;
					this._viewW = 100;
					this._viewH = 300;
					break;
				case TouchProxy.DOWN:
					this._arrow.rotation = 90;
					this._viewW = 100;
					this._viewH = 300;
					break;
				case TouchProxy.LEFT:
					this._arrow.rotation = 180;
					this._viewW = 300;
					this._viewH = 100;
					break;
				case TouchProxy.RIGHT:
					this._arrow.rotation = 0;
					this._viewW = 300;
					this._viewH = 100;
					break;
				case TouchProxy.LEFT_UP:
					this._arrow.rotation = -135;
					this._viewW = 240;
					this._viewH = 240;
					break;
				case TouchProxy.LEFT_DOWN:
					this._arrow.rotation = 135;
					this._viewW = 240;
					this._viewH = 240;
					break;
				case TouchProxy.RIGHT_UP:
					this._arrow.rotation = -45;
					this._viewW = 240;
					this._viewH = 240;
					break;
				case TouchProxy.RIGHT_DOWN:
					this._arrow.rotation = 45;
					this._viewW = 240;
					this._viewH = 240;
					break;
				case TouchProxy.POINT_THREE:
					this._curTabIndex = 1;
					this.createPoint(3);
					this._view = this._circleContainer;
					this._viewW = this._circleContainer.width;
					this._viewH = this._circleContainer.height;
					break;
				case TouchProxy.POINT_TWO:
					this._curTabIndex = 1;
					this.createPoint(2);
					this._view = this._circleContainer;
					this._viewW = this._circleContainer.width;
					this._viewH = this._circleContainer.height;
					break;
				case TouchProxy.POINT_FOUR:
					this._curTabIndex = 1;
					this.createPoint(4);
					this._view = this._circleContainer;
					this._viewW = this._circleContainer.width;
					this._viewH = this._circleContainer.height;
					break;
			}
		}
			
	}
	public get type():string
	{
		return this._type;
	}

	private createArrow()
	{
		this._arrow = new egret.Sprite();
		this._arrow.graphics.lineStyle( 10, 0xffff99 );
		this._arrow.graphics.moveTo(-150, 0);
		this._arrow.graphics.lineTo(150, 0);
		this._arrow.graphics.moveTo(50, -50);
		this._arrow.graphics.lineTo(150, 0);
		this._arrow.graphics.moveTo(50, 50);
		this._arrow.graphics.lineTo(150, 0);
		this._arrow.alpha = 0.7;
	}
	private hitTestCircle(x:number, y:number):number
	{
		var i:number = 0;
		var len:number = this._pointCircles.length;
		var c:Circle;
		var lenX:number;
		var lenY:number;
		var l:number;
		var sizeS:number = Circle.SIZE * Circle.SIZE;
		for(i = 0; i < len; i++)
		{

			c = this._pointCircles[i];
			lenX = c.x - x;
			lenY = c.y - y;
			l = lenX * lenX + lenY * lenY;
			if( l < sizeS)
			{
				c.visible = false;
				return c.index;
			}
		}
		return -1;
	}

	private createPoint(num:number)
	{

		//clear();
		var tempX:number;
		var tempY:number;
		for(var i:number = 0; i < num; i++)
		{
			var c:Circle = Circle.create();
			tempX = TouchProxy.POINT_CONTAINER_SIZE/2 - Math.random() * TouchProxy.POINT_CONTAINER_SIZE;
			tempY = TouchProxy.POINT_CONTAINER_SIZE/2 - Math.random() * TouchProxy.POINT_CONTAINER_SIZE;
			while(!this.checkRadio(tempX,tempY))
			{
				tempX = TouchProxy.POINT_CONTAINER_SIZE/2 - Math.random() * TouchProxy.POINT_CONTAINER_SIZE;
				tempY = TouchProxy.POINT_CONTAINER_SIZE/2 - Math.random() * TouchProxy.POINT_CONTAINER_SIZE;
			}
			c.x = tempX;
			c.y = tempY;
			
			c.init();
			c.index = i+1;
			this._pointCircles.push(c);
			this._circleContainer.addChild(c);
		}
	}
	private checkRadio(x:number,y:number)
	{
		var i:number = 0;
		var len:number = this._pointCircles.length;
		var c:Circle;
		var lenX:number;
		var lenY:number;
		var l:number;
		var sizeS:number = Circle.SIZE * Circle.SIZE * 4;
		for(i = 0; i < len; i++)
		{
			c = this._pointCircles[i];
			lenX = c.x - x;
			lenY = c.y - y;
			l = lenX * lenX + lenY * lenY;
			if( l < sizeS)
			{
				return false;
			}
		}
		return true;
	}
	private clear()
	{
		if(this._pointCircles.length > 0)
		{
			for(var j:number = 0, len:number = this._pointCircles.length; j < len; j++)
			{
				this._pointCircles[j].destroy();
			}
			this._circleContainer.removeChildren();
			this._pointCircles.length = 0;
		}
	}

	private onAddToStage(event:egret.Event){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.init();
    }

    private init()
    {
    	this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler,this);
		this._pointCircles = [];
		this._circleContainer = new egret.DisplayObjectContainer();
		this._curTabIndex = 1;
    }

	private touchHandler(evt:egret.TouchEvent)
	{
		console.log("evt:", evt.type);
		switch(evt.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				this._startX = evt.localX;
				this._startY = evt.localY;
				this._startStageX = evt.stageX;
				this._startStageY = evt.stageY;
				break;
			case egret.TouchEvent.TOUCH_END:
				this._endX = evt.localX;
				this._endY = evt.localY;
				this._endStageX = evt.stageX;
				this._endStageY = evt.stageY;
				if(this._endX > this._startX + 100)
				{
					if(this._endY > this._startY + 100)
					{
						//console.log("right down");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.RIGHT_DOWN));
					}
					else if(this._endY < this._startY - 100)
					{
						//console.log("right up");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.RIGHT_UP));
					}
					else
					{
						//console.log("right");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.RIGHT));
					}

				}
				else if(this._endX < this._startX - 100)
				{
					if(this._endY > this._startY + 100)
					{
						//console.log("left down");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.LEFT_DOWN));
					}
					else if(this._endY < this._startY - 100)
					{
						//console.log("left up");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.LEFT_UP));
					}
					else
					{
						//console.log("left");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.LEFT));
					}
				}
				else
				{
					if(this._endY > this._startY + 100)
					{
						//console.log("down");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.DOWN));
					}
					else if(this._endY < this._startY - 100)
					{
						//console.log("up");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.UP));
					}
					else
					{
						//console.log("tab");
						this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.TAB));
					}
				}
				if(this._type == TouchProxy.POINT_THREE
					||this._type == TouchProxy.POINT_TWO
					||this._type == TouchProxy.POINT_FOUR
				  )
				{
					var tabIndex:number = this.hitTestCircle(this._endX - this._view.x, this._endY - this._view.y);
					if(tabIndex == this._curTabIndex)
					{
						if(tabIndex == 2 && this._type == TouchProxy.POINT_TWO)
						{
							this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.POINT_TWO));
						}
						if(tabIndex == 3 && this._type == TouchProxy.POINT_THREE)
						{
							this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.POINT_THREE));
						}
						if(tabIndex == 4 && this._type == TouchProxy.POINT_FOUR)
						{
							this.dispatchEvent(new TouchProxyEvent(TouchProxyEvent.POINT_FOUR));
						}
						this._curTabIndex++;
					}
				}
				break;
		}
	}

	public destroy()
	{
		if(this.stage)
		{
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler,this);
		}
		
	}
}