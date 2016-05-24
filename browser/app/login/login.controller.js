'use strict';

app.controller('LoginCtrl', function ($scope, AuthFactory, $state, $rootScope) {

  $scope.checkUser = function(email, password) {
  	AuthFactory.checkUser(email, password).then(function(res) {
  		$rootScope.currentUser = res;
    	$state.go('user', { id: res.id })
  	})
  }

});