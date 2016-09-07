/* jshint esversion: 6 */

angular.module('fractalByte')
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/components/home/homeView.html',
      controller: 'homeController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
