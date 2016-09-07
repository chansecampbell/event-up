angular
      .module('EventUpApp')
      .controller('MainController', MainController);

MainController.$inject = [];
function MainController() {
  var self = this;
  this.hello = "Hello";
}