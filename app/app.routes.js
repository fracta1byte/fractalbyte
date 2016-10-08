/* jshint esversion: 6 */

angular.module('fractalByte')
.config(($routeProvider) => {
    $routeProvider
    .when('/', {
        templateUrl: './components/home/homeView.html',
        controller: 'homeController'
    })
    .otherwise({
        redirectTo: '/'
    });
});
