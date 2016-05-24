'use strict'

app.directive('signIn', function() {
	return {
		restrict: 'E',
		templateUrl: '/browser/app/signup/signup.html',
		scope: {
			process: '=',
			buttonName: '@',
		}
	}
})