angular
      .module('EventUpApp')
      .controller('MainController', MainController);

MainController.$inject = ["$auth", "$state", "$rootScope", "$scope", "$timeout"];
function MainController($auth, $state, $rootScope, $scope, $timeout) {
  var self = this;

  this.currentUser = $auth.getPayload();

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