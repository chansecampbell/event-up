angular
      .module('EventUpApp')
      .controller('MapController', MapController);

MapController.$inject = ["$scope", "$timeout"];
function MapController($scope, $timeout) {
  var self = $scope;
  self.map;

  //Map initialization  
  $timeout(function(){

      var latlng = new google.maps.LatLng(28.466233, 23.078325);
      var myOptions = {
          zoom: 2,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      self.map = new google.maps.Map(document.getElementById("map"), myOptions); 
      self.overlay = new google.maps.OverlayView();
      self.overlay.draw = function() {}; // empty function required
      self.overlay.setMap(self.map);
      self.element = document.getElementById('map');

  },100);

}