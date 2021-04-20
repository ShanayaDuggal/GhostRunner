var tower, towerImg, ghost, ghostImg, climber, climberImg, door, doorImg, invisibleBlock;
var climbersGroup, doorsGroup, invisibleBlockGroup;
var gameState="play";
var spookySound;

function preload() {
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower=createSprite(300,300)
  tower.addImage(towerImg);
  tower.velocityY=2;
  
  ghost=createSprite(200,200)
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
  
  
}
function draw() {
  if(gameState=="play"){
    
  
  if(tower.y>400){
    tower.y=300;
  }
  if(keyDown(RIGHT_ARROW)){
    ghost.x=ghost.x+3;
  }
  if(keyDown(LEFT_ARROW)){
    ghost.x=ghost.x-3;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY+=0.8;
  
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
   // console.log("hello")
    ghost.destroy();
    gameState="end";
    
  }
  spawnDoors();
  drawSprites();
  }
  if(gameState=="end"){
    textSize(30);
    fill("red");
    stroke("black")
    text("GameOver",300,300)
  }
  
}
function spawnDoors(){
  if(frameCount%200==0){
    
    door=createSprite(Math.round(random(150,400)),-50);
    
    door.addImage(doorImg);
    door.velocityY=1;
    door.lifetime=800;
    
    climber=createSprite(200,10);
    climber.addImage(climberImg);
    climber.velocityY=1;
    climber.x=door.x
    climber.lifetime=800;
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    climbersGroup.add(climber);
    doorsGroup.add(door);
    
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.lifetime=800;
   // invisibleBlock.debug=true;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.visible=false;
    
  }
}