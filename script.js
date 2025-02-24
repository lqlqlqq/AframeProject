let rnd = (l,u) => Math.random() * (u-l) + l
let socket, scene, camera, dart, bots = [],balls = [];
//let my_id,my_color;
let players = {}, health = 100, t = 90, score = 0, playerTemplate;
let player_reset = false;
let player_reset2 = false;
let player_reset3 = false;
let fire = true;

window.onload = function(){
  scene = document.querySelector("a-scene");
  playerTemplate = document.querySelector("#playerTemplate");
  camera = new Player("a-camera");
  //my_id = prompt("Enter Name")
  //my_color = prompt("Enter a color")
  health_text = document.getElementById("health");
  time_text = document.getElementById("time");
  Score_text = document.getElementById("score");
  ctwinimg = document.getElementById("ctwin");
  twinimg = document.getElementById("twin");
  akaudio = document.getElementById("aksound");
  aimlabaudio = document.getElementById("aimlabsound");
//Multiplayer
/*
  socket = io.connect(`https://382160f0-fd62-4223-aac1-8cda05275f2d-00-1ina3ca78ser1.riker.replit.dev/?player_id=${my_id}&player_color=${my_color}`);
  socket.on('players', function(info){
          updatePlayers(info);
        });
*/


  for(let i = 0; i < 15; i++){
    let x = rnd(0.5,5.5);
    let y = rnd(0, 5.5);
    let z = -2.5;
    balls.push( new Ball(x,y,z) );
  }


  window.addEventListener("click",function(){
	  console.log(dart);
	  if(fire) Fire();
	  if(fire) akaudio.play();
	})
  
  window.addEventListener("keypress",function(e){
	  console.log(e.key)
	  if(e.key == "p"){
		//camera.obj.object3D.position.x = 0;
		//camera.obj.object3D.position.y = 0;
		//camera.obj.object3D.position.z = 0;
		ctwinimg.setAttribute("opacity", 0);
		twinimg.setAttribute("opacity", 0);
		player_reset = true;
		fire = false;
	  }
	  if(e.key == "b"){
	  	player_reset2 = true;
		fire = true;
	  }
	  if(e.key == "c"){
	  	player_reset3 = true;
		fire = true;
	  }
  })
	let bot = new Bot(20, 1.1, -4.6);
	bots.push(bot);
	
  countdown();
  loop();
}
/*
	function updatePosition(){       
        info = {id:my_id, 
                x:camera.obj.object3D.position.x,
				y:camera.obj.object3D.position.y,
                z:camera.obj.object3D.position.z,
                angleY:camera.obj.object3D.rotation.y,
                angleX:camera.obj.object3D.rotation.x,
                color:my_color
              };
        socket.emit('players', info);
      }
    function updatePlayers(info){
        for(let pid in info){
          let data = info[pid];
          if(players[data.id]){
            //Existing Player
            players[data.id].x = data.x;
			players[data.id].y = data.y;
            players[data.id].z = data.z;
            players[data.id].angleY = data.angleY;
            players[data.id].angleX = data.angleX;
          }else{
            //New Player
            players[data.id] = {id:data.id,
                                x:data.x,
								y:data.y,
                                z:data.z,
                                angleY:data.angleY,
                                angleX:data.angleX,
                                obj:createPlayer(data.id,data.color)};
            if(data.id == my_id){
              players[my_id].obj = null;
            }else{
              scene.append(players[data.id].obj);
            }
          }
        }
        for(let id in players){
          let player = players[id];
          if(player.obj){
            player.obj.object3D.position.x = player.x;
			player.obj.object3D.position.y = player.y;
            player.obj.object3D.position.z = player.z;
            player.obj.object3D.rotation.y = player.angleY;
            let head = player.obj.getChildren()[2].getChildren()[0];
            head.object3D.rotation.x = player.angleX;
          }
        }
      }
    function createPlayer(id,color){
	  let clone = playerTemplate.cloneNode(true);
	  clone.setAttribute("position","0 0 0");
	  clone.getChildren()[0].setAttribute("value",id);
	  clone.getChildren()[1].setAttribute("color",color);
	  return clone;
  }
*/
function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}

function countdown(){
  time_text.setAttribute("value",`Time: ${t}`);
  Score_text.setAttribute("value", `Score: ${score}`);
  health_text.setAttribute("value", `HP: ${health}`);
  time_text.setAttribute("color","black");
  Score_text.setAttribute("color", "black");
  health_text.setAttribute("color", "black");
  
  if(t<= 0 || health <= 0){
	  player_reset2 = true;
	  score = 0;
	ctwinimg.setAttribute("opacity", 100);
  }
  
  if(t > 0){
	setTimeout( countdown, 1000);
    t--;
  }
  
  if(score == 11){
	player_reset3 = true;
  }
  
  if(score == 20){
	twinimg.setAttribute("opacity", 100);
	player_reset = true;
	fire = false;
	score = 21;
  }
}
function loop(){
  if(dart) dart.fly();
  //updatePosition();
  if(player_reset){
	  	console.log(camera.driver.object3D.position.x + " " + camera.driver.object3D.position.z);
		camera.driver.remove("dynamic-body");
		camera.driver.object3D.position.x = 3;
		camera.driver.object3D.position.y = 1;
		camera.driver.object3D.position.z = 2.5;
		camera.driver.setAttribute("dynamic-body",{mass:5});
		console.log(camera.driver.object3D.position.x + " " + camera.driver.object3D.position.z);
		camera.driver.components["dynamic-body"].syncToPhysics();
		player_reset = false;
		t = 500;
  }if(player_reset2){
		camera.driver.remove("dynamic-body");
		camera.driver.object3D.position.x = 8;
		camera.driver.object3D.position.y = 0.5;
		camera.driver.object3D.position.z = 6;
		camera.driver.setAttribute("dynamic-body",{mass:5});
		camera.driver.components["dynamic-body"].syncToPhysics();
		player_reset2 = false;
		t = 90;
  }if(player_reset3){
		camera.driver.remove("dynamic-body");
		camera.driver.object3D.position.x = -27;
		camera.driver.object3D.position.y = 1.1;
		camera.driver.object3D.position.z = -13;
		camera.driver.setAttribute("dynamic-body",{mass:5});
		camera.driver.components["dynamic-body"].syncToPhysics();
		player_reset3 = false;
  }else{
	  camera.update();
  }
  
  for(let ball of balls){
    ball.bounce();
  }
  
  for(let bot of bots){
	if(dart && distance(dart.obj,bot.obj) < 1){
		score++;
		health = 100;
		bot.die();
	}
	if(distance(camera.obj,bot.obj) < 10){
		bot.attack();
	}
  }
  window.requestAnimationFrame( loop );
}

function Fire(){
	dart = new Dart();
}
/*
function damage(){
    health -= 5;
  }
  for(let key in players){
	  let player = players[key];
	if(distance(player.obj, obj.obj) < 1){
		damage();
	}
  }
  
*/