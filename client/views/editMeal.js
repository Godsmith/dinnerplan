Template.editMeal.helpers({
  display: function() {
    return Session.get('displayEditMeal') ? '' : 'display: none;';
  },
  meal: function() {
    return Session.get('meal');
  }
});

Template.editMeal.events({
  'click .ok': function(event, template){
    var meal = {
      name: $('.editMeal input.name').val(),
      source: $('.editMeal input.source').val(),
      time: $('.editMeal input.time').val(),
      ingredients: $('.editMeal input.ingredients').val(),
      steps: $('.editMeal input.steps').val()
    };
    Meteor.call('updateMeal', meal);
    Session.set('displayEditMeal', false);
  },

  'click .cancel': function(event, template){
    Session.set('displayEditMeal', false);
  }
});
