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
		}
	}
});