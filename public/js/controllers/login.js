angular
      .module('EventUpApp')
      .controller('LoginController', LoginController);

LoginController.$inject = ["User", "$state", "$rootScope", "$auth"];
function LoginController(User, $state, $rootScope, $auth) {
  var self = this;

  this.submit = function() {
      User.login(this.credentials, function(res) {
        $state.go("home");
        $rootScope.$broadcast("loggedIn");
      });
  }

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
    .then(function() {
     self.currentUser = $auth.getPayload();
    });
  }

  this.current = $auth.getPayload();

}