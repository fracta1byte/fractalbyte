/* jshint esversion: 6 */

const webdriver = require('selenium-webdriver'),
      by = webdriver.By,
      phantomjs = require('selenium-webdriver/phantomjs');

const driver = new webdriver.Builder()
  .forBrowser('phantomjs')
  .build();

const chai = require('chai'),
    expect = chai.expect;


describe('Main page', () => {

  before((done) => {
    driver.navigate().to('http://localhost:8000')
    .then(() => done());
  });

  it('should have a title with text "You Active 24"', (done) => {
    driver.getTitle()
    .then((title) => {
      expect(title).to.be.equal('You Active 24');
    })
    .then(() => done());
  });

  it('should contain 9 panels with panel bodies', (done) => {
    driver.findElements(by.className('panel'))
    .then((elements) => {
      expect(elements.length).to.be.equal(9);
    })
    .then(() => done());
  });

  after((done) => {
    driver.quit()
    .then(() => done());
  });

});
