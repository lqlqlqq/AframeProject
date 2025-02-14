class Dart{
  constructor(){
	let pos = camera.obj.object3D.position;
    this.obj = document.createElement("a-sphere");
    this.obj.setAttribute("radius",0.015);
    this.obj.setAttribute("color","gold");
    this.obj.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z});
    
    let theta = camera.obj.object3D.rotation.y + Math.PI;
    let phi = camera.obj.object3D.rotation.x;
    let v = 0.5;
    let v_xz = v * Math.cos(phi);
    this.dx = v_xz * Math.sin(theta);
    this.dy = v * Math.sin(phi);
	this.dz = v_xz * Math.cos(theta);
	
	scene.append(this.obj);
  }
  fly(){
    this.obj.object3D.position.x += this.dx;
    this.obj.object3D.position.y += this.dy;
    this.obj.object3D.position.z += this.dz; 
    //this.obj.object3D.rotation.y = this.theta - Math.PI/2;
  }
}