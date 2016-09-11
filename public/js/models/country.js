angular
      .module("EventUpApp")
      .factory("Country", Country);

Country.$inject = ["$resource", "API"];
function Country($resource, API) {
  return $resource(API + "/countries", { id: '@_id' }, {
    update: { method: "PUT" }
  });
} 