Template.editMeal.helpers({
  meal: function() {
    return Session.get('meal');
  }
});

Template.editMeal.events({
  'click .ok': function(event, template){
    var meal = {
      name: $('#inputMealName').val(),
      source: $('#inputMealSource').val(),
      time: $('#inputMealTime').val(),
      ingredients: $('#inputMealIngredients').val(),
      steps: $('#inputMealSteps').val()
    };
    Meteor.call('updateMeal', meal);
    Session.set('displayEditMeal', false);
    loadMealNames(); // To make the meal blue. Should be done reactively instead.
  },

  'click .cancel': function(event, template){
    Session.set('displayEditMeal', false);
  }
});
