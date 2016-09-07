dbURIs = {
  test: "mongodb://localhost/event-up-test",
  development: "mongodb://localhost/event-up-app",
  production: process.env.MONGOLAB_URI || "mongodb://localhost/event-up-app"
}

module.exports = function(env) {
  return dbURIs[env];
}