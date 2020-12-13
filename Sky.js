class Sky{

constructor(){}

clear(){

bolt.x = -width*4000;
trident.x = -width*4000;

}

create(){

background(70,216,231);    

zues.visible = true;
clouds.visible = true;

zues.collide(fakeClouds);

}



loop(){

    clouds.velocityX = -5;

    if(clouds.x<width/8+250){

        clouds.x = width/2;

    }
}

spawnLightning(){

    if(frameCount% 75===0){

          var light =createSprite(width/2+40,height/8-10,10,70);
          light.shapeColor="yellow";
          light.x=random(width/8-50,width-40);
          light.velocityY=75;
          light.lifetime = 5;
          lightGroup.add(light);

    }     
}

reset(){

gameState = "sky";

score = 0;

gameOver.visible = false;
retry.visible = false;

zues.changeAnimation("running",zues_running);

enemyGroup.destroyEach();

}
    
}