// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($cookieStore,$resource) {
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:15,api_key:'d6Wz1E41ENng5iGi9xAbE6Mc64F4fZj1'});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'d6Wz1E41ENng5iGi9xAbE6Mc64F4fZj1'}); 

  var numberOfGuest = 2;
  var menuID = [{'Category':'Appetizers','id': 0},{'Category':'Main Dish','id': 0},{'Category':'Desserts','id': 0}];
  var Type="appetizers";
  var Filter=null;
  var DetailID=0;
  var apiKey = "d6Wz1E41ENng5iGi9xAbE6Mc64F4fZj1"

  this.setNumberOfGuests = function(num) {
    $cookieStore.put('numberOfGuest',num);
    numberOfGuest = num;
 
  }

  this.getNumberOfGuests = function() {
    return $cookieStore.get('numberOfGuest');
  }
this.getDish=function(id){
  var url = "http://api.bigoven.com/recipe/" + id + "?api_key="+apiKey;
  var result='';
  $.ajax({
           type: "GET",
           dataType: 'json',
           async: false,
           url: url,
           success: function (data) {
              
              //alert('success');
               result=data;
              console.log("计数君");
              }
           });
   return result;
  };


      this.getAllDishes = function (type,filter) {
    if(filter==undefined){
      var url = "http://api.bigoven.com/recipes?pg=1&rpp=10&any_kw="
                  + type 
                  + "&api_key="+apiKey;
                  console.log("jinlaile1= "+url);
        }else{
            var url="http://api.bigoven.com/recipes?pg=1&rpp=10&any_kw="
                  + type+"+"+filter
                  + "&api_key="+apiKey;
                  console.log("jinlaile2 " +url)
        }
        var result='';
        $.ajax({
            type: "GET",
            dataType: 'json',
            async: false,
            url: url,
            success: function (data) {
                //alert('success');
                
                result=data.Results;
                
                
            }
        });
        return result;
      }

  
  this.setPendingID = function(id){
    pendingID=id;
  };

  this.getPendingID = function(){
    return pendingID;
  };
  

  this.getFullMenu = function(){
    var allDishes = [];
    
    for(var i=0; i<menuID.length;i++){
      if(menuID[i].id!=0){
        
        var dish=this.getDish(menuID[i].id);
      
      allDishes.push(dish);
      }
    }
    return allDishes;
  }

    this.removeDishFromMenu = function(){
      for(key in menuID){ 
      if( menuID[key].id == id)
      {
        menuID[key].id=0;
      }
    }
  }


    this.getAllIngredients = function(dish) {
    var allIngredients = [];

    var ingredients = dish.Ingredients;
    console.log(ingredients);

    for(ingredient in ingredients){
      allIngredients.push(ingredient);
    }

    return allIngredients;
  }


  this.addDishToMenu = function(id){
    var dish = this.getDish(id);
    for(key in menuID){ 
      if(menuID[key].Category==dish.Category){
        
          menuID[key].id=dish.RecipeID;
      }
    }
  }



  this.getPriceForDish = function(data) {
    var dishPrice = 0;
    var dishIngredients = data.Ingredients;
    for(key in dishIngredients){
      dishPrice += dishIngredients[key].Quantity;
    }
    return parseFloat(dishPrice.toFixed(2));
    };


  this.getTotalMenuPrice =function(){
    var totalPrice=0
    var dish=this.getFullMenu();
    for (key in dish){
      totalPrice += this.getPriceForDish(dish[key]);
    }
    totalPrice = totalPrice*this.getNumberOfGuests();
    return totalPrice;
  }

  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for detail
  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});
// example in instructions

// this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'YOUR_API_KEY'});
// this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'YOUR_API_KEY'}); 
// Now, in the controller, if we want to search for dishes we can call Dinner.DishSearch.get({title_kw:'chicken'}) or to get a single dish we would do Dinner.Dish.get({id:12345}).