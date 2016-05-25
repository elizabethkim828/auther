'use strict';

app.factory('AuthFactory', function ($http, $log) {
	return {
		createUser: function (email, password) {
			return $http.post('/api/signup', {email: email, password: password}).then(function(res) {
				return res.data;
			}).catch(function(err){
				return err;
			});
		},

		checkUser: function (email, password) {
			return $http.post('/api/login', {email: email, password: password}).then(function(res) {
				return res.data;
			}).catch(function(err) {
				if (err.status === 401) {
					console.log('user not found')
				}
			})
		},

		getCurrentUser: function() {
			return $http.get('/auth/me').then(function(res) {
				return res.data;
			})
		}

		// setCurrentUser: function() {
		// 	return $http.get('/api/me').then(function(res) {
		// 		$rootScope.currentUser = res.data;
		// 		return res.data;
		// 	})
		// }
	}
});