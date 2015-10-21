Template.editMeal.helpers({
  textareas: function() {
    var meal = Session.get('meal');
    return [
      {
        id: 'inputMealName',
        label: 'Name',
        value: meal.name
      },
      {
        id: 'inputMealSource',
        label: 'Source',
        value: meal.source
      },
      {
        id: 'inputMealTime',
        label: 'Time',
        value: meal.time
      },
      {
        id: 'inputMealIngredients',
        label: 'Ingredients',
        value: meal.ingredients
      },
      {
        id: 'inputMealSteps',
        label: 'Steps',
        value: meal.steps
      }
    ]
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
