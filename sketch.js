//Creating varibles
var database;
var dog, dogImg, happydogImg;
var boy, boyImg;
var doghouse, doghouseImg;
var dogsbone, dogsboneImg;
var foodS;
var foodStock;

function preload() {
    dogImg = loadImage("images/dogImg.png");
    happydogImg = loadImage("images/happydogImg.png");
    boyImg = loadImage("images/boyImg.png");
    doghouseImg = loadImage("images/doghouseImg.png");
    dogsboneImg = loadImage("images/dog'sboneImg.png");
}

function setup() {
    createCanvas(500, 500);
    database = firebase.database();
    foodStock = database.ref('Food');
    foodStock.on("value",readStock);   
    dog = createSprite(250,270,10,10);
    dog.addImage(dogImg);
    dog.scale = 0.2;
    boy = createSprite(60,365,10,10);
    boy.addImage(boyImg);
    boy.scale = 0.1;
    doghouse = createSprite(400,110,10,10);
    doghouse.addImage(doghouseImg);
    doghouse.scale = 0.1;     
    dogsbone = createSprite(150,300,10,10);
    dogsbone.addImage(dogsboneImg);
    dogsbone.scale = 0.2; 
}

function draw() {  
    background(46, 139, 87);
    if (foodS!=undefined) {
      textSize(18);
      fill("white");
      stroke("black");
      text("Note: Press UP_ARROW Key To Feed Drango Milk!",50,50);
      text("Food Remaining: "+foodS,150,150);
    }
    if (keyWentDown(UP_ARROW)) {
      writeStock(foodS);
      dog.addImage(happydogImg);
    }
    if (keyWentUp(UP_ARROW)){
      dog.addImage(dogImg);
    }
    if (foodS === 0) {
      foodS = 20;
    }
    drawSprites();
}

//Function to read values from DB
function readStock(data) {
    foodS = data.val();
}

//Function to write values from DB
function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  });
}
