waitForElement = function(selector, successCallback) {
  var checkInterval = 50;
  var timeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  var startTime = Date.now();
  var intervalId = Meteor.setInterval(function () {
    if (Date.now() > startTime + timeoutInterval) {
      Meteor.clearInterval(intervalId);
      // Jasmine will handle the test timeout error
    } else if ($(selector).length > 0) {
      Meteor.clearInterval(intervalId);
      successCallback();
    }
  }, checkInterval);
};

login = function(done) {
  $('#login-sign-in-link').click();
  waitForElement('#signup-link', function() {
    $('#signup-link').click();
    $('#login-username').val('user1');
    $('#login-password').val('password');
    $('#login-password-again').val('password');
    $('#login-buttons-password').click();
    waitForElement('a:contains("user1")', function() {
      done();
    });
  });
};

