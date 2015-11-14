module.exports = function () {

  var today = moment().format('YYYY-MM-DD');

  var testconsolelog = function() {
    console.log('hello')
  }

  this.Given(/^I have added a meal for tonight$/, function () {
    var button = '.date-' + today + ' button';
    browser.waitForExist(button);
    browser.click(button);
    var textarea = '.date-' + today + ' textarea';
    browser.waitForExist(textarea);
    browser.setValue(textarea, 'mymealname');
    browser.keys('Enter');
  });

  this.When(/^I click tonight's meal$/, function () {
    var link = '.viewing.date-' + today + ' a';
    browser.waitForExist(link);
    browser.click(link);
  });

  this.Then(/^The edit controls should show$/, function () {
    browser.waitForExist('#inputMealName');
    testconsolelog();
  });

};
