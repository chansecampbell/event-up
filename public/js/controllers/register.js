angular
      .module('EventUpApp')
      .controller('RegisterController', RegisterController);

RegisterController.$inject = ["User", "$state", "$rootScope", "$auth"];
function RegisterController(User, $state, $rootScope, $auth) {
  var self = this;
  
  this.submit = function() {
    $auth.signup(this.user, {
      url: "/api/register"
    }).then(function(){
      $rootScope.$broadcast("loggedIn");
      $state.go('home');
    })
  }

}