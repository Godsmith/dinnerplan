module.exports = function () {


  this.When(/^I add "([^"]*)" to the "([^"]*)" component$/, function (text, selector) {
    browser.waitForExist(selector);
    browser.addValue(selector, text);
  });

};
