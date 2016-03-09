
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }
      
  $scope.pendingID = $routeParams.dishId;

    $scope.getDish=function(){
        $scope.status ="loading";
        Dinner.Dish.get({id:$scope.pendingID},function(data){
            $scope.getNumberOfGuests=function(){
                return Dinner.getNumberOfGuests();
            }
            $scope.detailDish = data;
            $scope.dishIngredients = data.Ingredients;
            console.log(data.Ingredients[0].Name);
            $scope.status = "continue";

            $scope.totalPrice=Dinner.getPriceForDish(data);
            console.log($scope.totalPrice);

        });
    };
    
    $scope.setPendingDish = function(id){
      Dinner.setPendingID(data);
      pendingDish=Dinner.getDish(pendingID)
    }   

    $scope.addDishToMenu = function(id){
      Dinner.addDishToMenu(id);
      Dinner.setPendingDish(0);
    }

});