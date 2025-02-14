class Ball{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.dy = rnd(1,4)/100 * (Math.random() < 0.5 ? 1: -1);
    this.maxY = 3.5;
    this.z = z;
    this.a = 0;
    this.da = 0.002;

    this.obj = document.createElement("a-sphere");
    let r = Math.floor(rnd(0,255));
    let g = Math.floor(rnd(0,255));
    let b = Math.floor(rnd(0,255));
    this.obj.setAttribute("color",`rgb(${r},${g},${b})`);
    this.obj.setAttribute("radius",0.15);
    this.obj.setAttribute("position",{x:this.x, y:this.y, z:this.z});
	this.obj.addEventListener("click",()=>{
		this.obj.setAttribute("opacity","0");
    })
    scene.append(this.obj);
  }
  bounce(){
    this.y += this.dy;
    if(this.y < 0.5 || this.y > this.maxY){
      this.dy = -this.dy;
    }
    this.obj.setAttribute("position",{x:this.x, y:this.y, z:this.z });
  }
  respawn(){
  
  }
}