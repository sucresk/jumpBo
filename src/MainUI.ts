class MainUI extends egret.DisplayObjectContainer
{
    public static totalScore:number = 0;

	private _txtScoreT:egret.TextField;
	private _txtScore:egret.TextField;
	private _txtLastJumpT:egret.TextField;
	private _txtLastJump:egret.TextField;

	private _score:number;
	private _jump:number;

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
    	this._txtScoreT = new egret.TextField();
    	this._txtScore = new egret.TextField();
    	this._txtLastJumpT = new egret.TextField();
    	this._txtLastJump = new egret.TextField();
    	this._txtScoreT.text = "消耗热量：";
    	this._txtScore.text = "0";
    	this._txtLastJumpT.text = "剩余跳跃：";
    	this._txtLastJump.text = "10";

    	this._txtScore.x = 140;
    	this._txtLastJumpT.y = 30;
    	this._txtLastJump.y = 30;
    	this._txtLastJump.x = 140;
    	this.addChild(this._txtScoreT);
    	this.addChild(this._txtScore);
    	this.addChild(this._txtLastJumpT);
    	this.addChild(this._txtLastJump);
    	this._score = 0;
    	this.score = 0;
    	this.jump = 10;
    }

    public set score(s:number)
    {
    	this._score += s;
    	this._txtScore.text = this._score.toString();
        MainUI.totalScore = this._score;
    }
    public get score():number
    {
    	return this._score;
    }
    public set jump(j:number)
    {
    	this._jump = j;
    	this._txtLastJump.text = this._jump.toString();
    }
}