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
        this.top = this.y ;
        this.bottom = this.y + this.h;
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
        this.top = this.y;
        this.bottom = this.y+ this.h;
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
        GetTop():number{
            return this.top;
        }
        GetBottom():number{
            return this.bottom;
        }
        GetRight():number{
            return this.right;
        }
        GetLeft():number{
            return this.left;
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
    HitTest(rect:Rectangle|null):boolean
    {
        if(rect===null)
            return false;
        if(this.x < rect.GetRight() &&
            this.right > rect.GetX() &&
            this.y < rect.GetBottom() &&
            this.bottom > rect.GetY())
            return true;
        
        return false;
    }
    static Empty():Rectangle
    {
        return new Rectangle(0,0,0,0);
    }
}