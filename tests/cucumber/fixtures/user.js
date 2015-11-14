/**
 * Created by Filip on 2015-10-29.
 */
( function () {

  'use strict';

  Meteor.methods({
    addUser: function (userData) {
      Meteor.users.remove({});
      Accounts.createUser({
        username: userData.username,
        password: userData.password ? userData.password : "testtest"
      });
    }
  });

  Meteor.methods({
    addDefaultUserAndTonightsMeal: function() {
      Meteor.users.remove({});
      Accounts.createUser({
        username: 'newuser',
        password: 'password'
      });

    }
  })

})();