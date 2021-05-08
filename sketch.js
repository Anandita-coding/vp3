var dog , happyDog
var foodS = 0
var foodStockRef
var foodImage,food,bedroomImg,gardenImg,washroomImg;
var feedthepup, moreFood;
var GSchange,GSread;
var lastFed
function preload()
{
  //load images here
  dogI = loadImage("Dog.png")
  dogH = loadImage("dogImg1.png")

  bedroomImg = loadImage("Bed Room.png")
  gardenImg = loadImage("Garden.png")
  washroomImg = loadImage("Wash Room.png")


}

function setup() {
  createCanvas(900, 500);
  database = firebase.database();

   food = new Food(200,200)
   fedTime = database.ref('feedTime')
   fedTime.on("value",function(data){
     lastFed = data.val()
   });
   console.log(lastFed)
    

  foodStockRef = database.ref('food')
  foodStockRef.on("value",readStock)

  GSread = database.ref('gameState')
  GSread.on("value", function(data){
    gameState = data.val();
  })
   
   
   dog = createSprite(650,250,10,10)
  dog.addImage(dogI)
  dog.scale =0.3
  
  feedthepup = createButton("Feed The Dog")
  feedthepup.position(800,95)
  feedthepup.mousePressed(feedDog)

  moreFood = createButton("Add Food")
  moreFood.position(700,95)
  moreFood.mousePressed(addFood)
}


function draw() {  
background(47,80,139)
  drawSprites();
  //add styles here
  textSize(20)
  console.log("inside draw" + foodS)
  text("Food Remaining:"+ foodS ,100,100)

    fill(255,255,254)
    textSize(15)
    if(lastFed>=12){
      text("Last Feed: " +lastFed%12 + "PM", 350,30)
    }else if (lastFed == 0){
      text("Last feed: 12 AM" ,350,30)
    }else{
      text("Last feed:" +lastFed+ "AM", 350,30)
    }
    
    currentTime=hour();
     console.log(currentTime,lastFed)
    if (currentTime==(lastFed+1)){

    update("Playing");
     food.garden();
    }else if(currentTime==(lastFed+2)){ 
      
      update("Sleeping"); 
      food.bedroom();
    }else if(currentTime> (lastFed) && currentTime <=(lastFed)){
    
    update("Bathing");
     food.washroom();
    }else{
    
    update("Hungry");
    food.display();
    }    

    


    if(gameState!="Hungry"){
      feedthepup.hide();
      moreFood.hide();
      dog.remove()
    }else{
      feedthepup.show();
      moreFood.show();
      dog.addImage(dogI)
    }
  
  
  
food.display();
}
function readStock(data){

    foodS = data.val();
    food.foodStock = foodS
      console.log('reading' + foodS)

}

function feedDog(){
  moreFood.mousePressed(dog.addImage(dogH))
  foodS = foodS-1
  database.ref('/').update({
    food:foodS,
    feedTime:hour(),
    gameState:"Hungry"
  })

}
function addFood(){
  console.log(foodS)
  foodS++
  database.ref('/').update({
    
    food:foodS    
  })
  console.log(foodS+"addfood"+ " adddfoodAgain")
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
 }