dinnerPlannerApp.controller('OverviewCtrl', function ($scope,Dinner) {

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }
  
	$scope.menuDish= Dinner.getFullMenu();

	$scope.getPriceForDish= function(dish){
		Dinner.getPriceForDish(dish);
	}
	$scope.getTotalMenuPrice = function(){
		Dinner.getTotalMenuPrice();
	}
});