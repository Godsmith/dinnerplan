Template.recipes.helpers({
  meals: function() {
    Meteor.call("meals", function(error, value) {
      Session.set("meals", value);
    });
    return Session.get("meals");
  },
  mealParameters: function() {
    return MEAL_PARAMETERS;
  }
});