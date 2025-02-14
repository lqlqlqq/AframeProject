class Block{
  constructor(x,y,z,type="static-body"){
    this.obj = document.createElement("a-box");
    this.obj.setAttribute(type,"");
    this.obj.setAttribute("color","green");
    this.obj.setAttribute("position",{x:x,y:y,z:z});
    this.removable = false;
    scene.append(this.obj);
  }
}