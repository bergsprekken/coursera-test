(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {

  $scope.dishlist = "";
  $scope.message = "";

  $scope.checkDishList = function () {
    var tmpMessage = "";
    if($scope.dishlist == "")
    {
      tmpMessage = "Please enter data first";
    }
    else{
      var totalDishes = calculateDishNumber($scope.dishlist);
      tmpMessage = createMessageResult(totalDishes);
    }
    $scope.message = tmpMessage;
  };

  function calculateDishNumber(string) {
    var dishStringArray = string.split(",");
    return dishStringArray.length;
  };

  function createMessageResult(number) {
    if(number <= 3) {
      return "Enjoy!";
    }
    else {
      return "Too much!";
    }
  };

};



})();
