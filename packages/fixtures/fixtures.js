Meteor.methods({
  hasMeals: function() {
    // find({}) crashes with RangeError: Maximum call stack size exceeded
    //return Meals.find({}).fetch().length
    return Days.findOne() != null
  },
  'fixtures/reset' : function() {
    Meteor.users.remove({});
    Meals.remove({});
    Days.remove({});
  },
  addUser: function (userData) {
    Meteor.users.remove({});
    Accounts.createUser({
      username: userData.username,
      password: userData.password ? userData.password : "testtest"
    });
  }
});
