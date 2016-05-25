'use strict';

app.controller('SignupCtrl', function ($scope, AuthFactory, $state, $rootScope) {

  $scope.createUser = function(email, password) {
  	AuthFactory.createUser(email, password).then(function(res) {
  		if (res.status === 500) {
  			signupForm.$invalid = true;
  			signupForm.reset();
  		}
      $rootScope.currentUser = res;
    	$state.go('user', { id: res.id })
  	})
  }

});