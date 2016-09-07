angular
        .module("EventUpApp")
        .factory("AuthInterceptor", AuthInterceptor);

AuthInterceptor.$inject = ["TokenService", "API", "$rootScope"];
function AuthInterceptor(TokenService, API, $rootScope) {
    return {
        request: function(req) {
            var token = TokenService.getToken();
            
            if(!!req.url.match(API) && token) {
                req.headers.Authorization = "Bearer " + token;
            }
            return req;
        },
        response: function(res) {
           if(!!res.config.url.match(API) && res.data.token) {
               TokenService.setToken(res.data.token);
           }
          return res;
        },
        responseError: function(res) {
           if(res.status === 401) {
                $rootScope.$broadcast("unauthorized");
        }
           return res.data;
         } 
    }
}