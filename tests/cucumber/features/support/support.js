module.exports = function () {
  this.Before(function () {

    var theServer = this.server;
    var today = moment().format('YYYY-MM-DD');

    this.support = {
      navigateToMainPage: function() {
        browser.url(process.env.ROOT_URL);
      },

      createUserAndLogIn: function() {
        var userData = {username: 'newuser', password: 'password'};
        theServer.call('addUser', userData);
        browser.executeAsync(function(userData, done) {
          Meteor.loginWithPassword(userData.username, userData.password, done);
        }, userData);
        browser.waitForExist('#login-name-link');
      },

      addMealForTonight: function() {
        this.clickSelector('.date-' + today + ' button');
        var textarea = '.date-' + today + ' textarea';
        browser.waitForExist(textarea);
        browser.setValue(textarea, 'mymealname');
        browser.keys('Enter');
      },

      clickTonightsMeal: function() {
        this.clickSelector('.viewing.date-' + today + ' a')
      },

      setValueOfSelector: function(selector, value) {
        browser.waitForVisible(selector);
        browser.setValue(selector, value);
      },

      getValueOfSelector: function(selector) {
        browser.waitForVisible(selector);
        return browser.getValue(selector);
      },

      getTextOfSelector: function(selector) {
        browser.waitForVisible(selector);
        return browser.getText(selector);
      },

      clickSelector: function(selector) {
        browser.waitForVisible(selector);
        browser.click(selector);
      },

      insertMealIntoDatabaseAndShow: function() {
        this.navigateToMainPage();
        this.createUserAndLogIn();
        this.addMealForTonight();
        this.clickTonightsMeal();
        this.clickSelector('.editMeal .ok');
      }

    }
  });
};