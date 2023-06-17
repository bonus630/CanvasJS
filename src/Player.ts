class Player extends CObjectBase
{
    HitBox: Rectangle;
    SpriteBox: Rectangle;
    Sprite: HTMLImageElement;
    SourceBox: Rectangle;
    animationFrameRow:number = 0;
    animationFrameCol:number = 0;
    input;
    InitialX:number = -100;
    InitialY:number = 0;
    private jumpLimit:number = 100;
    private slideTime = 14;
    private maxSlideTime = 14;
    IsAlive:boolean = true;
    canJump:boolean = false;
    Points:number = 0;



constructor(context:CanvasRenderingContext2D) {
    super(context);
        this.Sprite = new Image();
        this.Sprite.src = "image24.png";
        this.SpriteBox = new Rectangle(0,0,80,80); 
        this.HitBox = new Rectangle(0,0,52.8,60);
        this.SourceBox = new Rectangle(0,0,400,400);
        this.animationFrameRow = - this.SourceBox.GetW();
        this.input = new Input();
}

    Update(): void {
        
        //this.PositionX+=this.SpeedX;
        if(this.input.JUMP && this.canJump){
            this.canJump = false;
            if(this.PositionY > this.InitialY - this.jumpLimit){
                this.SpeedY-=10;
              
            }
         
        }
        if(this.PositionY <=   this.InitialY - this.jumpLimit){
            this.PositionY = this.InitialY - this.jumpLimit
            this.input.JUMP = false;
          
        }
        if(!this.input.JUMP && !this.canJump){
            if(this.PositionY <= this.InitialY){
                this.SpeedY +=5;

            }
           
        }
 
        this.PositionY+=this.SpeedY;
        this.SpriteBox.SetX(this.PositionX);
        this.SpriteBox.SetY(this.PositionY);
        this.HitBox?.SetX(this.PositionX+8);
        this.HitBox?.SetY(this.PositionY+8);
        if(!this.input.JUMP && this.canJump && this.input.DOWN)
        {
            this.HitBox?.SetY(this.HitBox?.GetY()+ 38.5);  
            this.HitBox?.SetH(20);
            this.slideTime--;
           
        }
        if(this.slideTime<=0 || !this.input.DOWN)
        {
            this.HitBox?.SetH(58.2);
            this.input.DOWN = false;
            this.slideTime = this.maxSlideTime;
        } 
        this.animationFrameRow+=400;
        if(this.animationFrameRow >= this.Sprite.width)
        {
            this.animationFrameCol+=400;
            if(this.animationFrameCol >= this.Sprite.height)
                this.animationFrameCol = 0;
            this.animationFrameRow = 0;
        }
        this.SourceBox.SetX(this.animationFrameRow);
        this.SourceBox.SetY(this.animationFrameCol);
        this.Points+=0.5;
    }
    Draw():void{
        this.Context.drawImage(this.Sprite,this.SourceBox.GetX(),
            this.SourceBox.GetY(),this.SourceBox.GetW(),this.SourceBox.GetH(),this.PositionX,this.PositionY, 
            this.SpriteBox.GetW(),this.SpriteBox.GetH());
          //if(this.HitBox !==null)
          //  this.Context.strokeRect(this.HitBox.GetX(),this.HitBox.GetY(),
          //  this.HitBox.GetW(),this.HitBox.GetH());
        
    }
 
    InputDown(code:string)
    {
        
        switch(code)
        {
            case Input.JUMPKEY:
            this.input.JUMP = true;
            break;
            case Input.DOWNKEY:
                this.input.DOWN = true;
                break;
        }
    }
    InputUp(code:string)
    {
        switch(code)
        {
            case Input.JUMPKEY:
            this.input.JUMP = false;
            break;
            case Input.DOWNKEY:
                this.input.DOWN = false;
                break;
        }
    }
    
}