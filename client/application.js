Meteor.subscribe('days');
Meteor.subscribe('meals');

Meteor.startup(function() {
  Meteor.call('mealNames', function(error, result) {
    Session.set("mealNames", result);
    console.log(result)
  });
});

