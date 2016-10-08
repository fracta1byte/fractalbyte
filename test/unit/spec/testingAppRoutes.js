/* jshint esversion: 6 */

describe('Testing app routes', () => {

    it('should test routes', () => {
        module('fractalByte');

        let route;

        inject(($route) => {
            route = $route;
        });

        expect(route.routes['/'].controller).toBe('homeController');
        expect(route.routes['/'].templateUrl).toBe('./components/home/homeView.html');
        expect(route.routes[null].redirectTo).toEqual('/');
    });
});
