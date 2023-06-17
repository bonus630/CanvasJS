class Enemy extends CObjectBase
{
    HitBox: Rectangle;
    SpriteBox: Rectangle;
    SourceBox: Rectangle;
    Sprite: HTMLImageElement;

    /**
     *
     */
    constructor(context:CanvasRenderingContext2D,sprite:HTMLImageElement,sourceBox:Rectangle) {
        super(context);
            this.SpriteBox = sourceBox;
            this.SourceBox = sourceBox;
            this.HitBox = this.SpriteBox;
            this.Sprite = sprite;
    }

    Update(): void {
        this.PositionX-= this.SpeedX;
        this.SpriteBox.SetX(this.PositionX);
        this.SpriteBox.SetY(this.PositionY);
        this.HitBox.SetX(this.PositionX);
        this.HitBox.SetY(this.PositionY+8);
    }
    Draw(): void {
        console.log(this.PositionY);
        this.Context.drawImage(this.Sprite,this.SourceBox.GetX(),
        this.SourceBox.GetY(),this.SourceBox.GetW(),this.SourceBox.GetH(),this.PositionX,this.PositionY, 
        this.SpriteBox.GetW(),this.SpriteBox.GetH());

       // this.Context.strokeStyle = "rgb(200,10,18)";
       // this.Context.strokeRect(this.HitBox.GetX(),this.HitBox.GetY(),
       // this.HitBox.GetW(),this.HitBox.GetH());

    }
    Duplicate():Enemy
    {
       
        let enemy = new Enemy(this.Context,this.Sprite,this.SourceBox);
        enemy.SpriteBox = this.SpriteBox
        enemy.HitBox = this.HitBox
        enemy.PositionY = this.PositionY
        enemy.PositionX = this.PositionX
        enemy.SpeedX = this.SpeedX
        return enemy;
    } 
}