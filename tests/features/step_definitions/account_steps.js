/**
 * Created by Filip on 2015-10-28.
 */
module.exports = function () {
  this.Given(/^The main page is showing$/, function () {
    this.support.navigateToMainPage();
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

  this.Given(/^I am a logged in user$/, function () {
    this.support.createUserAndLogIn();
    //var userData = {username: 'newuser', password: 'password'};
    //this.server.call('addUser', userData);
    //browser.executeAsync(function(userData, done) {
    //  Meteor.loginWithPassword(userData.username, userData.password, done);
    //}, userData);
    //browser.waitForExist('#login-name-link');
  });

  this.When(/^I click my username$/, function () {
    browser.waitForExist('#login-name-link');
    browser.click('#login-name-link');
  });

  this.When(/^I click the Sign out button$/, function () {
    browser.waitForExist('#login-buttons-logout');
    browser.click('#login-buttons-logout');
  });

  this.Then(/^I should see "([^"]*)" on the page again$/, function (arg1) {
    browser.waitForExist('#login-sign-in-link');
    var text = browser.getText('#login-sign-in-link');
    expect(text).toContain(arg1);
  });

  this.Given(/^I am a logged in user on the main page$/, function () {
    this.support.navigateToMainPage();
    this.support.createUserAndLogIn();
  });

};
