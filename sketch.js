var PLAY = 1;
var END = 0;
var gameState = 1;

var path,boy,cash,diamonds,jwellery,sword,gameOver;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,
 swordImg,gameOverImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;

boy = createSprite(70,330,20,20);
boy.addAnimation("KimRunning",boyImg);
boy.scale=0.08;
  
gameOver = createSprite();
gameOver.scale = 0.5;
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  if(gameState == PLAY){
    
 
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      cashG.setVelocityYEach(0);
      treasureCollection = treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      diamondsG.setVelocityYEach(0);
      treasureCollection = treasureCollection+200;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      jwelleryG.setVelocityYEach(0);
      treasureCollection = treasureCollection+150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState = END;
    }
  }
  }
  
  if(gameState == END){
       boy.addAnimation("KimRunning",endImg)
        boy.x=200
        boy.y=200
        boy.scale=1.1;
    path.velocityY=0;
    
  }
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
}

function createCash() {
  if (World.frameCount % 200 == 0) {
  cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 300 == 0) {
  diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 380 == 0) {
  jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 450 == 0) {
  sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}