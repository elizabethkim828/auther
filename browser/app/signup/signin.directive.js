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

app.directive('checkPwStrong', function() {
	return {
		restrict: 'A',
		// scope: {
		// 	checkPwStrong: '&'
		// },
		link: function(scope, element, attr, ngModel) {
			if (zxcvbn(scope.password).score < 4) {
				console.log('//////////////////////')
				ngModel.$setValidity('checkPwStrong', invalid);
				//signupForm.$error.checkPwStrong = true;
			}
		}
	}
})

