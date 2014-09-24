class StateOver extends egret.DisplayObjectContainer
{
	private _btnStart:egret.Sprite;

	private _bg:egret.Bitmap;
	private _txt:egret.TextField;
	private _txtTitle:egret.TextField;

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
	private onAddToStage(event:egret.Event){
        //设置加载进度界面
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.init();
    }

    private init()
    {
    	var stageW:number = this.stage.stageWidth;
    	var stageH:number = this.stage.stageHeight;


        this._bg = new egret.Bitmap();
        this._bg.texture = RES.getRes("overPage");
        this._bg.width = this.stage.stageWidth;
        this._bg.height = this.stage.stageHeight;
        this._bg.touchEnabled = true;
        this._bg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this);
        this.addChild(this._bg);

        this._txt = new egret.TextField();
        this._txt.textColor = 0x000000;
        this._txt.textAlign = egret.HorizontalAlign.RIGHT;
        this._txt.width = 300;
        this._txt.size = 60;
        this._txt.text = MainUI.totalScore.toString();
        //this._txt.width = this._bg.width;
        //this._txt.height = this._bg.width;
        this._txt.x = 0;
        this._txt.y = 215;
        //this.addChild(this._bg);
        this.addChild(this._txt);
        this._txtTitle = new egret.TextField();
        this._txtTitle.textColor = 0x000000;
        this._txtTitle.textAlign = egret.HorizontalAlign.CENTER;
        this._txtTitle.width = 200;
        this._txtTitle.size = 26;
        this._txtTitle.text = this.getTitle();
        this._txtTitle.x = (stageW - this._txtTitle.width)/2;
        this._txtTitle.y = 325;
        this.addChild(this._txtTitle);

        /*
    	this._btnStart = new egret.Sprite();
    	this._btnStart.graphics.beginFill(0xffff00);
    	this._btnStart.graphics.drawRect(0,0,200,100);
    	this._btnStart.graphics.endFill();
    	this._btnStart.width = 200;
    	this._btnStart.height = 100;
    	this._btnStart.touchEnabled = true;
    	this._btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this);
    	this._btnStart.x = (this.stage.stageWidth - 200)/2;
    	this._btnStart.y = (this.stage.stageHeight - 100)/2;
    	

        
    	this._bg = new egret.Sprite();
    	this._bg.graphics.beginFill(0xffffff);
    	this._bg.graphics.drawRoundRect(0,0,stageW - 100, stageW - 100,20,20);
    	this._bg.graphics.endFill();
    	this._bg.alpha = 0.5;
    	this._bg.width = stageW - 100;
    	this._bg.height = stageW - 100;
    	this._bg.x = 50;
    	this._bg.y = 100;
    	this._txt = new egret.TextField();
    	this._txt.textColor = 0x000000;
    	this._txt.textAlign = egret.HorizontalAlign.CENTER;
    	this._txt.text = this.getText();
    	this._txt.width = this._bg.width;
    	this._txt.height = this._bg.width;
    	this._txt.x = 50;
    	this._txt.y = 100;
    	this.addChild(this._bg);
    	this.addChild(this._txt);

    	this.addChild(this._btnStart);

    	this._end = new egret.Bitmap();
		this._end.texture = RES.getRes("heroEnd");
		var sh:number = 480/640;
		this._end.scaleX = sh;
		this._end.scaleY = sh;
		this._end.x = 90;
		this._end.y = this.stage.stageHeight - 200;
		this.addChild(this._end);
        */
    }
    private tapHandler(e:egret.TouchEvent)
    {
    	this.dispatchEvent(new egret.Event("GameStart"));
    }
    private getText():string
    {
    	var rank:number = 68.9;
    	//MainUI.totalScore = 1100;
    	if(MainUI.totalScore > 1500)
    	{
    		rank = Math.random() * 10.00 + 90.00;
    	}
    	else if(MainUI.totalScore > 1000)
    	{
    		rank = Math.random() * 10.00 + 80.00;
    	}
    	else if(MainUI.totalScore > 500)
    	{
    		rank = Math.random() * 10.00 + 70.00;
    	}
    	else
    	{
    		rank = Math.random() * 10.00 + 60.00;
    	}
    	if(MainUI.totalScore == 0)
    	{
    		rank = 0;
    	}
    	rank = Math.floor(rank * 100)/100;
    	//rank = rank/100;
    	return "恭喜你获得了总分\n" + MainUI.totalScore.toString() + "\n击败了全国" + rank.toString() + "%的玩家"
    			+"\n获得了称号\n“"+this.getTitle()+"”";
    }
    private getTitle():string
    {
    	var a = ["烧鸡达人","金牌减肥教练","贱贱的笑了","猪是念来过倒","药不能停","最佳备胎"];
    	var index = Math.floor(Math.random() * a.length);
    	return a[index];
    }
}