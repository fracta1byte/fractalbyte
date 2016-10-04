/* jshint esversion: 6 */

describe('Home page', () => {

    beforeEach(function() {
        browser.get('http://localhost:8000');
    });

    it('should have a title with text "Fractal Byte"', () => {
        expect(browser.getTitle()).toEqual('Fractal Byte');
    });

    describe('should contain panels', () => {
        let panels = element.all(by.css('.panel'));

        it('which count equals 9', () => {
            expect(panels.count()).toBe(9);
        });

        it('with only one panel body inside them', () => {
            panels.each((panel, i) => {
                expect(panel.all(by.css('.panel-body')).count()).toBe(1);
            });
        });
    });
});
