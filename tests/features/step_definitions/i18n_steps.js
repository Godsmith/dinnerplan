module.exports = function () {
  this.When(/^I click the American flag$/, function () {
    browser.click('#flag-us')
  });

  this.Then(/^"([^"]*)" is shown on the page$/, function (arg1) {
    let html = browser.getHTML('body');
    expect(html).toContain(arg1);
  });

  this.Then(/^"([^"]*)" is not shown on the page$/, function (arg1) {
    let html = browser.getHTML('body');
    expect(html).not.toContain(arg1);
  });

}