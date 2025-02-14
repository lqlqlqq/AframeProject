class Player{
  constructor(selector){
    this.obj = document.querySelector(selector);
    this.moveStrength = 0.2;
    this.jumpStrength = 25;
    // this.impulse = null;
    this.moving = false;
    this.jumping = false;
    // this.dx = 0; this.dy = 0; this.dz = 0;
    this.pressed = [];

    this.driver = document.createElement("a-sphere");
    // this.driver.setAttribute("src","lava2.jpg")
    this.driver.setAttribute("opacity",0);
    this.driver.setAttribute("dynamic-body",{mass:5});
    this.driver.setAttribute("radius",0.5);
   
    this.driver.object3D.position.x = this.obj.object3D.position.x;
    this.driver.object3D.position.y = this.obj.object3D.position.y;
    this.driver.object3D.position.z = this.obj.object3D.position.z;
    scene.append(this.driver);

    window.addEventListener("keyup",(e)=>{
      delete this.pressed[e.key];
      if(e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "ArrowDown" ||
         e.key == "w" || e.key == "a" || e.key == "s" || e.key == "d"){
        this.moving = false;
      }
    });
    window.addEventListener("keydown",(e)=>{
      this.pressed[e.key] = true; 
      //console.log(this.pressed)
    })
  }
  update(){
    this.processImpulses();
    this.obj.object3D.position.x = this.driver.object3D.position.x;
    this.obj.object3D.position.y = this.driver.object3D.position.y + 0.5;
    this.obj.object3D.position.z = this.driver.object3D.position.z;
	try{
    if(!this.moving){
      if(Math.abs(this.driver.body.velocity.x) > 0.01 ||  Math.abs(this.driver.body.velocity.z) > 0.01 ){
        this.driver.body.velocity.x = 0;
        this.driver.body.velocity.z = 0;
      }
    }}catch(e){}
  }
  processImpulses(){
    let dx = 0, dy = 0, dz = 0, impulse = null, theta = 0;
    if(this.pressed[" "] && !this.jumping){
      impulse = new CANNON.Vec3(0, this.jumpStrength, 0);
      this.driver.body.applyImpulse(impulse, new CANNON.Vec3(0, 0, 0));
      this.jumping = true;
    }
    if(this.pressed["ArrowUp"] || this.pressed["w"] ){
      theta = this.obj.object3D.rotation.y + Math.PI;
      dz = this.moveStrength * Math.cos(theta);
      dx = this.moveStrength * Math.sin(theta);
      impulse = new CANNON.Vec3(dx, 0, dz);
      this.driver.body.applyImpulse(impulse, new CANNON.Vec3(0, 0, 0));
      this.moving = true;
    }else if(this.pressed["ArrowLeft"] || this.pressed["a"] ){
      theta = this.obj.object3D.rotation.y + Math.PI + Math.PI/2;
      dz = this.moveStrength * Math.cos(theta);
      dx = this.moveStrength * Math.sin(theta);
      impulse = new CANNON.Vec3(dx, 0, dz);
      this.driver.body.applyImpulse(impulse, new CANNON.Vec3(0, 0, 0));
      this.moving = true;
    }else if(this.pressed["ArrowRight"] || this.pressed["d"]){
      theta = this.obj.object3D.rotation.y + Math.PI - Math.PI/2;
      dz = this.moveStrength * Math.cos(theta);
      dx = this.moveStrength * Math.sin(theta);
      impulse = new CANNON.Vec3(dx, 0, dz);
      this.driver.body.applyImpulse(impulse, new CANNON.Vec3(0, 0, 0));
      this.moving = true;
    }else if(this.pressed["ArrowDown"] || this.pressed["s"]){
      theta = this.obj.object3D.rotation.y + Math.PI;
      dz = this.moveStrength * Math.cos(theta);
      dx = this.moveStrength * Math.sin(theta);
      impulse = new CANNON.Vec3(-dx, 0, -dz);
      this.driver.body.applyImpulse(impulse, new CANNON.Vec3(0, 0, 0));
      this.moving = true;
    }
	try{
    if(Math.abs(this.driver.body.velocity.y) <= 0.0001){
      this.jumping = false;
    }
	}catch(e){}
  }
}