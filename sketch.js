//Create variables here
  var sadDog
  var dogImage2;
  
 
  
  var database;
  var foodStock;
  var Dog;
  var foodS;
  var Feed,addFood;
  
  var fedTime,lastFed;
  var foodObj;
 


  function preload()
  {
    //load images here
  
    sadDog=loadImage("Dog.png");
    dogImage2=loadImage("happy dog.png");
   
   
  }

  function setup() {
    database=firebase.database();
        createCanvas(1000, 500);
        Dog = createSprite(550,250,10,10);
        Dog.addImage(sadDog);
        Dog.scale=0.15;
        foodObj = new Food();
        
        database=firebase.database();
        foodstock=database.ref('Food');
        foodstock.on("value",readStock);

        
        readState=database.ref('gameState');
       readState.on("value",function (data){
       gameState=data.val();
  });
   


     

        var feed=createButton(" Feed Montu");
        feed.position(700,95);
        feed.mousePressed(feedDog);

        var add=createButton("Add Food");
        add.position(800,95);
        add.mousePressed(addFoods);

        fedTime=database.ref('lastFed');
        fedTime.on("value",function(data){
          lastFed=data.val();
        });
       
        

  
    }


    function draw() {
      background(46,139,87);
      foodObj.display();
    
      
      fill(255,255,254);
      textSize(15);
      if(lastFed>=12){
        text("Last Feed : "+ lastFed%12 + " PM", 350,30);
       }else if(lastFed==0){
         text("Last Feed : 12 AM",350,30);
       }else{
         text("Last Feed : "+ lastFed + " AM", 350,30);
       }
      
     
      
      drawSprites();
    }
    
    //function to read food Stock
    function readStock(data){
      foodS=data.val();
      foodObj.updateFoodStock(foodS);
    }
    
    function feedDog(){
      
      
    if(foodObj.getFoodStock()<= 0){
        foodObj.updateFoodStock(foodObj.getFoodStock()*0);
      }else{
        foodObj.updateFoodStock(foodObj.getFoodStock()-1);
      }
      
      database.ref('/').update({
        Food:foodObj.getFoodStock(),
        FeedTime:hour()
      
      })
    }
    
    //function to add food in stock
    function addFoods(){
      foodS++;
      database.ref('/').update({
        Food:foodS
      })
    }
