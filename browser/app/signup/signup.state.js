'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('signup', {
    url: '/signup',
    template: "<sign-in process='createUser' button-name='signup'></sign-in>",
    controller: 'SignupCtrl'
  });
});
