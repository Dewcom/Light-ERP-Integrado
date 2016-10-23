 'use strict';

    angular
        .module('app.services')
        .factory("authenticationService", function($http, $state, $q, $window) {
          

  function login(userName, password) {
      
    var userInfo;
     var promise = $http.post("http://localhost:8080/api/login", {
      username:userName,
      password:password
    }).then(function(response) {
       userInfo = {
        accessToken: response.data.access_token,
        userName: response.data.username,
        role: response.data.roles[0]
      };
      $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
      return response
    });
     return promise;
  }


  return {
    login: login
  };
});






