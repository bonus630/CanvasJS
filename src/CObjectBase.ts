abstract class CObjectBase
{
   

    PositionX:number = 0;
    PositionY:number = 0;

    SpeedX:number = 1;
    SpeedY:number = 1;


    Context;

    abstract  HitBox:Rectangle ;
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
