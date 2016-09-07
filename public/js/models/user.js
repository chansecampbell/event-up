angular
      .module("EventUpApp")
      .factory("User", User);

User.$inject = ["$resource", "API"];
function User($resource, API) {
  return $resource(API + "/users", { id: '@_id' }, {
    update: { method: "PUT" },
    login: { method: "POST", url: API + "/login" },
    register: { method: "POST", url: API + "/register" }
  });
} 