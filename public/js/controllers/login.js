angular
      .module('EventUpApp')
      .controller('LoginController', LoginController);

LoginController.$inject = ["User", "$state", "$rootScope", "$auth"];
function LoginController(User, $state, $rootScope, $auth) {
  var self = this;

  this.submit = function() {
    $auth.login(this.credentials, {
      url: "/api/login"
    }).then(function(){
      $rootScope.$broadcast("loggedIn");
      $state.go('home');
    })
  }

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
    .then(function() {
     self.currentUser = $auth.getPayload();
     $state.go("home");
     $rootScope.$broadcast("loggedIn");
    });
  }

  this.current = $auth.getPayload();

}