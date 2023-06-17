class Game
{
    
    private ellpseTime:number = 0;
    private updateTime:number = 60;
    private running:boolean = true;
    width;
    height;

    Context;

    private level;


   constructor(canvas:HTMLCanvasElement) {
    this.Context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.width = canvas.width;
    this.height = canvas.height;
    this.level = new Level(this.Context,new Rectangle(0,0,this.width,this.height));
   }

    Setup():void{
       
   
    }
    Start():void{
        setInterval(this.gameLoop.bind(this),this.updateTime);
    }
    private gameLoop():void{
        if(this.running){
            this.ellpseTime++;
            this.Context.fillStyle = "rgb(255,255,255)";
            this.Context.fillRect(0,0,this.width,this.height);
            this.level.Update();
            this.running = this.level?.GameOver();
            this.level.Draw();
        }
        else{
            this.Context.fillStyle = "rgb(0,0,0)";
            this.Context.fillRect(0,0,this.width,this.height);
            this.Context.strokeStyle = "rgb(10,240,20)";
            this.Context.font = "24pt verdana";
            this.Context.strokeText("GAME\nOVER",200,150,200);
        }
    }
    InputDown(code:string)
    {
        this.level.Player().InputDown(code);
    }
    InputUp(code:string)
    {
        this.level.Player().InputUp(code);
    }
}

abstract class CObjectBase
{
    HitBox:Rectangle | null = null;

    PositionX:number = 0;
    PositionY:number = 0;

    SpeedX:number = 1;
    SpeedY:number = 1;


    Context;

    abstract SpriteBox:Rectangle;
    abstract SourceBox:Rectangle;
    abstract Sprite:HTMLImageElement;



constructor(context:CanvasRenderingContext2D) {
    this.Context = context;

}

    abstract Update():void
    
    abstract Draw():void

  /*   GetComponent<T>():T
    {
        return T;
    } */
}
class Level extends CObjectBase
{
    SpriteBox: Rectangle;
    SourceBox: Rectangle;
    Sprite: HTMLImageElement;

    private player;
    private background2;
    private background;

    constructor(context:CanvasRenderingContext2D,gameBounders:Rectangle) {
        super(context);
        this.SourceBox = gameBounders;
        this.SpriteBox = gameBounders;
        this.Sprite = new Image();

        this.player = new Player(this.Context);
        this.player.SpeedX = 2;
        this.player.SpeedY = 0;
        this.player.PositionX = -100;
        this.player.PositionY = gameBounders.GetH()- this.player.SpriteBox.GetH()-15;
        this.player.InitialY = this.player.PositionY;

        let bg2 = new Image();
        bg2.src = "bg2.jpg";
        let bgRepeatWidth = 384;
        let sourceBoxBG2 = new Rectangle(0,0,bgRepeatWidth,1080);
        this.background2 = new Background(this.Context,bg2,sourceBoxBG2);
        this.background2.LevelBox = gameBounders;
        this.background2.bg2RepeatWidth = bgRepeatWidth;
        this.background2.SpeedX = 0.5;
        this.background2.PositionY = 0;

        let bg = new Image();
        bg.src = "bg.png";
        bgRepeatWidth = 250;
        let sourceBoxBG = new Rectangle(0,0,bgRepeatWidth,24);
        this.background = new Background(this.Context,bg,sourceBoxBG);
        this.background.LevelBox = new Rectangle(0,gameBounders.GetH()-24,gameBounders.GetW(),24);
        //this.background.LevelBox = gameBounders;
        this.background.bg2RepeatWidth = bgRepeatWidth;
        this.background.SpeedX = 1;
        this.background.PositionY = 300;
    }
    Update(): void {
        this.player.Update();
        this.background2.Update();
        this.background.Update();
    }
    Draw(): void {
        this.background2.Draw();
        this.background.Draw();
        this.player.Draw();
        
    }
    GameOver():boolean
    {
        return this.player.IsAlive();

    }
    Player():Player{
        return this.player;
    }
}
class Background extends CObjectBase
{
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
class Player extends CObjectBase
{
    SpriteBox: Rectangle;
    Sprite: HTMLImageElement;
    SourceBox: Rectangle;
    animationFrame:number = 0;
    input;
    InitialX:number = -100;
    InitialY:number = 0;




constructor(context:CanvasRenderingContext2D) {
    super(context);
        this.Sprite = new Image();
        this.Sprite.src = "image24.png";
        this.SpriteBox = new Rectangle(0,0,80,80); 
        this.SourceBox = new Rectangle(0,0,400,400);
        this.animationFrame = - this.SourceBox.GetW();
        this.input = new Input();
}

    Update(): void {
        console.log(this.PositionY);
        this.PositionX+=this.SpeedX;
        if(this.input.JUMP)
            this.SpeedY--;
        if(!this.input.JUMP ){
            if(this.PositionY < this.InitialY)
                this.SpeedY++;
            else
                this.SpeedY = 0;
        }
        this.PositionY+=this.SpeedY;
        this.SpriteBox.SetX(this.PositionX);
        this.animationFrame+=400;
        if(this.animationFrame >= this.Sprite.width)
            this.animationFrame = 0;
        this.SourceBox.SetX(this.animationFrame);
        
    }
    Draw():void{
        this.Context.drawImage(this.Sprite,this.SourceBox.GetX(),
            this.SourceBox.GetY(),this.SourceBox.GetW(),this.SourceBox.GetH(),this.PositionX,this.PositionY, 
            this.SpriteBox.GetW(),this.SpriteBox.GetH());
        
    }
    IsAlive():boolean
    {
        if(this.PositionX > 600)
            return false;
        return true;
    }
    InputDown(code:string)
    {
        
        switch(code)
        {
            case Input.JUMPKEY:
            this.input.JUMP = true;
        }
    }
    InputUp(code:string)
    {
        switch(code)
        {
            case Input.JUMPKEY:
            this.input.JUMP = false;
        }
    }
    
}
class Input
{
     UP:boolean = false;
     DOWN:boolean = false;
     LEFT:boolean= false;
     RIGHT:boolean = false;
     JUMP:boolean = false;

    static UPKEY:string = "ArrowUp";
    static DOWNKEY:string = "ArrowDown";
    static LEFTKEY:string= "ArrowLeft";
    static RIGHTKEY:string = "ArrowRight";
    static JUMPKEY:string = "Space";

}

class Rectangle 
{
    private x:number = 0;
    private y:number = 0;
    private w:number = 0;
    private h:number = 0;

    private bottom:number = 0;
    private top:number = 0;
    private right:number = 0;
    private left:number = 0;
    private centerX:number = 0;
    private centerY:number = 0;

    GetX():number{
         return this.x;
    }
    SetX(x:number):void{
        this.x = x;
        this.centerX = this.x + this.w / 2;
        this.left = this.x;
        this.right = this.x + this.w;
    }
    GetY():number{
        return this.y;
    }
    SetY(y:number):void{
        this.y = y;
        this.centerX = this.y + this.h / 2;
        this.left = this.y;
        this.top = this.y + this.h;
    }
    GetW():number{
        return this.w;
   }
   SetW(w:number):void{
       this.w = w;
       this.centerX = this.x + this.w / 2;
       this.right = this.x + this.w;
   }
   GetH():number{
    return this.h;
        }
        SetH(h:number):void{
        this.h = h;
        this.centerY = this.y + this.h / 2;
        this.top = this.y + this.h;
        }
        GetCenterX():number{
            return this.centerX;
       }
       SetCenterX(centerX:number):void{
        
           this.SetX(centerX - this.w / 2);
          
       }
       GetCenterY():number{
        return this.centerY;
   }
   SetCenterY(centerY:number):void{
     this.SetY(centerY - this.h / 2);
   }
    constructor(x:number,y:number,w:number,h:number) {
        this.x = x;
        this.y = y;
        this.SetW(w);
        this.SetH(h);
        
    }

    IsEmpty():boolean
    {
        if(this.w <= 0 && this.h <= 0)
            return true;
        return false;
    }   
    Intersects(rect:Rectangle):boolean
    {
        return true;
    }
    static Empty():Rectangle
    {
        return new Rectangle(0,0,0,0);
    }
}


let canvas = document.getElementById("canvas") as HTMLCanvasElement;
let heigth = window.innerHeight;
let Width = window.innerWidth;
//canvas.setAttribute("Width",String(Width));
canvas.setAttribute("Width","600");
//canvas.setAttribute("Height",String(heigth));
canvas.setAttribute("Height","300");
let game = new Game(canvas);
game.Setup();
game.Start();
window.onkeydown = (e)=>
{
    
    game.InputDown(e.code);
}
window.onkeyup = (e)=>
{
    game.InputUp(e.code);
}
