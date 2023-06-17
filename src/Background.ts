class Background extends CObjectBase
{
    HitBox: Rectangle;
    SpriteBox: Rectangle;
    SourceBox: Rectangle;
    Sprite: HTMLImageElement;
    bg2RepeatWidth:number = 384;
    LevelBox:Rectangle = Rectangle.Empty();

    constructor(context:CanvasRenderingContext2D,sprite:HTMLImageElement,sourceBox:Rectangle) {
        super(context);
        this.Sprite = sprite;
        this.SpriteBox = this.LevelBox;
        this.SourceBox = sourceBox;
        this.HitBox = this.SpriteBox;
    }

    Update(): void {
        this.PositionX+=this.SpeedX;
        if(this.PositionX >= this.Sprite.width - this.bg2RepeatWidth)
            this.PositionX = 0;
        this.SourceBox.SetX(this.PositionX);
        
    }
    Draw(): void {
       this.Context.drawImage(this.Sprite,this.SourceBox.GetX(),this.SourceBox.GetY(),
       this.SourceBox.GetW(),this.SourceBox.GetH(),
        this.LevelBox.GetX(),this.LevelBox.GetY(),this.LevelBox.GetW(),this.LevelBox.GetH(),
       );
    }
    
}