/* jshint esversion: 6 */

const webdriver = require('selenium-webdriver'),
      phantomjs = require('selenium-webdriver/phantomjs');

const driver = new webdriver.Builder()
  .forBrowser('phantomjs')
  .build();

const chai = require('chai'),
    expect = chai.expect;


describe('Landing title', () => {

  before((done) => {
    driver.navigate().to('http://localhost:8000')
    .then(() => done());
  });

  it('should contain words Fractal Byte', (done) => {
    driver.getTitle()
    .then((title) => {
      expect(title).to.be.equal('Fractal Byte');
    })
    .then(() => done());
  });

  after((done) => {
    driver.quit()
    .then(() => done());
  });

});
