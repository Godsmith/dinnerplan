module.exports = function () {

  this.Then(/^The "([^"]*)" column header should be visible$/, function (arg1) {
    expect(this.support.getTextOfSelector('th')[0]).toEqual('Namn');
  });

  this.Then(/^There should be "([^"]*)" rows in the recipes table, including header$/, function (arg1) {
    var selector = '.recipes tr';
    browser.waitForVisible('.recipes td'); //wait until table data loaded
    expect(browser.elements(selector).value.length).toEqual(2);
  });

  this.Then(/^The component "([^"]*)" should include the HTML "([^"]*)"$/, function (component, html) {
    browser.waitForVisible('.recipes td');
    expect(browser.getHTML(component)).toContain(html);
  });

  this.When(/^I click "([^"]*)"$/, function (component) {
    browser.waitForVisible(component);
    browser.click(component);
  });
};
