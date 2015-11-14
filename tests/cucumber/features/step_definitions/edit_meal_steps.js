module.exports = function () {

  this.Given(/^I am a logged in user with a meal for tonight$/, function () {
    var userData = {username: 'newuser', password: 'password'};
    this.server.call('addUser', userData);
    pending();
  });

};
