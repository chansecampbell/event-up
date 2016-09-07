angular
      .module('EventUpApp')
      .controller('LoginController', LoginController);

LoginController.$inject = ["User", "$state", "$rootScope"];
function LoginController(User, $state, $rootScope) {
  var self = this;

  this.submit = function() {
      User.login(this.credentials, function(res) {
        $state.go("home");
        $rootScope.$broadcast("loggedIn");
      });
  }

}