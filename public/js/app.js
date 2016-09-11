angular
      .module('EventUpApp', ["ui.router", "ngResource", "angular-jwt", "satellizer"])
      .constant("API", "http://localhost:3000/api")
      .config(oAuthConfig)
      .config(Router);

oAuthConfig.$inject = ["$authProvider", "API"];
function oAuthConfig($authProvider, API) {
  $authProvider.facebook({
    url: API + "/oauth/facebook",
    clientId: "1110723275675004"
  });
}

Router.$inject = ["$stateProvider", "$urlRouterProvider"];
function Router($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "/templates/home.html",
      controller: "MapController as map"
    })
    .state("register", {
      url: "/register",
      templateUrl: "/templates/register.html",
      controller: "RegisterController as register"
    })
    .state("login", {
      url: "/login",
      templateUrl: "/templates/login.html",
      controller: "LoginController as login"
    })
    .state("users", {
      url: "/users",
      templateUrl: "/templates/users.html",
      controller: "UsersController as users"
    }) 
    .state("countries", {
      url: "/countries",
      templateUrl: "/templates/countries.html",
      controller: "CountriesController as countries"
    });


    $urlRouterProvider.otherwise("/");
}
