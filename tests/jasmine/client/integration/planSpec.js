'use strict';

describe('plan', function() {

  beforeEach(function() {
    Meteor.call('clearDB')
  });

  afterEach(function(done) {
    Meteor.logout(done())
  });

  it('zzzzzz', function() {
    let label = '#login-username-label';
    //$('a.login-link-text').click();
    expect($(label)).not.toBe([]);
  });

  it('can create an account',function(done) {
    $('#login-sign-in-link').click();
    waitForElement('#signup-link', function() {
      $('#signup-link').click();
      $('#login-username').val('user1');
      $('#login-password').val('password');
      $('#login-password-again').val('password');
      $('#login-buttons-password').click();
      waitForElement('a:contains("user1")', function() {
        expect($('#login-name-link').text()).toContain('user1');
        done();
      });
    });
  });

  //it('can create an account',function(done) {
  //  login(function() {
  //    expect($('#login-name-link').text()).toContain('user1');
  //    done()
  //  });
  //});
});