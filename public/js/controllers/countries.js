angular
      .module('EventUpApp')
      .controller('CountriesController', CountriesController);

CountriesController.$inject = ["Country", "$auth", "$rootScope", "$http", "API"];
function CountriesController(Country, $auth, $rootScope, $http, API) {
  var self = this;
  self.all = [];

  self.getCountries = function(query) {
      return $http.post(API + '/countries/search', {query: query})
        .then(function(response){
          var countries = response.data;
          return countries.map(function(country) {
            return country.name;
          });
        });
    };

  self.getCountries();

  if(!$auth.getPayload()){
    $rootScope.$broadcast("unauthorized");
  }
}