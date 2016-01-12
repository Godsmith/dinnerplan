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

  this.Then(/^The component "([^"]*)" should show$/, function (arg1) {
    browser.waitForVisible(arg1);
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

  this.When(/^I click the "([^"]*)" edit meal button and wait for the dialog to close$/, function (arg1) {
    this.support.clickSelector('.editMeal .' + arg1);
    // wait for the modal dialog to close
    browser.waitForVisible('.editMeal', undefined, true); // waitForNotExist
  });

  this.Then(/^The color of tonight's meal should be "([^"]*)"$/, function (arg1) {
    var selector = '.viewing.date-' + dates.today + ' a';
    browser.waitForVisible(selector);
    expect(browser.getCssProperty(selector, 'color').parsed.hex).toEqual(arg1);
  });

  this.Given(/^I am a logged in user on the main page that has inserted a meal into the database$/, function () {
    this.support.createUserAndInsertMealIntoDatabase();
  });

  this.Given(/^I have inserted the same meal for tomorrow$/, function () {
    this.support.insertTheSameMealForTomorrow();
  });

  this.When(/^I enter "([^"]*)" in the "([^"]*)" field$/, function (value, fieldName) {
    this.support.setValueOfSelector('#inputMeal' + fieldName, value);
  });

  this.Given(/^I refresh the page$/, function (callback) {
    browser.refresh();
    // Wait for a second so that all elements have disappeared, or waitForExist may return true
    setTimeout(function() {
      callback();
    }, 1000);
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
    var textAreaHeight = browser.getCssProperty('#inputMeal' + arg1, "height").parsed.value;
    expect(textAreaHeight).toBeGreaterThan(height);
  });

  this.Then(/^The text of the "([^"]*)" textbox should be "([^"]*)"$/, function (arg1, arg2) {
    expect(this.support.getValueOfSelector('#inputMeal' + arg1)).toEqual(arg2);
  });

  this.Then(/^The text of the "([^"]*)" textbox \(without stripping spaces\) should be "([^"]*)"$/, function (arg1, arg2) {
    // The getValueOfSelector is
    var selector = '#inputMeal' + arg1;
    browser.waitForVisible(selector);
    var value = browser.execute(function(selector) {
      return $(selector).val();
    }, selector).value;
    expect(value).toEqual(arg2);
  });
  this.When(/^I insert "([^"]*)" as "([^"]*)"'s meal$/, function (meal, arg2) {
    var dateString = dates[arg2];
    this.support.addMealForDate(meal, dateString);
  });

  this.Given(/^I have added "([^"]*)" for tonight$/, function (arg1) {
    this.support.addMealForDate(arg1, dates.today);
  });

  this.When(/^I click the first rating button$/, function () {
    browser.click('.btn.rating');
  });

  this.Then(/^The first rating button should be pressed$/, function () {
    expect(browser.getAttribute('.btn.rating','class')[0]).toContain('active');
  });

  this.When(/^I enter "([^"]*)" in the selectize field$/, function (arg1) {
    browser.setValue('.selectize-input input', arg1);
    browser.keys('Enter');
  });

  this.Then(/^The selectize field should contain an entry "([^"]*)"$/, function (arg1) {
    browser.waitForExist('.selectize-input div');
    expect(browser.getAttribute('.selectize-input div', 'data-value'), arg1);
  });

  this.When(/^I select "([^"]*)" servings$/, function (arg1) {
    browser.click('#inputMealServings');
    browser.waitForVisible('#inputMealServings option');
    browser.selectByVisibleText('#inputMealServings', '2')
  });

  this.Then(/^"([^"]*)" servings should be selected$/, function (arg1) {
    browser.click('#inputMealServings');
    browser.waitForExist('option:checked');
    expect(browser.getValue('option:checked')).toEqual(arg1);
  });

  this.Then(/^The comments of today's meal should show today's date and "([^"]*)"$/, function (arg1) {
    this.support.clickMealName(dates['today']);
    expect(browser.getHTML('#editMealModal')).toContain(moment().format('YYYY-MM-DD') + ': ' + arg1)
  });

  this.Then(/^The comments of today's meal should show today's date exactly once$/, function () {
    var occurrences = count(browser.getHTML('#editMealModal'), dates['today']);
    expect(occurrences).toEqual(1);
  });

  this.When(/^I add a comment for today's meal with the comment "([^"]*)"$/, function (arg1) {
    this.support.clickMealName(dates['today']);
    this.support.clickSelector('.editMeal .edit');

    this.support.setValueOfSelector('#inputMealComments', arg1);
    this.support.clickSelector('.editMeal .ok');
  });

  this.When(/^I add the "([^"]*)" category to "([^"]*)"'s meal$/, function (category, day) {
    this.support.clickMealName(dates[day]);
    if (browser.isExisting('.editMeal .edit')) {
      this.support.clickSelector('.editMeal .edit');
    }
    this.support.clickSelector('.selectize-input');
    browser.keys(category);
    browser.keys('Enter');
    this.support.clickSelector('.editMeal .ok');
  });

  this.When(/^I add "([^"]*)" to the ingredients of "([^"]*)"'s meal$/, function (ingredient, day) {
    this.support.clickMealName(dates[day]);
    if (browser.isExisting('.editMeal .edit')) {
      this.support.clickSelector('.editMeal .edit');
    }
    this.support.clickSelector('#inputMealIngredients');
    browser.keys(ingredient);
    this.support.clickSelector('.editMeal .ok');
  });

  function count(s, part) {
    return s.split(part).length - 1
  }
};
