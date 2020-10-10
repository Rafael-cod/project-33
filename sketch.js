const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var score = 0;
var count = 0;
var gameState = "play";
var particle, line;
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight = 300;
var ground;

function setup() {
  engine = Engine.create();
   world = engine.world;

  createCanvas(800,800);

  line = createSprite(400,550,800,10);
  line.shapeColor = "yellow";

  for(var k = 0; k <= width; k = k + 80){
    divisions.push(new Division(k, height - divisionHeight/4, 10, divisionHeight));
  }
  
  for(var j = 40; j <= width; j = j + 50){
    plinkos.push(new Plinko(j,75));
  }

  for(var j = 15; j <= width; j = j + 50){
    plinkos.push(new Plinko(j,175));
  }

  for(var j = 40; j <= width; j = j + 50){
    plinkos.push(new Plinko(j,275));
  }

  for(var j = 15; j <= width; j = j + 50){
    plinkos.push(new Plinko(j,375));
  }

  ground = new Ground(400,790,800,20);
  
}

function draw() {
  background(0);  
  mousePressed();

  textSize(30);
  text("Score  " + score, 50, 35);

  textSize(30);
  text("500", 15, 625);
  textSize(30);
  text("500", 95, 625);
  textSize(30);
  text("500", 175, 625);
  textSize(30);
  text("500", 255, 625);
  textSize(30);
  text("100", 335, 625);
  textSize(30);
  text("100", 415, 625);
  textSize(30);
  text("100", 495, 625);
  textSize(30);
  text("200", 575, 625);
  textSize(30);
  text("200", 655, 625);
  textSize(30);
  text("200", 735, 625);

  if ( gameState =="end") {
    
    textSize(100);
    text("GameOver", 150, 250);
  }

  drawSprites();

  Engine.update(engine);
  ground.display();


  if(particle!=null){
    particle.display();
    if(particle.body.position.y>760){
      if (particle.body.position.x < 300){
        score=score+500;      
        particle=null;
        if ( count>= 5) gameState ="end";                          
      }else if (particle.body.position.x < 600 && particle.body.position.x > 301 ) {
        score = score + 100;
        particle=null;
        if ( count>= 5) gameState ="end";
      }else if (particle.body.position.x < 900 && particle.body.position.x > 601 ){
        score = score + 200;
        particle=null;
        if ( count>= 5)  gameState ="end";
        }       
      } 
    }
  

  for(var k = 0; k < divisions.length; k++){
    divisions[k].display();
  }

  for(var j = 0; j < plinkos.length; j++){
    plinkos[j].display();
  }


  if(gameState === "end"){
    textSize(100);
    text("Game Over", 150, 150);    

  }

}

function mousePressed(){
  if(gameState !== "end"){
    count++;
    particle = new Particle(mouseX,10,10,10);
  }
}
