'use strict';

app.directive('contenteditable', function () {
  return {
    restrict: 'A',
    require: '?ngModel', // the ? means it's optional
    link: function (scope, element, attrs, ngModel) {  // ngModel is the ng-model controller
      if (!ngModel) return;
      function read() {
        ngModel.$setViewValue(element.html()); // sets the ng-model's value to whatever is in the box
      }
      ngModel.$render = function () {
        element.html(ngModel.$viewValue || '');
      };
      element.bind('blur keyup change', function () {  // if there is any typing in the box, do "read"
        scope.$apply(read);
      });
    }
  };
});
