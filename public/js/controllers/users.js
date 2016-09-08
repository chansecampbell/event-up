angular
      .module('EventUpApp')
      .controller('UsersController', UsersController);

UsersController.$inject = ["User", "$auth", "$rootScope"];
function UsersController(User, $auth, $rootScope) {
  this.all = User.query();

  if(!$auth.getPayload()){
    $rootScope.$broadcast("unauthorized");
  }
}