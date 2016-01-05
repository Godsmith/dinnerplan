(function () {

  'use strict';

  Meteor.methods({
    'reset' : function() {
      Meteor.users.remove({});
      Meals.remove({});
      Days.remove({});
    }
  });

})();