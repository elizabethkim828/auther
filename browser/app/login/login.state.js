'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    template: "<sign-in process='checkUser' button-name='login'></sign-in>",
    controller: 'LoginCtrl'
  });
});

app.config(function ($stateProvider) {
  $stateProvider.state('logout', {
    url: '/logout',
    controller: function($http, $state, $rootScope) {
    	$http.get('/api/logout').then(function() {
        $rootScope.currentUser = null;
    		$state.go('login')
    	})
    }
  });
});