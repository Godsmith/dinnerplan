module.exports = function () {

  var dates = {
    today: moment().format('YYYY-MM-DD'),
    tomorrow: moment().add(1, 'days').format('YYYY-MM-DD')
  };

  this.Given(/^I have added a meal for tonight$/, function () {
    this.support.addMealForDate('meal name', dates.today);
  });

  this.When(/^I click "([^"]*)"'s meal$/, function (arg1) {
    this.support.clickMealName(dates[arg1]);
  });

  this.Then(/^The "([^"]*)" edit control should show$/, function (arg1) {
    browser.waitForVisible('#inputMeal' + arg1);
  });

  this.Given(/^I am a logged in user on the main page in edit mode$/, function () {
    this.support.navigateToMainPage();
    this.support.createUserAndLogIn();
    this.support.addMealForDate('meal name', dates.today);
    this.support.clickMealName(dates.today);
  });

  this.Then(/^The edit controls should not show$/, function () {
    browser.waitForVisible('#inputMealName', undefined, true); // waitForNotExist
  });

  this.When(/^I click the "([^"]*)" edit meal button$/, function (arg1) {
    this.support.clickSelector('.editMeal .' + arg1);
  });

  this.Then(/^The color of tonight's meal should be "([^"]*)"$/, function (arg1) {
    var selector = '.viewing.date-' + dates.today + ' a';
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

  this.Given(/^I click the "([^"]*)" textarea$/, function (arg1) {
    this.support.clickSelector('#inputMeal' + arg1)
  });
  var height;
  this.Given(/^The "([^"]*)" textarea has a certain height$/, function (arg1) {
    height = browser.getCssProperty('#inputMeal' + arg1, "height").parsed.value;
  });

  this.Then(/^The "([^"]*)" textarea has increased in height$/, function (arg1) {
    expect(browser.getCssProperty('#inputMeal' + arg1, "height").parsed.value).toBeGreaterThan(height);
  });

  this.Then(/^The text of the Time textbox should be "([^"]*)"$/, function (arg1) {
    expect(this.support.getValueOfSelector('#inputMealTime')).toEqual(arg1);
  });

  this.When(/^I insert "([^"]*)" as "([^"]*)"'s meal$/, function (meal, arg2) {
    var dateString = dates[arg2];
    this.support.addMealForDate(meal, dateString);
  });
};
