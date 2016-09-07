angular
      .module('EventUpApp')
      .config(oAuthConfig)
      .controller('LoginController', LoginController);

oAuthConfig.$inject = ["$authProvider"];
function oAuthConfig($authProvider) {
  $authProvider.facebook({
    url: "/oauth/facebook",
    clientId: "1110723275675004"
  });

}

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
    .then (function() {
     self.currentUser = $auth.getPayload();
    });
  }

  this.current = $auth.getPayload();

}