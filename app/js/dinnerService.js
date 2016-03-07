// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
  
  var numberOfGuest = 2;


  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
  }

  this.getNumberOfGuests = function() {
    return numberOfGuest;
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