class Water{

constructor(){}

clear(){

bolt.x = -5000;
trident.x = -5000;

}

create(){

ocean.visible = true;
poseidon.visible = true;

}

loop(){

    ocean.velocityX = -5;

 if(ocean.x<width/16+45){

    ocean.x = width/2;
 }   
}


bullet(x,y){

    var bullet = createSprite(x,y,30,4);
    bullet.velocityX = 5;

    bullet.shapeColor = "blue";

    bullet.lifetime = 250;

    bulletGroup.add(bullet);

}

spawnShark(){

    if(frameCount % 60 === 0){
    
      var shark = createSprite(width,random(width/4-50,width/4 + 80),100,100);
          shark.velocityX = -(6 + 3*score/100);
    
         shark.addImage("Shark",shark_img);
    
          shark.scale = 0.1;     
          shark.lifetime = 350;
    
          sharkGroup.add(shark);
    }
    
    
    }

reset(){

gameState = "water";
ammo = 500;
score = 0;

poseidon.velocityY = -4;

gameOver.visible = false;
retry.visible = false;

sharkGroup.destroyEach();
bulletGroup.destroyEach();


}    

    

      


    
}