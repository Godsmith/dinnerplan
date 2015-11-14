module.exports = function () {
  this.Before(function () {

    var theServer = this.server;

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
      }
    }
  });
};