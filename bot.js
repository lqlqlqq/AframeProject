class Bot{
  constructor(x,y,z){
    this.x = x;
	this.y = y;
    this.z = z;
	
	this.i = -1;
	this.spawns = [
	//Pit
	{x:20,y:1.1,z:0.85},
	//Car
	{x:20.8,y:1.1,z:-14.3},
	//CT
	{x:17.7,y:1.1,z:-16},
	//Goose
	{x:14.3,y:2.8,z:-27.2},
	//Elevator
	{x:13.6,y:1.1,z:-18.4},
	//Ninja
	{x:5.1,y:2.4,z:-22.4},
	//CT Spawn
	{x:4.26,y:-.9,z:-18.9},
	//Shadi
	{x:-4.3,y:-.9,z:-17.2},
	//Cat
	{x:4.3,y:2.4,z:-16.5},
    //A Site
	{x:12.7,y:2.4,z:-21.3},
	//B Door
	{x:-17.7,y:1.1,z:-16.7},
	//Shadi2
	{x:-6,y:-0.9,z:-20.7},
	//Mid Door
	{x:-5.5,y:-0.9,z:-15.6},
	//CT Spawn
	{x:5.9,y:-0.9,z:-20.7},
	//Ramp
	{x:19.5,y:1.27,z:-18.6},
	//A Site
	{x:10.7,y:2.4,z:-20.1},
	//A Long
	{x:20.7,y:1.1,z:-9.5},
	//A Long 2
	{x:17.6,y:1.1,z:-1.9},
	//B Door
	{x:8.0,y:1.1,z:2.3},
	//END
	{x:20,y:20,z:20},
];
	
    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#ct");
    this.obj.setAttribute("position",{x:x-1,y:y-1,z:z});
	this.obj.setAttribute("scale", "0.019 0.019 0.019");
    scene.append(this.obj);    
  }
  attack(){
    health -= 1;
//    this.respawn();
  }
  die(){
    this.respawn();
	//console.log(camera.obj.object3D.position);
  }
  respawn(){
		this.i+=1
		let x = this.spawns[this.i].x;
		let y = this.spawns[this.i].y;
		let z = this.spawns[this.i].z;
		this.obj.setAttribute("position",{x:x,y:y-1,z:z});
  }
}