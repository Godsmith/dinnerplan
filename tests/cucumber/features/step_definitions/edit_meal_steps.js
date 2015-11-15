module.exports = function () {

  var today = moment().format('YYYY-MM-DD');

  this.Given(/^I have added a meal for tonight$/, function () {
    this.support.addMealForTonight();
  });

  this.When(/^I click tonight's meal$/, function () {
    this.support.clickTonightsMeal();
  });

  this.Then(/^The "([^"]*)" edit control should show$/, function (arg1) {
    browser.waitForVisible('#inputMeal' + arg1);
  });

  this.Given(/^I am a logged in user on the main page in edit mode$/, function () {
    this.support.navigateToMainPage();
    this.support.createUserAndLogIn();
    this.support.addMealForTonight();
    this.support.clickTonightsMeal();
  });

  this.Then(/^The edit controls should not show$/, function () {
    browser.waitForVisible('#inputMealName', undefined, true); // waitForNotExist
  });

  this.When(/^I click the "([^"]*)" edit meal button$/, function (arg1) {
    this.support.clickSelector('.editMeal .' + arg1);
  });

  this.Then(/^The color of tonight's meal should be "([^"]*)"$/, function (arg1) {
    var selector = '.viewing.date-' + today + ' a';
    browser.waitForVisible(selector);
    expect(browser.getCssProperty(selector, 'color').parsed.hex).toEqual(arg1);
  });

  this.Given(/^I am a logged in user on the main page that has inserted a meal into the database$/, function () {
    this.support.insertMealIntoDatabaseAndShow();
  });

  this.When(/^I enter "([^"]*)" in the Time field$/, function (arg1) {
    this.support.setValueOfSelector('#inputMealTime', arg1);
  });

  this.Given(/^I refresh the page$/, function () {
    browser.refresh();
  });

  this.Given(/^I wait until I have been logged in$/, function () {
    browser.waitForVisible('#login-name-link');
  });

  this.Then(/^The Time field should say "([^"]*)"$/, function (arg1) {
    expect(this.support.getValueOfSelector('#inputMealTime')).toEqual(arg1);
  });

};
