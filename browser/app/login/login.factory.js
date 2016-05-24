'use strict';

app.factory('LoginFactory', function ($http) {
	return {
		fetchOne: function (email, password) {
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