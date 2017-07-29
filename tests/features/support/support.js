module.exports = function () {

  'use strict';

  this.Before(function () {

    var theServer = this.server;
    var today = moment().format('YYYY-MM-DD');
    var tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
    var MEAL_NAME = 'meal name';
    var USERNAME = 'newuser';
    var PASSWORD = 'password';
    var USERDATA = {username: USERNAME, password: PASSWORD};

    this.support = {
      navigateToMainPage: function() {
        browser.url(process.env.ROOT_URL);
      },

      logIn: function(userData) {
        if (!userData) {
          userData = USERDATA;
        }
        browser.timeoutsAsyncScript(5000); // Default timeout is apparently too slow
        browser.executeAsync(function(data, done) {
          Meteor.loginWithPassword(data.username, data.password, done);
        }, userData);
        browser.waitForExist('#login-name-link');
      },

      logOut: function() {
        let usernameLink ='#login-name-link';
        let logoutButton = '#login-buttons-logout';
        browser.waitForVisible(usernameLink);
        browser.click(usernameLink);
        browser.waitForVisible(logoutButton);
        browser.click(logoutButton);
        browser.waitForVisible('#login-sign-in-link');
      },

      createUser(userData) {
        if (!userData) {
          userData = USERDATA;
        }
        theServer.call('addUser', userData);
      },

      createUsers(userDatas) {
        theServer.call('addUsers', userDatas);
      },

      createUserAndLogIn: function(userData) {
        this.createUser(userData);
        this.logIn();
      },

      addMealForDate: function(mealName, dateString) {
        this.clickSelector('.date-' + dateString + ' button');
        var textarea = '#meal-name';
        browser.waitForExist(textarea);
        browser.keys('Backspace');
        browser.keys(mealName);
        browser.keys('Enter');
      },

      clickEditButtonForDate: function(dateString) {
        var button = '.date-' + dateString + ' button';
        browser.waitForExist(button);
        browser.click(button);
      },

      focusEditButtonForDate: function(dateString) {
        var editButton = '.date-' + dateString + ' button';
        var cancelButton = '#edit-day-cancel';
        browser.waitForExist(editButton);
        browser.click(editButton);
        browser.waitForExist(cancelButton);
        browser.click(cancelButton)
      },

      clickMealName: function(dateString) {
        var selector = '.date-' + dateString + ' a';
        browser.waitForVisible(selector);
        this.clickSelector(selector)
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

      createUserAndInsertMealIntoDatabase: function() {
        this.navigateToMainPage();
        this.createUserAndLogIn();
        this.addMealForDate(MEAL_NAME, today);
        this.clickMealName(today);
        this.clickSelector('.editMeal .ok');
      },

      insertTheSameMealForTomorrow: function() {
        this.addMealForDate(MEAL_NAME, tomorrow);
      }
    }
  });
};