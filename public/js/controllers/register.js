angular
      .module('EventUpApp')
      .controller('RegisterController', RegisterController);

RegisterController.$inject = ["User", "$state", "$rootScope"];
function RegisterController(User, $state, $rootScope) {
  var self = this;

  this.submit = function() {
      User.register(this.user, function(res) {
        $state.go("home");
        $rootScope.$broadcast("loggedIn");
      });
  }

}