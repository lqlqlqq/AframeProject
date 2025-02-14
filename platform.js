class Platform{
  constructor(x,y,z){
    this.x = x;
    this.y = y; this.dy = 0.01;
    this.z = z;
    this.drop = false;
    this.obj = document.createElement("a-box");
    this.obj.setAttribute("static-body","");
    this.obj.setAttribute("height",0.1);
    this.obj.setAttribute("width",2);
    this.obj.setAttribute("color","brown");
    this.obj.setAttribute("position",{x:x,y:y,z:z});
    scene.append(this.obj);
  }
  fall(amt){
    if(this.drop){
      this.obj.object3D.position.y -= amt;
    } 
  }
  float(){
    this.obj.object3D.position.y += this.dy;
    if(this.obj.object3D.position.y < this.y - 2 || 
       this.obj.object3D.position.y > this.y + 2 ){
            this.dy = -this.dy;
    }
  }
  cameraLanded(){
    let deltaY = camera.obj.y - this.y;
    let cp = camera.obj.object3D.position;
    if(cp.z < this.z + 0.5 && cp.z > this.z - 0.5 &&
       cp.x < this.x + 1 && cp.x > this.x - 1 &&
       Math.abs(deltaY) < 0.1)
    {
      this.obj.setAttribute("color","red");
      return true;
    }else{
      this.obj.setAttribute("color","gray");
      return false;
    }      
  }
}