var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = .4;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
}

function draw() {
  background(200);
  if (gameState === "play"){
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }

    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }

    if(keyDown("space")){
    ghost.velocityY = -10;
  }
  ghost.velocityY = ghost.velocityY + 0.5;

  if(tower.y > 400){
      tower.y = 300;
  }
  spawnWindow();

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
    gameState = "end";
  }
  drawSprites();
  }
 
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    texSize(30);
    Text("Fim de Jogo", 230,250);
  }
}

function spawnWindow() {
  if(frameCount%300 === 0){
    var door = createSprite(200,-50);
    var climber = createSprite(200,0);
    door.addImage("door",doorImg);
    climber.addImage("climber",climberImg);
    door.velocityY = 1;
    climber.velocityY = 1;
    door.x = Math.round(random(150,450));
    climber.x = door.x;
    ghost.depth = door.depth;
    ghost.depth +=1;

    door.lifetime = 800;
    climber.lifetime = 800;

    doorsGroup.add(door);
    climbersGroup.add(climber);
  }
}