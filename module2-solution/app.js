(function () {

angular.module('ShoppingListCheckOff', [])

.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var showList = this;
  showList.items = ShoppingListCheckOffService.getItemsToBuy();

  showList.itemIsBought = function (itemIndex){
    try {
      ShoppingListCheckOffService.itemIsBought(itemIndex);
    } catch (error) {
      showList.errorMessage = error.message;
    }

  }

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var showList = this;
  showList.items = ShoppingListCheckOffService.getItemsBought();

  showList.isEmptyStatus = function ()
  {
    return ShoppingListCheckOffService.checkBoughtAnything();
  }
}

function ShoppingListCheckOffService() {

  var service = this;

  var itemsToBuy = [ {quantity:'10',name:'Chocolate Cookie Extreme'},
                    {quantity:'2',name:'Water Bottle'},
                    {quantity:'4',name:'Dark Chocolate'},
                    {quantity:'119',name:'Napkins'},
                    {quantity:'1',name:'Bread'}];

  var itemsBought = [];

  service.getItemsToBuy = function(){
    return itemsToBuy;
  };

  service.getItemsBought = function(){
    return itemsBought;
  };

  service.itemIsBought = function(itemIndex){
    var itemtomove = itemsToBuy[itemIndex];
    itemsToBuy.splice(itemIndex,1);
    itemsBought.push(itemtomove);
    if(itemsToBuy.length == 0){
      throw new Error("Everything is bought!");
    }
  }

  service.checkBoughtAnything = function(){
    if(itemsBought.length == 0)
    {
      return true;
    }
    else{
      return false;
    }
  }

}

})();
