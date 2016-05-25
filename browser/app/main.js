'use strict';

var app = angular.module('auther', ['ui.router', 'ngRoute']);

app.config(function ($urlRouterProvider, $locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');
	
	$urlRouterProvider.when('/auth/:provider', function () {
	  window.location.reload();
	});
});

app.run(function($rootScope, AuthFactory, $log) {
	$rootScope.$on('$stateChangeStart', function(event, next, current) {
		AuthFactory.getCurrentUser().then(function(user) {
			if (user) {
				$rootScope.currentUser = user;
			}
		}).catch($log.error);
	})
})