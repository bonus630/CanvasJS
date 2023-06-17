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
