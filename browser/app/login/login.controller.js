'use strict';

app.controller('LoginCtrl', function ($scope, LoginFactory, $state) {

  $scope.checkUser = function(email, password) {
  	LoginFactory.fetchOne(email, password).then(function(res) {
    	$state.go('user', { id: res.id })
  	})
  }

});