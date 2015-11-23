/**
 * Created by Filip on 2015-10-30.
 */
module.exports = function () {

  dates = {
    today: moment().format('YYYY-MM-DD'),
    tomorrow: moment().add(1, 'days').format('YYYY-MM-DD')
  };

  this.When(/^I click the edit button for "([^"]*)"'s meal$/, function (arg1) {
    this.support.clickEditButtonForDate(dates[arg1]);
  });

  this.When(/^I insert "([^"]*)" in "([^"]*)"'s text box$/, function (arg1, arg2) {
    this.support.setValueOfSelector('.date-' + dates[arg2] + ' textarea', arg1)
  });

  this.When(/^I press "([^"]*)"$/, function (arg1) {
    browser.keys(arg1);
  });

  this.Then(/^I should see "([^"]*)" on the page$/, function (arg1) {
    var a = '.date-' + dates.today + ' a';
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

  this.Then(/^The height of today's textarea should be "([^"]*)" pixels$/, function (height) {
    var textarea = '.date-' + dates.today + ' textarea';
    browser.waitForExist(textarea);
    expect(browser.getCssProperty(textarea, "height").parsed.value).toEqual(parseInt(height));
  });
};
