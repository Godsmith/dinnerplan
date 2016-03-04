/**
 * Created by Filip on 2015-10-30.
 */
module.exports = function () {

  let moment = require('moment');

  let dates = {
    today: moment().format('YYYY-MM-DD'),
    tomorrow: moment().add(1, 'days').format('YYYY-MM-DD')
  };
  var storedValue;

  this.When(/^I click the edit button for "([^"]*)"'s meal$/, function (arg1) {
    this.support.clickEditButtonForDate(dates[arg1]);
  });

  this.When(/^I insert "([^"]*)" in the meal name text box$/, function (arg1) {
    this.support.setValueOfSelector('#meal-name', arg1)
  });

  this.When(/^I press "([^"]*)"$/, function (arg1) {
    browser.keys(arg1);
  });

  this.When(/^I enter two lines of text$/, function () {
    browser.keys('first line');
    browser.keys('Enter');
    browser.keys('second line');
  });

  this.Then(/^The text of "([^"]*)"'s meal should be "([^"]*)"$/, function (day, name) {
    var a = '.date-' + dates[day] + ' a';
    browser.waitForExist(a);
    expect(browser.getText(a)).toEqual(name);
  });

  this.Then(/^There shouldn't be any link to today's meal$/, function () {
    var a = '.date-' + dates.today + ' a';
    browser.waitForExist(a, undefined, true); //waitForNotExist
  });

  this.Then(/^The input box with id "([^"]*)" should have the value "([^"]*)"$/, function (arg1, arg2) {
    var selector = '#' + arg1;
    browser.waitForExist(selector);
    expect(browser.getValue(selector)).toEqual(arg2);
  });

  this.Then(/^The number of days showing should be "([^"]*)"$/, function (arg1) {
    expect(String(browser.elements('div.meal-name').value.length)).toEqual(arg1);
  });

  this.When(/^I click the "([^"]*)" button for "([^"]*)"'s meal$/, function (arg1, arg2) {
    var button = '.date-' + dates[arg2] + ' .' + arg1;
    browser.waitForExist(button);
    browser.click(button);
  });

  this.Given(/^I set the control with id "([^"]*)" to the value "([^"]*)"$/, function (arg1, arg2) {
    var selector = '#' + arg1;
    browser.waitForExist(selector);
    browser.setValue(selector, arg2);
  });

  this.Then(/^The control with id "([^"]*)" should have the value "([^"]*)"$/, function (arg1, arg2) {
    var selector = '#' + arg1;
    browser.waitForExist(selector);
    expect(browser.getValue(selector)).toEqual(arg2);
  });

  this.Then(/^The height of the textarea should be "([^"]*)" pixels$/, function (height) {
    var textarea = '#meal-name';
    browser.waitForExist(textarea);
    expect(browser.getCssProperty(textarea, "height").parsed.value).toEqual(parseInt(height));
  });

  this.Then(/^There shouldn't be meals for any days in the database$/, function () {
    var hasMeals = this.server.call("hasMeals");
    expect(hasMeals).toEqual(false);
  });

  this.When(/^I select "([^"]*)"'s edit button$/, function (arg1) {
    this.support.focusEditButtonForDate(dates[arg1]);
  });

  this.When(/^"([^"]*)"'s edit button should be selected$/, function (arg1) {
    var button = '.date-' + dates[arg1] + ' button';
    expect(browser.elementActive().value).toEqual(browser.element(button).value);
  });

  this.When(/^I send two up arrows to the "([^"]*)" control and record the value$/, function (arg1) {
    var selector = "#" + arg1;
    browser.click(selector);
    // click() seems to select the year control, so switch to the week control first by pressing
    // Shift+Tab.
    browser.keys(['Shift', 'Tab', 'Shift', 'Up arrow', 'Up arrow']);
    storedValue = browser.getValue(selector);
  });

  this.Then(/^The input box with id "([^"]*)" should still have the recorded value$/, function (arg1) {
    expect(browser.getValue('#' + arg1)).toEqual(storedValue);
  });

  this.When(/^I type "([^"]*)"$/, function (arg1) {
    browser.keys(arg1);
  });

  this.When(/^The meal name text box should show "([^"]*)"$/, function (text) {
    expect(browser.getValue('#meal-name')).toEqual(text);
  });

  this.When(/^I select character "([^"]*)" to "([^"]*)" in the meal name text box$/,
    function(start, stop) {
      browser.execute(function(start, stop) {
        var textarea = $('#meal-name')[0];
        textarea.selectionStart = start;
        textarea.selectionEnd = stop
    }, start, stop);
  });
};
