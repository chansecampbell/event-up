angular
      .module('EventUpApp')
      .controller('MainController', MainController);

MainController.$inject = ["$auth", "$state", "$rootScope"];
function MainController($auth, $state, $rootScope) {
  var self = this;

  this.currentUser = $auth.getPayload();

  // if(this.currentUser){
  //   this.welcomeMessage = "Welcome, " + this.currentUser.first_name;
  //   this.welcomeImage = this.currentUser.avatar;
  // }


  this.logout = function() {
    $auth.logout();
    this.currentUser = null;
    $state.go("home");
  }

  $rootScope.$on("unauthorized", function() {
      $state.go("login");
      self.errorMessage = "You're not getting in here!";
  });

  $rootScope.$on("loggedIn", function() {
    self.currentUser = $auth.getPayload();
    this.welcomeMessage = "Welcome, " + this.currentUser.first_name;
    this.welcomeImage = this.currentUser.avatar;
  });

  $rootScope.$on("$stateChangeStart", function() {
      self.errorMessage = null;
  });
}