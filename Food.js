class Food{
    constructor(){
        this.foodStock
        this.lastFed
        this.image = loadImage("milk.png")
    
    }
    
    
   
    display(){
      var x=80,y=100;

     imageMode (CENTER)
      image(this.image,720,220,70,70)

      if(this.foodStock != 0 ){
          for(var i = 0;i<this.foodStock;i++){
              if(i%10===0){
                x = 50;
                y = y + 50;
              }
            
            image(this.image,x,y,50,50)
            x=x+30
           
         }
      }


    }

     bedroom(){

      background (bedroomImg, 550,500);
      console.log("bedroom")
      }
      
       garden(){
      
      background (gardenImg, 550, 500);
      console.log("garden")
      }
      
       washroom(){
      
      background (washroomImg , 550, 500);
      
      }
   
    updateFoodStock(foodStock){
       this.foodStock=foodStock;
       }
}
