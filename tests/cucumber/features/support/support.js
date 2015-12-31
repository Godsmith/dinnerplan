module.exports = function () {

  'use strict';

  this.Before(function () {

    var theServer = this.server;
    var today = moment().format('YYYY-MM-DD');
    var tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
    var MEAL_NAME = 'meal name';

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

      addMealForDate: function(mealName, dateString) {
        this.clickSelector('.date-' + dateString + ' button');
        var textarea = '.date-' + dateString + ' textarea';
        browser.waitForExist(textarea);
        browser.setValue(textarea, mealName);
        browser.keys('Enter');
      },

      clickEditButtonForDate: function(dateString) {
        var button = '.date-' + dateString + ' button';
        browser.waitForExist(button);
        browser.click(button);
      },

      focusEditButtonForDate: function(dateString) {
        var editButton = '.date-' + dateString + ' button';
        var cancelButton = '.date-' + dateString + ' .cancel';
        browser.waitForExist(editButton);
        browser.click(editButton);
        browser.waitForExist(cancelButton);
        browser.click(cancelButton)
      },

      clickMealName: function(dateString) {
        var selector = '.viewing.date-' + dateString + ' a'
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