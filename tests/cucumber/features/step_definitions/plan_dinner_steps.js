/**
 * Created by Filip on 2015-10-30.
 */
module.exports = function () {

  var today = moment().format('YYYY-MM-DD');

  this.When(/^I click an edit button$/, function () {
    var button = '.date-' + today + ' button';
    browser.waitForExist(button);
    browser.click(button);
  });

  this.When(/^I fill in text "([^"]*)" in the text box$/, function (arg1) {
    var textarea = '.date-' + today + ' textarea';
    browser.waitForExist(textarea);
    browser.setValue(textarea, arg1);
  });

  this.When(/^I press "([^"]*)"$/, function (arg1) {
    browser.keys(arg1);
  });

  this.Then(/^I should see "([^"]*)" on the page$/, function (arg1) {
    var a = '.date-' + today + ' a';
    browser.waitForExist(a);
    expect(browser.getText(a)).toEqual(arg1);
  });

  this.Then(/^The input box with id "([^"]*)" should have the value "([^"]*)"$/, function (arg1, arg2) {
    var selector = '#' + arg1;
    browser.waitForExist(selector);
    expect(browser.getValue(selector)).toEqual(arg2);
  });

  this.Then(/^The number of days showing should be "([^"]*)"$/, function (arg1) {
    expect(String(browser.elements('.viewing').value.length)).toEqual(arg1);
  });

  this.When(/^I click the ok button$/, function () {
    var button = '.date-' + today + ' .ok';
    browser.waitForExist(button);
    browser.click(button);
  });

  this.When(/^I click the cancel button$/, function () {
    var button = '.date-' + today + ' .cancel';
    browser.waitForExist(button);
    browser.click(button);
  });

  this.Given(/^The control with id "([^"]*)" is set to the value "([^"]*)"$/, function (arg1, arg2) {
    var selector = '#' + arg1;
    browser.waitForExist(selector);
    browser.setValue(selector, arg2);
  });
};
