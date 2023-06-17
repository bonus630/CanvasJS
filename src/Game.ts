class Game
{
    
    private ellpseTime:number = 0;
    private updateTime:number = 60;
    private running:boolean = true;
    width;
    height;
    loop:number = 0;
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
       this.loop = setInterval(this.gameLoop.bind(this),this.updateTime);
       console.log(this.loop);
    }
    ReStart():void
    {
        clearInterval(this.loop);
        this.ellpseTime = 0; 
        this.running = true;
        this.level = new Level(this.Context,new Rectangle(0,0,this.width,this.height));
        this.Start();
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
            this.Context.fillStyle = "rgb(10,240,20)";
            this.Context.font = "12pt verdana";
            this.Context.fillText(`Press ${Input.STARTKEY} to Restart!`,200,250,200);
        }
    }
    InputDown(code:string)
    {
        
        this.level.Player().InputDown(code);
        if(!this.running && code===Input.STARTKEY)
        {
          
            this.ReStart();
        }
    }
    InputUp(code:string)
    {
        this.level.Player().InputUp(code);
    }
}