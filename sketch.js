var bolt,bolt_img;
var trident,trident_img;
var gameState = "choose";
var ammo = 500;

var zues,clouds,fakeClouds;
var zues_running,zues_idle,zues_jumping;
var lightGroup,enemyGroup,enemy_running;
var clouds_img;

var poseidon,ocean,oceanTop,oceanBottom;
var ocean_img,shark_img;
var sharkGroup,bulletGroup;

var waterGame,airGame;

var retry,retry_img;
var gameOver,gameOver_img;

var score = 0;

function preload(){

  bolt_img = loadImage("../Bolt.png");
  trident_img = loadImage("../Trident.jpg");

  ocean_img = loadImage("../ocean.jpg");
  shark_img = loadImage("../Shark.png");

  clouds_img = loadImage("./clouds.png");

  zues_running = loadAnimation("sprite_0Run.png","sprite_1Run.png","sprite_2Run.png","sprite_3Run.png","sprite_4Run.png","sprite_5Run.png","sprite_6Run.png","sprite_7Run.png")
  zues_idle = loadAnimation("sprite_0Idle.png","sprite_1Idle.png","sprite_2Idle.png","sprite_3Idle.png","sprite_4Idle.png","sprite_5Idle.png");
  zues_jumping = loadAnimation("sprite_0Jump.png","sprite_1Jump.png");

  enemy_running = loadAnimation("sprite_00.png","sprite_01.png","sprite_02.png","sprite_03.png","sprite_04.png","sprite_05.png","sprite_06.png","sprite_07.png","sprite_08.png","sprite_09.png","sprite_10.png","sprite_11.png","sprite_12.png")

  retry_img = loadImage("../Retry.png");
  gameOver_img = loadImage("../Game Over.png");

  

}


function setup() {
  createCanvas(windowWidth, windowHeight);

  bolt = createSprite(width/2-width/4-186,height/2,10,10);
  bolt.addImage("Bolt",bolt_img);
  
  trident = createSprite(width/2+width/4+200,height/2,10,10);
  trident.addImage("Trident",trident_img);
  trident.scale = 0.3;



  ocean = createSprite(width/2,height/2,width,height);
  ocean.addImage("Ocean",ocean_img);
  ocean.scale = 1.5;
  ocean.visible = false;

  oceanTop = createSprite(width/2,width/4 + 90,width,20);
  oceanTop.visible = false

  oceanBottom = createSprite(width/2,width/4-70,width,20);
  oceanBottom.visible = false


  poseidon = createSprite(width/2-width/4-width/8-width/16-45,height/4+30,20,20);
  poseidon.addAnimation("running",zues_running); 
  poseidon.addAnimation("idle",zues_idle);
  poseidon.visible = false;
  
  sharkGroup = new Group();
  bulletGroup = new Group();



  clouds = createSprite(width/2,height/2+height/4+80,width*2,20);
  clouds.addImage("Clouds",clouds_img);
  clouds.visible = false;
  clouds.scale = 0.2;

  zues = createSprite(width/2-width/4-width/8-width/16-45,height-80,20,20);
  zues.addAnimation("running",zues_running);
  zues.addAnimation("jumping",zues_jumping);
  zues.addAnimation("idle",zues_idle);
  zues.visible = false;


  fakeClouds = createSprite(width/2,height-10,width*2,20);
  fakeClouds.shapeColor = "red";
  fakeClouds.visible = false;

  lightGroup = new Group();
  enemyGroup = new Group();

  gameOver = createSprite(width/2,height/2+70,20,20);
  gameOver.addImage("Game Over",gameOver_img);
  gameOver.visible = false;
  gameOver.scale = 0.7;

  retry = createSprite(width/2,height/2+140,20,20);
  retry.addImage("Retry",retry_img);
  retry.visible = false;
  retry.scale = 0.1;

  textSize(18);
  
}

function draw() {
  background(0);  

  waterGame = new Water();
  airGame = new Sky();


  if(gameState === "choose"){

    fill("yellow");

    text("Which Quest Shall You Take?",width/2-140,height-45);
    
    
    
    
 

    fill("blue");

    text("Zues and The lightning Theif",width/4-60,height/2);
    text("Poseidon and The Ocean's Trident",width/2+width/8-60,height/2);

    fill("red");

    text("Don't Get Caught     Get above 10,000,000",width/4-60,height/2 +height/8);
    text("Get Above 10,000,000    Dont Finish Your Ammo",width/2+width/8-130,height/2+height/8);
          

  }

  if(touches.length>0 || mousePressedOver(trident)){
    gameState = "water";
    touches = []

  }

  if(touches.length>0 || mousePressedOver(bolt)){
    gameState = "sky";
    touches = []
  }
  

  if(gameState === "water"){

    waterGame.clear();
    waterGame.create();
    waterGame.loop();
    waterGame.spawnShark();

    poseidon.changeAnimation("running",zues_running);

    poseidon.y = constrain(poseidon.y,width/4-70,width/4 + 80);

    if((touches.length>0 || keyWentDown(32)) && ammo>0){
      waterGame.bullet(poseidon.x + 10,poseidon.y);
      ammo-= 1;
      touches = []
    }

    if(frameCount % 10 === 0){
      score += 1;
    }

      if(keyIsDown(UP_ARROW)){


        poseidon.velocityY = -6;
      }else if(keyIsDown(DOWN_ARROW)){

        poseidon.velocityY = 6;
      }



    for(var i = 0;i<sharkGroup.length;i++){

       tempS = sharkGroup.get(i);

      for(var b = 0;b<bulletGroup.length;b++){

         tempB = bulletGroup.get(b);
        
        if(tempB.collide(tempS)){
          tempB.destroy();
          tempS.destroy();
          score += 10;
          break;
        }
      }
    }

    
    if( ammo === 0 && score < 10000000 || sharkGroup.collide(poseidon)){

      gameState = "waterEnd";
      
    }

    

  }else if(gameState === "waterEnd"){

    fill("red");

      
      poseidon.changeAnimation("idle",zues_idle);


    retry.visible = true;
    gameOver.visible = true;

    ocean.velocityX = 0;
    poseidon.velocityY = 0;

    sharkGroup.setVelocityXEach(0);
    sharkGroup.setVelocityYEach(0);
    sharkGroup.setLifetimeEach(-1);

    for(var i = 0;i<sharkGroup.length;i++){

      tempS = sharkGroup.get(i);

     for(var b = 0;b<bulletGroup.length;b++){

        tempB = bulletGroup.get(b);
       
       if(tempB.collide(tempS)){
         tempB.destroy();
         tempS.destroy();
         score += 10;
         break;
       }
     }
   }

   if(touches.length > 0  || mousePressedOver(retry)) {

    waterGame.reset();
    touches = [];
  }
    

  }  
  
  if(gameState === "sky"){

    zues.changeAnimation("running",zues_running);

    airGame.loop();
    airGame.clear();
    airGame.create();
    airGame.spawnLightning();

    if(frameCount % 10 === 0){
      score += 1;
    }

    if((touches.length > 0  || keyWentDown("space")) && zues.y >= height/2 + height/4 + 40){

      zues.velocityY = -15;
      zues.changeAnimation("jumping",zues_jumping);
      touches = [];

    }else{

      zues.changeAnimation("running",zues_running);
    }

    
    zues.velocityY += 1;

    if(enemyGroup.collide(zues) && score<10000000){

      gameState = "airEnd";

    }



    for(var i = 0;i<lightGroup.length;i++){

      var temp = lightGroup.get(i);


      if(temp.y > 300){

       var enemy = createSprite(temp.x,height/2+height/4+110,20,20);
           enemy.addAnimation("EnemyRunning",enemy_running);
           enemy.velocityX = -(6 + 3*score/100);
           enemy.lifetime = 250;
           enemyGroup.add(enemy);

      }
    }

    
  }else if(gameState === "airEnd"){

    background(70,216,231);

    fill("red");

    retry.visible = true;
    gameOver.visible = true;

    clouds.velocityX = 0;
    zues.velocityY = 0;

    enemyGroup.setVelocityXEach(0);
    enemyGroup.setVelocityYEach(0);
    enemyGroup.setLifetimeEach(-1);

    zues.changeAnimation("idle",zues_idle);

    if(touches.length>0 || mousePressedOver(retry)){

      airGame.reset();
      touches = [];

    }

  }

  drawSprites();

  if(gameState === "water" || gameState === "waterEnd"){

    text("Ammunition " + " : " + ammo,width/16-55,width/16-55);
    text("Score " + " : " + score,width/2+width/4+180,width/16-55);

  }

  if(gameState === "sky" || gameState === "airEnd"){

    text("Score " + " : " + score,width/2+width/4+180,width/16-55);

  }

  
  
}



