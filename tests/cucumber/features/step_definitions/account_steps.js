/**
 * Created by Filip on 2015-10-28.
 */
module.exports = function () {
  this.Given(/^The main page is showing$/, function () {
    browser.url(process.env.ROOT_URL);
    browser.waitForExist('body *');
    browser.waitForVisible('body *');
  });

  this.When(/^I click the Sign in link$/, function () {
    browser.waitForExist('#login-sign-in-link');
    browser.click('#login-sign-in-link');
  });

  this.When(/^I fill in "([^"]*)" as username$/, function (arg1) {
    browser.setValue('#login-username', arg1);
  });

  this.When(/^I click the Create account link$/, function () {
    browser.waitForExist('#signup-link');
    browser.click('#signup-link');
  });

  this.When(/^I fill in "([^"]*)" as password$/, function (arg1) {
    browser.setValue('#login-password', arg1);
    browser.setValue('#login-password-again', arg1);
  });

  this.When(/^I click the Create account button$/, function () {
    browser.click('#login-buttons-password')
  });

  this.Then(/^I should see my name "([^"]*)" on the page$/, function (arg1) {
    browser.waitForExist('#login-name-link');
    var text = browser.getText('#login-name-link');
    expect(text).toContain(arg1);
  });
};
