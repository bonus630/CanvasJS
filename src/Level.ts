class Level extends CObjectBase
{
    HitBox: Rectangle;
    SpriteBox: Rectangle;
    SourceBox: Rectangle;
    Sprite: HTMLImageElement;

    private player;
    private background2;
    private background;
    private enemies;
    private enemySpeed = 20;
   

    constructor(context:CanvasRenderingContext2D,gameBounders:Rectangle) {
        super(context);
        this.SourceBox = gameBounders;
        this.SpriteBox = gameBounders;
        this.HitBox = gameBounders;
        this.Sprite = new Image();

        this.player = new Player(this.Context);
        this.player.SpeedX = 2;
        this.player.SpeedY = 5;
        this.player.PositionX = 50;
        this.player.PositionY = gameBounders.GetH()- this.player.SpriteBox.GetH()-15;
        this.player.InitialY = this.player.PositionY;

        let bg2 = new Image();
        bg2.src = "img/bg2.jpg";
        let bgRepeatWidth = 384;
        let sourceBoxBG2 = new Rectangle(0,0,bgRepeatWidth,1080);
        this.background2 = new Background(this.Context,bg2,sourceBoxBG2);
        this.background2.LevelBox = gameBounders;
        this.background2.bg2RepeatWidth = bgRepeatWidth;
        this.background2.SpeedX = 0.2;
        this.background2.PositionY = 0;

        let bg = new Image();
        bg.src = "img/bg.png";
        bgRepeatWidth = 250;
        let sourceBoxBG = new Rectangle(0,0,bgRepeatWidth,24);
        this.background = new Background(this.Context,bg,sourceBoxBG);
        this.background.LevelBox = new Rectangle(0,gameBounders.GetH()-24,gameBounders.GetW(),24);
        this.background.SpriteBox = new Rectangle(0,gameBounders.GetH()-18,gameBounders.GetW(),24);
        this.background.bg2RepeatWidth = bgRepeatWidth;
        this.background.SpeedX = 2;
        this.background.PositionY = 300;

        this.enemies = new Enemies(gameBounders,this.player);

        let enemySprite = new Image();
        enemySprite.src = "img/missil.png";
       
        let enemy = new Enemy(this.Context,enemySprite,new Rectangle(0,0,500,320));
        enemy.SpriteBox = new Rectangle(0,0,50,32);
        enemy.HitBox = new Rectangle(0,0,40,10);
        enemy.PositionY = gameBounders.GetH() - 46;
        enemy.PositionX = gameBounders.GetW();
        enemy.SpeedX = this.enemySpeed;

        this.enemies.Add(enemy);
        let enemy2 = enemy.Duplicate();
        enemy2.PositionX+=400;
        this.enemies.Add(enemy2);
    }
    Update(): void {
        this.player.Update();
        this.background2.Update();
        this.background.Update();
        this.enemies.Update();
     
        if(this.player.SpriteBox?.HitTest(this.background.SpriteBox) && !this.player.canJump){
            
            this.player.SpeedY = 0;
            this.player.PositionY = this.player.InitialY;
            this.player.canJump = true;   
        }
        
    }
    Draw(): void {
        this.background2.Draw();
        this.background.Draw();
        this.player.Draw();
        this.enemies.Draw();
        this.Context.fillStyle = "rgba(200,200,200,0.1)";
        this.Context.fillRect(20,20,60,25);
        this.Context.fillStyle = "rgb(20,10,189)";
        this.Context.font = "10pt verdana";
        this.Context.fillText(String(Math.round(this.player.Points)),25,35);
        //this.Context.fillRect(this.background.SpriteBox.GetX(),this.background.SpriteBox.GetY(),
        //this.background.SpriteBox.GetW(),this.background.SpriteBox.GetH());
    }
    GameOver():boolean
    {
        return this.player.IsAlive;

    }
    Player():Player{
        return this.player;
    }
 
}