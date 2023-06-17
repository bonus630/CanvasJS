class Enemies
{
    enemies:Enemy[] = [];
    limit:number = 4;
    LevelBounders;
    Player;
   // PlayerIsAlive:boolean = true;

    constructor(levelBounders:Rectangle,player:Player) {
        this.LevelBounders = levelBounders;
        this.Player = player;

    }
    Add(enemy:Enemy)
    {
        if(this.enemies.length < this.limit)
            this.enemies.push(enemy);
    }
    Update()
    {
        for (let index = 0; index < this.enemies.length; index++) {
            this.enemies[index].Update();
            if(this.Player.HitBox.HitTest(this.enemies[index].HitBox))
                this.Player.IsAlive = false;
            this.EnemyRespawn(this.enemies[index]);
        }
    }
    Draw()
    {
        for (let index = 0; index < this.enemies.length; index++) {
            this.enemies[index].Draw();
            
        }
    }
    EnemyRespawn(enemy:Enemy)
    {
        if(enemy.PositionX < this.LevelBounders.GetX()){
            enemy.PositionX =  this.LevelBounders.GetW();
            enemy.PositionY = this.LevelBounders.GetH() - 46 - Math.random()*100;
            if(this.Player.Points % 100 == 0)
                enemy.SpeedX ++;
            //console.log(this.enemy.PositionY);
        }
        
    }

// console.log(this.player.canJump);


}